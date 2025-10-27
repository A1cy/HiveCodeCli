# MHG AI - AWS Bedrock Models Guide

## 10 Available Premium Models

HiveCode's **MHG AI provider** offers **10 curated AWS Bedrock models** from
Amazon and Meta, powered by AWS infrastructure.

---

## 🌟 What is MHG AI?

**MHG AI** is HiveCode's premium AI provider powered by **AWS Bedrock**
infrastructure. Unlike the free Ollama models that run locally, MHG AI models
run on AWS's cloud infrastructure, providing:

- **Instant availability** - No downloads required
- **Premium quality** - State-of-the-art models from Amazon and Meta
- **Multimodal capabilities** - Text, image, and video understanding
- **Creative generation** - Image and video generation models
- **No restart required** - Switch models instantly

---

## ⚡ FAST MODELS (Text-only, Lightweight)

### 1. Amazon Nova Micro ⭐ Fastest

- **Model ID**: `amazon.nova-micro-v1:0`
- **Capabilities**: Text only
- **Best for**: Quick responses, simple queries, high-speed interactions
- **Use cases**: Basic Q&A, quick explanations, simple code snippets

### 2. Meta Llama 3.2 1B

- **Model ID**: `meta.llama3-2-1b-instruct-v1:0`
- **Provider**: Meta
- **Capabilities**: Text only
- **Best for**: Low-latency responses, resource-efficient processing
- **Use cases**: Fast prototyping, simple tasks

### 3. Meta Llama 3.2 3B

- **Model ID**: `meta.llama3-2-3b-instruct-v1:0`
- **Provider**: Meta
- **Capabilities**: Text only
- **Best for**: Balanced speed and quality for text tasks
- **Use cases**: Code review, documentation, technical writing

---

## 🎯 BALANCED MODELS (General Purpose)

### 4. Amazon Nova Lite ⭐ Recommended

- **Model ID**: `amazon.nova-lite-v1:0`
- **Provider**: Amazon
- **Capabilities**: **Multimodal** - Text + Image + Video input
- **Best for**: Most users, general-purpose tasks with media support
- **Use cases**:
  - Code generation with diagrams
  - Understanding screenshots
  - Analyzing video content
  - Complex reasoning with visual context

### 5. Amazon Nova Pro

- **Model ID**: `amazon.nova-pro-v1:0`
- **Provider**: Amazon
- **Capabilities**: **Multimodal** - Text + Image + Video input
- **Best for**: Advanced reasoning with multimodal inputs
- **Use cases**:
  - Complex architectural diagrams
  - Video content analysis
  - Multi-modal code generation
  - Advanced problem solving

### 6. Meta Llama 3 8B

- **Model ID**: `meta.llama3-8b-instruct-v1:0`
- **Provider**: Meta
- **Capabilities**: Text only
- **Best for**: Balanced performance, Meta's flagship 8B model
- **Use cases**: Code generation, debugging, refactoring

### 7. Meta Llama 3.1 8B

- **Model ID**: `meta.llama3-1-8b-instruct-v1:0`
- **Provider**: Meta
- **Capabilities**: Text only
- **Best for**: Latest improvements over Llama 3
- **Use cases**: Enhanced coding, better reasoning

---

## 🖼️ MULTIMODAL MODELS

### 8. Meta Llama 3.2 11B Vision

- **Model ID**: `meta.llama3-2-11b-instruct-v1:0`
- **Provider**: Meta
- **Capabilities**: **Multimodal** - Text + Image input
- **Best for**: Vision-based tasks, understanding images with text
- **Use cases**:
  - UI/UX analysis from screenshots
  - Diagram interpretation
  - Code from wireframes
  - Visual debugging

---

## 🎨 CREATIVE MODELS (Generation)

### 9. Amazon Nova Canvas

- **Model ID**: `amazon.nova-canvas-v1:0`
- **Provider**: Amazon
- **Capabilities**: **Image generation**
- **Best for**: Creating images from text descriptions
- **Use cases**:
  - UI mockups
  - Icon generation
  - Diagram creation
  - Visual assets

### 10. Amazon Nova Reel

- **Model ID**: `amazon.nova-reel-v1:0`
- **Provider**: Amazon
- **Capabilities**: **Video generation**
- **Best for**: Generating short videos from prompts
- **Use cases**:
  - Animated tutorials
  - Demo videos
  - Visual explanations
  - Marketing content

---

## Quick Selection Guide

### For Quick Responses

→ **Amazon Nova Micro** (fastest)

### For General Development

→ **Amazon Nova Lite** (recommended - multimodal)

### For Image Understanding

→ **Meta Llama 3.2 11B Vision**

