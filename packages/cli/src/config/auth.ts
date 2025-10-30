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
    // Check for AWS Bedrock Bearer Token (Long-term API Keys) first
    // Format: base64(3-byte-header + AccessKeyID:SecretAccessKey)
    const bearerToken = process.env['AWS_BEARER_TOKEN_BEDROCK'];

    if (bearerToken) {
      try {
        // Decode the bearer token to extract credentials
        // AWS Bedrock Long-term API Keys have a 3-byte header, skip it
        const decoded = Buffer.from(bearerToken, 'base64');
        const decodedStr = decoded.subarray(3).toString('utf-8');
        const parts = decodedStr.split(':');

        if (parts.length === 2 && parts[0] && parts[1]) {
          // Set environment variables for AWS SDK
          process.env['AWS_ACCESS_KEY_ID'] = parts[0];
          process.env['AWS_SECRET_ACCESS_KEY'] = parts[1];
          return null; // Bearer token successfully decoded and set
        } else {
          return (
            'AWS Bearer Token format is invalid. Expected format: base64(AccessKeyID:SecretAccessKey)\n' +
            '\n' +
            'Please check your AWS_BEARER_TOKEN_BEDROCK in .env.bedrock file.'
          );
        }
      } catch (error) {
        return (
          'Failed to decode AWS Bearer Token: ' + (error instanceof Error ? error.message : 'Unknown error') + '\n' +
          '\n' +
          'Please check your AWS_BEARER_TOKEN_BEDROCK in .env.bedrock file.'
        );
      }
    }

    // Fall back to standard AWS credentials if no bearer token
    if (!process.env['AWS_ACCESS_KEY_ID'] || !process.env['AWS_SECRET_ACCESS_KEY']) {
      return (
        'AWS credentials not found. Please set either:\n' +
        '• AWS_BEARER_TOKEN_BEDROCK (for Long-term API Keys), or\n' +
        '• AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY (for IAM credentials)\n' +
        '\n' +
        'To continue, add credentials to a .env.bedrock file or set environment variables.'
      );
    }
    return null;
  }

  return 'Invalid auth method selected.';
}
