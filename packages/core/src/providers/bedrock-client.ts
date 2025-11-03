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
  private region: string;
  private readonly decoder = new TextDecoder(); // Reuse for all decode operations
  private readonly DEBUG = process.env['BEDROCK_DEBUG'] === 'true';

  constructor(apiKey: string = ' ', region: string = 'us-east-1') {
    this.region = region;

    // Check for AWS Bedrock Bearer Token (Long-term API Keys)
    // Format: base64(3-byte-header + AccessKeyID:SecretAccessKey)
    const bearerToken = process.env['AWS_BEARER_TOKEN_BEDROCK'] || '';

    let accessKeyId = '';
    let secretAccessKey = '';

    if (bearerToken) {
      try {
        // Decode the bearer token to extract credentials
        // AWS Bedrock Long-term API Keys have a 3-byte header, skip it
        const decoded = Buffer.from(bearerToken, 'base64');
        const decodedStr = decoded.subarray(3).toString('utf-8');
        const parts = decodedStr.split(':');
        if (parts.length === 2) {
          accessKeyId = parts[0] || '';
          secretAccessKey = parts[1] || '';
        }
      } catch (error) {
        console.error('[BEDROCK] Failed to decode bearer token:', error);
      }
    }

    // Fall back to environment variables if bearer token not present
    if (!accessKeyId) {
      accessKeyId = process.env['AWS_ACCESS_KEY_ID'] || '';
    }
    if (!secretAccessKey) {
      secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'] || apiKey || '';
    }

    // Initialize AWS SDK client with credentials
    const credentials = {
      accessKeyId,
      secretAccessKey,
    };

    const hasValidCredentials = credentials.accessKeyId && credentials.secretAccessKey;

    if (!hasValidCredentials && this.DEBUG) {
      console.warn('[BEDROCK] No valid credentials found, will use IAM role');
    }

    this.client = new BedrockRuntimeClient({
      region: this.region,
      credentials: hasValidCredentials ? credentials : undefined,
      maxAttempts: 1,
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

      // Use AWS SDK with SigV4 signing
      const command = new InvokeModelCommand({
        modelId: request.modelId,
        contentType: 'application/json',
        body: JSON.stringify(payload),
      } as InvokeModelCommandInput);

      const response = await this.client.send(command);

      if (!response.body) {
        throw new Error('No response body from AWS Bedrock');
      }

      const responseBody = JSON.parse(this.decoder.decode(response.body));

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
    const startTime = Date.now();

    if (this.DEBUG) {
      console.log('[BEDROCK] 🚀 Request started:', new Date().toISOString());
      console.log('[BEDROCK] 📍 Model:', request.modelId);
    }

    try {
      const payload = this.formatRequestPayload(request);

      // Use AWS SDK with SigV4 signing
      // Only add stream parameter for models that need it (Llama, OpenAI)
      // Claude and Nova models use InvokeModelWithResponseStreamCommand without stream parameter
      const isClaudeModel = request.modelId.startsWith('anthropic.claude');
      const isNovaModel = request.modelId.startsWith('amazon.nova');
      const needsStreamParam = !isClaudeModel && !isNovaModel;
      const payloadWithStream = typeof payload === 'object' && payload !== null && needsStreamParam
        ? { ...payload as Record<string, unknown>, stream: true }
        : payload;

      const command = new InvokeModelWithResponseStreamCommand({
        modelId: request.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payloadWithStream),
      } as InvokeModelCommandInput);

      if (this.DEBUG) {
        console.log('[BEDROCK] Sending streaming request to model:', request.modelId);
      }

      const response = await this.client.send(command);
      const sendTime = Date.now();
      if (this.DEBUG) {
        console.log('[BEDROCK] ⏱️  Request sent, latency:', sendTime - startTime, 'ms');
      }

      if (!response.body) {
        throw new Error('No response body from AWS Bedrock');
      }

      let firstChunkReceived = false;
      let chunkCount = 0;

      for await (const event of response.body) {
        if (event.chunk && event.chunk.bytes) {
          chunkCount++;

          if (!firstChunkReceived) {
            const firstTokenTime = Date.now();
            if (this.DEBUG) {
              console.log('[BEDROCK] ⚡ First token latency:', firstTokenTime - startTime, 'ms');
            }
            firstChunkReceived = true;
          }

          const chunk = JSON.parse(this.decoder.decode(event.chunk.bytes));

          // Handle OpenAI-compatible models (openai.gpt-oss-*)
          if (chunk.choices && Array.isArray(chunk.choices) && chunk.choices.length > 0) {
            const choice = chunk.choices[0];
            const deltaContent = choice.delta?.content || choice.text || '';

            if (deltaContent) {
              // CRITICAL FIX: Add leading space to prevent word concatenation in streaming
              // OpenAI models return chunks without inter-word spacing
              // Skip space for: first chunk, punctuation, or if already has leading space
              const needsSpace = chunkCount > 1 &&
                                deltaContent &&
                                !deltaContent.startsWith(' ') &&
                                !/^[.,!?;:\-—)}\]"'،؛؟]/.test(deltaContent);

              const textWithSpacing = needsSpace ? ' ' + deltaContent : deltaContent;

              yield {
                modelId: request.modelId,
                content: [{ type: 'text', text: textWithSpacing }],
              };
              continue;
            }

            // Handle finish_reason
            if (choice.finish_reason) {
              yield {
                modelId: request.modelId,
                content: [{ type: 'text', text: '' }],
                stopReason: choice.finish_reason,
              };
              continue;
            }
          }

          // Fast-path optimization: Handle Native Bedrock (contentBlockDelta)
          const textDelta = chunk.contentBlockDelta?.delta?.text;
          if (textDelta) {
            // CRITICAL FIX: Add leading space to prevent word concatenation in streaming
            // Claude and Nova models may also return chunks without inter-word spacing
            // Skip space for: first chunk, punctuation, or if already has leading space
            const needsSpace = chunkCount > 1 &&
                              textDelta &&
                              !textDelta.startsWith(' ') &&
                              !/^[.,!?;:\-—)}\]"'،؛؟]/.test(textDelta);

            const textWithSpacing = needsSpace ? ' ' + textDelta : textDelta;

            yield {
              modelId: request.modelId,
              content: [{ type: 'text', text: textWithSpacing }],
            };
            continue;
          }

          // Handle messageStop event (stop reason)
          if (chunk.messageStop) {
            yield {
              modelId: request.modelId,
              content: [{ type: 'text', text: '' }],
              stopReason: chunk.messageStop.stopReason,
            };
            continue;
          }

          // Skip non-content events (messageStart, contentBlockStop, metadata)
        }
      }

      // Check if we received any chunks at all
      if (chunkCount === 0) {
        throw new Error(
          `No response chunks from AWS Bedrock.\n\n` +
          `Model: ${request.modelId}\n` +
          `Region: ${this.region}\n\n` +
          `Possible causes:\n` +
          `1. Model not available in region\n` +
          `2. Model access not enabled in AWS account\n` +
          `3. Incorrect model ID format\n` +
          `4. Model does not support streaming`
        );
      }

      const totalTime = Date.now() - startTime;
      if (this.DEBUG) {
        console.log('[BEDROCK] ✅ Stream complete:', totalTime, 'ms', `(${chunkCount} chunks)`);
      }
    } catch (error) {
      const errorTime = Date.now() - startTime;
      if (this.DEBUG) {
        console.error('[BEDROCK] ❌ Error after', errorTime, 'ms');
      }
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
    const isOpenAIModel = request.modelId.startsWith('openai.');

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
    } else if (isOpenAIModel) {
      // OpenAI Chat Completions format
      const messages: Array<{ role: string; content: string }> = request.messages.map((msg) => ({
        role: msg.role,
        content: msg.content, // Simple string, not array
      }));

      // Add system message at the beginning if present
      if (request.system) {
        messages.unshift({
          role: 'system',
          content: request.system,
        });
      }

      return {
        messages,
        max_tokens: request.max_tokens || 4096,
        temperature: request.temperature || 0.7,
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
    const isOpenAIModel = modelId.startsWith('openai.');

    if (isNovaModel) {
      // Amazon Nova format
      const output = body['output'] as Record<string, unknown>;
      const message = output?.['message'] as Record<string, unknown>;
      const content = message?.['content'] as Array<Record<string, unknown>>;

      return {
        modelId,
        content: content.map((c) => ({
          type: 'text',
          text: String(c['text'] || ''),
        })),
        stopReason: String(body['stopReason'] || 'end_turn'),
        usage: body['usage']
          ? {
              inputTokens:
                Number((body['usage'] as Record<string, unknown>)['inputTokens']) ||
                0,
              outputTokens:
                Number((body['usage'] as Record<string, unknown>)['outputTokens']) ||
                0,
              totalTokens:
                Number(
                  (body['usage'] as Record<string, unknown>)['inputTokens'] || 0,
                ) +
                Number(
                  (body['usage'] as Record<string, unknown>)['outputTokens'] || 0,
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
            text: String(body['generation'] || ''),
          },
        ],
        stopReason: String(body['stop_reason'] || 'end_turn'),
        usage: {
          inputTokens: Number(body['prompt_token_count']) || 0,
          outputTokens: Number(body['generation_token_count']) || 0,
          totalTokens:
            (Number(body['prompt_token_count']) || 0) +
            (Number(body['generation_token_count']) || 0),
        },
      };
    } else if (isOpenAIModel) {
      // OpenAI Chat Completions format
      const choices = body['choices'] as Array<Record<string, unknown>>;
      const message = choices?.[0]?.['message'] as Record<string, unknown>;

      return {
        modelId,
        content: [
          {
            type: 'text',
            text: String(message?.['content'] || ''),
          },
        ],
        stopReason: String(choices?.[0]?.['finish_reason'] || 'stop'),
        usage: body['usage']
          ? {
              inputTokens:
                Number((body['usage'] as Record<string, unknown>)['prompt_tokens']) ||
                0,
              outputTokens:
                Number((body['usage'] as Record<string, unknown>)['completion_tokens']) ||
                0,
              totalTokens:
                Number((body['usage'] as Record<string, unknown>)['total_tokens']) ||
                0,
            }
          : undefined,
      };
    }

    // Default format (Anthropic Claude-like)
    const content = body['content'] as Array<Record<string, unknown>>;
    const usage = body['usage'] as Record<string, unknown> | undefined;

    return {
      modelId,
      content: content.map((c) => ({
        type: 'text',
        text: String(c['text'] || ''),
      })),
      stopReason: String(body['stop_reason'] || 'end_turn'),
      usage: usage
        ? {
            inputTokens: Number(usage['input_tokens']) || 0,
            outputTokens: Number(usage['output_tokens']) || 0,
            totalTokens:
              (Number(usage['input_tokens']) || 0) +
              (Number(usage['output_tokens']) || 0),
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
      {
        modelId: 'openai.gpt-oss-120b-1:0',
        modelName: 'OpenAI GPT OSS 120B',
        provider: 'OpenAI',
        capabilities: ['text'],
      },
    ];
  }
}
