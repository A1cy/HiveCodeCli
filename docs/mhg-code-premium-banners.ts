/**
 * MHG CODE - Premium Modern Banners
 * Inspired by Claude Code, Gemini, Grok, and Codex
 * Brand Color: #006eb6 (RGB: 0, 110, 182)
 *
 * Usage:
 *   import { concept1Full, smartBanner, showAllConcepts } from './mhg-code-premium-banners';
 *   concept1Full();
 */

// ============================================================================
// ANSI Color Codes
// ============================================================================
const colors = {
  mhgBlue: '\x1b[38;2;0;110;182m',
  cyan: '\x1b[96m',
  white: '\x1b[97m',
  gray: '\x1b[90m',
  dim: '\x1b[2m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

// ============================================================================
// CONCEPT 1: THE MINIMALIST EXECUTIVE (RECOMMENDED)
// Modern, professional, high information density
// ============================================================================

export function concept1Full(version = '1.0', path?: string, provider = 'AWS Bedrock', model = 'Claude Sonnet 4.5'): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}◆ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`  ${colors.gray}Professional AI Development by A1xAI Team${colors.reset}`);
  console.log(`  ${colors.dim}${currentPath} ${colors.mhgBlue}│${colors.reset} ${colors.cyan}${provider}${colors.reset} ${colors.mhgBlue}│${colors.reset} ${colors.dim}${model}${colors.reset}`);
}

export function concept1Compact(version = '1.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}◆ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset} ${colors.gray}│${colors.reset} ${colors.gray}Professional AI Development${colors.reset}`);
  console.log(`  ${colors.dim}${currentPath}${colors.reset}`);
}

export function concept1Mini(version = '1.0', path?: string): void {
  const currentPath = path ? path.split('/').pop() : process.cwd().split('/').pop();
  console.log(`${colors.mhgBlue}${colors.bold}◆ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset} ${colors.gray}│${colors.reset} ${colors.dim}${currentPath}${colors.reset}`);
}

export function concept1Tiny(version = '1.0'): void {
  console.log(`${colors.mhgBlue}◆${colors.reset} ${colors.bold}MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
}

// ============================================================================
// CONCEPT 2: THE MODERN BRACKET
// Code-centric, developer-focused aesthetic
// ============================================================================

export function concept2Full(version = '1.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}[ MHG CODE ]${colors.reset}`);
  console.log(`  ${colors.gray}v${version} ${colors.mhgBlue}│${colors.reset} Professional AI Development by A1xAI Team${colors.reset}`);
  console.log(`  ${colors.dim}${currentPath} ${colors.mhgBlue}│${colors.reset} ${colors.cyan}Multi-Provider Intelligence${colors.reset}`);
}

export function concept2Compact(version = '1.0', path?: string): void {
  const currentPath = path ? path.split('/').pop() : process.cwd().split('/').pop();
  console.log(`${colors.mhgBlue}${colors.bold}[ MHG CODE ]${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`  ${colors.gray}Professional AI Development${colors.reset} ${colors.mhgBlue}│${colors.reset} ${colors.dim}${currentPath}${colors.reset}`);
}

export function concept2Mini(version = '1.0'): void {
  console.log(`${colors.mhgBlue}${colors.bold}[ MHG CODE ]${colors.reset} ${colors.dim}v${version}${colors.reset}`);
}

export function concept2Tiny(): void {
  console.log(`${colors.mhgBlue}[${colors.reset} ${colors.bold}MHG${colors.reset} ${colors.mhgBlue}]${colors.reset}`);
}

// ============================================================================
// CONCEPT 3: THE GRADIENT BLOCK
// Visual impact, premium positioning
// ============================================================================

export function concept3Full(version = '1.0.0'): void {
  console.log(`${colors.mhgBlue}${colors.bold}▰▰▰ MHG CODE${colors.reset}`);
  console.log(`    ${colors.gray}Professional AI Development by A1xAI Team${colors.reset}`);
  console.log(`    ${colors.dim}Version ${version} ${colors.mhgBlue}│${colors.reset} Multi-Provider AI Intelligence${colors.reset}`);
}

export function concept3Compact(version = '1.0', path?: string): void {
  const currentPath = path ? path.split('/').pop() : process.cwd().split('/').pop();
  console.log(`${colors.mhgBlue}${colors.bold}▰▰▰ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`    ${colors.gray}Professional AI Development ${colors.mhgBlue}│${colors.reset} ${colors.dim}${currentPath}${colors.reset}`);
}

