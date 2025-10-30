/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CountTokensParameters,
  CountTokensResponse,
  EmbedContentParameters,
  EmbedContentResponse,
  GenerateContentParameters,
  GenerateContentResponse,
} from '@google/genai';
import { GoogleGenAI } from '@google/genai';
import { createCodeAssistContentGenerator } from '../code_assist/codeAssist.js';
import type { Config } from '../config/config.js';

import type { UserTierId } from '../code_assist/types.js';
import { BedrockContentGenerator } from '../providers/bedrock-content-generator.js';
import { OllamaContentGenerator } from '../providers/ollama-content-generator.js';
import { InstallationManager } from '../utils/installationManager.js';
import { FakeContentGenerator } from './fakeContentGenerator.js';
import { LoggingContentGenerator } from './loggingContentGenerator.js';

/**
 * Interface abstracting the core functionalities for generating content and counting tokens.
 */
export interface ContentGenerator {
  generateContent(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<GenerateContentResponse>;

  generateContentStream(
    request: GenerateContentParameters,
    userPromptId: string,
  ): Promise<AsyncGenerator<GenerateContentResponse>>;

  countTokens(request: CountTokensParameters): Promise<CountTokensResponse>;

  embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse>;

  userTier?: UserTierId;
}

export enum AuthType {
  LOGIN_WITH_GOOGLE = 'oauth-personal',
  USE_GEMINI = 'gemini-api-key',
  USE_VERTEX_AI = 'vertex-ai',
  CLOUD_SHELL = 'cloud-shell',
  USE_OLLAMA = 'ollama',
  USE_BEDROCK = 'aws-bedrock',
}

/**
 * Model-to-Provider mapping for automatic provider detection
 * This enables dynamic provider switching based on model selection
 */
const MODEL_PROVIDER_MAP: Record<string, AuthType> = {
  // Ollama models (free, local)
  'llama3.2:1b': AuthType.USE_OLLAMA,
  'llama3.2:3b': AuthType.USE_OLLAMA,
  'llama3.2:latest': AuthType.USE_OLLAMA,
  'llama3:8b': AuthType.USE_OLLAMA,
  'llama3:70b': AuthType.USE_OLLAMA,
  'qwen2.5:3b': AuthType.USE_OLLAMA,
  'qwen2.5:7b': AuthType.USE_OLLAMA,
  'qwen2.5-coder:latest': AuthType.USE_OLLAMA,
  'qwen3:4b': AuthType.USE_OLLAMA,
  'gemma:2b': AuthType.USE_OLLAMA,
  'gemma:7b': AuthType.USE_OLLAMA,
  'gpt-oss:20b': AuthType.USE_OLLAMA,

  // AWS Bedrock models (cloud)
  'openai.gpt-oss-120b-1:0': AuthType.USE_BEDROCK,
  'amazon.nova-micro-v1:0': AuthType.USE_BEDROCK,
  'amazon.nova-lite-v1:0': AuthType.USE_BEDROCK,
  'amazon.nova-pro-v1:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-5-sonnet-20241022-v2:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-5-sonnet-20240620-v1:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-5-haiku-20241022-v1:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-opus-20240229-v1:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-sonnet-20240229-v1:0': AuthType.USE_BEDROCK,
  'anthropic.claude-3-haiku-20240307-v1:0': AuthType.USE_BEDROCK,
};

/**
 * Detect provider from model name
 * Returns the appropriate AuthType for a given model, or undefined if not recognized
 */
function detectProviderFromModel(model: string | undefined): AuthType | undefined {
  if (!model) return undefined;

  // Direct match
  if (MODEL_PROVIDER_MAP[model]) {
    return MODEL_PROVIDER_MAP[model];
  }

  // Pattern matching for Ollama models (usually end with :tag)
  if (model.includes(':')) {
    return AuthType.USE_OLLAMA;
  }

  // Pattern matching for Bedrock models (usually have dots and colons)
  if (model.includes('.') && model.includes('-v')) {
    return AuthType.USE_BEDROCK;
  }

  return undefined;
}

export type ContentGeneratorConfig = {
  apiKey?: string;
  vertexai?: boolean;
  authType?: AuthType;
  proxy?: string;
  ollamaModel?: string;
  ollamaBaseUrl?: string;
  bedrockModel?: string;
  bedrockRegion?: string;
  // Note: AWS Bedrock credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
  // are read directly from environment variables by the AWS SDK
};

export function createContentGeneratorConfig(
  config: Config,
  authType: AuthType | undefined,
): ContentGeneratorConfig {
  const geminiApiKey = process.env['GEMINI_API_KEY'] || undefined;
  const googleApiKey = process.env['GOOGLE_API_KEY'] || undefined;
  const googleCloudProject =
    process.env['GOOGLE_CLOUD_PROJECT'] ||
    process.env['GOOGLE_CLOUD_PROJECT_ID'] ||
    undefined;
  const googleCloudLocation = process.env['GOOGLE_CLOUD_LOCATION'] || undefined;

  // Ollama configuration
  const useOllama = process.env['HIVECODE_USE_OLLAMA'] === 'true';
  const ollamaModel = process.env['OLLAMA_MODEL'] || 'llama3.2:1b';
  const ollamaBaseUrl =
    process.env['OLLAMA_BASE_URL'] || 'http://localhost:11434';

  // Bedrock configuration
  const useBedrock = process.env['HIVECODE_USE_BEDROCK'] === 'true';
  const bedrockModel = process.env['BEDROCK_MODEL'] || 'amazon.nova-lite-v1:0';
  // AWS credentials are read directly from AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
  // by the BedrockHttpClient, so we don't need to pass them through config
  const bedrockRegion = process.env['BEDROCK_REGION'] || 'us-east-1';

  const contentGeneratorConfig: ContentGeneratorConfig = {
    authType,
    proxy: config?.getProxy(),
  };

  // PRIORITY ORDER: authType parameter > model detection > environment variables
  // This ensures hot provider switching works correctly by respecting explicit user choice

  // Priority 1: Explicit authType parameter (from hot provider switching or settings)
  if (authType === AuthType.USE_BEDROCK) {
    console.log(`🔄 Using AWS Bedrock provider for model: ${bedrockModel}`);
    contentGeneratorConfig.authType = AuthType.USE_BEDROCK;
    contentGeneratorConfig.bedrockModel = bedrockModel;
    contentGeneratorConfig.bedrockRegion = bedrockRegion;
    return contentGeneratorConfig;
  }

  if (authType === AuthType.USE_OLLAMA) {
    console.log(`🔄 Using Ollama provider for model: ${ollamaModel}`);
    contentGeneratorConfig.authType = AuthType.USE_OLLAMA;
    contentGeneratorConfig.ollamaModel = ollamaModel;
    contentGeneratorConfig.ollamaBaseUrl = ollamaBaseUrl;
    return contentGeneratorConfig;
  }

  // Priority 2: Model detection (auto-detect provider from model name)
  const detectedBedrockProvider = detectProviderFromModel(bedrockModel);
  const detectedOllamaProvider = detectProviderFromModel(ollamaModel);

  if (detectedBedrockProvider === AuthType.USE_BEDROCK && useBedrock) {
    console.log(`🔄 Using AWS Bedrock provider for model: ${bedrockModel} (auto-detected)`);
    contentGeneratorConfig.authType = AuthType.USE_BEDROCK;
    contentGeneratorConfig.bedrockModel = bedrockModel;
    contentGeneratorConfig.bedrockRegion = bedrockRegion;
    return contentGeneratorConfig;
  }

  if (detectedOllamaProvider === AuthType.USE_OLLAMA && useOllama) {
    console.log(`🔄 Using Ollama provider for model: ${ollamaModel} (auto-detected)`);
    contentGeneratorConfig.authType = AuthType.USE_OLLAMA;
    contentGeneratorConfig.ollamaModel = ollamaModel;
    contentGeneratorConfig.ollamaBaseUrl = ollamaBaseUrl;
    return contentGeneratorConfig;
  }

  // Priority 3: Environment variables (legacy support, only if authType not set)
  if (useBedrock) {
    console.log(`🔄 Using AWS Bedrock provider for model: ${bedrockModel} (from environment)`);
    contentGeneratorConfig.authType = AuthType.USE_BEDROCK;
    contentGeneratorConfig.bedrockModel = bedrockModel;
    contentGeneratorConfig.bedrockRegion = bedrockRegion;
    return contentGeneratorConfig;
  }

  if (useOllama) {
    console.log(`🔄 Using Ollama provider for model: ${ollamaModel} (from environment)`);
    contentGeneratorConfig.authType = AuthType.USE_OLLAMA;
    contentGeneratorConfig.ollamaModel = ollamaModel;
    contentGeneratorConfig.ollamaBaseUrl = ollamaBaseUrl;
    return contentGeneratorConfig;
  }

  // If we are using Google auth or we are in Cloud Shell, there is nothing else to validate for now
  if (
    authType === AuthType.LOGIN_WITH_GOOGLE ||
    authType === AuthType.CLOUD_SHELL
  ) {
    return contentGeneratorConfig;
  }

  if (authType === AuthType.USE_GEMINI && geminiApiKey) {
    contentGeneratorConfig.apiKey = geminiApiKey;
    contentGeneratorConfig.vertexai = false;

    return contentGeneratorConfig;
  }

  if (
    authType === AuthType.USE_VERTEX_AI &&
    (googleApiKey || (googleCloudProject && googleCloudLocation))
  ) {
    contentGeneratorConfig.apiKey = googleApiKey;
    contentGeneratorConfig.vertexai = true;

    return contentGeneratorConfig;
  }

  return contentGeneratorConfig;
}

export async function createContentGenerator(
  config: ContentGeneratorConfig,
  gcConfig: Config,
  sessionId?: string,
): Promise<ContentGenerator> {
  if (gcConfig.fakeResponses) {
    return FakeContentGenerator.fromFile(gcConfig.fakeResponses);
  }

  // AWS Bedrock integration
  if (config.authType === AuthType.USE_BEDROCK) {
    const model = config.bedrockModel || 'amazon.nova-lite-v1:0';
    const region = config.bedrockRegion || 'us-east-1';

    console.log(`🌟 HiveCode: Using MHG AI / AWS Bedrock (${model})`);

    // BedrockContentGenerator reads AWS credentials directly from environment variables
    // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
    const bedrockGenerator = new BedrockContentGenerator(model, undefined, region);

    // NOTE: Health check removed - it was blocking initialization
    // Errors will be shown on first request if credentials are invalid
    console.log('   ℹ️  Bedrock initialized (credentials will be validated on first request)');

    // Verify model access in background (non-blocking, diagnostic only)
    setTimeout(async () => {
      try {
        console.log('[BEDROCK] 🔍 Verifying model access...');
        const testRequest: GenerateContentParameters = {
          model: model,
          contents: 'test',
          config: {
            temperature: 0.1,
            maxOutputTokens: 5,
          },
        };

        const streamGenerator = await bedrockGenerator.generateStream(testRequest);
        for await (const _chunk of streamGenerator) {
          console.log('[BEDROCK] ✅ Model access verified:', model);
          break; // Just need first chunk to verify
        }
      } catch (error) {
        console.error('[BEDROCK] ❌ Model access DENIED:', model);
        if (error instanceof Error) {
          console.error('[BEDROCK] 📋 Error:', error.message);
          if (error.message.includes('access')) {
            console.error('[BEDROCK] 🔑 Action required: Request model access at:');
            console.error('[BEDROCK]    https://console.aws.amazon.com/bedrock/');
            console.error('[BEDROCK] 💡 Or switch to Nova Pro (no approval needed):');
            console.error('[BEDROCK]    export BEDROCK_MODEL="amazon.nova-pro-v1:0"');
          }
        }
      }
    }, 2000); // Run after 2 seconds (non-blocking)

    return new LoggingContentGenerator(bedrockGenerator, gcConfig);
  }

  // Ollama integration
  if (config.authType === AuthType.USE_OLLAMA) {
    const model = config.ollamaModel || 'llama3.2:1b';
    const baseUrl = config.ollamaBaseUrl || 'http://localhost:11434';

    console.log(`🐝 HiveCode: Using Ollama (${model}) - 100% Free`);

    const ollamaGenerator = new OllamaContentGenerator(model, baseUrl);

    // Check health on initialization
    let isHealthy = await ollamaGenerator.checkHealth();

    if (!isHealthy) {
      console.log('🔄 Ollama is not running. Starting Ollama server...');

      try {
        // Try to start Ollama in the background
        const { spawn } = await import('node:child_process');
        const ollamaProcess = spawn('ollama', ['serve'], {
          detached: true,
          stdio: 'ignore',
        });
        ollamaProcess.unref();

        // Wait for Ollama to start (up to 5 seconds)
        console.log('⏳ Waiting for Ollama to start...');
        for (let i = 0; i < 10; i++) {
          await new Promise((resolve) => setTimeout(resolve, 500));
          isHealthy = await ollamaGenerator.checkHealth();
          if (isHealthy) {
            console.log('✅ Ollama server started successfully!');
            break;
          }
        }

        if (!isHealthy) {
          console.error('');
          console.error('❌ Failed to start Ollama server automatically.');
          console.error('');
          console.error('💡 To use Ollama (free, local):');
          console.error('  1. Start Ollama: ollama serve');
          console.error(`  2. Install model: ollama pull ${model}`);
          console.error('  3. Restart HiveCode');
          console.error('');
          console.error('💡 Alternative: Use AWS Bedrock (cloud, low-spec PCs):');
          console.error('  1. Set up .env.bedrock with your credentials');
          console.error('  2. Run: ./start-hivecode.sh');
          console.error('');
          process.exit(1);
        }
      } catch (error) {
        console.error('');
        console.error(
          '❌ Error starting Ollama server:',
          error instanceof Error ? error.message : String(error),
        );
        console.error('');
        console.error('💡 To use Ollama (free, local):');
        console.error('  1. Install Ollama: https://ollama.ai/download');
        console.error('  2. Start server: ollama serve');
        console.error(`  3. Install model: ollama pull ${model}`);
        console.error('  4. Restart HiveCode');
        console.error('');
        console.error('💡 Alternative: Use AWS Bedrock (cloud, low-spec PCs):');
        console.error('  1. Set up .env.bedrock with your credentials');
        console.error('  2. Run: ./start-hivecode.sh');
        console.error('');
        process.exit(1);
      }
    }

    return new LoggingContentGenerator(ollamaGenerator, gcConfig);
  }

  const version = process.env['CLI_VERSION'] || process.version;
  const userAgent = `GeminiCLI/${version} (${process.platform}; ${process.arch})`;
  const baseHeaders: Record<string, string> = {
    'User-Agent': userAgent,
  };

  if (
    config.authType === AuthType.LOGIN_WITH_GOOGLE ||
    config.authType === AuthType.CLOUD_SHELL
  ) {
    const httpOptions = { headers: baseHeaders };
    return new LoggingContentGenerator(
      await createCodeAssistContentGenerator(
        httpOptions,
        config.authType,
        gcConfig,
        sessionId,
      ),
      gcConfig,
    );
  }

  if (
    config.authType === AuthType.USE_GEMINI ||
    config.authType === AuthType.USE_VERTEX_AI
  ) {
    let headers: Record<string, string> = { ...baseHeaders };
    if (gcConfig?.getUsageStatisticsEnabled()) {
      const installationManager = new InstallationManager();
      const installationId = installationManager.getInstallationId();
      headers = {
        ...headers,
        'x-gemini-api-privileged-user-id': `${installationId}`,
      };
    }
    const httpOptions = { headers };

    const googleGenAI = new GoogleGenAI({
      apiKey: config.apiKey === '' ? undefined : config.apiKey,
      vertexai: config.vertexai,
      httpOptions,
    });
    return new LoggingContentGenerator(googleGenAI.models, gcConfig);
  }
  throw new Error(
    `Error creating contentGenerator: Unsupported authType: ${config.authType}`,
  );
}
