/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Text } from 'ink';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { RadioButtonSelect } from '../components/shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';
import { theme } from '../semantic-colors.js';

interface BedrockModelInfo {
  modelId: string;
  displayName: string;
  description: string;
  provider: string;
  capabilities: string;
  tier: 'fast' | 'balanced' | 'creative' | 'multimodal';
}

const BEDROCK_MODELS: BedrockModelInfo[] = [
  // ===== FASTEST MODELS (Claude 3 Haiku - 21K tokens/sec) =====
  {
    modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
    displayName: '⚡ Claude 3 Haiku (FASTEST - 21K tokens/sec)',
    description: '3x faster than Nova Micro - Ultra-low latency, excellent quality',
    provider: 'Anthropic',
    capabilities: 'Text + Image input',
    tier: 'fast',
  },
  {
    modelId: 'anthropic.claude-3-5-haiku-20241022-v1:0',
    displayName: '⚡ Claude 3.5 Haiku (Latest)',
    description: 'Latest Claude - Ultra-fast with enhanced capabilities',
    provider: 'Anthropic',
    capabilities: 'Text + Image input',
    tier: 'fast',
  },
  {
    modelId: 'mistral.mistral-7b-instruct-v0:2',
    displayName: '⚡ Mistral 7B Instruct',
    description: 'Fast coding specialist - Optimized for development tasks',
    provider: 'Mistral AI',
    capabilities: 'Text only',
    tier: 'fast',
  },
  {
    modelId: 'mistral.mistral-small-2402-v1:0',
    displayName: '⚡ Mistral Small',
    description: 'Efficient & fast - Good balance for general tasks',
    provider: 'Mistral AI',
    capabilities: 'Text only',
    tier: 'fast',
  },
  {
    modelId: 'amazon.nova-micro-v1:0',
    displayName: '⚡ Amazon Nova Micro',
    description: 'Lightweight - Text-only, quick responses',
    provider: 'Amazon',
    capabilities: 'Text only',
    tier: 'fast',
  },
  {
    modelId: 'meta.llama3-2-1b-instruct-v1:0',
    displayName: '⚡ Meta Llama 3.2 1B',
    description: 'Smallest Llama - Very fast, low-latency responses',
    provider: 'Meta',
    capabilities: 'Text only',
    tier: 'fast',
  },
  {
    modelId: 'meta.llama3-2-3b-instruct-v1:0',
    displayName: '⚡ Meta Llama 3.2 3B',
    description: 'Small & efficient - Good balance of speed and quality',
    provider: 'Meta',
    capabilities: 'Text only',
    tier: 'fast',
  },

  // ===== BALANCED MODELS (General Purpose) =====
  {
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    displayName: '🎯 Claude 3 Sonnet (Recommended)',
    description: 'Best quality/speed balance - Superior reasoning & coding',
    provider: 'Anthropic',
    capabilities: 'Text + Image input',
    tier: 'balanced',
  },
  {
    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0',
    displayName: '🎯 Claude 3.5 Sonnet v2',
    description: 'Latest Sonnet - Enhanced capabilities, best for complex tasks',
    provider: 'Anthropic',
    capabilities: 'Text + Image input',
    tier: 'balanced',
  },
  {
    modelId: 'amazon.nova-lite-v1:0',
    displayName: '🎯 Amazon Nova Lite',
    description: 'Fast multimodal - Handles text, images & video input',
    provider: 'Amazon',
    capabilities: 'Text + Image + Video input',
    tier: 'balanced',
  },
  {
    modelId: 'amazon.nova-pro-v1:0',
    displayName: '🎯 Amazon Nova Pro',
    description: 'Powerful multimodal - Advanced reasoning with media',
    provider: 'Amazon',
    capabilities: 'Text + Image + Video input',
    tier: 'balanced',
  },
  {
    modelId: 'meta.llama3-8b-instruct-v1:0',
    displayName: '🎯 Meta Llama 3 8B',
    description: 'Balanced power - Meta flagship 8B model',
    provider: 'Meta',
    capabilities: 'Text only',
    tier: 'balanced',
  },
  {
    modelId: 'meta.llama3-1-8b-instruct-v1:0',
    displayName: '🎯 Meta Llama 3.1 8B',
    description: 'Latest 8B - Enhanced capabilities over Llama 3',
    provider: 'Meta',
    capabilities: 'Text only',
    tier: 'balanced',
  },
  {
    modelId: 'openai.gpt-oss-120b-1:0',
    displayName: '🎯 OpenAI GPT OSS 120B',
    description: '120B parameters - Powerful open-source GPT model',
    provider: 'OpenAI',
    capabilities: 'Text only',
    tier: 'balanced',
  },

  // ===== POWERFUL MODELS (Maximum Capability) =====
  {
    modelId: 'anthropic.claude-3-opus-20240229-v1:0',
    displayName: '💪 Claude 3 Opus',
    description: 'Maximum intelligence - Best for complex reasoning & analysis',
    provider: 'Anthropic',
    capabilities: 'Text + Image input',
    tier: 'balanced',
  },

  // ===== MULTIMODAL MODELS =====
  {
    modelId: 'meta.llama3-2-11b-instruct-v1:0',
    displayName: '🖼️ Meta Llama 3.2 11B Vision',
    description: 'Vision model - Understands text and images together',
    provider: 'Meta',
    capabilities: 'Text + Image input',
    tier: 'multimodal',
  },

  // ===== CREATIVE MODELS (Generation) =====
  {
    modelId: 'amazon.nova-canvas-v1:0',
    displayName: '🎨 Amazon Nova Canvas',
    description: 'Image generation - Create images from text descriptions',
    provider: 'Amazon',
    capabilities: 'Image generation',
    tier: 'creative',
  },
  {
    modelId: 'amazon.nova-reel-v1:0',
    displayName: '🎨 Amazon Nova Reel',
    description: 'Video generation - Generate short videos from prompts',
    provider: 'Amazon',
    capabilities: 'Video generation',
    tier: 'creative',
  },
];

