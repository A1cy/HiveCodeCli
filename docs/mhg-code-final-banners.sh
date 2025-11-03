#!/bin/bash

# MHG CODE - FINAL Perfect Banners
# "MHG CODE" stays together, perfect alignment
# Brand Color: #006eb6 (RGB: 0, 110, 182)

# ============================================================================
# ANSI Color Codes
# ============================================================================
MHG_BLUE='\033[38;2;0;110;182m'
CYAN='\033[96m'
WHITE='\033[97m'
GRAY='\033[90m'
DIM='\033[2m'
RESET='\033[0m'
BOLD='\033[1m'

# ============================================================================
# CONCEPT 1: BOLD & CLEAN (NO BORDERS)
# Simple, elegant, perfectly aligned
# ============================================================================

concept1_clean() {
    echo -e ""
    echo -e "${MHG_BLUE}${BOLD}"
    echo -e "        ███╗   ███╗ ██╗  ██╗  ██████╗"
    echo -e "        ████╗ ████║ ██║  ██║ ██╔════╝"
    echo -e "        ██╔████╔██║ ███████║ ██║  ███╗"
    echo -e "        ██║╚██╔╝██║ ██╔══██║ ██║   ██║"
    echo -e "        ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝"
    echo -e "        ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝"
    echo -e ""
    echo -e "         ██████╗ ██████╗ ██████╗ ███████╗"
    echo -e "        ██╔════╝██╔═══██╗██╔══██╗██╔════╝"
    echo -e "        ██║     ██║   ██║██║  ██║█████╗"
    echo -e "        ██║     ██║   ██║██║  ██║██╔══╝"
    echo -e "        ╚██████╗╚██████╔╝██████╔╝███████╗"
    echo -e "         ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝${RESET}"
    echo -e ""
    echo -e "        ${WHITE}Professional AI Development Environment${RESET}"
    echo -e "        ${CYAN}v1.0 ${GRAY}│${RESET} ${CYAN}AWS Bedrock ${GRAY}│${RESET} ${CYAN}Claude Sonnet 4.5${RESET}"
    echo -e "        ${GRAY}by A1xAI Team${RESET}"
    echo -e ""
}

# ============================================================================
# CONCEPT 2: WITH PERFECT BOX (CAREFULLY MEASURED)
# Every line exactly the same width
# ============================================================================

concept2_boxed() {
    echo -e ""
    echo -e "${MHG_BLUE}${BOLD}"
    echo -e "    ╔═══════════════════════════════════════════════════════╗"
    echo -e "    ║                                                       ║"
    echo -e "    ║     ███╗   ███╗ ██╗  ██╗  ██████╗                    ║"
    echo -e "    ║     ████╗ ████║ ██║  ██║ ██╔════╝                    ║"
    echo -e "    ║     ██╔████╔██║ ███████║ ██║  ███╗                   ║"
    echo -e "    ║     ██║╚██╔╝██║ ██╔══██║ ██║   ██║                   ║"
    echo -e "    ║     ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝                   ║"
    echo -e "    ║     ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝                    ║"
    echo -e "    ║                                                       ║"
    echo -e "    ║      ██████╗ ██████╗ ██████╗ ███████╗                ║"
    echo -e "    ║     ██╔════╝██╔═══██╗██╔══██╗██╔════╝                ║"
    echo -e "    ║     ██║     ██║   ██║██║  ██║█████╗                  ║"
    echo -e "    ║     ██║     ██║   ██║██║  ██║██╔══╝                  ║"
    echo -e "    ║     ╚██████╗╚██████╔╝██████╔╝███████╗                ║"
    echo -e "    ║      ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝                ║"
    echo -e "    ║                                                       ║"
    echo -e "    ║     ${RESET}${WHITE}Professional AI Development Environment${MHG_BLUE}${BOLD}        ║"
    echo -e "    ║     ${RESET}${CYAN}v1.0 ${GRAY}│${RESET} ${CYAN}AWS Bedrock ${GRAY}│${RESET} ${CYAN}by A1xAI Team${MHG_BLUE}${BOLD}          ║"
    echo -e "    ║                                                       ║"
    echo -e "    ╚═══════════════════════════════════════════════════════╝${RESET}"
    echo -e ""
}

# ============================================================================
# CONCEPT 3: GRADIENT BLOCKS (NO BORDERS)
# Clean gradient effect without border issues
# ============================================================================

