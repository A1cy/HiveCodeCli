# HiveCode Ollama Models Guide

## 34 Available Models - Including OpenAI GPT-OSS

HiveCode now includes **34 carefully curated Ollama models** organized by
category, including **OpenAI's official GPT-OSS** open-weight models!

---

## 🤖 GPT-OSS (OpenAI Official Open-Weight)

**OpenAI's official open-source models** - Licensed under Apache 2.0

### 1. GPT-OSS 20B (Official)

- **Size**: 14GB
- **RAM**: 16GB minimum
- **CPU**: Good CPU
- **Context**: 128K tokens
- **Features**: Agentic capabilities, function calling, chain-of-thought
  reasoning
- **Best for**: Powerful reasoning, agentic tasks, versatile development
- **Provider**: OpenAI (official)
- **License**: Apache 2.0
- **Command**: `ollama pull gpt-oss:20b`

### 2. GPT-OSS 120B (Flagship)

- **Size**: 65GB
- **RAM**: 80GB GPU minimum
- **CPU**: High-end GPU required
- **Context**: 128K tokens
- **Features**: Full agentic capabilities, configurable reasoning effort
- **Best for**: State-of-the-art reasoning, complex tasks
- **Provider**: OpenAI (official)
- **License**: Apache 2.0
- **Note**: Requires server-grade hardware
- **Command**: `ollama pull gpt-oss:120b`

---

## ⚡ LIGHTWEIGHT MODELS (< 2GB)

**Best for**: Slow PCs, limited RAM, quick responses

### 3. Llama 3.2 1B (Fastest ⭐)

- **Size**: 1.3GB
- **RAM**: 4GB minimum
- **CPU**: Any CPU
- **Speed**: Fastest inference
- **Best for**: Quick responses, basic tasks, any PC
- **Command**: `ollama pull llama3.2:1b`

### 4. Phi 3 Mini

- **Size**: 2.3GB
- **RAM**: 4-6GB
- **CPU**: Mid-range CPU
- **Speed**: Very fast
- **Best for**: Reasoning tasks, efficient processing
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:mini`

### 5. Gemma 2B

- **Size**: 1.7GB
- **RAM**: 4GB minimum
- **CPU**: Any CPU
- **Speed**: Very fast
- **Best for**: Chat, conversation, lightweight tasks
- **Provider**: Google
- **Command**: `ollama pull gemma:2b`

---

## 🎯 MID-TIER MODELS (2-5GB)

**Best for**: Average systems, balanced performance

### 6. Qwen 2.5 3B (Recommended ⭐)

- **Size**: 2.1GB
- **RAM**: 6GB minimum
- **CPU**: Mid-range CPU
- **Speed**: Fast
- **Best for**: General coding, best overall balance
- **Command**: `ollama pull qwen2.5:3b`

### 7. Llama 3.2 3B

- **Size**: 2.0GB
- **RAM**: 6GB minimum
- **CPU**: Mid-range CPU
- **Speed**: Fast
- **Best for**: Conversations, general tasks
- **Provider**: Meta
- **Command**: `ollama pull llama3.2:3b`

### 8. Mistral 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Instruction following, complex tasks
- **Note**: Very popular, excellent quality
- **Command**: `ollama pull mistral:7b`

### 9. Phi 3 Medium

- **Size**: 7.9GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Strong reasoning, complex problems
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:medium`

---

## 🔓 POPULAR OPEN SOURCE MODELS

**Best for**: Users seeking high-quality open-source alternatives

### 10. Vicuna 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Chat optimization, natural conversations
- **Note**: Fine-tuned from Llama
- **Command**: `ollama pull vicuna:7b`

### 11. Orca Mini 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Reasoning and explanations
- **Provider**: Microsoft research
- **Command**: `ollama pull orca-mini:7b`

### 12. WizardLM 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Complex instructions, problem solving
- **Command**: `ollama pull wizardlm:7b`

### 13. Nous Hermes 2 10.7B

- **Size**: 6.4GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Best for**: Advanced reasoning, long context
- **Command**: `ollama pull nous-hermes2:10.7b`

### 14. Dolphin Mixtral 8x7B

- **Size**: 26GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Best for**: Uncensored conversations, excellent reasoning
- **Note**: Mixture of experts architecture
- **Command**: `ollama pull dolphin-mixtral:8x7b`

### 15. Solar 10.7B

- **Size**: 6.1GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Best for**: Well-balanced performance
- **Provider**: Upstage AI
- **Command**: `ollama pull solar:10.7b`

### 16. Yi 6B

- **Size**: 3.5GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Multilingual (Chinese & English)
- **Command**: `ollama pull yi:6b`

---

## 💻 CODING SPECIALISTS (3-8GB)

**Best for**: Software development, debugging, code generation

### 17. Qwen 2.5 Coder 7B (Top Coder ⭐)

