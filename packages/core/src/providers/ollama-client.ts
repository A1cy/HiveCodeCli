/**
 * @license
 * Copyright 2025 HiveCode Team
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
  async generate(request: OllamaGenerateRequest): Promise<OllamaGenerateResponse> {
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
        `Ollama API error: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
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
}