export function concept3Mini(version = '1.0'): void {
  console.log(`${colors.mhgBlue}${colors.bold}▰▰▰ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
}

export function concept3Tiny(): void {
  console.log(`${colors.mhgBlue}▰${colors.reset} ${colors.bold}MHG CODE${colors.reset}`);
}

// ============================================================================
// CONCEPT 4: THE ICON GRID
// Information-rich, tech-forward
// ============================================================================

export function concept4Full(version = '1.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}● MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`  ${colors.mhgBlue}⬢${colors.reset} ${colors.gray}Professional Development${colors.reset} ${colors.mhgBlue}│${colors.reset} ${colors.mhgBlue}◆${colors.reset} ${colors.gray}AI-Powered${colors.reset} ${colors.mhgBlue}│${colors.reset} ${colors.mhgBlue}▰${colors.reset} ${colors.gray}Multi-Provider${colors.reset}`);
  console.log(`  ${colors.dim}${currentPath} ${colors.mhgBlue}│${colors.reset} ${colors.cyan}by A1xAI Team${colors.reset}`);
}

export function concept4Compact(version = '1.0'): void {
  console.log(`${colors.mhgBlue}${colors.bold}● MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`  ${colors.mhgBlue}⬢${colors.reset} ${colors.gray}Professional${colors.reset} ${colors.mhgBlue}◆${colors.reset} ${colors.gray}AI-Powered${colors.reset} ${colors.mhgBlue}▰${colors.reset} ${colors.gray}Multi-Provider${colors.reset}`);
}

export function concept4Mini(version = '1.0'): void {
  console.log(`${colors.mhgBlue}${colors.bold}● MHG CODE${colors.reset} ${colors.mhgBlue}⬢◆▰${colors.reset} ${colors.dim}v${version}${colors.reset}`);
}

export function concept4Tiny(): void {
  console.log(`${colors.mhgBlue}●${colors.reset} ${colors.bold}MHG CODE${colors.reset}`);
}

// ============================================================================
// CONCEPT 5: THE FRAMED ELITE
// Elegant, premium presentation
// ============================================================================

export function concept5Full(version = '1.0'): void {
  console.log(`${colors.mhgBlue}┌─────────────────────────────────────────────────────────────┐${colors.reset}`);
  console.log(`${colors.mhgBlue}│${colors.reset} ${colors.bold}MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}                                            ${colors.mhgBlue}│${colors.reset}`);
  console.log(`${colors.mhgBlue}│${colors.reset} ${colors.gray}Professional AI Development by A1xAI Team${colors.reset}               ${colors.mhgBlue}│${colors.reset}`);
  console.log(`${colors.mhgBlue}└─────────────────────────────────────────────────────────────┘${colors.reset}`);
}

export function concept5Compact(version = '1.0'): void {
  console.log(`${colors.mhgBlue}┌──────────────────────────────────────────┐${colors.reset}`);
  console.log(`${colors.mhgBlue}│${colors.reset} ${colors.bold}MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset} ${colors.mhgBlue}│${colors.reset} ${colors.gray}Professional AI Dev${colors.reset} ${colors.mhgBlue}│${colors.reset}`);
  console.log(`${colors.mhgBlue}└──────────────────────────────────────────┘${colors.reset}`);
}

