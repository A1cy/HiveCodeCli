/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthType } from '@google/gemini-cli-core';
import { loadEnvironment, loadSettings } from './settings.js';

export function validateAuthMethod(authMethod: string): string | null {
  loadEnvironment(loadSettings().merged);
  if (
    authMethod === AuthType.LOGIN_WITH_GOOGLE ||
    authMethod === AuthType.CLOUD_SHELL
  ) {
    return null;
  }

  if (authMethod === AuthType.USE_GEMINI) {
    if (!process.env['GEMINI_API_KEY']) {
      return (
        'GEMINI_API_KEY not found. Find your existing key or generate a new one at: https://aistudio.google.com/apikey\n' +
        '\n' +
        'To continue, please set the GEMINI_API_KEY environment variable or add it to a .env file.'
      );
    }
    return null;
  }

  if (authMethod === AuthType.USE_VERTEX_AI) {
    const hasVertexProjectLocationConfig =
      !!process.env['GOOGLE_CLOUD_PROJECT'] &&
      !!process.env['GOOGLE_CLOUD_LOCATION'];
    const hasGoogleApiKey = !!process.env['GOOGLE_API_KEY'];
    if (!hasVertexProjectLocationConfig && !hasGoogleApiKey) {
      return (
        'When using Vertex AI, you must specify either:\n' +
        '• GOOGLE_CLOUD_PROJECT and GOOGLE_CLOUD_LOCATION environment variables.\n' +
        '• GOOGLE_API_KEY environment variable (if using express mode).\n' +
        'Update your environment and try again (no reload needed if using .env)!'
      );
    }
    return null;
  }

  if (authMethod === AuthType.USE_OLLAMA) {
    // Ollama runs locally - no API key required
    // The health check will be performed when creating the content generator
    return null;
  }

  if (authMethod === AuthType.USE_BEDROCK) {
    // AWS Bedrock - credentials validated on first request by AWS SDK
    if (!process.env['AWS_ACCESS_KEY_ID'] || !process.env['AWS_SECRET_ACCESS_KEY']) {
      return (
        'AWS credentials not found. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.\n' +
        '\n' +
        'To continue, please set the AWS environment variables or add them to a .env.bedrock file.'
      );
    }
    return null;
  }

  return 'Invalid auth method selected.';
}
