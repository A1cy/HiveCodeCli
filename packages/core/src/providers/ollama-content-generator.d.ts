/**
 * @license
 * Copyright 2025 HiveCode Team
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Ollama Content Generator that implements the ContentGenerator interface
 * Allows Ollama to work seamlessly with the existing CLI architecture
 */
import type { CountTokensResponse, GenerateContentResponse, GenerateContentParameters, CountTokensParameters, EmbedContentResponse, EmbedContentParameters } from '@google/genai';
import type { ContentGenerator } from '../core/contentGenerator.js';
/**
 * Content generator that uses Ollama for local LLM inference
 */
export declare class OllamaContentGenerator implements ContentGenerator {
    private adapter;
    constructor(model?: string, baseUrl?: string);
    generateContent(request: GenerateContentParameters, _userPromptId: string): Promise<GenerateContentResponse>;
    generateContentStream(request: GenerateContentParameters, _userPromptId: string): Promise<AsyncGenerator<GenerateContentResponse>>;
    countTokens(_request: CountTokensParameters): Promise<CountTokensResponse>;
    embedContent(_request: EmbedContentParameters): Promise<EmbedContentResponse>;
    /**
     * Check if Ollama is properly configured and accessible
     */
    checkHealth(): Promise<boolean>;
}
