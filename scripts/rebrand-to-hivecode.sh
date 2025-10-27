#!/bin/bash
# HiveCode Rebranding Script
# Systematically replaces Gemini CLI references with HiveCode

set -e

echo "🐝 HiveCode Rebranding Script"
echo "=============================="
echo ""

# Navigate to project root
cd "$(dirname "$0")/.."

echo "Step 1: Replacing 'Gemini CLI' with 'HiveCode'..."
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.md" -o -name "*.json" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/bundle/*" \
  -exec sed -i 's/Gemini CLI/HiveCode/g' {} +

echo "✅ Replaced 'Gemini CLI' with 'HiveCode'"

echo ""
echo "Step 2: Replacing 'GEMINI.md' with 'HIVECODE.md'..."
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/bundle/*" \
  -exec sed -i 's/GEMINI\.md/HIVECODE.md/g' {} +

echo "✅ Replaced 'GEMINI.md' with 'HIVECODE.md'"

echo ""
echo "Step 3: Replacing 'GEMINI_' file references..."
find . -type f \( -name "*.ts" -o -name "*.tsx" \) \
  ! -path "*/node_modules/*" \
  ! -path "*/.git/*" \
  ! -path "*/dist/*" \
  ! -path "*/bundle/*" \
  -exec sed -i 's/GEMINI_\([a-zA-Z0-9]*\)\.md/HIVECODE_\1.md/g' {} +

echo "✅ Replaced 'GEMINI_*.md' with 'HIVECODE_*.md'"

echo ""
echo "Step 4: Updating package.json descriptions..."
find packages -name "package.json" -exec sed -i 's/"description": "Gemini CLI"/"description": "HiveCode"/g' {} +

echo "✅ Updated package descriptions"

echo ""
echo "Step 5: Counting changes..."
GEMINI_CLI_COUNT=$(grep -r "Gemini CLI" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" . 2>/dev/null | wc -l || echo "0")
GEMINI_MD_COUNT=$(grep -r "GEMINI\.md" --include="*.ts" --include="*.tsx" . 2>/dev/null | wc -l || echo "0")

echo "Remaining 'Gemini CLI' references: $GEMINI_CLI_COUNT"
echo "Remaining 'GEMINI.md' references: $GEMINI_MD_COUNT"

echo ""
echo "🎉 Rebranding complete!"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff"
echo "2. Build project: npm run bundle"
echo "3. Test the CLI: ./bundle/hivecode.js"
echo "4. Commit: git add -A && git commit -m 'chore: Rebrand Gemini CLI to HiveCode'"
