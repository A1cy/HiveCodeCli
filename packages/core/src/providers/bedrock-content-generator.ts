/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AWS Bedrock Content Generator that implements the ContentGenerator interface
 * Allows AWS Bedrock to work seamlessly with the existing CLI architecture
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
import { BedrockAdapter } from './bedrock-adapter.js';
import { debugLogger } from '../utils/debugLogger.js';

/**
 * Content generator that uses AWS Bedrock for inference
 */
export class BedrockContentGenerator implements ContentGenerator {
  private adapter: BedrockAdapter;

  constructor(
    model: string = 'amazon.nova-lite-v1:0',
    apiKey?: string,
    region?: string,
  ) {
    this.adapter = new BedrockAdapter(model, apiKey, region);
    debugLogger.debug(
      `Initialized BedrockContentGenerator with model: ${model}`,
    );
  }

  async generateContent(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<GenerateContentResponse> {
    try {
      // Convert contents to proper Content array
      const contents: Content[] = Array.isArray(request.contents)
        ? (request.contents as Content[])
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [createUserContent(request.contents as any)];
      return await this.adapter.generateContent(contents, request.config);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(
        `AWS Bedrock request failed: ${errorMessage}\n\n` +
          `💡 Troubleshooting:\n` +
          `   - Check AWS credentials are loaded (run: echo $AWS_ACCESS_KEY_ID)\n` +
          `   - Verify AWS Bedrock access in your AWS account\n` +
          `   - Try switching to Ollama: /Ollama\n\n` +
          `Original error: ${errorMessage}`,
      );
    }
  }

  async generateContentStream(
    request: GenerateContentParameters,
    _userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    try {
      // Convert contents to proper Content array
      const contents: Content[] = Array.isArray(request.contents)
        ? (request.contents as Content[])
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [createUserContent(request.contents as any)];
      return this.adapter.generateContentStream(contents, request.config);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      throw new Error(
        `AWS Bedrock streaming failed: ${errorMessage}\n\n` +
          `💡 Try switching to Ollama: /Ollama`,
      );
    }
  }

  async countTokens(
    _request: CountTokensParameters,
  ): Promise<CountTokensResponse> {
    // AWS Bedrock doesn't provide token counting endpoint
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
    // AWS Bedrock embedding support requires different models
    // For now, throw an error
    throw new Error(
      'Embedding not supported with AWS Bedrock text models. Use Amazon Titan Embeddings or switch to Gemini API for embedding features.',
    );
  }

  /**
   * Check if AWS Bedrock is properly configured and accessible
   */
  async checkHealth(): Promise<boolean> {
    return this.adapter.checkConnection();
  }

  /**
   * Alias for generateContentStream - used for direct streaming access
   */
  async generateStream(
    request: GenerateContentParameters,
  ): Promise<AsyncGenerator<GenerateContentResponse>> {
    return this.generateContentStream(request, 'health-check');
  }
}
