/**
 * @license
 * Copyright 2025 HiveCode Team
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Adapter that makes Ollama compatible with @google/genai interface
 * Converts between Google Genai format and Ollama format
 */
import type { GenerateContentResponse, Content, GenerateContentConfig } from '@google/genai';
/**
 * Adapter class that wraps Ollama to match Google Genai interface
 */
export declare class OllamaAdapter {
    private client;
    private model;
    constructor(model?: string, baseUrl?: string);
    /**
     * Generate content using Ollama, compatible with Google Genai interface
     */
    generateContent(request: Content[], config?: GenerateContentConfig): Promise<GenerateContentResponse>;
    /**
     * Stream content generation (placeholder for future implementation)
     */
    generateContentStream(request: Content[], config?: GenerateContentConfig): AsyncGenerator<GenerateContentResponse>;
    /**
     * Check if Ollama is running and the model is available
     */
    checkConnection(): Promise<boolean>;
    /**
     * Get the current model name
     */
    getModel(): string;
    /**
     * Set a different model
     */
    setModel(model: string): void;
    /**
     * Convert Google Genai Content[] format to Ollama request format
     */
    private convertRequest;
    /**
     * Convert Ollama response format to Google Genai format
     */
    private convertResponse;
}
/**
 * Model mapping from Gemini model names to Ollama model names
 */
export declare const OLLAMA_MODEL_MAP: Record<string, string>;
/**
 * Get the Ollama model name for a given Gemini model name
 */
export declare function getOllamaModel(geminiModel: string): string;
