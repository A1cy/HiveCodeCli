/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Text } from 'ink';
import Spinner from 'ink-spinner';
import type React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { OllamaHttpClient } from '@google/gemini-cli-core';
import { RadioButtonSelect } from '../components/shared/RadioButtonSelect.js';
import { useKeypress } from '../hooks/useKeypress.js';
import { theme } from '../semantic-colors.js';

interface OllamaModelInfo {
  name: string;
  displayName: string;
  description: string;
  size: string;
  tier: 'lightweight' | 'midtier' | 'large';
}

const RECOMMENDED_MODELS: OllamaModelInfo[] = [
  // ===== LIGHTWEIGHT MODELS (< 2GB) - Best for slow PCs =====
  {
    name: 'llama3.2:1b',
    displayName: '⚡ Llama 3.2 1B (Fastest)',
    description: 'Smallest & fastest - Works on any PC, great for basic tasks',
    size: '1.3GB',
    tier: 'lightweight',
  },
  {
    name: 'phi3:mini',
    displayName: '⚡ Phi 3 Mini',
    description: 'Microsoft AI - Very efficient, good reasoning for its size',
    size: '2.3GB',
    tier: 'lightweight',
  },
  {
    name: 'gemma:2b',
    displayName: '⚡ Gemma 2B',
    description: 'Google AI - Fast and lightweight, good for chat',
    size: '1.7GB',
    tier: 'lightweight',
  },

  // ===== MID-TIER MODELS (2-5GB) - Balanced =====
  {
    name: 'qwen2.5:3b',
    displayName: '🎯 Qwen 2.5 3B (Recommended)',
    description: 'Balanced performance - Best overall for most users',
    size: '2.1GB',
    tier: 'midtier',
  },
  {
    name: 'llama3.2:3b',
    displayName: '🎯 Llama 3.2 3B',
    description: 'Meta AI - Great all-rounder, good for conversations',
    size: '2.0GB',
    tier: 'midtier',
  },
  {
    name: 'mistral:7b',
    displayName: '🎯 Mistral 7B',
    description: 'Popular & powerful - Excellent instruction following',
    size: '4.1GB',
    tier: 'midtier',
  },
  {
    name: 'phi3:medium',
    displayName: '🎯 Phi 3 Medium',
    description: 'Microsoft AI - Strong reasoning, good for complex tasks',
    size: '7.9GB',
    tier: 'midtier',
  },

  // ===== CODING SPECIALISTS (3-8GB) - Best for coding =====
  {
    name: 'qwen2.5-coder:7b',
    displayName: '💻 Qwen 2.5 Coder 7B',
    description: 'Top coding model - Excellent for code generation & debugging',
    size: '4.7GB',
    tier: 'large',
  },
  {
    name: 'deepseek-coder:6.7b',
    displayName: '💻 DeepSeek Coder 6.7B',
    description: 'Specialized coder - Great code understanding & completion',
    size: '3.8GB',
    tier: 'large',
  },
  {
    name: 'codellama:7b',
    displayName: '💻 CodeLlama 7B',
    description: 'Meta code model - Strong at code generation & debugging',
    size: '3.8GB',
    tier: 'large',
  },
  {
    name: 'starcoder2:7b',
    displayName: '💻 StarCoder2 7B',
    description: 'Code specialist - Trained on 600+ programming languages',
    size: '4.0GB',
    tier: 'large',
  },

  // ===== HIGH-QUALITY MODELS (8GB+) - Best quality, needs good PC =====
  {
    name: 'llama3.1:8b',
    displayName: '🚀 Llama 3.1 8B',
    description: 'Meta flagship - Excellent reasoning & long context',
    size: '4.7GB',
    tier: 'large',
  },
  {
    name: 'qwen2.5:14b',
    displayName: '🚀 Qwen 2.5 14B',
    description: 'Large model - Best quality, needs 16GB+ RAM',
    size: '9.0GB',
    tier: 'large',
  },
  {
    name: 'mixtral:8x7b',
    displayName: '🚀 Mixtral 8x7B (Expert)',
    description: 'Mixture of experts - Near GPT-4 quality, needs powerful PC',
    size: '26GB',
    tier: 'large',
  },

  // ===== SPECIALIZED MODELS =====
  {
    name: 'neural-chat:7b',
    displayName: '💬 Neural Chat 7B',
    description: 'Conversation specialist - Great for chat & dialogue',
    size: '4.1GB',
    tier: 'midtier',
  },
  {
    name: 'openchat:7b',
    displayName: '💬 OpenChat 7B',
    description: 'Chat optimized - Friendly & helpful responses',
    size: '4.1GB',
    tier: 'midtier',
  },
];

interface OllamaModelSelectorProps {
  onSelect: (modelName: string) => void;
  onCancel: () => void;
}

