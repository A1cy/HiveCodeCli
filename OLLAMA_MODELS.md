# HiveCode Ollama Models Guide

## 17 Available Models - Updated

HiveCode now includes **17 carefully curated Ollama models** organized by
category!

---

## ⚡ LIGHTWEIGHT MODELS (< 2GB)

**Best for**: Slow PCs, limited RAM, quick responses

### 1. Llama 3.2 1B (Fastest ⭐)

- **Size**: 1.3GB
- **RAM**: 4GB minimum
- **Speed**: Fastest inference
- **Best for**: Quick responses, basic tasks, any PC
- **Command**: `ollama pull llama3.2:1b`

### 2. Phi 3 Mini

- **Size**: 2.3GB
- **RAM**: 4-6GB
- **Speed**: Very fast
- **Best for**: Reasoning tasks, efficient processing
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:mini`

### 3. Gemma 2B

- **Size**: 1.7GB
- **RAM**: 4GB minimum
- **Speed**: Very fast
- **Best for**: Chat, conversation, lightweight tasks
- **Provider**: Google
- **Command**: `ollama pull gemma:2b`

---

## 🎯 MID-TIER MODELS (2-5GB)

**Best for**: Average systems, balanced performance

### 4. Qwen 2.5 3B (Recommended ⭐)

- **Size**: 2.1GB
- **RAM**: 6GB minimum
- **Speed**: Fast
- **Best for**: General coding, best overall balance
- **Command**: `ollama pull qwen2.5:3b`

### 5. Llama 3.2 3B

- **Size**: 2.0GB
- **RAM**: 6GB minimum
- **Speed**: Fast
- **Best for**: Conversations, general tasks
- **Provider**: Meta
- **Command**: `ollama pull llama3.2:3b`

### 6. Mistral 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: Instruction following, complex tasks
- **Note**: Very popular, excellent quality
- **Command**: `ollama pull mistral:7b`

### 7. Phi 3 Medium

- **Size**: 7.9GB
- **RAM**: 12GB minimum
- **Speed**: Medium
- **Best for**: Strong reasoning, complex problems
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:medium`

---

## 💻 CODING SPECIALISTS (3-8GB)

**Best for**: Software development, debugging, code generation

### 8. Qwen 2.5 Coder 7B (Top Coder ⭐)

- **Size**: 4.7GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: Code generation, debugging, refactoring
- **Note**: #1 coding model currently
- **Command**: `ollama pull qwen2.5-coder:7b`

### 9. DeepSeek Coder 6.7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **Speed**: Medium-Fast
- **Best for**: Code understanding, completion
- **Note**: Excellent at code comprehension
- **Command**: `ollama pull deepseek-coder:6.7b`

### 10. CodeLlama 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: General coding, debugging
- **Provider**: Meta
- **Command**: `ollama pull codellama:7b`

### 11. StarCoder2 7B

- **Size**: 4.0GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: Multi-language coding (600+ languages)
- **Note**: Great for rare languages
- **Command**: `ollama pull starcoder2:7b`

---

## 🚀 HIGH-QUALITY MODELS (8GB+)

**Best for**: Best quality output, powerful systems

### 12. Llama 3.1 8B

- **Size**: 4.7GB
- **RAM**: 10GB minimum
- **Speed**: Medium
- **Best for**: Excellent reasoning, long context
- **Provider**: Meta
- **Note**: Flagship quality
- **Command**: `ollama pull llama3.1:8b`

### 13. Qwen 2.5 14B

- **Size**: 9.0GB
- **RAM**: 16GB minimum
- **Speed**: Slow
- **Best for**: Highest quality responses
- **Note**: Needs powerful PC
- **Command**: `ollama pull qwen2.5:14b`

### 14. Mixtral 8x7B (Expert)

- **Size**: 26GB
- **RAM**: 32GB minimum
- **Speed**: Very slow (without GPU)
- **Best for**: Near GPT-4 quality
- **Note**: Mixture of Experts architecture
- **Warning**: ⚠️ Only for very powerful PCs
- **Command**: `ollama pull mixtral:8x7b`

---

## 💬 SPECIALIZED CHAT MODELS

**Best for**: Conversation, dialogue, friendly interaction

### 15. Neural Chat 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: Natural conversations, helpful responses
- **Command**: `ollama pull neural-chat:7b`

### 16. OpenChat 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **Speed**: Medium
- **Best for**: Friendly chat, helpful assistance
- **Command**: `ollama pull openchat:7b`

---

## Quick Selection Guide

### 🐌 Slow PC (4GB RAM)

- **Best**: Llama 3.2 1B
- **Alternative**: Gemma 2B

### 💻 Average PC (8GB RAM)

- **Best**: Qwen 2.5 3B (Recommended)
- **Coding**: DeepSeek Coder 6.7B
- **Chat**: Mistral 7B

### 🚀 Good PC (16GB+ RAM)

- **Best Quality**: Qwen 2.5 14B
- **Coding**: Qwen 2.5 Coder 7B
- **General**: Llama 3.1 8B

### 💪 Powerful PC (32GB+ RAM, GPU)

- **Top Quality**: Mixtral 8x7B

---

## Model Categories Explained

### ⚡ Lightweight

- Fastest responses
- Works on any PC
- Good for basic tasks
- Low resource usage

### 🎯 Balanced

- Good speed-quality balance
- Average system requirements
- Best for most users
- Versatile use cases

### 💻 Coding

- Specialized for programming
- Understands code context
- Good at debugging
- Trained on code datasets

### 🚀 High-Quality

- Best response quality
- Slower inference
- Needs powerful hardware
- Advanced reasoning

### 💬 Chat

- Natural conversations
- Friendly responses
- Good dialogue flow
- User interaction optimized

---

## Installation Tips

### Download Time Estimates

- **1-2GB models**: 1-5 minutes (fast internet)
- **3-5GB models**: 5-15 minutes
- **8-10GB models**: 15-30 minutes
- **20GB+ models**: 30-60+ minutes

### Disk Space Requirements

Always have **2x the model size** free:

- Example: For a 5GB model, have 10GB free space

### First Run

Models are slower on first run while loading into memory. Subsequent runs are
faster.

---

## Comparison with Cloud Services

| Feature     | Ollama (Local) | Cloud APIs           |
| ----------- | -------------- | -------------------- |
| Cost        | 100% Free      | Pay per token        |
| Privacy     | 100% Local     | Data sent to servers |
| Speed (GPU) | Very Fast      | Network dependent    |
| Speed (CPU) | Slow-Medium    | Fast                 |
| Internet    | Not required   | Required             |
| Quality     | Good-Excellent | Excellent            |

---

## FAQs

**Q: Which model should I choose?** A: Start with Qwen 2.5 3B (recommended).
It's the best balance for most users.

**Q: Can I switch models later?** A: Yes! Use `/ollamaModelSelector` anytime.

**Q: Do I need a GPU?** A: No, but it's 10-50x faster with GPU. CPU-only works
but is slower.

**Q: How much RAM do I need?** A: Minimum 4GB. Recommended: 8GB+. See
model-specific requirements above.

**Q: Can I use multiple models?** A: Yes! Download multiple models and switch
between them.

**Q: What about "GPT OSS"?** A: We include open-source GPT-quality models like
Mixtral 8x7B and Qwen 2.5 14B!

---

## Support

For issues with Ollama models:

1. Check Ollama is running: `ollama serve`
2. Test model manually: `ollama run llama3.2:1b "Hello"`
3. Check disk space
4. Check RAM usage

For HiveCode issues:

- GitHub: https://github.com/A1cy/HiveCodeCli/issues
