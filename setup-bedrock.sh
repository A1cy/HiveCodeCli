#!/bin/bash
# HiveCode AWS Bedrock Setup Script
# Configures HiveCode to use AWS Bedrock by default

set -e

echo "🔧 HiveCode AWS Bedrock Setup"
echo "=============================="
echo ""

# Find config directory
CONFIG_DIR="$HOME/.gemini-code"
if [ ! -d "$CONFIG_DIR" ]; then
    echo "📁 Creating config directory: $CONFIG_DIR"
    mkdir -p "$CONFIG_DIR"
fi

SETTINGS_FILE="$CONFIG_DIR/settings.json"

# Create settings with Bedrock configuration
echo "✍️  Creating settings file: $SETTINGS_FILE"

cat > "$SETTINGS_FILE" << 'EOF'
{
  "security": {
    "auth": {
      "selectedType": "aws-bedrock",
      "bedrockModel": "amazon.nova-micro-v1:0",
      "bedrockRegion": "us-east-1"
    }
  }
}
EOF

echo "✅ Settings file created successfully"
echo ""

# Load AWS credentials from .env.bedrock
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env.bedrock"

if [ -f "$ENV_FILE" ]; then
    echo "🔑 Loading AWS credentials from .env.bedrock"
    set -a
    source "$ENV_FILE"
    set +a

    echo "✅ AWS credentials loaded:"
    echo "   - AWS_ACCESS_KEY_ID: ${AWS_ACCESS_KEY_ID:0:20}..."
    echo "   - BEDROCK_REGION: ${BEDROCK_REGION}"
    echo "   - BEDROCK_MODEL: ${BEDROCK_MODEL}"
else
    echo "⚠️  Warning: .env.bedrock not found at $ENV_FILE"
    echo "   You'll need to set AWS credentials manually"
fi

echo ""
echo "🎉 AWS Bedrock configuration complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Start HiveCode: hivecode"
echo "   2. Or use the startup script: ./start-hivecode.sh"
echo ""
echo "💡 To verify AWS Bedrock is active:"
echo "   - Look for 'Using MHG AI / AWS Bedrock' in the header"
echo "   - Session summary should show no 'gemini' models"
echo ""