- **Size**: 4.7GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Code generation, debugging, refactoring
- **Note**: #1 coding model currently
- **Command**: `ollama pull qwen2.5-coder:7b`

### 18. DeepSeek Coder 6.7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium-Fast
- **Best for**: Code understanding, completion
- **Note**: Excellent at code comprehension
- **Command**: `ollama pull deepseek-coder:6.7b`

### 19. CodeLlama 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: General coding, debugging
- **Provider**: Meta
- **Command**: `ollama pull codellama:7b`

### 20. StarCoder2 7B

- **Size**: 4.0GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Multi-language coding (600+ languages)
- **Note**: Great for rare languages
- **Command**: `ollama pull starcoder2:7b`

### 21. WizardCoder 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Complex code generation
- **Command**: `ollama pull wizardcoder:7b`

---

## 🚀 HIGH-QUALITY MODELS (8GB+)

**Best for**: Best quality output, powerful systems

### 22. Llama 3.1 8B

- **Size**: 4.7GB
- **RAM**: 10GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Excellent reasoning, long context
- **Provider**: Meta
- **Note**: Flagship quality
- **Command**: `ollama pull llama3.1:8b`

### 23. Llama 3.1 70B

- **Size**: 40GB
- **RAM**: 48GB minimum
- **CPU**: High-end CPU + GPU required
- **Speed**: Slow (needs GPU)
- **Best for**: Exceptional reasoning, rivals GPT-4
- **Provider**: Meta
- **Warning**: ⚠️ Only for very powerful PCs
- **Command**: `ollama pull llama3.1:70b`

### 24. Qwen 2.5 14B

- **Size**: 9.0GB
- **RAM**: 16GB minimum
- **CPU**: Good CPU
- **Speed**: Slow
- **Best for**: High quality responses, advanced reasoning
- **Note**: Needs powerful PC
- **Command**: `ollama pull qwen2.5:14b`

### 25. Qwen 2.5 32B

- **Size**: 19GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Best for**: Top-tier performance, long context
- **Note**: Exceptional quality
- **Warning**: ⚠️ Needs powerful system
- **Command**: `ollama pull qwen2.5:32b`

### 26. Mixtral 8x7B

- **Size**: 26GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Speed**: Very slow (without GPU)
- **Best for**: Exceptional performance
- **Note**: Mixture of Experts architecture
- **Warning**: ⚠️ Only for very powerful PCs
- **Command**: `ollama pull mixtral:8x7b`

### 27. Mixtral 8x22B

- **Size**: 80GB
- **RAM**: 96GB+ minimum
- **CPU**: High-end GPU required
- **Best for**: State-of-the-art open source
- **Note**: Best open-source model available
- **Warning**: ⚠️⚠️ Requires server-grade hardware
- **Command**: `ollama pull mixtral:8x22b`

---

## 💬 SPECIALIZED CHAT MODELS

**Best for**: Conversation, dialogue, friendly interaction

### 28. Neural Chat 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Natural conversations, helpful responses
- **Command**: `ollama pull neural-chat:7b`

### 29. OpenChat 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
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
- **Open Source**: Vicuna 7B, Orca Mini 7B
- **Coding**: DeepSeek Coder 6.7B
- **Chat**: Mistral 7B

### 🚀 Good PC (16GB+ RAM)

- **Best Quality**: Qwen 2.5 14B
- **OpenAI Official**: GPT-OSS 20B
- **Open Source**: Nous Hermes 2 10.7B, Solar 10.7B
- **Coding**: Qwen 2.5 Coder 7B
- **General**: Llama 3.1 8B

### 💪 Powerful PC (32GB+ RAM, GPU)

- **Top Quality**: Mixtral 8x7B, Qwen 2.5 32B
- **Open Source**: Dolphin Mixtral 8x7B
- **Best Overall**: Llama 3.1 70B

### 🏆 Server/Workstation (80GB+ GPU)

- **OpenAI Official**: GPT-OSS 120B
- **Open Source**: Mixtral 8x22B

---

## Model Categories Explained

### 🤖 GPT-OSS (OpenAI Official)

- OpenAI's official open-weight models
- Apache 2.0 license - build freely
- 128K context window
- Agentic capabilities (function calling, web browsing, Python)
- Full chain-of-thought reasoning
- Fine-tuning support

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

### 🔓 Open Source

- Community-driven development
- Free to use and modify
- High quality alternatives
- Various specializations

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

## GPT-OSS vs ChatGPT/GPT-4

