/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  CountTokensResponse,
  GenerateContentResponse,
  GenerateContentParameters,
  CountTokensParameters,
  EmbedContentResponse,
  EmbedContentParameters,
} from '@google/genai';
import { GoogleGenAI } from '@google/genai';
import { createCodeAssistContentGenerator } from '../code_assist/codeAssist.js';
import type { Config } from '../config/config.js';

import type { UserTierId } from '../code_assist/types.js';
import { LoggingContentGenerator } from './loggingContentGenerator.js';
import { InstallationManager } from '../utils/installationManager.js';
import { FakeContentGenerator } from './fakeContentGenerator.js';
import { OllamaContentGenerator } from '../providers/ollama-content-generator.js';

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
}

export type ContentGeneratorConfig = {
  apiKey?: string;
  vertexai?: boolean;
  authType?: AuthType;
  proxy?: string;
  ollamaModel?: string;
  ollamaBaseUrl?: string;
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

  const contentGeneratorConfig: ContentGeneratorConfig = {
    authType,
    proxy: config?.getProxy(),
  };

  // If Ollama is explicitly enabled, use it
  if (useOllama || authType === AuthType.USE_OLLAMA) {
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
          console.error('Please start Ollama manually:');
          console.error('  ollama serve');
          console.error('');
          console.error(`Then install the model if needed:`);
          console.error(`  ollama pull ${model}`);
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
        console.error('Please start Ollama manually:');
        console.error('  ollama serve');
        console.error('');
        console.error(`Then install the model if needed:`);
        console.error(`  ollama pull ${model}`);
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
