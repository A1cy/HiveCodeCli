/**
 * @license
 * Copyright 2025 HiveCode Team
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * HTTP client for Ollama API integration
 * Provides low-level communication with local Ollama instance
 */
export interface OllamaGenerateRequest {
    model: string;
    prompt: string;
    system?: string;
    stream?: boolean;
    options?: {
        temperature?: number;
        num_predict?: number;
        top_p?: number;
        top_k?: number;
    };
}
export interface OllamaGenerateResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    eval_count?: number;
    eval_duration?: number;
}
export interface OllamaModel {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
}
export interface OllamaListResponse {
    models: OllamaModel[];
}
/**
 * HTTP client for communicating with Ollama API
 */
export declare class OllamaHttpClient {
    private baseUrl;
    constructor(baseUrl?: string);
    /**
     * Generate content using Ollama API
     */
    generate(request: OllamaGenerateRequest): Promise<OllamaGenerateResponse>;
    /**
     * Check if Ollama is running and accessible
     */
    checkHealth(): Promise<boolean>;
    /**
     * List available Ollama models
     */
    listModels(): Promise<string[]>;
    /**
     * Check if a specific model is available
     */
    hasModel(modelName: string): Promise<boolean>;
}