| Feature           | GPT-OSS (Ollama) | ChatGPT/GPT-4     |
| ----------------- | ---------------- | ----------------- |
| Provider          | OpenAI           | OpenAI            |
| License           | Apache 2.0       | Proprietary       |
| Cost              | 100% Free        | $20+/month        |
| Privacy           | 100% Local       | Data sent to APIs |
| Internet          | Not required     | Required          |
| Context Window    | 128K tokens      | 128K tokens       |
| Agentic Abilities | Yes              | Yes               |
| Function Calling  | Yes              | Yes               |
| Customization     | Full (fine-tune) | Limited           |
| Rate Limits       | None             | Yes               |
| Hardware Required | 16GB+ RAM        | None (cloud)      |
| Quality           | Comparable       | GPT-4 level       |

---

## PC Requirements by Model Tier

### Minimum Specs

- **Lightweight (1-2GB models)**: 4GB RAM, any CPU, no GPU needed
- **Mid-tier (2-8GB models)**: 8GB RAM, mid-range CPU, GPU optional
- **Large (8-20GB models)**: 16GB RAM, good CPU, GPU recommended
- **Huge (20-40GB models)**: 32GB RAM, high-end CPU, GPU required
- **Massive (40GB+ models)**: 48GB+ RAM, powerful GPU required
- **GPT-OSS 120B**: 80GB GPU required

### GPU Recommendations

- **For 7B models**: GTX 1660 or better (6GB VRAM)
- **For 13B models**: RTX 3060 or better (12GB VRAM)
- **For 30B models**: RTX 3090 or better (24GB VRAM)
- **For 70B models**: A100 (40GB VRAM)
- **For GPT-OSS 120B**: A100 or H100 (80GB VRAM)

---

## Installation Tips

### Download Time Estimates

- **1-2GB models**: 1-5 minutes (fast internet)
- **3-5GB models**: 5-15 minutes
- **8-10GB models**: 15-30 minutes
- **20-30GB models**: 30-60 minutes
- **40GB+ models**: 1-3 hours
- **GPT-OSS 120B (65GB)**: 2-4 hours

### Disk Space Requirements

Always have **2x the model size** free:

- Example: For a 5GB model, have 10GB free space
- For GPT-OSS 120B (65GB), have 130GB+ free

### First Run

Models are slower on first run while loading into memory. Subsequent runs are
faster.

---

## What Makes GPT-OSS Special?

### OpenAI's Official Open-Weight Models

GPT-OSS represents a partnership between **OpenAI** and **Ollama** to bring
state-of-the-art open-weight models to local deployment.

### Key Features:

1. **MXFP4 Quantization**: Efficient 4.25 bits per parameter format
2. **Apache 2.0 License**: Build freely without copyleft or patent restrictions
3. **128K Context Window**: Handle large documents and conversations
4. **Agentic Capabilities**:
   - Function calling
   - Web browsing
   - Python tool calls
5. **Chain-of-Thought Reasoning**: Configurable reasoning effort
6. **Fine-Tuning Support**: Customize for your use case
7. **Native Ollama Support**: Optimized integration, no extra quantization

### Use Cases:

- Agentic workflows and automation
- Complex reasoning tasks
- Code generation and debugging
- Long-form content analysis
- Privacy-critical applications
- Custom enterprise deployments

---

## FAQs

**Q: Which model should I choose?** A: Start with Qwen 2.5 3B (recommended).
It's the best balance for most users. For OpenAI official, try GPT-OSS 20B if
you have 16GB+ RAM.

**Q: What is GPT-OSS?** A: GPT-OSS is OpenAI's official open-weight model
collection, licensed under Apache 2.0. It's different from other open-source
models - these are official OpenAI releases with agentic capabilities.

**Q: Is GPT-OSS the same as ChatGPT?** A: No, but they're from the same company.
GPT-OSS is OpenAI's open-weight version designed for local deployment, while
ChatGPT is their cloud-based proprietary service.

**Q: Can I switch models later?** A: Yes! Use `/ollamaModelSelector` anytime.

**Q: Do I need a GPU?** A: For most models, no - but it's 10-50x faster with
GPU. GPT-OSS 120B requires an 80GB GPU.

**Q: How much RAM do I need?** A: Minimum 4GB. Recommended: 8GB+. GPT-OSS 20B
needs 16GB minimum. See model-specific requirements above.

**Q: Can I use multiple models?** A: Yes! Download multiple models and switch
between them.

**Q: Will my data stay private?** A: Yes! All models run 100% locally on your
PC. Nothing is sent to the cloud.

**Q: Can I fine-tune GPT-OSS?** A: Yes! GPT-OSS supports fine-tuning thanks to
its Apache 2.0 license and open-weight nature.

---

## Support

For issues with Ollama models:

1. Check Ollama is running: `ollama serve`
2. Test model manually: `ollama run llama3.2:1b "Hello"`
3. For GPT-OSS: `ollama run gpt-oss:20b "Hello"`
4. Check disk space (remember 2x model size)
5. Check RAM usage

For HiveCode issues:

- GitHub: https://github.com/A1cy/HiveCodeCli/issues
