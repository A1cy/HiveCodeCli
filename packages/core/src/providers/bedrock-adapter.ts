/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Adapter that makes AWS Bedrock compatible with @google/genai interface
 * Converts between Google Genai format and AWS Bedrock format
 */

import type {
  GenerateContentResponse,
  Content,
  Part,
  GenerateContentConfig,
} from '@google/genai';
import {
  BedrockHttpClient,
  type BedrockGenerateRequest,
  type BedrockGenerateResponse,
} from './bedrock-client.js';

/**
 * Adapter class that wraps AWS Bedrock to match Google Genai interface
 */
export class BedrockAdapter {
  private client: BedrockHttpClient;
  private model: string;

  constructor(
    model: string = 'amazon.nova-lite-v1:0',
    apiKey?: string,
    region?: string,
  ) {
    this.client = new BedrockHttpClient(apiKey, region);
    this.model = model;
  }

  /**
   * Generate content using AWS Bedrock, compatible with Google Genai interface
   */
  async generateContent(
    request: Content[],
    config?: GenerateContentConfig,
  ): Promise<GenerateContentResponse> {
    // 1. Convert Content[] to Bedrock format
    const bedrockRequest = this.convertRequest(request, config);

    // 2. Call AWS Bedrock
    const bedrockResponse = await this.client.generate(bedrockRequest);

    // 3. Convert response back to Google Genai format
    return this.convertResponse(bedrockResponse);
  }

  /**
   * Stream content generation
   */
  async *generateContentStream(
    request: Content[],
    config?: GenerateContentConfig,
  ): AsyncGenerator<GenerateContentResponse> {
    // 1. Convert Content[] to Bedrock format
    const bedrockRequest = this.convertRequest(request, config);

    // 2. Stream from AWS Bedrock
    for await (const chunk of this.client.generateStream(bedrockRequest)) {
      // 3. Convert each chunk back to Google Genai format
      yield this.convertResponse(chunk);
    }
  }

  /**
   * Check if AWS Bedrock is accessible and the model is available
   */
  async checkConnection(): Promise<boolean> {
    const isHealthy = await this.client.checkHealth();
    if (!isHealthy) {
      return false;
    }

    // Check if the selected model is in the available list
    const models = this.client.listModels();
    return models.some((m) => m.modelId === this.model);
  }

  /**
   * Get the current model ID
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
   * Convert Google Genai Content[] format to Bedrock request format
   */
  private convertRequest(
    contents: Content[],
    config?: GenerateContentConfig,
  ): BedrockGenerateRequest {
    // Extract system prompt if any
    const systemContent = contents.find((c) => c.role === 'system');
    const systemPrompt = systemContent?.parts
      ? systemContent.parts
          .filter((p) => 'text' in p)
          .map((p) => (p as { text: string }).text)
          .join('\n')
      : undefined;

    // Extract all user and model messages
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

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
        messages.push({
          role: content.role === 'user' ? 'user' : 'assistant',
          content: textParts,
        });
      }
    }

    return {
      modelId: this.model,
      messages,
      system: systemPrompt,
      temperature: config?.temperature || 0.7,
      max_tokens: config?.maxOutputTokens || 4096,
      top_p: config?.topP,
      stream: false,
    };
  }

  /**
   * Convert Bedrock response format to Google Genai format
   */
  private convertResponse(
    bedrockResponse: BedrockGenerateResponse,
  ): GenerateContentResponse {
    // Extract text from Bedrock content array
    const text = bedrockResponse.content.map((c) => c.text).join('');

    const parts: Part[] = [
      {
        text,
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
          finishReason: this.mapStopReason(bedrockResponse.stopReason),
          index: 0,
        },
      ],
      usageMetadata: bedrockResponse.usage
        ? {
            promptTokenCount: bedrockResponse.usage.inputTokens,
            candidatesTokenCount: bedrockResponse.usage.outputTokens,
            totalTokenCount: bedrockResponse.usage.totalTokens,
          }
        : undefined,
      // Add getter properties required by GenerateContentResponse
      get text() {
        return text;
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

  /**
   * Map Bedrock stop reason to Genai finish reason
   */
  private mapStopReason(stopReason?: string): string {
    switch (stopReason) {
      case 'end_turn':
      case 'stop':
        return 'STOP';
      case 'max_tokens':
      case 'length':
        return 'MAX_TOKENS';
      case 'content_filtered':
        return 'SAFETY';
      default:
        return 'STOP';
    }
  }
}

/**
 * Model mapping from Gemini model names to Bedrock model IDs
 */
export const BEDROCK_MODEL_MAP: Record<string, string> = {
  'gemini-2.5-pro': 'amazon.nova-pro-v1:0',
  'gemini-2.5-flash': 'amazon.nova-lite-v1:0',
  'gemini-2.5-flash-lite': 'amazon.nova-micro-v1:0',
};

/**
 * Get the Bedrock model ID for a given Gemini model name
 */
export function getBedrockModel(geminiModel: string): string {
  return BEDROCK_MODEL_MAP[geminiModel] || 'amazon.nova-lite-v1:0';
}
