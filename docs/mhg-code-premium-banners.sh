#!/bin/bash

# MHG CODE - Premium Modern Banners
# Inspired by Claude Code, Gemini, Grok, and Codex
# Brand Color: #006eb6 (RGB: 0, 110, 182)

# ============================================================================
# ANSI Color Codes
# ============================================================================
MHG_BLUE='\033[38;2;0;110;182m'    # Brand blue #006eb6
CYAN='\033[96m'
WHITE='\033[97m'
GRAY='\033[90m'
DIM='\033[2m'
RESET='\033[0m'
BOLD='\033[1m'

# ============================================================================
# CONCEPT 1: THE MINIMALIST EXECUTIVE (RECOMMENDED)
# Modern, professional, high information density
# ============================================================================

concept1_full() {
    echo -e "${MHG_BLUE}${BOLD}◆ MHG CODE${RESET} ${DIM}v1.0${RESET}"
    echo -e "  ${GRAY}Professional AI Development by A1xAI Team${RESET}"
    echo -e "  ${DIM}$(pwd) ${MHG_BLUE}│${RESET} ${CYAN}AWS Bedrock${RESET} ${MHG_BLUE}│${RESET} ${DIM}Claude Sonnet 4.5${RESET}"
}

concept1_compact() {
    echo -e "${MHG_BLUE}${BOLD}◆ MHG CODE${RESET} ${DIM}v1.0${RESET} ${GRAY}│${RESET} ${GRAY}Professional AI Development${RESET}"
    echo -e "  ${DIM}$(pwd)${RESET}"
}

concept1_mini() {
    echo -e "${MHG_BLUE}${BOLD}◆ MHG CODE${RESET} ${DIM}v1.0${RESET} ${GRAY}│${RESET} ${DIM}$(basename $(pwd))${RESET}"
}

concept1_tiny() {
    echo -e "${MHG_BLUE}◆${RESET} ${BOLD}MHG CODE${RESET} ${DIM}v1.0${RESET}"
}

# ============================================================================
# CONCEPT 2: THE MODERN BRACKET
# Code-centric, developer-focused aesthetic
# ============================================================================

concept2_full() {
    echo -e "${MHG_BLUE}${BOLD}[ MHG CODE ]${RESET}"
    echo -e "  ${GRAY}v1.0 ${MHG_BLUE}│${RESET} Professional AI Development by A1xAI Team${RESET}"
    echo -e "  ${DIM}$(pwd) ${MHG_BLUE}│${RESET} ${CYAN}Multi-Provider Intelligence${RESET}"
}

concept2_compact() {
    echo -e "${MHG_BLUE}${BOLD}[ MHG CODE ]${RESET} ${DIM}v1.0${RESET}"
    echo -e "  ${GRAY}Professional AI Development${RESET} ${MHG_BLUE}│${RESET} ${DIM}$(basename $(pwd))${RESET}"
}

concept2_mini() {
    echo -e "${MHG_BLUE}${BOLD}[ MHG CODE ]${RESET} ${DIM}v1.0${RESET}"
}

concept2_tiny() {
    echo -e "${MHG_BLUE}[${RESET} ${BOLD}MHG${RESET} ${MHG_BLUE}]${RESET}"
}

# ============================================================================
# CONCEPT 3: THE GRADIENT BLOCK
# Visual impact, premium positioning
# ============================================================================

concept3_full() {
    echo -e "${MHG_BLUE}${BOLD}▰▰▰ MHG CODE${RESET}"
    echo -e "    ${GRAY}Professional AI Development by A1xAI Team${RESET}"
    echo -e "    ${DIM}Version 1.0.0 ${MHG_BLUE}│${RESET} Multi-Provider AI Intelligence${RESET}"
}

concept3_compact() {
    echo -e "${MHG_BLUE}${BOLD}▰▰▰ MHG CODE${RESET} ${DIM}v1.0${RESET}"
    echo -e "    ${GRAY}Professional AI Development ${MHG_BLUE}│${RESET} ${DIM}$(basename $(pwd))${RESET}"
}