export function concept5Mini(version = '1.0'): void {
  console.log(`${colors.mhgBlue}┌────────────────┐${colors.reset}`);
  console.log(`${colors.mhgBlue}│${colors.reset} ${colors.bold}MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset} ${colors.mhgBlue}│${colors.reset}`);
  console.log(`${colors.mhgBlue}└────────────────┘${colors.reset}`);
}

export function concept5Tiny(): void {
  console.log(`${colors.mhgBlue}├${colors.reset} ${colors.bold}MHG CODE${colors.reset} ${colors.mhgBlue}┤${colors.reset}`);
}

// ============================================================================
// SPECIAL MODES
// ============================================================================

export function quietMode(): void {
  console.log(`${colors.mhgBlue}◆${colors.reset} ${colors.bold}MHG${colors.reset}`);
}

export function verboseMode(
  version = '1.0.0',
  path?: string,
  provider = 'AWS Bedrock',
  model = 'Claude Sonnet 4.5',
  status = 'Active'
): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}◆ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset}`);
  console.log(`  ${colors.gray}Professional AI Development Environment${colors.reset}`);
  console.log(`  ${colors.gray}by A1xAI Team${colors.reset}`);
  console.log('');
  console.log(`  ${colors.dim}Location:${colors.reset}  ${currentPath}`);
  console.log(`  ${colors.dim}Provider:${colors.reset}  ${colors.cyan}${provider}${colors.reset}`);
  console.log(`  ${colors.dim}Model:${colors.reset}     ${colors.dim}${model}${colors.reset}`);
  console.log(`  ${colors.dim}Status:${colors.reset}    ${colors.mhgBlue}●${colors.reset} ${colors.gray}${status}${colors.reset}`);
}

export function funMode(version = '1.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}◆ MHG CODE${colors.reset} ${colors.dim}v${version}${colors.reset} 🚀`);
  console.log(`  ${colors.gray}Professional AI Development by A1xAI Team 🤖✨${colors.reset}`);
  console.log(`  ${colors.dim}${currentPath}${colors.reset} 💼`);
}

// ============================================================================
// SMART AUTO-SELECT (Detects terminal width)
// ============================================================================

export function smartBanner(version = '1.0', path?: string): void {
  const width = process.stdout.columns || 80;

  if (width >= 100) {
    concept1Full(version, path);
  } else if (width >= 70) {
    concept1Compact(version, path);
  } else if (width >= 40) {
    concept1Mini(version, path);
  } else {
    concept1Tiny(version);
  }
}

// ============================================================================
// COMPARISON DISPLAY
// ============================================================================

