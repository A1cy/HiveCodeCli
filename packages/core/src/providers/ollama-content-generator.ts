/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ollama Content Generator that implements the ContentGenerator interface
 * Allows Ollama to work seamlessly with the existing CLI architecture
 */

import type {
  CountTokensResponse,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  EmbedContentResponse,
  EmbedContentParameters,
  Content,
} from '@google/genai';
import { createUserContent } from '@google/genai';
import type { ContentGenerator } from '../core/contentGenerator.js';
import { OllamaAdapter } from './ollama-adapter.js';
import { debugLogger } from '../utils/debugLogger.js';

/**
 * Content generator that uses Ollama for local LLM inference
 */
export class OllamaContentGenerator implements ContentGenerator {
  private adapter: OllamaAdapter;

  constructor(model: string = 'llama3.2:1b', baseUrl?: string) {
    this.adapter = new OllamaAdapter(model, baseUrl);
    debugLogger.debug(
      `Initialized OllamaContentGenerator with model: ${model}`,
    );
  }

  async generateContent(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<GenerateContentResponse> {
    // Convert contents to proper Content array
    const contents: Content[] = Array.isArray(request.contents)
      ? (request.contents as Content[])
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [createUserContent(request.contents as any)];
    return this.adapter.generateContent(contents, request.config);
  }

  async generateContentStream(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    // Convert contents to proper Content array
    const contents: Content[] = Array.isArray(request.contents)
      ? (request.contents as Content[])
      : // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [createUserContent(request.contents as any)];
    return this.adapter.generateContentStream(contents, request.config);
  }

  async countTokens(
    _request: CountTokensParameters,
  ): Promise<CountTokensResponse> {
    // Ollama doesn't provide token counting
    // Return estimated count based on text length
    const text = JSON.stringify(_request.contents);
    const estimatedTokens = Math.ceil(text.length / 4); // Rough estimate: 4 chars per token

    return {
      totalTokens: estimatedTokens,
    };
  }

  async embedContent(
    _request: EmbedContentParameters,
  ): Promise<EmbedContentResponse> {
    // Ollama embedding support would require additional setup
    // For now, throw an error
    throw new Error(
      'Embedding not supported with Ollama. Use Gemini API for embedding features.',
    );
  }

  /**
   * Check if Ollama is properly configured and accessible
   */
  async checkHealth(): Promise<boolean> {
    return this.adapter.checkConnection();
  }
}