interface BedrockModelSelectorProps {
  onSelect: (modelId: string) => void;
  onCancel: () => void;
}

export function BedrockModelSelector({
  onSelect,
  onCancel,
}: BedrockModelSelectorProps): React.JSX.Element {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(
    'anthropic.claude-3-haiku-20240307-v1:0', // Default to fastest model
  );
  const [error, setError] = useState<string | null>(null);
  const [showRestartMessage, setShowRestartMessage] = useState(false);
  const [savedModelName, setSavedModelName] = useState<string>('');

  const handleModelSelect = useCallback(
    async (modelId: string) => {
      setSelectedModelId(modelId);
      setError(null);

      try {
        // Call onSelect immediately (no download needed for Bedrock)
        await Promise.resolve(onSelect(modelId));

        // Show restart message after successful save
        const model = BEDROCK_MODELS.find((m) => m.modelId === modelId);
        if (model) {
          setSavedModelName(model.displayName);
          setShowRestartMessage(true);
        }
      } catch (selectErr) {
        console.error('Error in onSelect:', selectErr);
        setError('Failed to save model settings');
      }
    },
    [onSelect],
  );

  useKeypress(
    (key) => {
      if (key.name === 'escape') {
        onCancel();
      }
    },
    { isActive: true },
  );

  // Format items for RadioButtonSelect
  const items = useMemo(
    () =>
      BEDROCK_MODELS.map((model) => ({
        label: model.displayName,
        value: model.modelId,
        key: model.modelId,
      })),
    [],
  );

  // Show restart message after model saved
  if (showRestartMessage) {
    return (
      <Box
        borderStyle="round"
        borderColor={theme.border.default}
        flexDirection="column"
        padding={1}
      >
        <Text bold color={theme.status.success}>
          ✓ Model saved successfully!
        </Text>
        <Box marginTop={1}>
          <Text color={theme.text.accent}>
            {savedModelName} is now configured
          </Text>
        </Box>
        <Box marginTop={1} paddingX={1}>
          <Text bold color={theme.status.warning}>
            ⚠️ RESTART REQUIRED
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color={theme.text.secondary}>
            Please restart HiveCode for the AWS Bedrock model to activate:
          </Text>
        </Box>
        <Box marginTop={1} paddingLeft={2}>
          <Text color={theme.text.secondary}>
            1. Type{' '}
            <Text bold color={theme.text.accent}>
              /quit
            </Text>{' '}
            or press{' '}
            <Text bold color={theme.text.accent}>
              Ctrl+C
            </Text>
          </Text>
        </Box>
        <Box paddingLeft={2}>
          <Text color={theme.text.secondary}>
            2. Run{' '}
            <Text bold color={theme.text.accent}>
              hivecode
            </Text>{' '}
            again
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color={theme.text.secondary}>
            After restart, AWS Bedrock will be active with your selected model
          </Text>
        </Box>
        <Box marginTop={1} borderStyle="round" borderColor="yellow" paddingX={1}>
          <Text color={theme.status.warning}>
            ℹ️ Note: Some models require access approval in AWS Console
          </Text>
        </Box>
        <Box paddingLeft={2} marginTop={1}>
          <Text color={theme.text.secondary}>
            If model fails: AWS Console → Bedrock → Model Access → Request
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color={theme.text.secondary}>
            Press Esc to close this dialog
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      borderStyle="round"
      borderColor={theme.border.default}
      flexDirection="column"
      padding={1}
      width="100%"
    >
      <Text bold color={theme.text.primary}>
        🌟 MHG AI - AWS Bedrock Model Selector ({BEDROCK_MODELS.length}{' '}
        available)
      </Text>
      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          ⚡ Fast • 🎯 Balanced • 🖼️ Multimodal • 🎨 Creative
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color={theme.text.primary}>
          Select a premium AI model (scroll with ↑↓):
        </Text>
      </Box>

      <Box marginTop={1}>
        <RadioButtonSelect
          items={items}
          initialIndex={3} // Default to Nova Lite (recommended)
          onSelect={handleModelSelect}
          isFocused={true}
          showScrollArrows={true}
          maxItemsToShow={8}
          onHighlight={(modelId) => {
            // Show model details when highlighted
            const model = BEDROCK_MODELS.find((m) => m.modelId === modelId);
            if (model && selectedModelId !== modelId) {
              setSelectedModelId(modelId);
            }
          }}
        />
      </Box>

      {selectedModelId && (
        <Box
          marginTop={1}
          borderStyle="single"
          borderColor={theme.border.default}
          padding={1}
          flexDirection="column"
        >
          {(() => {
            const model = BEDROCK_MODELS.find(
              (m) => m.modelId === selectedModelId,
            );
            if (!model) return null;

            return (
              <>
                <Text bold color={theme.text.accent}>
                  {model.displayName}
                </Text>
                <Box marginTop={1}>
                  <Text color={theme.text.secondary}>{model.description}</Text>
                </Box>
                <Box marginTop={1} flexDirection="row" gap={2}>
                  <Text color={theme.text.secondary}>
                    Provider: {model.provider}
                  </Text>
                  <Text color={theme.text.secondary}>│</Text>
                  <Text color={theme.text.secondary}>{model.capabilities}</Text>
                </Box>
              </>
            );
          })()}
        </Box>
      )}

      {error && (
        <Box marginTop={1}>
          <Text color={theme.status.error}>{error}</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          (↑↓ scroll • Enter select • Esc cancel)
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text color={theme.status.success}>
          ✓ All models available instantly - No download required
        </Text>
      </Box>

      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          💡 Tip: Model switches take effect immediately, no restart needed
        </Text>
      </Box>
    </Box>
  );
}
