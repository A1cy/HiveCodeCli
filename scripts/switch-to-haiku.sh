#!/bin/bash
# Quick script to switch to Claude 3 Haiku (fastest model)

echo "🚀 Switching to Claude 3 Haiku (FASTEST - 21K tokens/sec)"
echo ""

# Update .env if it exists
if [ -f ".env" ]; then
    if grep -q "AWS_BEDROCK_MODEL=" .env; then
        sed -i 's|AWS_BEDROCK_MODEL=.*|AWS_BEDROCK_MODEL=anthropic.claude-3-haiku-20240307-v1:0|' .env
        echo "✅ Updated .env file"
    else
        echo "AWS_BEDROCK_MODEL=anthropic.claude-3-haiku-20240307-v1:0" >> .env
        echo "✅ Added to .env file"
    fi
else
    echo "AWS_BEDROCK_MODEL=anthropic.claude-3-haiku-20240307-v1:0" > .env
    echo "✅ Created .env file"
fi

echo ""
echo "🎯 Model set to: Claude 3 Haiku"
echo "⚡ Speed: 21,000 tokens/second (3x faster than Nova Micro)"
echo ""
echo "Restart HiveCode to use the new model:"
echo "  npm start"
