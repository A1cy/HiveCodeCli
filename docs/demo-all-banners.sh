#!/bin/bash

# Demo script to show all MHG CODE banner variations
# Usage: bash demo-all-banners.sh

source /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh

echo "========================================="
echo "  MHG CODE BANNER VARIATIONS DEMO"
echo "========================================="
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. LARGE BANNER (NO LOGO) - RECOMMENDED"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_large_no_logo
sleep 2

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. LARGE BANNER (WITH LOGO)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_large_with_logo
sleep 2

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. COMPACT BANNER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_compact
sleep 2

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. MINI HEADER"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_mini
echo ""
sleep 2

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. ULTRA SIMPLE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
print_simple
echo ""

echo "========================================="
echo "  Demo Complete!"
echo "========================================="