concept3_mini() {
    echo -e "${MHG_BLUE}${BOLD}▰▰▰ MHG CODE${RESET} ${DIM}v1.0${RESET}"
}

concept3_tiny() {
    echo -e "${MHG_BLUE}▰${RESET} ${BOLD}MHG CODE${RESET}"
}

# ============================================================================
# CONCEPT 4: THE ICON GRID
# Information-rich, tech-forward
# ============================================================================

concept4_full() {
    echo -e "${MHG_BLUE}${BOLD}● MHG CODE${RESET} ${DIM}v1.0${RESET}"
    echo -e "  ${MHG_BLUE}⬢${RESET} ${GRAY}Professional Development${RESET} ${MHG_BLUE}│${RESET} ${MHG_BLUE}◆${RESET} ${GRAY}AI-Powered${RESET} ${MHG_BLUE}│${RESET} ${MHG_BLUE}▰${RESET} ${GRAY}Multi-Provider${RESET}"
    echo -e "  ${DIM}$(pwd) ${MHG_BLUE}│${RESET} ${CYAN}by A1xAI Team${RESET}"
}

concept4_compact() {
    echo -e "${MHG_BLUE}${BOLD}● MHG CODE${RESET} ${DIM}v1.0${RESET}"
    echo -e "  ${MHG_BLUE}⬢${RESET} ${GRAY}Professional${RESET} ${MHG_BLUE}◆${RESET} ${GRAY}AI-Powered${RESET} ${MHG_BLUE}▰${RESET} ${GRAY}Multi-Provider${RESET}"
}

concept4_mini() {
    echo -e "${MHG_BLUE}${BOLD}● MHG CODE${RESET} ${MHG_BLUE}⬢◆▰${RESET} ${DIM}v1.0${RESET}"
}

concept4_tiny() {
    echo -e "${MHG_BLUE}●${RESET} ${BOLD}MHG CODE${RESET}"
}

# ============================================================================
# CONCEPT 5: THE FRAMED ELITE
# Elegant, premium presentation
# ============================================================================

concept5_full() {
    echo -e "${MHG_BLUE}┌─────────────────────────────────────────────────────────────┐${RESET}"
    echo -e "${MHG_BLUE}│${RESET} ${BOLD}MHG CODE${RESET} ${DIM}v1.0${RESET}                                            ${MHG_BLUE}│${RESET}"
    echo -e "${MHG_BLUE}│${RESET} ${GRAY}Professional AI Development by A1xAI Team${RESET}               ${MHG_BLUE}│${RESET}"
    echo -e "${MHG_BLUE}└─────────────────────────────────────────────────────────────┘${RESET}"
}

concept5_compact() {
    echo -e "${MHG_BLUE}┌──────────────────────────────────────────┐${RESET}"
    echo -e "${MHG_BLUE}│${RESET} ${BOLD}MHG CODE${RESET} ${DIM}v1.0${RESET} ${MHG_BLUE}│${RESET} ${GRAY}Professional AI Dev${RESET} ${MHG_BLUE}│${RESET}"
    echo -e "${MHG_BLUE}└──────────────────────────────────────────┘${RESET}"
}

concept5_mini() {
    echo -e "${MHG_BLUE}┌────────────────┐${RESET}"
    echo -e "${MHG_BLUE}│${RESET} ${BOLD}MHG CODE${RESET} ${DIM}v1.0${RESET} ${MHG_BLUE}│${RESET}"
    echo -e "${MHG_BLUE}└────────────────┘${RESET}"
}

concept5_tiny() {
    echo -e "${MHG_BLUE}├${RESET} ${BOLD}MHG CODE${RESET} ${MHG_BLUE}┤${RESET}"
}

# ============================================================================
# SPECIAL MODES
# ============================================================================

quiet_mode() {
    echo -e "${MHG_BLUE}◆${RESET} ${BOLD}MHG${RESET}"
}

