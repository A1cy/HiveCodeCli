/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Computes the window title for the MHG Code application.
 *
 * @param folderName - The name of the current folder/workspace (not used in default title)
 * @returns The computed window title, either from CLI_TITLE environment variable or "MHG Code"
 */
export function computeWindowTitle(folderName: string): string {
  const title = process.env['CLI_TITLE'] || 'MHG Code';

  // Remove control characters that could cause issues in terminal titles
  return title.replace(
    // eslint-disable-next-line no-control-regex
    /[\x00-\x1F\x7F]/g,
    '',
  );
}
