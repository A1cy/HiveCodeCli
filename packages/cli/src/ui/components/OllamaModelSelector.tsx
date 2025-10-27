/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useState, useCallback } from 'react';
import { Box, Text } from 'ink';
import { theme } from '../semantic-colors.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';

export interface OllamaModel {
  name: string;
  displayName: string;
  size: string;
  description: string;
  recommended?: boolean;
}

export const OLLAMA_MODELS: OllamaModel[] = [
  {
    name: 'llama3.2:1b',
    displayName: 'llama3.2:1b (Lightweight)',
    size: '1.3GB',
    description: 'Fast, low resource usage - Great for basic tasks',
    recommended: true,
  },
  {
    name: 'qwen3:4b',
    displayName: 'qwen3:4b (Mid-tier)',
    size: '2.5GB',
    description: 'Balanced performance and quality',
  },
  {
    name: 'qwen2.5-coder',
    displayName: 'qwen2.5-coder (Large)',
    size: '4.7GB',
    description: 'Best coding quality - Requires good PC',
  },
];

interface OllamaModelSelectorProps {
  onSelect: (modelName: string) => Promise<void>;
  onCancel?: () => void;
  checkModelAvailable?: (modelName: string) => Promise<boolean>;
  pullModel?: (
    modelName: string,
    onProgress: (status: string) => void,
  ) => Promise<void>;
}

export function OllamaModelSelector({
  onSelect,
  onCancel,
  checkModelAvailable,
  pullModel,
}: OllamaModelSelectorProps): React.JSX.Element {
  const [isSelecting, setIsSelecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [pullProgress, setPullProgress] = useState<string | null>(null);

  const items = OLLAMA_MODELS.map((model) => ({
    label: model.displayName,
    value: model.name,
    key: model.name,
  }));

  const handleSelect = useCallback(
    async (modelName: string) => {
      if (isSelecting) return;
      setIsSelecting(true);
      setError(null);
      setPullProgress(null);

      try {
        // Check if model is available
        if (checkModelAvailable) {
          const isAvailable = await checkModelAvailable(modelName);

          if (!isAvailable && pullModel) {
            // Model not installed, need to pull it
            setPullProgress(`Downloading ${modelName}...`);
            await pullModel(modelName, (status: string) => {
              setPullProgress(status);
            });
            setPullProgress('Download complete!');
          }
        }

        await onSelect(modelName);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to select model');
        setIsSelecting(false);
        setPullProgress(null);
      }
    },
    [onSelect, isSelecting, checkModelAvailable, pullModel],
  );

  useKeypress(
    (key) => {
      if (key.name === 'escape' && onCancel) {
        onCancel();
      }
    },
    { isActive: !isSelecting },
  );

  const selectedModel = OLLAMA_MODELS[selectedIndex];

  return (
    <Box
      borderStyle="round"
      borderColor={theme.border.default}
      flexDirection="column"
      padding={1}
      width="100%"
    >
      <Text bold color={theme.text.primary}>
        🐝 Select Ollama Model
      </Text>
      <Box marginTop={1}>
        <Text color={theme.text.primary}>
          Choose a model based on your system capabilities:
        </Text>
      </Box>
      <Box marginTop={1}>
        <RadioButtonSelect
          items={items}
          initialIndex={0}
          onSelect={handleSelect}
          onHighlight={(value) => {
            const index = OLLAMA_MODELS.findIndex((m) => m.name === value);
            if (index !== -1) setSelectedIndex(index);
          }}
          isFocused={!isSelecting}
        />
      </Box>
      {selectedModel && (
        <Box
          marginTop={1}
          borderStyle="single"
          borderColor={theme.border.subtle}
          padding={1}
          flexDirection="column"
        >
          <Text color={theme.text.accent} bold>
            {selectedModel.displayName}
          </Text>
          <Box marginTop={1}>
            <Text color={theme.text.secondary}>Size: {selectedModel.size}</Text>
          </Box>
          <Box marginTop={1}>
            <Text color={theme.text.primary}>{selectedModel.description}</Text>
          </Box>
          {selectedModel.recommended && (
            <Box marginTop={1}>
              <Text color={theme.status.success}>
                ✓ Recommended for most users
              </Text>
            </Box>
          )}
        </Box>
      )}
      {error && (
        <Box marginTop={1}>
          <Text color={theme.status.error}>{error}</Text>
        </Box>
      )}
      {pullProgress && (
        <Box
          marginTop={1}
          borderStyle="single"
          borderColor={theme.status.info}
          padding={1}
        >
          <Text color={theme.status.info}>📥 {pullProgress}</Text>
        </Box>
      )}
      {isSelecting && !pullProgress && (
        <Box marginTop={1}>
          <Text color={theme.status.info}>
            Checking if model is installed...
          </Text>
        </Box>
      )}
      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          {isSelecting
            ? '(Downloading... Please wait)'
            : '(Use ↑/↓ to navigate, Enter to select, Esc to cancel)'}
        </Text>
      </Box>
    </Box>
  );
}
