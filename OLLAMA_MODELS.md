# HiveCode Ollama Models Guide

## 32 Available Models - Updated with GPT OSS

HiveCode now includes **32 carefully curated Ollama models** organized by
category, including multiple **GPT Open Source** alternatives!

---

## ⚡ LIGHTWEIGHT MODELS (< 2GB)

**Best for**: Slow PCs, limited RAM, quick responses

### 1. Llama 3.2 1B (Fastest ⭐)

- **Size**: 1.3GB
- **RAM**: 4GB minimum
- **CPU**: Any CPU
- **Speed**: Fastest inference
- **Best for**: Quick responses, basic tasks, any PC
- **Command**: `ollama pull llama3.2:1b`

### 2. Phi 3 Mini

- **Size**: 2.3GB
- **RAM**: 4-6GB
- **CPU**: Mid-range CPU
- **Speed**: Very fast
- **Best for**: Reasoning tasks, efficient processing
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:mini`

### 3. Gemma 2B

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

### 4. Qwen 2.5 3B (Recommended ⭐)

- **Size**: 2.1GB
- **RAM**: 6GB minimum
- **CPU**: Mid-range CPU
- **Speed**: Fast
- **Best for**: General coding, best overall balance
- **Command**: `ollama pull qwen2.5:3b`

### 5. Llama 3.2 3B

- **Size**: 2.0GB
- **RAM**: 6GB minimum
- **CPU**: Mid-range CPU
- **Speed**: Fast
- **Best for**: Conversations, general tasks
- **Provider**: Meta
- **Command**: `ollama pull llama3.2:3b`

### 6. Mistral 7B (GPT OSS)

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: GPT-quality OSS, instruction following, complex tasks
- **Note**: Very popular, excellent quality
- **Command**: `ollama pull mistral:7b`

### 7. Phi 3 Medium

- **Size**: 7.9GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Strong reasoning, complex problems
- **Provider**: Microsoft
- **Command**: `ollama pull phi3:medium`

---

## 🔓 GPT OSS MODELS - Open Source GPT Alternatives

**Best for**: Users seeking GPT-3.5/GPT-4 quality without API costs

### 8. Vicuna 7B (GPT-3.5 Quality)

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: GPT-3.5 quality conversations, fine-tuned from Llama
- **Note**: Chat optimized, very natural responses
- **Command**: `ollama pull vicuna:7b`

### 9. Orca Mini 7B (GPT-3.5 Quality)

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: GPT-3.5 quality reasoning, Microsoft Orca training
- **Note**: Excellent at explanation and reasoning
- **Command**: `ollama pull orca-mini:7b`

### 10. WizardLM 7B (GPT Quality)

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Complex instructions, problem solving
- **Note**: GPT-quality open source alternative
- **Command**: `ollama pull wizardlm:7b`

### 11. Nous Hermes 2 10.7B (GPT-4 Quality)

- **Size**: 6.4GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Best for**: GPT-4 quality reasoning, long context
- **Note**: Advanced reasoning capabilities
- **Command**: `ollama pull nous-hermes2:10.7b`

### 12. Dolphin Mixtral 8x7B (GPT-4 Quality)

- **Size**: 26GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Best for**: GPT-4 quality, uncensored, excellent reasoning
- **Note**: Mixture of experts, very powerful
- **Command**: `ollama pull dolphin-mixtral:8x7b`

### 13. Solar 10.7B (GPT Quality)

- **Size**: 6.1GB
- **RAM**: 12GB minimum
- **CPU**: Good CPU
- **Best for**: GPT-quality performance, strong capabilities
- **Provider**: Upstage AI
- **Command**: `ollama pull solar:10.7b`

### 14. Yi 6B (GPT Quality)

- **Size**: 3.5GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: Multilingual (Chinese & English), GPT-quality
- **Note**: Excellent for multilingual tasks
- **Command**: `ollama pull yi:6b`

---

## 💻 CODING SPECIALISTS (3-8GB)

**Best for**: Software development, debugging, code generation

### 15. Qwen 2.5 Coder 7B (Top Coder ⭐)

- **Size**: 4.7GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Code generation, debugging, refactoring
- **Note**: #1 coding model currently
- **Command**: `ollama pull qwen2.5-coder:7b`

### 16. DeepSeek Coder 6.7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium-Fast
- **Best for**: Code understanding, completion
- **Note**: Excellent at code comprehension
- **Command**: `ollama pull deepseek-coder:6.7b`

### 17. CodeLlama 7B

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: General coding, debugging
- **Provider**: Meta
- **Command**: `ollama pull codellama:7b`

### 18. StarCoder2 7B

- **Size**: 4.0GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Multi-language coding (600+ languages)
- **Note**: Great for rare languages
- **Command**: `ollama pull starcoder2:7b`

### 19. WizardCoder 7B (GPT OSS)

- **Size**: 3.8GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Best for**: GPT-quality code generation, complex algorithms
- **Note**: Excellent for complex coding tasks
- **Command**: `ollama pull wizardcoder:7b`

---

## 🚀 HIGH-QUALITY MODELS (8GB+)

**Best for**: Best quality output, powerful systems

### 20. Llama 3.1 8B

- **Size**: 4.7GB
- **RAM**: 10GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Excellent reasoning, long context
- **Provider**: Meta
- **Note**: Flagship quality
- **Command**: `ollama pull llama3.1:8b`

### 21. Llama 3.1 70B (GPT-4 Class ⭐)

- **Size**: 40GB
- **RAM**: 48GB minimum
- **CPU**: High-end CPU + GPU required
- **Speed**: Slow (needs GPU)
- **Best for**: GPT-4 quality open source, exceptional reasoning
- **Provider**: Meta
- **Note**: Meta's flagship, rivals GPT-4
- **Warning**: ⚠️ Only for very powerful PCs
- **Command**: `ollama pull llama3.1:70b`

### 22. Qwen 2.5 14B

- **Size**: 9.0GB
- **RAM**: 16GB minimum
- **CPU**: Good CPU
- **Speed**: Slow
- **Best for**: High quality responses, advanced reasoning
- **Note**: Needs powerful PC
- **Command**: `ollama pull qwen2.5:14b`

### 23. Qwen 2.5 32B (GPT-4 Class)

- **Size**: 19GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Best for**: GPT-4 quality, top-tier performance, long context
- **Note**: Exceptional quality
- **Warning**: ⚠️ Needs powerful system
- **Command**: `ollama pull qwen2.5:32b`

### 24. Mixtral 8x7B (GPT-4 Class ⭐)

- **Size**: 26GB
- **RAM**: 32GB minimum
- **CPU**: High-end CPU/GPU
- **Speed**: Very slow (without GPU)
- **Best for**: GPT-4 quality open source
- **Note**: Mixture of Experts architecture
- **Warning**: ⚠️ Only for very powerful PCs
- **Command**: `ollama pull mixtral:8x7b`

### 25. Mixtral 8x22B (GPT-4+ Class)

- **Size**: 80GB
- **RAM**: 96GB+ minimum
- **CPU**: High-end GPU required
- **Best for**: Best GPT OSS available, surpasses GPT-4
- **Note**: State-of-the-art open source model
- **Warning**: ⚠️⚠️ Requires server-grade hardware
- **Command**: `ollama pull mixtral:8x22b`

---

## 💬 SPECIALIZED CHAT MODELS

**Best for**: Conversation, dialogue, friendly interaction

### 26. Neural Chat 7B

- **Size**: 4.1GB
- **RAM**: 8GB minimum
- **CPU**: Good CPU
- **Speed**: Medium
- **Best for**: Natural conversations, helpful responses
- **Command**: `ollama pull neural-chat:7b`

### 27. OpenChat 7B

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
- **GPT OSS**: Vicuna 7B, Orca Mini 7B
- **Coding**: DeepSeek Coder 6.7B
- **Chat**: Mistral 7B

### 🚀 Good PC (16GB+ RAM)

- **Best Quality**: Qwen 2.5 14B
- **GPT OSS**: Nous Hermes 2 10.7B, Solar 10.7B
- **Coding**: Qwen 2.5 Coder 7B
- **General**: Llama 3.1 8B

### 💪 Powerful PC (32GB+ RAM, GPU)

- **Top Quality**: Mixtral 8x7B, Qwen 2.5 32B
- **GPT OSS**: Dolphin Mixtral 8x7B
- **Best Overall**: Llama 3.1 70B

### 🏆 Server/Workstation (96GB+ RAM, High-end GPU)

- **Best GPT OSS**: Mixtral 8x22B

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

### 🔓 GPT OSS (Open Source GPT)

- GPT-3.5 to GPT-4+ quality
- 100% free forever
- No API costs
- Privacy-preserving (runs locally)
- Community-driven development

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

## GPT OSS vs ChatGPT Comparison

| Feature        | GPT OSS (Ollama) | ChatGPT/GPT-4  |
| -------------- | ---------------- | -------------- |
| Cost           | 100% Free        | $20+/month     |
| Privacy        | 100% Local       | Data sent away |
| Speed (GPU)    | Very Fast        | Network delay  |
| Speed (CPU)    | Slow-Medium      | Fast           |
| Internet       | Not required     | Required       |
| Quality (7B)   | GPT-3.5 level    | GPT-3.5        |
| Quality (70B+) | GPT-4 level      | GPT-4          |
| Customization  | Full control     | Limited        |
| Rate Limits    | None             | Yes            |
| Censorship     | Optional         | Yes            |

---

## PC Requirements by Model Tier

### Minimum Specs

- **Lightweight (1-2GB models)**: 4GB RAM, any CPU, no GPU needed
- **Mid-tier (2-8GB models)**: 8GB RAM, mid-range CPU, GPU optional
- **Large (8-20GB models)**: 16GB RAM, good CPU, GPU recommended
- **Huge (20-40GB models)**: 32GB RAM, high-end CPU, GPU required
- **Massive (40GB+ models)**: 48GB+ RAM, powerful GPU required

### GPU Recommendations

- **For 7B models**: GTX 1660 or better (6GB VRAM)
- **For 13B models**: RTX 3060 or better (12GB VRAM)
- **For 30B models**: RTX 3090 or better (24GB VRAM)
- **For 70B+ models**: A100 or H100 (40-80GB VRAM)

---

## Installation Tips

### Download Time Estimates

- **1-2GB models**: 1-5 minutes (fast internet)
- **3-5GB models**: 5-15 minutes
- **8-10GB models**: 15-30 minutes
- **20-30GB models**: 30-60 minutes
- **40GB+ models**: 1-3 hours

### Disk Space Requirements

Always have **2x the model size** free:

- Example: For a 5GB model, have 10GB free space

### First Run

Models are slower on first run while loading into memory. Subsequent runs are
faster.

---

## GPT OSS Model Quality Tiers

### GPT-3.5 Quality (7B models)

- Vicuna 7B
- Orca Mini 7B
- WizardLM 7B
- Mistral 7B

### GPT-4 Quality (10-30B models)

- Nous Hermes 2 10.7B
- Solar 10.7B
- Qwen 2.5 32B
- Dolphin Mixtral 8x7B
- Mixtral 8x7B

### GPT-4+ Quality (70B+ models)

- Llama 3.1 70B
- Mixtral 8x22B

---

## FAQs

**Q: Which model should I choose?** A: Start with Qwen 2.5 3B (recommended).
It's the best balance for most users. For GPT OSS, try Vicuna 7B or Mistral 7B.

**Q: What is GPT OSS?** A: GPT Open Source models are free alternatives to
ChatGPT that run on your PC. They offer GPT-3.5 to GPT-4 quality without any
costs.

**Q: Can I switch models later?** A: Yes! Use `/ollamaModelSelector` anytime.

**Q: Do I need a GPU?** A: No, but it's 10-50x faster with GPU. CPU-only works
but is slower.

**Q: How much RAM do I need?** A: Minimum 4GB. Recommended: 8GB+. See
model-specific requirements above.

**Q: Can I use multiple models?** A: Yes! Download multiple models and switch
between them.

**Q: Are GPT OSS models as good as ChatGPT?** A: Yes! 7B models match GPT-3.5,
and 70B+ models match or exceed GPT-4 quality.

**Q: Will my data stay private?** A: Yes! All GPT OSS models run 100% locally on
your PC. Nothing is sent to the cloud.

---

## Support

For issues with Ollama models:

1. Check Ollama is running: `ollama serve`
2. Test model manually: `ollama run llama3.2:1b "Hello"`
3. Check disk space
4. Check RAM usage

For HiveCode issues:

- GitHub: https://github.com/A1cy/HiveCodeCli/issues