concept3_gradient() {
    echo -e ""
    echo -e "${MHG_BLUE}${BOLD}"
    echo -e "    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓"
    echo -e "    ▓▓                                                   ▓▓"
    echo -e "    ▓▓    ███╗   ███╗ ██╗  ██╗  ██████╗                 ▓▓"
    echo -e "    ▓▓    ████╗ ████║ ██║  ██║ ██╔════╝                 ▓▓"
    echo -e "    ▓▓    ██╔████╔██║ ███████║ ██║  ███╗                ▓▓"
    echo -e "    ▓▓    ██║╚██╔╝██║ ██╔══██║ ██║   ██║                ▓▓"
    echo -e "    ▓▓    ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝                ▓▓"
    echo -e "    ▓▓    ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝                 ▓▓"
    echo -e "    ▓▓                                                   ▓▓"
    echo -e "    ▓▓     ██████╗ ██████╗ ██████╗ ███████╗             ▓▓"
    echo -e "    ▓▓    ██╔════╝██╔═══██╗██╔══██╗██╔════╝             ▓▓"
    echo -e "    ▓▓    ██║     ██║   ██║██║  ██║█████╗               ▓▓"
    echo -e "    ▓▓    ██║     ██║   ██║██║  ██║██╔══╝               ▓▓"
    echo -e "    ▓▓    ╚██████╗╚██████╔╝██████╔╝███████╗             ▓▓"
    echo -e "    ▓▓     ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝             ▓▓"
    echo -e "    ▓▓                                                   ▓▓"
    echo -e "    ▓▓    ${RESET}${WHITE}Professional AI Development ${CYAN}v1.0${MHG_BLUE}${BOLD}           ▓▓"
    echo -e "    ▓▓    ${RESET}${CYAN}AWS Bedrock ${GRAY}│${RESET} ${CYAN}by A1xAI Team${MHG_BLUE}${BOLD}                 ▓▓"
    echo -e "    ▓▓                                                   ▓▓"
    echo -e "    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓${RESET}"
    echo -e ""
}

# ============================================================================
# CONCEPT 4: MINIMAL & MODERN (NO BORDERS)
# Ultra-clean minimalist design
# ============================================================================

concept4_minimal() {
    echo -e ""
    echo -e "${MHG_BLUE}${BOLD}"
    echo -e "          ███╗   ███╗ ██╗  ██╗  ██████╗"
    echo -e "          ████╗ ████║ ██║  ██║ ██╔════╝"
    echo -e "          ██╔████╔██║ ███████║ ██║  ███╗"
    echo -e "          ██║╚██╔╝██║ ██╔══██║ ██║   ██║"
    echo -e "          ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝"
    echo -e "          ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝"
    echo -e ""
    echo -e "           ██████╗ ██████╗ ██████╗ ███████╗"
    echo -e "          ██╔════╝██╔═══██╗██╔══██╗██╔════╝"
    echo -e "          ██║     ██║   ██║██║  ██║█████╗"
    echo -e "          ██║     ██║   ██║██║  ██║██╔══╝"
    echo -e "          ╚██████╗╚██████╔╝██████╔╝███████╗"
    echo -e "           ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝${RESET}"
    echo -e ""
    echo -e "          ${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    echo -e "          ${WHITE}Professional AI Development${RESET}"
    echo -e "          ${CYAN}v1.0${RESET} ${GRAY}•${RESET} ${CYAN}AWS Bedrock${RESET} ${GRAY}•${RESET} ${CYAN}A1xAI Team${RESET}"
    echo -e "          ${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
    echo -e ""
}

# ============================================================================
# SHOW ALL FINAL CONCEPTS
# ============================================================================

show_all_final() {
    echo -e "\n${BOLD}═══════════════════════════════════════════════════════════${RESET}"
    echo -e "${BOLD}              MHG CODE - FINAL PERFECT BANNERS${RESET}"
    echo -e "${BOLD}═══════════════════════════════════════════════════════════${RESET}\n"

    echo -e "${CYAN}${BOLD}CONCEPT 1: BOLD & CLEAN${RESET} ${DIM}(No Borders)${RESET}"
    concept1_clean

    echo -e "${CYAN}${BOLD}CONCEPT 2: PERFECT BOX${RESET} ${DIM}(Bordered & Aligned)${RESET}"
    concept2_boxed

    echo -e "${CYAN}${BOLD}CONCEPT 3: GRADIENT BLOCKS${RESET} ${DIM}(Clean Gradient)${RESET}"
    concept3_gradient

    echo -e "${CYAN}${BOLD}CONCEPT 4: MINIMAL & MODERN${RESET} ${DIM}(Ultra Clean)${RESET}"
    concept4_minimal

    echo -e "${BOLD}═══════════════════════════════════════════════════════════${RESET}"
    echo -e "${BOLD}            All Concepts - MHG CODE Together!${RESET}"
    echo -e "${BOLD}═══════════════════════════════════════════════════════════${RESET}\n"
}

# ============================================================================
# MAIN EXECUTION
# ============================================================================

# Default: Show Concept 2 (Perfect Box)
concept2_boxed

# Uncomment to show all:
# show_all_final
