# AWS Bedrock Models - HiveCode

## 🚀 Quick Switch to Fastest Model

```bash
# Claude 3 Haiku is now the default (FASTEST - 21K tokens/sec)
npm start
```

## ⚠️ IMPORTANT: Model Access Requirements

**All Claude, Mistral, and some models require AWS access approval:**
1. Go to AWS Console → Bedrock → Model Access
2. Click "Manage model access"
3. Select models you want to use
4. Click "Request model access"
5. Approval is usually instant

## ⚡ FASTEST MODELS (Recommended)

### 1. Claude 3 Haiku ⭐ BEST CHOICE
- **Model ID**: `anthropic.claude-3-haiku-20240307-v1:0`
- **Speed**: 21,000 tokens/second (3x faster than Nova Micro)
- **Quality**: Excellent - comparable to GPT-3.5 Turbo
- **Capabilities**: Text + Image input
- **Best for**: Fast coding, quick responses, development workflow
- **Default**: Now the default model in HiveCode

### 2. Claude 3.5 Haiku
- **Model ID**: `anthropic.claude-3-5-haiku-20241022-v1:0`
- **Speed**: Ultra-fast (latest version)
- **Quality**: Enhanced capabilities over Claude 3 Haiku
- **Capabilities**: Text + Image input
- **Best for**: Latest features with speed

### 3. Mistral 7B Instruct
- **Model ID**: `mistral.mistral-7b-instruct-v0:2`
- **Speed**: Very fast
- **Quality**: Good for coding tasks
- **Capabilities**: Text only
- **Best for**: Code generation, fast iteration

### 4. Mistral Small
- **Model ID**: `mistral.mistral-small-2402-v1:0`
- **Speed**: Fast
- **Quality**: Efficient, good balance
- **Capabilities**: Text only
- **Best for**: General tasks, lightweight

## 🎯 BALANCED MODELS

### 5. Claude 3 Sonnet (Recommended for Complex Tasks)
- **Model ID**: `anthropic.claude-3-sonnet-20240229-v1:0`
- **Quality**: Superior reasoning and coding
- **Speed**: Moderate
- **Capabilities**: Text + Image input
- **Best for**: Complex coding, architecture design

### 6. Claude 3.5 Sonnet v2
- **Model ID**: `anthropic.claude-3-5-sonnet-20241022-v2:0`
- **Quality**: Latest, most capable Sonnet
- **Speed**: Moderate
- **Capabilities**: Text + Image input
- **Best for**: Most complex tasks, best quality

## 💪 POWERFUL MODELS

### 7. Claude 3 Opus
- **Model ID**: `anthropic.claude-3-opus-20240229-v1:0`
- **Quality**: Maximum intelligence
- **Speed**: Slower (highest quality)
- **Capabilities**: Text + Image input
- **Best for**: Complex reasoning, analysis, research

## 📊 Model Comparison

| Model | Speed | Quality | Cost | Use Case |
|-------|-------|---------|------|----------|
| Claude 3 Haiku | ⚡⚡⚡ | ⭐⭐⭐ | $ | **Fast coding** |
| Claude 3.5 Haiku | ⚡⚡⚡ | ⭐⭐⭐⭐ | $ | Latest + Fast |
| Mistral 7B | ⚡⚡⚡ | ⭐⭐⭐ | $ | Code generation |
| Claude 3 Sonnet | ⚡⚡ | ⭐⭐⭐⭐ | $$ | Complex coding |
| Claude 3.5 Sonnet v2 | ⚡⚡ | ⭐⭐⭐⭐⭐ | $$ | Best quality |
| Claude 3 Opus | ⚡ | ⭐⭐⭐⭐⭐ | $$$ | Max intelligence |

## 🔄 How to Switch Models

### Method 1: Use the Quick Switch Script
```bash
./scripts/switch-to-haiku.sh  # Switch to Claude 3 Haiku
```

### Method 2: Manual .env Update
Edit `.env.bedrock`:
```bash
BEDROCK_MODEL=anthropic.claude-3-haiku-20240307-v1:0
```

### Method 3: Environment Variable
```bash
export BEDROCK_MODEL="anthropic.claude-3-haiku-20240307-v1:0"
npm start
```

## 📝 Important Notes

### Model Access Requirements
- **Claude models** require AWS Bedrock access approval
- **Mistral models** require AWS Bedrock access approval
- **Amazon Nova models** are available by default
- **Meta Llama models** are available by default

### Free Local Alternative
For FREE local models without AWS costs:
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull models
ollama pull qwen2.5-coder:7b  # Best free coding model
ollama pull llama3.2:3b       # Fast general model

# In HiveCode, use:
/Ollama
```

## 💡 Recommendations

1. **For fastest responses**: Claude 3 Haiku (default)
2. **For best quality**: Claude 3.5 Sonnet v2
3. **For complex analysis**: Claude 3 Opus
4. **For free local models**: Use `/Ollama` with Qwen

## 🚀 Model Availability

All listed Claude, Mistral, and Amazon models are available on:
- AWS Bedrock US-East-1 (Virginia)
- AWS Bedrock US-West-2 (Oregon)
- Other AWS regions may vary

## 📊 Performance Benchmarks

- **Claude 3 Haiku**: 21,000 tokens/sec
- **Claude 3.5 Haiku**: ~20,000 tokens/sec
- **Amazon Nova Micro**: ~7,000 tokens/sec
- **Mistral 7B**: ~15,000 tokens/sec

**Speed Improvement**: Claude 3 Haiku is **3x faster** than Nova Micro!
