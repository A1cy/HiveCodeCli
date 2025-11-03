#!/bin/bash
# MHG Code Startup Script with AWS Bedrock Credentials
# Created by ERP team

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.bedrock"

# Clear screen for clean startup
clear

echo "🚀 MHG Code Startup with AWS Bedrock"
echo "======================================"
echo ""

# Check if .env.bedrock exists
if [ -f "$ENV_FILE" ]; then
    echo "✅ Loading AWS Bedrock credentials..."

    # Export AWS Bedrock Bearer Token (new authentication method)
    # MIGRATION NOTE: Using MHGCODE_USE_BEDROCK (keeping HIVECODE_USE_BEDROCK for backward compatibility)
    export AWS_BEARER_TOKEN_BEDROCK=$(grep '^AWS_BEARER_TOKEN_BEDROCK=' "$ENV_FILE" | cut -d '=' -f2-)
    export BEDROCK_REGION=$(grep '^BEDROCK_REGION=' "$ENV_FILE" | cut -d '=' -f2-)
    export MHGCODE_USE_BEDROCK=$(grep '^MHGCODE_USE_BEDROCK=' "$ENV_FILE" | cut -d '=' -f2-)
    export HIVECODE_USE_BEDROCK=$(grep '^HIVECODE_USE_BEDROCK=' "$ENV_FILE" | cut -d '=' -f2-)  # backward compat
    export BEDROCK_MODEL=$(grep '^BEDROCK_MODEL=' "$ENV_FILE" | cut -d '=' -f2-)

    # Verify bearer token was loaded
    if [ -z "$AWS_BEARER_TOKEN_BEDROCK" ]; then
        echo "❌ Failed to load AWS Bearer Token from $ENV_FILE"
        exit 1
    fi

    echo "✅ Credentials loaded successfully"
    echo "   📍 Region: ${BEDROCK_REGION}"
    echo "   🤖 Model: ${BEDROCK_MODEL}"
    echo "   🔑 Bearer Token: ${AWS_BEARER_TOKEN_BEDROCK:0:15}..."
    echo ""
else
    echo "⚠️  Warning: .env.bedrock not found at $ENV_FILE"
    echo "   Run: ./setup-bedrock.sh first"
    echo ""
    exit 1
fi

# Verify settings are configured
SETTINGS_FILE="$HOME/.mhgcode/settings.json"
if [ ! -f "$SETTINGS_FILE" ]; then
    echo "⚠️  Warning: Settings not configured"
    echo "   Run: ./setup-bedrock.sh first"
    echo ""
    exit 1
fi

echo "🌟 Starting MHG Code with AWS Bedrock..."
echo ""

# Start mhgcode using local build (with our fixes)
# Use 'env' to explicitly pass environment variables to ensure they reach the process
# MIGRATION NOTE: Both MHGCODE_* and HIVECODE_* env vars passed for backward compatibility
cd "$SCRIPT_DIR"
exec env \
  AWS_BEARER_TOKEN_BEDROCK="$AWS_BEARER_TOKEN_BEDROCK" \
  BEDROCK_REGION="$BEDROCK_REGION" \
  MHGCODE_USE_BEDROCK="$MHGCODE_USE_BEDROCK" \
  HIVECODE_USE_BEDROCK="$HIVECODE_USE_BEDROCK" \
  BEDROCK_MODEL="$BEDROCK_MODEL" \
  NODE_ENV=development \
  npm start "$@"
