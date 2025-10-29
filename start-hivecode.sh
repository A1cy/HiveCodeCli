#!/bin/bash
# HiveCode Startup Script with AWS Bedrock Credentials
# Created by A1xAI Team

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.bedrock"

# Clear screen for clean startup
clear

echo "🚀 HiveCode Startup with AWS Bedrock"
echo "======================================"
echo ""

# Check if .env.bedrock exists
if [ -f "$ENV_FILE" ]; then
    echo "✅ Loading AWS Bedrock credentials..."

    # Export each variable individually to ensure they persist
    export AWS_ACCESS_KEY_ID=$(grep '^AWS_ACCESS_KEY_ID=' "$ENV_FILE" | cut -d '=' -f2-)
    export AWS_SECRET_ACCESS_KEY=$(grep '^AWS_SECRET_ACCESS_KEY=' "$ENV_FILE" | cut -d '=' -f2-)
    export BEDROCK_REGION=$(grep '^BEDROCK_REGION=' "$ENV_FILE" | cut -d '=' -f2-)
    export HIVECODE_USE_BEDROCK=$(grep '^HIVECODE_USE_BEDROCK=' "$ENV_FILE" | cut -d '=' -f2-)
    export BEDROCK_MODEL=$(grep '^BEDROCK_MODEL=' "$ENV_FILE" | cut -d '=' -f2-)

    # Verify credentials were loaded
    if [ -z "$AWS_ACCESS_KEY_ID" ] || [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
        echo "❌ Failed to load AWS credentials from $ENV_FILE"
        exit 1
    fi

    echo "✅ Credentials loaded successfully"
    echo "   📍 Region: ${BEDROCK_REGION}"
    echo "   🤖 Model: ${BEDROCK_MODEL}"
    echo "   🔑 Access Key: ${AWS_ACCESS_KEY_ID:0:20}..."
    echo ""
else
    echo "⚠️  Warning: .env.bedrock not found at $ENV_FILE"
    echo "   Run: ./setup-bedrock.sh first"
    echo ""
    exit 1
fi

# Verify settings are configured
SETTINGS_FILE="$HOME/.gemini-code/settings.json"
if [ ! -f "$SETTINGS_FILE" ]; then
    echo "⚠️  Warning: Settings not configured"
    echo "   Run: ./setup-bedrock.sh first"
    echo ""
    exit 1
fi

echo "🌟 Starting HiveCode with AWS Bedrock..."
echo ""

# Start hivecode with loaded credentials
exec node "$SCRIPT_DIR/packages/cli/dist/index.js" "$@"
