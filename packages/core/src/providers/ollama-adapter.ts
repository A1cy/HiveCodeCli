/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Adapter that makes Ollama compatible with @google/genai interface
 * Converts between Google Genai format and Ollama format
 */

import type {
  GenerateContentResponse,
  Content,
  Part,
  GenerateContentConfig,
} from '@google/genai';
import {
  OllamaHttpClient,
  type OllamaGenerateRequest,
  type OllamaGenerateResponse,
} from './ollama-client.js';

/**
 * Adapter class that wraps Ollama to match Google Genai interface
 */
export class OllamaAdapter {
  private client: OllamaHttpClient;
  private model: string;

  constructor(model: string = 'llama3.2:1b', baseUrl?: string) {
    this.client = new OllamaHttpClient(baseUrl);
    this.model = model;
  }

  /**
   * Generate content using Ollama, compatible with Google Genai interface
   */
  async generateContent(
    request: Content[],
    config?: GenerateContentConfig,
  ): Promise<GenerateContentResponse> {
    // 1. Convert Content[] to Ollama format
    const ollamaRequest = this.convertRequest(request, config);

    // 2. Call Ollama
    const ollamaResponse = await this.client.generate(ollamaRequest);

    // 3. Convert response back to Google Genai format
    return this.convertResponse(ollamaResponse);
  }

  /**
   * Stream content generation (placeholder for future implementation)
   */
  async *generateContentStream(
    request: Content[],
    config?: GenerateContentConfig,
  ): AsyncGenerator<GenerateContentResponse> {
    // For now, just yield the full response at once
    // TODO: Implement true streaming with Ollama's streaming API
    const response = await this.generateContent(request, config);
    yield response;
  }

  /**
   * Check if Ollama is running and the model is available
   */
  async checkConnection(): Promise<boolean> {
    const isHealthy = await this.client.checkHealth();
    if (!isHealthy) {
      return false;
    }

    // Check if the required model is available
    return await this.client.hasModel(this.model);
  }

  /**
   * Get the current model name
   */
  getModel(): string {
    return this.model;
  }

  /**
   * Set a different model
   */
  setModel(model: string): void {
    this.model = model;
  }

  /**
   * Convert Google Genai Content[] format to Ollama request format
   */
  private convertRequest(
    contents: Content[],
    config?: GenerateContentConfig,
  ): OllamaGenerateRequest {
    // Extract system prompt if any
    const systemContent = contents.find((c) => c.role === 'system');
    const systemPrompt = systemContent?.parts
      ? systemContent.parts
          .filter((p) => 'text' in p)
          .map((p) => (p as { text: string }).text)
          .join('\n')
      : undefined;

    // Extract all user and model messages to build conversation context
    const conversationParts: string[] = [];

    for (const content of contents) {
      if (content.role === 'system') {
        continue; // Already handled
      }

      if (!content.parts) {
        continue;
      }

      const textParts = content.parts
        .filter((p) => 'text' in p)
        .map((p) => (p as { text: string }).text)
        .join('\n');

      if (textParts) {
        const prefix = content.role === 'user' ? 'User: ' : 'Assistant: ';
        conversationParts.push(prefix + textParts);
      }
    }

    const prompt = conversationParts.join('\n\n');

    return {
      model: this.model,
      prompt,
      system: systemPrompt,
      stream: false,
      options: {
        temperature: config?.temperature || 0.7,
        num_predict: config?.maxOutputTokens || 4096,
        top_p: config?.topP,
        top_k: config?.topK,
      },
    };
  }

  /**
   * Convert Ollama response format to Google Genai format
   */
  private convertResponse(
    ollamaResponse: OllamaGenerateResponse,
  ): GenerateContentResponse {
    const parts: Part[] = [
      {
        text: ollamaResponse.response,
      },
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = {
      candidates: [
        {
          content: {
            parts,
            role: 'model',
          },
          finishReason: 'STOP',
          index: 0,
        },
      ],
      usageMetadata: {
        promptTokenCount: ollamaResponse.prompt_eval_count || 0,
        candidatesTokenCount: ollamaResponse.eval_count || 0,
        totalTokenCount:
          (ollamaResponse.prompt_eval_count || 0) +
          (ollamaResponse.eval_count || 0),
      },
      // Add getter properties required by GenerateContentResponse
      get text() {
        return ollamaResponse.response;
      },
      get data() {
        return undefined;
      },
      get functionCalls() {
        return [];
      },
      get executableCode() {
        return [];
      },
      get codeExecutionResult() {
        return undefined;
      },
    };

    return response as GenerateContentResponse;
  }
}

/**
 * Model mapping from Gemini model names to Ollama model names
 */
export const OLLAMA_MODEL_MAP: Record<string, string> = {
  'gemini-2.5-pro': 'qwen2.5-coder', // 4.7GB, best coding
  'gemini-2.5-flash': 'llama3.2:3b', // 2GB, faster
  'gemini-2.5-flash-lite': 'llama3.2:1b', // 1.3GB, fastest
};

/**
 * Get the Ollama model name for a given Gemini model name
 */
export function getOllamaModel(geminiModel: string): string {
  return OLLAMA_MODEL_MAP[geminiModel] || 'qwen2.5-coder';
}
