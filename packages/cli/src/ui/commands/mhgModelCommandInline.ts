/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { SlashCommand, OpenDialogActionReturn } from './types.js';
import { CommandKind } from './types.js';

/**
 * WORKAROUND: Inline MHG Premium model selector
 * Bypasses broken dialog system - directly lists models in chat
 */
export const mhgModelCommandInline: SlashCommand = {
  name: 'MHG_Premium',
  description: 'Select Premium AI powered by AWS Bedrock (Fast Models)',
  kind: CommandKind.BUILT_IN,
  action: (_context, _args): OpenDialogActionReturn => {
    console.error('[MHG] Command executed - showing inline model list');

    // Show model list directly in chat
    const modelList = `
🚀 AWS Bedrock Premium Models - FAST & POWERFUL
================================================

⚡ FASTEST MODELS (Recommended):
1. Claude 3 Haiku        - anthropic.claude-3-haiku-20240307-v1:0 (3x faster, 21K tokens/sec)
2. Claude 3.5 Haiku      - anthropic.claude-3-5-haiku-20241022-v1:0 (Latest, ultra-fast)
3. Mistral 7B Instruct   - mistral.mistral-7b-instruct-v0:2 (Fast coding specialist)
4. Mistral Small         - mistral.mistral-small-2402-v1:0 (Efficient & fast)

🎯 BALANCED MODELS:
5. Claude 3 Sonnet       - anthropic.claude-3-sonnet-20240229-v1:0 (Best quality/speed)
6. Amazon Nova Lite      - amazon.nova-lite-v1:0 (Multimodal - text/image/video)
7. Amazon Nova Pro       - amazon.nova-pro-v1:0 (Advanced reasoning)

💪 POWERFUL MODELS:
8. Claude 3.5 Sonnet     - anthropic.claude-3-5-sonnet-20241022-v2:0 (Most capable)
9. Claude 3 Opus         - anthropic.claude-3-opus-20240229-v1:0 (Maximum intelligence)

TO SWITCH MODEL:
Use: export AWS_BEDROCK_MODEL="model-id-here"
Example: export AWS_BEDROCK_MODEL="anthropic.claude-3-haiku-20240307-v1:0"

Then restart HiveCode.

NOTE: Qwen models are NOT available on AWS Bedrock.
For Qwen, use /Ollama command (FREE local models including qwen2.5-coder).
`;

    // Print to console for user to see
    console.log(modelList);

    return {
      type: 'dialog',
      dialog: 'help', // Show help which just closes
    };
  },
};
