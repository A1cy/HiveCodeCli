/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * HTTP client for Ollama API integration
 * Provides low-level communication with local Ollama instance
 */

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    num_predict?: number;
    top_p?: number;
    top_k?: number;
  };
}

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  eval_duration?: number;
}

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
}

export interface OllamaListResponse {
  models: OllamaModel[];
}

/**
 * HTTP client for communicating with Ollama API
 */
export class OllamaHttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:11434') {
    this.baseUrl = baseUrl;
  }

  /**
   * Generate content using Ollama API
   */
  async generate(
    request: OllamaGenerateRequest,
  ): Promise<OllamaGenerateResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          stream: false, // Force non-streaming for initial implementation
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Ollama API error: ${response.status} - ${response.statusText}\n\n` +
            `Is Ollama running? Try: ollama serve\n` +
            `Is the model installed? Try: ollama pull ${request.model}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          `Cannot connect to Ollama at ${this.baseUrl}\n\n` +
            `Make sure Ollama is running: ollama serve\n` +
            `Then install the model: ollama pull ${request.model}\n\n` +
            `Original error: ${error.message}`,
        );
      }
      throw error;
    }
  }

  /**
   * Check if Ollama is running and accessible
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
      });
      return response.ok;
    } catch (_error) {
      return false;
    }
  }

  /**
   * List available Ollama models
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
      });

      if (!response.ok) {
        return [];
      }

      const data: OllamaListResponse = await response.json();
      return data.models?.map((m) => m.name) || [];
    } catch (_error) {
      return [];
    }
  }

  /**
   * Check if a specific model is available
   */
  async hasModel(modelName: string): Promise<boolean> {
    const models = await this.listModels();
    return models.includes(modelName);
  }

  /**
   * Pull/download a model from Ollama registry
   * Returns a promise that resolves when the pull is complete
   */
  async pullModel(
    modelName: string,
    onProgress?: (progress: string) => void,
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/api/pull`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: modelName,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to pull model: ${response.status} - ${response.statusText}`,
        );
      }

      if (!response.body) {
        throw new Error('Response body is null');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let lastStatus = '';
      let totalBytes = 0;
      let completedBytes = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // Stream completed successfully
          if (onProgress && lastStatus !== 'success') {
            onProgress('Pull complete - 100%');
          }
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          try {
            const json = JSON.parse(line);

            // Update total and completed bytes if available
            if (json.total) {
              totalBytes = json.total;
            }
            if (json.completed !== undefined) {
              completedBytes = json.completed;
            }

            if (json.status && onProgress) {
              lastStatus = json.status;

              // Calculate percentage if we have total and completed
              if (totalBytes > 0 && completedBytes > 0) {
                const percentage = Math.round(
                  (completedBytes / totalBytes) * 100,
                );
                const downloadedMB = (completedBytes / 1024 / 1024).toFixed(1);
                const totalMB = (totalBytes / 1024 / 1024).toFixed(1);

                onProgress(
                  `${json.status} - ${percentage}% (${downloadedMB}MB / ${totalMB}MB)`,
                );
              } else {
                // Fallback to just status if no progress info
                onProgress(json.status);
              }
            }

            // Check for completion markers
            if (json.status === 'success' && onProgress) {
              onProgress('Download successful - 100%');
            }
          } catch (_e) {
            // Ignore JSON parse errors
          }
        }
      }

      // Ensure the reader is released
      reader.releaseLock();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          `Cannot connect to Ollama at ${this.baseUrl}\\n\\n` +
            `Make sure Ollama is running: ollama serve\\n\\n` +
            `Original error: ${error.message}`,
        );
      }
      throw error;
    }
  }
}