export function OllamaModelSelector({
  onSelect,
  onCancel,
}: OllamaModelSelectorProps): React.JSX.Element {
  const [installedModels, setInstalledModels] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ollamaClient = useMemo(() => new OllamaHttpClient(), []);

  // Check which models are already installed
  useEffect(() => {
    (async () => {
      try {
        const models = await ollamaClient.listModels();
        setInstalledModels(models);
        setIsChecking(false);
      } catch (_err) {
        setError('Failed to connect to Ollama. Make sure Ollama is running.');
        setIsChecking(false);
      }
    })();
  }, [ollamaClient]);

  const handleModelSelect = useCallback(
    async (modelName: string) => {
      setSelectedModel(modelName);
      setError(null);

      // Check if model is already installed
      const isInstalled = installedModels.some((m) => m.startsWith(modelName));

      if (isInstalled) {
        // Model already installed, proceed
        onSelect(modelName);
        return;
      }

      // Model not installed, need to download
      setIsDownloading(true);
      setDownloadProgress('Starting download...');

      try {
        await ollamaClient.pullModel(modelName, (progress) => {
          setDownloadProgress(progress);
        });

        setDownloadProgress('Download complete! Configuring...');

        // Wait a moment for UI update, then proceed
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Call onSelect and handle any errors
        try {
          await Promise.resolve(onSelect(modelName));
        } catch (selectErr) {
          console.error('Error in onSelect:', selectErr);
        }
      } catch (err) {
        setError(
          `Failed to download model: ${err instanceof Error ? err.message : 'Unknown error'}`,
        );
        setIsDownloading(false);
        setDownloadProgress('');
        setSelectedModel(null);
      }
    },
    [installedModels, onSelect, ollamaClient],
  );

  useKeypress(
    (key) => {
      if (key.name === 'escape' && !isDownloading) {
        onCancel();
      }
    },
    { isActive: true },
  );

  // Format items for RadioButtonSelect
  const items = RECOMMENDED_MODELS.map((model) => {
    const isInstalled = installedModels.some((m) => m.startsWith(model.name));
    const label = isInstalled
      ? `${model.displayName} ✓ Installed`
      : model.displayName;

    return {
      label,
      value: model.name,
      key: model.name,
    };
  });

  if (isChecking) {
    return (
      <Box
        borderStyle="round"
        borderColor={theme.border.default}
        flexDirection="column"
        padding={1}
      >
        <Text color={theme.text.primary}>
          <Spinner type="dots" /> Checking installed Ollama models...
        </Text>
      </Box>
    );
  }

  if (isDownloading && selectedModel) {
    const modelInfo = RECOMMENDED_MODELS.find((m) => m.name === selectedModel);
    return (
      <Box
        borderStyle="round"
        borderColor={theme.border.default}
        flexDirection="column"
        padding={1}
      >
        <Text bold color={theme.text.primary}>
          Downloading {modelInfo?.displayName}
        </Text>
        <Box marginTop={1}>
          <Text color={theme.text.secondary}>
            Size: {modelInfo?.size} - This may take a few minutes...
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color={theme.status.info}>
            <Spinner type="dots" /> {downloadProgress}
          </Text>
        </Box>
        <Box marginTop={1}>
          <Text color={theme.text.secondary}>
            Please wait, do not interrupt the download
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
        🐝 Select Ollama Model ({RECOMMENDED_MODELS.length} available)
      </Text>
      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          ⚡ Lightweight • 🎯 Balanced • 💻 Coding • 🚀 High-Quality • 💬 Chat
        </Text>
      </Box>
      <Box marginTop={1}>
        <Text color={theme.text.primary}>
          Choose based on your system (scroll with ↑↓):
        </Text>
      </Box>

      <Box marginTop={1}>
        <RadioButtonSelect
          items={items}
          initialIndex={0}
          onSelect={handleModelSelect}
          isFocused={!isDownloading}
          showScrollArrows={true}
          maxItemsToShow={8}
          onHighlight={(modelName) => {
            // Show model details when highlighted
            const model = RECOMMENDED_MODELS.find((m) => m.name === modelName);
            if (model && selectedModel !== modelName) {
              setSelectedModel(modelName);
            }
          }}
        />
      </Box>

      {selectedModel && !isDownloading && (
        <Box
          marginTop={1}
          borderStyle="single"
          borderColor={theme.border.default}
          padding={1}
          flexDirection="column"
        >
          {(() => {
            const model = RECOMMENDED_MODELS.find(
              (m) => m.name === selectedModel,
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
                <Box marginTop={1}>
                  <Text color={theme.text.secondary}>Size: {model.size}</Text>
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
          (↑↓ scroll • Enter select • Esc cancel • {installedModels.length}{' '}
          installed)
        </Text>
      </Box>

      {installedModels.length > 0 && (
        <Box marginTop={1}>
          <Text color={theme.status.success}>
            ✓ Installed models ready to use instantly
          </Text>
        </Box>
      )}
    </Box>
  );
}
