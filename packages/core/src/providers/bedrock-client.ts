/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * HTTP client for AWS Bedrock API integration
 * Provides low-level communication with AWS Bedrock service
 */

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
  InvokeModelWithResponseStreamCommand,
  type InvokeModelCommandInput,
} from '@aws-sdk/client-bedrock-runtime';

export interface BedrockGenerateRequest {
  modelId: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  system?: string;
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  stream?: boolean;
}

export interface BedrockGenerateResponse {
  modelId: string;
  content: Array<{
    type: 'text';
    text: string;
  }>;
  stopReason?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface BedrockModel {
  modelId: string;
  modelName: string;
  provider: string;
  capabilities: string[];
}

/**
 * HTTP client for communicating with AWS Bedrock API
 */
export class BedrockHttpClient {
  private client: BedrockRuntimeClient;
  private apiKey: string;
  private region: string;

  constructor(apiKey: string = ' ', region: string = 'us-east-1') {
    this.apiKey = apiKey;
    this.region = region;

    // Initialize Bedrock Runtime client
    this.client = new BedrockRuntimeClient({
      region: this.region,
      credentials: {
        accessKeyId: 'BEDROCK',
        secretAccessKey: this.apiKey,
      },
    });
  }

  /**
   * Generate content using AWS Bedrock API
   */
  async generate(
    request: BedrockGenerateRequest,
  ): Promise<BedrockGenerateResponse> {
    try {
      // Format payload based on model provider
      const payload = this.formatRequestPayload(request);

      const command = new InvokeModelCommand({
        modelId: request.modelId,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      } as InvokeModelCommandInput);

      const response = await this.client.send(command);

      if (!response.body) {
        throw new Error('No response body from AWS Bedrock');
      }

      const responseBody = JSON.parse(new TextDecoder().decode(response.body));

      return this.parseResponseBody(responseBody, request.modelId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `AWS Bedrock API error: ${error.message}\n\n` +
            `Model: ${request.modelId}\n` +
            `Region: ${this.region}\n` +
            `Please check your API key and model availability.`,
        );
      }
      throw error;
    }
  }

  /**
   * Generate content with streaming using AWS Bedrock API
   */
  async *generateStream(
    request: BedrockGenerateRequest,
  ): AsyncGenerator<BedrockGenerateResponse> {
    try {
      const payload = this.formatRequestPayload(request);

      const command = new InvokeModelWithResponseStreamCommand({
        modelId: request.modelId,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      } as InvokeModelCommandInput);

      const response = await this.client.send(command);

      if (!response.body) {
        throw new Error('No response body from AWS Bedrock');
      }

      for await (const event of response.body) {
        if (event.chunk && event.chunk.bytes) {
          const chunk = JSON.parse(new TextDecoder().decode(event.chunk.bytes));

          let textDelta = '';

          // Handle different response formats
          if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
            textDelta = chunk.delta.text;
          } else if (chunk.type === 'message_delta') {
            // Handle message completion
            continue;
          } else if (chunk.outputText) {
            // Nova models format
            textDelta = chunk.outputText;
          } else if (chunk.generation) {
            // Llama models format
            textDelta = chunk.generation;
          }

          if (textDelta) {
            yield {
              modelId: request.modelId,
              content: [{ type: 'text', text: textDelta }],
              stopReason: chunk.stopReason,
            };
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `AWS Bedrock streaming error: ${error.message}\n\n` +
            `Model: ${request.modelId}\n` +
            `Region: ${this.region}`,
        );
      }
      throw error;
    }
  }

  /**
   * Format request payload based on model type
   */
  private formatRequestPayload(request: BedrockGenerateRequest): unknown {
    const isNovaModel = request.modelId.startsWith('amazon.nova');
    const isLlamaModel = request.modelId.startsWith('meta.llama');

    if (isNovaModel) {
      // Amazon Nova format
      return {
        messages: request.messages.map((msg) => ({
          role: msg.role,
          content: [{ text: msg.content }],
        })),
        system: request.system ? [{ text: request.system }] : undefined,
        inferenceConfig: {
          temperature: request.temperature || 0.7,
          maxTokens: request.max_tokens || 4096,
          topP: request.top_p || 0.9,
        },
      };
    } else if (isLlamaModel) {
      // Meta Llama format
      const prompt = this.buildLlamaPrompt(request.messages, request.system);
      return {
        prompt,
        temperature: request.temperature || 0.7,
        max_gen_len: request.max_tokens || 4096,
        top_p: request.top_p || 0.9,
      };
    }

    // Default format (Anthropic Claude-like)
    return {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: request.max_tokens || 4096,
      messages: request.messages.map((msg) => ({
        role: msg.role,
        content: [{ type: 'text', text: msg.content }],
      })),
      system: request.system,
      temperature: request.temperature || 0.7,
      top_p: request.top_p || 0.9,
    };
  }

