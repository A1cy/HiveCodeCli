#!/bin/bash

# MHG CODE - Colored ASCII Art Banners
# Brand Color: #006eb6 (RGB: 0, 110, 182)
# Usage: source this file or run ./mhg-code-banner.sh

# ANSI Color Codes
MHG_BLUE='\033[38;2;0;110;182m'    # Brand blue #006eb6
WHITE='\033[97m'
GRAY='\033[90m'
RESET='\033[0m'
BOLD='\033[1m'

# Background colors
BG_BLUE='\033[48;2;0;110;182m'     # Blue background for logo

# ============================================================================
# LARGE BANNER - With Accurate Stacked Logo
# ============================================================================
print_large_with_logo() {
    echo -e ""
    echo -e "    ${BG_BLUE}${WHITE}┌────┐${RESET}"
    echo -e "    ${BG_BLUE}${WHITE}│ MH │${RESET}     ${MHG_BLUE}${BOLD}███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗${RESET}"
    echo -e "    ${BG_BLUE}${WHITE}│ G. │${RESET}     ${MHG_BLUE}${BOLD}████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝${RESET}"
    echo -e "    ${BG_BLUE}${WHITE}└────┘${RESET}     ${MHG_BLUE}${BOLD}██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗  ${RESET}"
    echo -e "               ${MHG_BLUE}${BOLD}██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝  ${RESET}"
    echo -e "               ${MHG_BLUE}${BOLD}██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗${RESET}"
    echo -e "               ${MHG_BLUE}╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝${RESET}"
    echo -e "                                     ${GRAY}Professional AI Development Environment by A1xAI Team${RESET}"
    echo -e ""
}

# ============================================================================
# LARGE BANNER - No Logo (RECOMMENDED)
# ============================================================================
print_large_no_logo() {
    echo -e ""
    echo -e "    ${MHG_BLUE}${BOLD}███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗${RESET}"
    echo -e "    ${MHG_BLUE}${BOLD}████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝${RESET}"
    echo -e "    ${MHG_BLUE}${BOLD}██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗  ${RESET}"
    echo -e "    ${MHG_BLUE}${BOLD}██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝  ${RESET}"
    echo -e "    ${MHG_BLUE}${BOLD}██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗${RESET}"
    echo -e "    ${MHG_BLUE}╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝${RESET}"
    echo -e "                  ${GRAY}Professional AI Development Environment by A1xAI Team${RESET}"
    echo -e ""
}

# ============================================================================
# COMPACT BANNER - No Logo
# ============================================================================
print_compact() {
    echo -e ""
    echo -e " ${BG_BLUE}${WHITE}┌────┐${RESET} ${MHG_BLUE}${BOLD}███╗   ███╗██╗  ██╗ ██████╗ ${RESET}"
    echo -e " ${BG_BLUE}${WHITE}│ MH │${RESET} ${MHG_BLUE}${BOLD}████╗ ████║██║  ██║██╔════╝ ${RESET}"
    echo -e " ${BG_BLUE}${WHITE}│ G. │${RESET} ${MHG_BLUE}${BOLD}██╔████╔██║███████║██║  ███╗${RESET}"
    echo -e " ${BG_BLUE}${WHITE}└────┘${RESET} ${MHG_BLUE}${BOLD}██║╚██╔╝██║██╔══██║██║   ██║${RESET}"
    echo -e "       ${MHG_BLUE}${BOLD}██║ ╚═╝ ██║██║  ██║╚██████╔╝${RESET}"
    echo -e "       ${MHG_BLUE}╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ${RESET}"
    echo -e "    ${MHG_BLUE}${BOLD}██████╗ ██████╗ ██████╗ ███████╗${RESET}"
    echo -e "   ${MHG_BLUE}${BOLD}██╔════╝██╔═══██╗██╔══██╗██╔════╝${RESET}"
    echo -e "   ${MHG_BLUE}${BOLD}██║     ██║   ██║██║  ██║█████╗  ${RESET}"
    echo -e "   ${MHG_BLUE}${BOLD}██║     ██║   ██║██║  ██║██╔══╝  ${RESET}"
    echo -e "   ${MHG_BLUE}${BOLD}╚██████╗╚██████╔╝██████╔╝███████╗${RESET}"
    echo -e "    ${MHG_BLUE}╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝${RESET}"
    echo -e "          ${GRAY}by A1xAI Team${RESET}"
    echo -e ""
}

# ============================================================================
# MINI HEADER - Claude Code Style
# ============================================================================
print_mini() {
    echo -e "${BG_BLUE}${WHITE}┌────┐${RESET}   ${MHG_BLUE}${BOLD}MHG Code v1.0.0${RESET}"
    echo -e "${BG_BLUE}${WHITE}│ MH │${RESET}   ${GRAY}Professional AI Development Environment${RESET}"
    echo -e "${BG_BLUE}${WHITE}│ G. │${RESET}   ${GRAY}$(pwd)${RESET}"
    echo -e "${BG_BLUE}${WHITE}└────┘${RESET}   ${GRAY}by A1xAI Team${RESET}"
}

# ============================================================================
# ULTRA SIMPLE - Text Only (No Logo)
# ============================================================================
print_simple() {
    echo -e "${MHG_BLUE}${BOLD}MHG CODE${RESET} ${GRAY}v1.0 | Professional AI Development${RESET}"
    echo -e "${GRAY}$(pwd) | by A1xAI Team${RESET}"
}

# ============================================================================
# Main execution - Choose your preferred version
# ============================================================================

# Uncomment the version you want to use:
print_large_no_logo        # Default - clean and professional
# print_large_with_logo    # With logo box
# print_compact            # Compact version
# print_mini               # Mini header
# print_simple             # Ultra simple

# ============================================================================
# Usage Examples:
# ============================================================================
# 1. Add to your .bashrc or .zshrc:
#    source /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh
#
# 2. Run directly:
#    bash /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh
#
# 3. Use in startup scripts:
#    #!/bin/bash
#    source /path/to/mhg-code-banner.sh
#    print_large_no_logo
# ============================================================================