export function showAllConcepts(version = '1.0'): void {
  console.log(`\n${colors.bold}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bold}           MHG CODE - Premium Banner Showcase${colors.reset}`);
  console.log(`${colors.bold}═══════════════════════════════════════════════════════════════${colors.reset}\n`);

  console.log(`${colors.cyan}${colors.bold}Concept 1: The Minimalist Executive${colors.reset} ${colors.dim}(RECOMMENDED)${colors.reset}`);
  console.log(`${colors.dim}Modern, professional, high information density${colors.reset}`);
  concept1Full(version);
  console.log('');

  console.log(`${colors.cyan}${colors.bold}Concept 2: The Modern Bracket${colors.reset}`);
  console.log(`${colors.dim}Code-centric, developer-focused aesthetic${colors.reset}`);
  concept2Full(version);
  console.log('');

  console.log(`${colors.cyan}${colors.bold}Concept 3: The Gradient Block${colors.reset}`);
  console.log(`${colors.dim}Visual impact, premium positioning${colors.reset}`);
  concept3Full(version);
  console.log('');

  console.log(`${colors.cyan}${colors.bold}Concept 4: The Icon Grid${colors.reset}`);
  console.log(`${colors.dim}Information-rich, tech-forward${colors.reset}`);
  concept4Full(version);
  console.log('');

  console.log(`${colors.cyan}${colors.bold}Concept 5: The Framed Elite${colors.reset}`);
  console.log(`${colors.dim}Elegant, premium presentation${colors.reset}`);
  concept5Full(version);
  console.log('');

  console.log(`${colors.bold}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
}

// ============================================================================
// CONFIGURATION OBJECT
// ============================================================================

export interface BannerConfig {
  version?: string;
  path?: string;
  provider?: string;
  model?: string;
  status?: string;
}

export class MHGCodeBanner {
  private config: BannerConfig;

  constructor(config: BannerConfig = {}) {
    this.config = {
      version: '1.0',
      path: process.cwd(),
      provider: 'AWS Bedrock',
      model: 'Claude Sonnet 4.5',
      status: 'Active',
      ...config,
    };
  }

  show(concept: string = 'concept1', variant: string = 'full'): void {
    const funcName = `${concept}${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
    const func = (this as any)[funcName];
    if (typeof func === 'function') {
      func.call(this);
    } else {
      console.error(`Banner function ${funcName} not found`);
    }
  }

  concept1Full = () => concept1Full(this.config.version, this.config.path, this.config.provider, this.config.model);
  concept1Compact = () => concept1Compact(this.config.version, this.config.path);
  concept1Mini = () => concept1Mini(this.config.version, this.config.path);
  concept1Tiny = () => concept1Tiny(this.config.version);

  concept2Full = () => concept2Full(this.config.version, this.config.path);
  concept2Compact = () => concept2Compact(this.config.version, this.config.path);
  concept2Mini = () => concept2Mini(this.config.version);
  concept2Tiny = () => concept2Tiny();

  concept3Full = () => concept3Full(this.config.version);
  concept3Compact = () => concept3Compact(this.config.version, this.config.path);
  concept3Mini = () => concept3Mini(this.config.version);
  concept3Tiny = () => concept3Tiny();

  concept4Full = () => concept4Full(this.config.version, this.config.path);
  concept4Compact = () => concept4Compact(this.config.version);
  concept4Mini = () => concept4Mini(this.config.version);
  concept4Tiny = () => concept4Tiny();

  concept5Full = () => concept5Full(this.config.version);
  concept5Compact = () => concept5Compact(this.config.version);
  concept5Mini = () => concept5Mini(this.config.version);
  concept5Tiny = () => concept5Tiny();

  verboseMode = () => verboseMode(this.config.version, this.config.path, this.config.provider, this.config.model, this.config.status);
  quietMode = () => quietMode();
  funMode = () => funMode(this.config.version, this.config.path);
  smartBanner = () => smartBanner(this.config.version, this.config.path);
}

// ============================================================================
// Get brand colors for external use
// ============================================================================

export function getBrandColors() {
  return {
    hex: '#006eb6',
    rgb: { r: 0, g: 110, b: 182 },
    ansi: colors.mhgBlue,
  };
}

// ============================================================================
// If run directly, show the default banner
// ============================================================================

if (require.main === module) {
  concept1Full();
}

// ============================================================================
// Default export
// ============================================================================

export default {
  // Concept 1
  concept1Full,
  concept1Compact,
  concept1Mini,
  concept1Tiny,

  // Concept 2
  concept2Full,
  concept2Compact,
  concept2Mini,
  concept2Tiny,

  // Concept 3
  concept3Full,
  concept3Compact,
  concept3Mini,
  concept3Tiny,

  // Concept 4
  concept4Full,
  concept4Compact,
  concept4Mini,
  concept4Tiny,

  // Concept 5
  concept5Full,
  concept5Compact,
  concept5Mini,
  concept5Tiny,

  // Special modes
  quietMode,
  verboseMode,
  funMode,

  // Smart features
  smartBanner,
  showAllConcepts,

  // Utilities
  getBrandColors,
  MHGCodeBanner,
  colors,
};
