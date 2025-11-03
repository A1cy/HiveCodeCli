/**
 * Model Display Names Utility
 * Maps raw model IDs to user-friendly display names
 */

export interface ModelDisplayInfo {
  displayName: string;
  shortName: string;
  description: string;
}

/**
 * Mapping of model IDs to friendly display names
 */
export const MODEL_DISPLAY_NAMES: Record<string, ModelDisplayInfo> = {
  // OpenAI GPT-OSS Models
  'openai.gpt-oss-120b-1:0': {
    displayName: 'OpenAI GPT-OSS 120B',
    shortName: 'GPT-OSS 120B',
    description: '120B parameter open-source GPT model via AWS Bedrock',
  },

  // Amazon Nova Models
  'amazon.nova-lite-v1:0': {
    displayName: 'Amazon Nova Lite',
    shortName: 'Nova Lite',
    description: 'Fast, lightweight multimodal model (text/image/video)',
  },
  'amazon.nova-pro-v1:0': {
    displayName: 'Amazon Nova Pro',
    shortName: 'Nova Pro',
    description: 'Professional-grade multimodal model',
  },
  'amazon.nova-micro-v1:0': {
    displayName: 'Amazon Nova Micro',
    shortName: 'Nova Micro',
    description: 'Ultra-fast micro model for simple tasks',
  },

  // Anthropic Claude Models
  'anthropic.claude-3-5-sonnet-20241022-v2:0': {
    displayName: 'Claude 3.5 Sonnet V2',
    shortName: 'Claude 3.5 Sonnet',
    description: 'Latest Claude 3.5 Sonnet with enhanced capabilities',
  },
  'anthropic.claude-3-5-sonnet-20240620-v1:0': {
    displayName: 'Claude 3.5 Sonnet V1',
    shortName: 'Claude 3.5 Sonnet',
    description: 'Claude 3.5 Sonnet (June 2024)',
  },
  'anthropic.claude-3-5-haiku-20241022-v1:0': {
    displayName: 'Claude 3.5 Haiku',
    shortName: 'Claude 3.5 Haiku',
    description: 'Fast, efficient Claude model',
  },
  'anthropic.claude-3-opus-20240229-v1:0': {
    displayName: 'Claude 3 Opus',
    shortName: 'Claude 3 Opus',
    description: 'Most capable Claude 3 model',
  },

  // Meta Llama Models
  'meta.llama3-3-70b-instruct-v1:0': {
    displayName: 'Meta Llama 3.3 70B',
    shortName: 'Llama 3.3 70B',
    description: 'Llama 3.3 with 70B parameters',
  },
  'meta.llama3-2-90b-instruct-v1:0': {
    displayName: 'Meta Llama 3.2 90B',
    shortName: 'Llama 3.2 90B',
    description: 'Llama 3.2 with 90B parameters',
  },
};

/**
 * Get friendly display name for a model ID
 * @param modelId - Raw model ID (e.g., "openai.gpt-oss-120b-1:0")
 * @param format - Display format: "full" (default), "short", or "id"
 * @returns Friendly display name or original ID if not found
 */
export function getModelDisplayName(
  modelId: string,
  format: 'full' | 'short' | 'id' = 'full',
): string {
  const modelInfo = MODEL_DISPLAY_NAMES[modelId];

  if (!modelInfo) {
    // Return original ID if no mapping found
    return modelId;
  }

  switch (format) {
    case 'short':
      return modelInfo.shortName;
    case 'id':
      return modelId;
    case 'full':
    default:
      return modelInfo.displayName;
  }
}

/**
 * Get model description
 * @param modelId - Raw model ID
 * @returns Model description or empty string if not found
 */
export function getModelDescription(modelId: string): string {
  return MODEL_DISPLAY_NAMES[modelId]?.description || '';
}

/**
 * Check if a model ID has a display name mapping
 * @param modelId - Raw model ID
 * @returns True if model has a display name mapping
 */
export function hasModelDisplayName(modelId: string): boolean {
  return modelId in MODEL_DISPLAY_NAMES;
}

/**
 * Get all available model IDs
 * @returns Array of all mapped model IDs
 */
export function getAllModelIds(): string[] {
  return Object.keys(MODEL_DISPLAY_NAMES);
}