### For Advanced Reasoning

→ **Amazon Nova Pro** (multimodal)

### For Pure Code Generation

→ **Meta Llama 3.1 8B**

### For Image Creation

→ **Amazon Nova Canvas**

### For Video Creation

→ **Amazon Nova Reel**

---

## Key Differences: MHG AI vs Ollama

| Feature              | MHG AI (AWS Bedrock) | Ollama (Free)      |
| -------------------- | -------------------- | ------------------ |
| **Cost**             | Paid/Premium         | 100% Free          |
| **Location**         | AWS Cloud            | Local PC           |
| **Download**         | Not required         | Required           |
| **Internet**         | Required             | Not after download |
| **Multimodal**       | Yes (images, video)  | Limited            |
| **Model Switching**  | Instant              | Restart required   |
| **Image Generation** | Yes (Nova Canvas)    | No                 |
| **Video Generation** | Yes (Nova Reel)      | No                 |
| **Hardware Needs**   | None (cloud)         | Varies by model    |
| **Quality**          | Premium              | Excellent (free)   |

---

## Usage Examples

### Switching to MHG AI

```bash
# In HiveCode terminal
/mhgModelSelector
```

### Selecting a Model

Use arrow keys to navigate through the 10 models, press Enter to select.

Models are organized by:

- ⚡ Fast models (lightweight, quick responses)
- 🎯 Balanced models (general purpose)
- 🖼️ Multimodal models (vision capabilities)
- 🎨 Creative models (generation)

### After Selection

- **No restart needed** - Model switches immediately
- **No download wait** - Instant availability
- Switch models anytime with `/mhgModelSelector`

---

## Model Categories Explained

### ⚡ Fast Models

- **Purpose**: Speed over complexity
- **When to use**: Quick questions, simple tasks
- **Trade-off**: Faster but less capable than balanced models

### 🎯 Balanced Models

- **Purpose**: Best overall performance
- **When to use**: Most development tasks
- **Trade-off**: Balance of speed and quality

### 🖼️ Multimodal Models

- **Purpose**: Understanding images, video, and text together
- **When to use**: UI analysis, screenshot debugging, visual tasks
- **Trade-off**: Slightly slower but can "see" images

### 🎨 Creative Models

- **Purpose**: Generating visual content
- **When to use**: Creating images or videos
- **Trade-off**: Specialized for generation, not for understanding

---

## Multimodal Capabilities

### What is Multimodal?

Multimodal models can understand **both text and images** (or video) in the same
conversation.

### Supported Multimodal Models:

1. **Amazon Nova Lite** - Text + Image + Video input
2. **Amazon Nova Pro** - Text + Image + Video input
3. **Meta Llama 3.2 11B** - Text + Image input

### Example Use Cases:

- Show a screenshot of an error and ask for help
- Provide a UI mockup and ask for implementation
- Share a diagram and ask for explanation
- Upload a code screenshot and ask for improvements

---

## FAQs

**Q: How much does MHG AI cost?** A: MHG AI uses a pre-configured AWS Bedrock
account. Costs are handled by the service provider. Check with your organization
for specific pricing.

**Q: Can I use my own AWS Bedrock account?** A: Currently, MHG AI uses a shared
pre-configured account. Custom AWS accounts may be supported in future releases.

**Q: Do I need to restart HiveCode when switching models?** A: No! Unlike
Ollama, MHG AI model switches take effect immediately.

**Q: Which model should I choose?** A: Start with **Amazon Nova Lite**
(recommended) for the best balance of speed, quality, and multimodal
capabilities.

**Q: Can I use MHG AI offline?** A: No, MHG AI requires internet connection as
models run on AWS infrastructure.

**Q: What's the difference between Nova Lite and Nova Pro?** A: Nova Pro has
more advanced reasoning capabilities and handles complex multimodal tasks
better. Nova Lite is faster and suitable for most tasks.

**Q: Can I generate images with text models?** A: No, use **Amazon Nova Canvas**
for image generation. Text models are for understanding and generating text.

**Q: Are these models as good as Ollama's free models?** A: MHG AI models offer
premium quality with additional features like multimodal support and generation
capabilities. Ollama offers excellent quality for free but without cloud
infrastructure benefits.

---

## Support

For issues with MHG AI models:

1. Verify internet connection
2. Try a different model (use `/mhgModelSelector`)
3. Check for service status updates
4. Contact support if issues persist

For HiveCode issues:

- GitHub: https://github.com/A1cy/HiveCodeCli/issues

---

**MHG AI** - Premium AI models powered by AWS Bedrock **HiveCode** - 100% Free
Agentic AI Development System
