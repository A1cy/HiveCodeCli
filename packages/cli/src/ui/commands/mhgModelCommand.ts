/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type { OpenDialogActionReturn, SlashCommand } from './types.js';
import { CommandKind } from './types.js';

export const mhgModelCommand: SlashCommand = {
  name: 'MHG_Premium',
  description: 'Select Premium AI powered by AWS Bedrock',
  kind: CommandKind.BUILT_IN,
  action: (_context, _args): OpenDialogActionReturn => ({
    type: 'dialog',
    dialog: 'mhgModel',
  }),
};
