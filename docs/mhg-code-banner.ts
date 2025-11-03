/**
 * MHG CODE - Colored ASCII Art Banners
 * Brand Color: #006eb6 (RGB: 0, 110, 182)
 *
 * Usage:
 *   import { printLargeNoLogo, printMini } from './mhg-code-banner';
 *   printLargeNoLogo();
 */

// ANSI Color Codes
const colors = {
  mhgBlue: '\x1b[38;2;0;110;182m',    // Brand blue #006eb6
  white: '\x1b[97m',
  gray: '\x1b[90m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  bgBlue: '\x1b[48;2;0;110;182m',     // Blue background for logo
};

/**
 * Large banner with accurate stacked logo (MH on top, G. on bottom)
 */
export function printLargeWithLogo(): void {
  console.log('');
  console.log(`    ${colors.bgBlue}${colors.white}┌────┐${colors.reset}`);
  console.log(`    ${colors.bgBlue}${colors.white}│ MH │${colors.reset}     ${colors.mhgBlue}${colors.bold}███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗${colors.reset}`);
  console.log(`    ${colors.bgBlue}${colors.white}│ G. │${colors.reset}     ${colors.mhgBlue}${colors.bold}████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝${colors.reset}`);
  console.log(`    ${colors.bgBlue}${colors.white}└────┘${colors.reset}     ${colors.mhgBlue}${colors.bold}██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗  ${colors.reset}`);
  console.log(`               ${colors.mhgBlue}${colors.bold}██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝  ${colors.reset}`);
  console.log(`               ${colors.mhgBlue}${colors.bold}██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗${colors.reset}`);
  console.log(`               ${colors.mhgBlue}╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝${colors.reset}`);
  console.log(`                                     ${colors.gray}Professional AI Development Environment by A1xAI Team${colors.reset}`);
  console.log('');
}

/**
 * Large banner without logo (RECOMMENDED - Clean and Professional)
 */
export function printLargeNoLogo(): void {
  console.log('');
  console.log(`    ${colors.mhgBlue}${colors.bold}███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗${colors.reset}`);
  console.log(`    ${colors.mhgBlue}${colors.bold}████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝${colors.reset}`);
  console.log(`    ${colors.mhgBlue}${colors.bold}██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗  ${colors.reset}`);
  console.log(`    ${colors.mhgBlue}${colors.bold}██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝  ${colors.reset}`);
  console.log(`    ${colors.mhgBlue}${colors.bold}██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗${colors.reset}`);
  console.log(`    ${colors.mhgBlue}╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝${colors.reset}`);
  console.log(`                  ${colors.gray}Professional AI Development Environment by A1xAI Team${colors.reset}`);
  console.log('');
}

/**
 * Compact banner with logo
 */
export function printCompact(): void {
  console.log('');
  console.log(` ${colors.bgBlue}${colors.white}┌────┐${colors.reset} ${colors.mhgBlue}${colors.bold}███╗   ███╗██╗  ██╗ ██████╗ ${colors.reset}`);
  console.log(` ${colors.bgBlue}${colors.white}│ MH │${colors.reset} ${colors.mhgBlue}${colors.bold}████╗ ████║██║  ██║██╔════╝ ${colors.reset}`);
  console.log(` ${colors.bgBlue}${colors.white}│ G. │${colors.reset} ${colors.mhgBlue}${colors.bold}██╔████╔██║███████║██║  ███╗${colors.reset}`);
  console.log(` ${colors.bgBlue}${colors.white}└────┘${colors.reset} ${colors.mhgBlue}${colors.bold}██║╚██╔╝██║██╔══██║██║   ██║${colors.reset}`);
  console.log(`       ${colors.mhgBlue}${colors.bold}██║ ╚═╝ ██║██║  ██║╚██████╔╝${colors.reset}`);
  console.log(`       ${colors.mhgBlue}╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ${colors.reset}`);
  console.log(`    ${colors.mhgBlue}${colors.bold}██████╗ ██████╗ ██████╗ ███████╗${colors.reset}`);
  console.log(`   ${colors.mhgBlue}${colors.bold}██╔════╝██╔═══██╗██╔══██╗██╔════╝${colors.reset}`);
  console.log(`   ${colors.mhgBlue}${colors.bold}██║     ██║   ██║██║  ██║█████╗  ${colors.reset}`);
  console.log(`   ${colors.mhgBlue}${colors.bold}██║     ██║   ██║██║  ██║██╔══╝  ${colors.reset}`);
  console.log(`   ${colors.mhgBlue}${colors.bold}╚██████╗╚██████╔╝██████╔╝███████╗${colors.reset}`);
  console.log(`    ${colors.mhgBlue}╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝${colors.reset}`);
  console.log(`          ${colors.gray}by A1xAI Team${colors.reset}`);
  console.log('');
}

/**
 * Mini header - Claude Code style
 */
export function printMini(version: string = '1.0.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.bgBlue}${colors.white}┌────┐${colors.reset}   ${colors.mhgBlue}${colors.bold}MHG Code v${version}${colors.reset}`);
  console.log(`${colors.bgBlue}${colors.white}│ MH │${colors.reset}   ${colors.gray}Professional AI Development Environment${colors.reset}`);
  console.log(`${colors.bgBlue}${colors.white}│ G. │${colors.reset}   ${colors.gray}${currentPath}${colors.reset}`);
  console.log(`${colors.bgBlue}${colors.white}└────┘${colors.reset}   ${colors.gray}by A1xAI Team${colors.reset}`);
}

/**
 * Ultra simple text-only banner
 */
export function printSimple(version: string = '1.0', path?: string): void {
  const currentPath = path || process.cwd();
  console.log(`${colors.mhgBlue}${colors.bold}MHG CODE${colors.reset} ${colors.gray}v${version} | Professional AI Development${colors.reset}`);
  console.log(`${colors.gray}${currentPath} | by A1xAI Team${colors.reset}`);
}

/**
 * Get brand colors for external use
 */
export function getBrandColors() {
  return {
    hex: '#006eb6',
    rgb: { r: 0, g: 110, b: 182 },
    ansi: colors.mhgBlue,
    ansiBg: colors.bgBlue,
  };
}

// If run directly, show the default banner
if (require.main === module) {
  printLargeNoLogo();
}

// Default export
export default {
  printLargeWithLogo,
  printLargeNoLogo,
  printCompact,
  printMini,
  printSimple,
  getBrandColors,
  colors,
};