verbose_mode() {
    echo -e "${MHG_BLUE}${BOLD}◆ MHG CODE${RESET} ${DIM}v1.0.0${RESET}"
    echo -e "  ${GRAY}Professional AI Development Environment${RESET}"
    echo -e "  ${GRAY}by A1xAI Team${RESET}"
    echo -e ""
    echo -e "  ${DIM}Location:${RESET}  $(pwd)"
    echo -e "  ${DIM}Provider:${RESET}  ${CYAN}AWS Bedrock${RESET}"
    echo -e "  ${DIM}Model:${RESET}     ${DIM}Claude Sonnet 4.5${RESET}"
    echo -e "  ${DIM}Status:${RESET}    ${MHG_BLUE}●${RESET} ${GRAY}Active${RESET}"
}

fun_mode() {
    echo -e "${MHG_BLUE}${BOLD}◆ MHG CODE${RESET} ${DIM}v1.0${RESET} 🚀"
    echo -e "  ${GRAY}Professional AI Development by A1xAI Team 🤖✨${RESET}"
    echo -e "  ${DIM}$(pwd)${RESET} 💼"
}

# ============================================================================
# SMART AUTO-SELECT (Detects terminal width)
# ============================================================================

smart_banner() {
    local width=$(tput cols 2>/dev/null || echo 80)

    if [ "$width" -ge 100 ]; then
        concept1_full
    elif [ "$width" -ge 70 ]; then
        concept1_compact
    elif [ "$width" -ge 40 ]; then
        concept1_mini
    else
        concept1_tiny
    fi
}

# ============================================================================
# COMPARISON DISPLAY
# ============================================================================

show_all_concepts() {
    echo -e "\n${BOLD}═══════════════════════════════════════════════════════════════${RESET}"
    echo -e "${BOLD}           MHG CODE - Premium Banner Showcase${RESET}"
    echo -e "${BOLD}═══════════════════════════════════════════════════════════════${RESET}\n"

    echo -e "${CYAN}${BOLD}Concept 1: The Minimalist Executive${RESET} ${DIM}(RECOMMENDED)${RESET}"
    echo -e "${DIM}Modern, professional, high information density${RESET}"
    concept1_full
    echo ""

    echo -e "${CYAN}${BOLD}Concept 2: The Modern Bracket${RESET}"
    echo -e "${DIM}Code-centric, developer-focused aesthetic${RESET}"
    concept2_full
    echo ""

    echo -e "${CYAN}${BOLD}Concept 3: The Gradient Block${RESET}"
    echo -e "${DIM}Visual impact, premium positioning${RESET}"
    concept3_full
    echo ""

    echo -e "${CYAN}${BOLD}Concept 4: The Icon Grid${RESET}"
    echo -e "${DIM}Information-rich, tech-forward${RESET}"
    concept4_full
    echo ""

    echo -e "${CYAN}${BOLD}Concept 5: The Framed Elite${RESET}"
    echo -e "${DIM}Elegant, premium presentation${RESET}"
    concept5_full
    echo ""

    echo -e "${BOLD}═══════════════════════════════════════════════════════════════${RESET}\n"
}

# ============================================================================
# MAIN EXECUTION - Choose your preferred concept
# ============================================================================

# Default: Concept 1 Full (Recommended)
concept1_full

# Uncomment to use different concepts:
# concept2_full
# concept3_full
# concept4_full
# concept5_full

# Uncomment to use responsive smart banner:
# smart_banner

# Uncomment to show all concepts:
# show_all_concepts

# ============================================================================
# USAGE EXAMPLES
# ============================================================================
# 1. Show specific concept:
#    concept1_full
#    concept2_compact
#    concept3_mini
#
# 2. Smart responsive banner:
#    smart_banner
#
# 3. Show all concepts:
#    show_all_concepts
#
# 4. Special modes:
#    quiet_mode
#    verbose_mode
#    fun_mode
# ============================================================================