  /**
   * Build Llama-format prompt
   */
  private buildLlamaPrompt(
    messages: Array<{ role: string; content: string }>,
    system?: string,
  ): string {
    let prompt = system
      ? `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${system}<|eot_id|>`
      : '<|begin_of_text|>';

    for (const msg of messages) {
      prompt += `<|start_header_id|>${msg.role}<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
    }

    prompt += '<|start_header_id|>assistant<|end_header_id|>\n\n';

    return prompt;
  }

  /**
   * Parse response body based on model type
   */
  private parseResponseBody(
    responseBody: unknown,
    modelId: string,
  ): BedrockGenerateResponse {
    const body = responseBody as Record<string, unknown>;
    const isNovaModel = modelId.startsWith('amazon.nova');
    const isLlamaModel = modelId.startsWith('meta.llama');

    if (isNovaModel) {
      // Amazon Nova format
      const output = body.output as Record<string, unknown>;
      const message = output?.message as Record<string, unknown>;
      const content = message?.content as Array<Record<string, unknown>>;

      return {
        modelId,
        content: content.map((c) => ({
          type: 'text',
          text: String(c.text || ''),
        })),
        stopReason: String(body.stopReason || 'end_turn'),
        usage: body.usage
          ? {
              inputTokens:
                Number((body.usage as Record<string, unknown>).inputTokens) ||
                0,
              outputTokens:
                Number((body.usage as Record<string, unknown>).outputTokens) ||
                0,
              totalTokens:
                Number(
                  (body.usage as Record<string, unknown>).inputTokens || 0,
                ) +
                Number(
                  (body.usage as Record<string, unknown>).outputTokens || 0,
                ),
            }
          : undefined,
      };
    } else if (isLlamaModel) {
      // Meta Llama format
      return {
        modelId,
        content: [
          {
            type: 'text',
            text: String(body.generation || ''),
          },
        ],
        stopReason: String(body.stop_reason || 'end_turn'),
        usage: {
          inputTokens: Number(body.prompt_token_count) || 0,
          outputTokens: Number(body.generation_token_count) || 0,
          totalTokens:
            (Number(body.prompt_token_count) || 0) +
            (Number(body.generation_token_count) || 0),
        },
      };
    }

    // Default format (Anthropic Claude-like)
    const content = body.content as Array<Record<string, unknown>>;
    const usage = body.usage as Record<string, unknown> | undefined;

    return {
      modelId,
      content: content.map((c) => ({
        type: 'text',
        text: String(c.text || ''),
      })),
      stopReason: String(body.stop_reason || 'end_turn'),
      usage: usage
        ? {
            inputTokens: Number(usage.input_tokens) || 0,
            outputTokens: Number(usage.output_tokens) || 0,
            totalTokens:
              (Number(usage.input_tokens) || 0) +
              (Number(usage.output_tokens) || 0),
          }
        : undefined,
    };
  }

  /**
   * Check if AWS Bedrock is accessible
   */
  async checkHealth(): Promise<boolean> {
    try {
      // Try a simple invoke with a lightweight model
      const testRequest: BedrockGenerateRequest = {
        modelId: 'amazon.nova-micro-v1:0',
        messages: [{ role: 'user', content: 'Hello' }],
        max_tokens: 10,
      };

      await this.generate(testRequest);
      return true;
    } catch (_error) {
      return false;
    }
  }

  /**
   * List available Bedrock models (predefined for MHG AI)
   */
  listModels(): BedrockModel[] {
    return [
      {
        modelId: 'amazon.nova-micro-v1:0',
        modelName: 'Amazon Nova Micro',
        provider: 'Amazon',
        capabilities: ['text'],
      },
      {
        modelId: 'amazon.nova-lite-v1:0',
        modelName: 'Amazon Nova Lite',
        provider: 'Amazon',
        capabilities: ['text', 'image', 'video'],
      },
      {
        modelId: 'amazon.nova-pro-v1:0',
        modelName: 'Amazon Nova Pro',
        provider: 'Amazon',
        capabilities: ['text', 'image', 'video'],
      },
      {
        modelId: 'amazon.nova-canvas-v1:0',
        modelName: 'Amazon Nova Canvas',
        provider: 'Amazon',
        capabilities: ['image-generation'],
      },
      {
        modelId: 'amazon.nova-reel-v1:0',
        modelName: 'Amazon Nova Reel',
        provider: 'Amazon',
        capabilities: ['video-generation'],
      },
      {
        modelId: 'meta.llama3-2-1b-instruct-v1:0',
        modelName: 'Meta Llama 3.2 1B',
        provider: 'Meta',
        capabilities: ['text'],
      },
      {
        modelId: 'meta.llama3-2-3b-instruct-v1:0',
        modelName: 'Meta Llama 3.2 3B',
        provider: 'Meta',
        capabilities: ['text'],
      },
      {
        modelId: 'meta.llama3-8b-instruct-v1:0',
        modelName: 'Meta Llama 3 8B',
        provider: 'Meta',
        capabilities: ['text'],
      },
      {
        modelId: 'meta.llama3-1-8b-instruct-v1:0',
        modelName: 'Meta Llama 3.1 8B',
        provider: 'Meta',
        capabilities: ['text'],
      },
      {
        modelId: 'meta.llama3-2-11b-instruct-v1:0',
        modelName: 'Meta Llama 3.2 11B',
        provider: 'Meta',
        capabilities: ['text', 'image'],
      },
    ];
  }
}
