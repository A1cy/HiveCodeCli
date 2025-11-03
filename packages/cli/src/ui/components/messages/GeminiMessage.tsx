/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { Text, Box } from 'ink';
import { MarkdownDisplay } from '../../utils/MarkdownDisplay.js';
import { theme } from '../../semantic-colors.js';
import { SCREEN_READER_MODEL_PREFIX } from '../../textConstants.js';
import { useUIState } from '../../contexts/UIStateContext.js';

interface GeminiMessageProps {
  text: string;
  isPending: boolean;
  availableTerminalHeight?: number;
  terminalWidth: number;
}

// Detect Arabic characters (Unicode range U+0600 to U+06FF)
const hasArabic = (text: string): boolean => /[\u0600-\u06FF]/.test(text);

// Wrap Arabic text with RTL markers for proper right-to-left display
const wrapRTL = (text: string): string => {
  if (hasArabic(text)) {
    // U+202B = Right-to-Left Embedding
    // U+202C = Pop Directional Formatting
    return '\u202B' + text + '\u202C';
  }
  return text;
};

export const GeminiMessage: React.FC<GeminiMessageProps> = ({
  text,
  isPending,
  availableTerminalHeight,
  terminalWidth,
}) => {
  const { renderMarkdown } = useUIState();
  const prefix = '✦ ';
  const prefixWidth = prefix.length;

  return (
    <Box flexDirection="row">
      <Box width={prefixWidth}>
        <Text color={theme.text.accent} aria-label={SCREEN_READER_MODEL_PREFIX}>
          {prefix}
        </Text>
      </Box>
      <Box flexGrow={1} flexDirection="column">
        <MarkdownDisplay
          text={wrapRTL(text)}
          isPending={isPending}
          availableTerminalHeight={availableTerminalHeight}
          terminalWidth={terminalWidth}
          renderMarkdown={renderMarkdown}
        />
      </Box>
    </Box>
  );
};
