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
  // ===== FAST MODELS (Text-only, Lightweight) =====
  {
    modelId: 'amazon.nova-micro-v1:0',
    displayName: '⚡ Amazon Nova Micro',
    description: 'Fastest & smallest - Text-only, ideal for quick responses',
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
    modelId: 'amazon.nova-lite-v1:0',
    displayName: '🎯 Amazon Nova Lite (Recommended)',
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
    'amazon.nova-lite-v1:0',
  );
  const [error, setError] = useState<string | null>(null);

  const handleModelSelect = useCallback(
    async (modelId: string) => {
      setSelectedModelId(modelId);
      setError(null);

      try {
        // Call onSelect immediately (no download needed for Bedrock)
        await Promise.resolve(onSelect(modelId));
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
