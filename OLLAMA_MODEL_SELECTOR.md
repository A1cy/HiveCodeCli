# Ollama Model Selector

## Overview

Interactive model selection dialog for Ollama users to choose and download AI
models based on their system capabilities.

## Features

✅ **Interactive Selection**: Browse recommended models with descriptions ✅
**Auto-Download**: Automatically downloads models if not installed ✅ **Progress
Tracking**: Real-time download progress with status updates ✅ **Smart
Recommendations**: Models categorized by system requirements ✅ **Installed
Indicators**: Shows which models are already available

## Available Models

### 1. Llama 3.2 1B (Recommended) - Lightweight

- **Size**: 1.3GB
- **Description**: Smallest & fastest - Great for basic tasks, works on any PC
- **Best for**: Low-end systems, quick responses, basic coding tasks
- **Model name**: `llama3.2:1b`

### 2. Qwen 2.5 3B - Mid-tier

- **Size**: 2.1GB
- **Description**: Balanced performance - Good for general coding tasks
- **Best for**: Average systems, balanced speed and quality
- **Model name**: `qwen2.5:3b`

### 3. Qwen 2.5 Coder 7B - Large

- **Size**: 4.7GB
- **Description**: Best coding quality - Requires good PC with 8GB+ RAM
- **Best for**: High-end systems, best code quality
- **Model name**: `qwen2.5-coder:7b`

### 4. DeepSeek Coder 6.7B - Mid-tier

- **Size**: 3.8GB
- **Description**: Excellent for code - Good balance of speed and quality
- **Best for**: Mid to high-end systems, specialized coding
- **Model name**: `deepseek-coder:6.7b`

## How to Use

### Option 1: From Slash Command

```bash
/ollamaModelSelector
```

This opens the interactive model selector where you can:

1. Browse available models
2. See which models are already installed (marked with ✓)
3. Select a model to download/use
4. View model details (size, description, requirements)

### Option 2: During First Authentication

When you select "Use Ollama (100% Free)" during initial setup, you'll
automatically be prompted to select a model.

### Option 3: Via Environment Variable

```bash
export OLLAMA_MODEL=llama3.2:1b
hivecode
```

## UI Preview

```
┌──────────────────────────────────────────────────────────────┐
│ 🐝 Select Ollama Model                                       │
│                                                              │
│ Choose a model based on your system capabilities:            │
│                                                              │
│   1. Llama 3.2 1B (Recommended) ✓ Installed                 │
│ ● 2. Qwen 2.5 3B                                             │
│   3. Qwen 2.5 Coder 7B                                       │
│   4. DeepSeek Coder 6.7B                                     │
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ Qwen 2.5 3B                                            │  │
│ │ Balanced performance - Good for general coding tasks   │  │
│ │ Size: 2.1GB                                            │  │
│ └────────────────────────────────────────────────────────┘  │
│                                                              │
│ (Use ↑↓ to navigate, Enter to select, Esc to cancel)        │
│ ✓ Models with checkmark are already installed               │
└──────────────────────────────────────────────────────────────┘
```

### During Download:

```
┌──────────────────────────────────────────────────────────────┐
│ Downloading Qwen 2.5 3B                                      │
│ Size: 2.1GB - This may take a few minutes...                │
│                                                              │
│ ⠋ Downloading layer 1/8 (45.2%)                              │
│                                                              │
│ Please wait, do not interrupt the download                   │
└──────────────────────────────────────────────────────────────┘
```

## System Requirements

### Minimum (Lightweight Models)

- **CPU**: Any modern CPU
- **RAM**: 4GB+
- **Disk**: 2GB free space
- **Recommended model**: Llama 3.2 1B

### Recommended (Mid-tier Models)

- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Disk**: 5GB free space
- **Recommended models**: Qwen 2.5 3B, DeepSeek Coder 6.7B

### High-End (Large Models)

- **CPU**: 6+ cores or GPU
- **RAM**: 16GB+
- **Disk**: 10GB free space
- **Recommended model**: Qwen 2.5 Coder 7B

## Configuration

The selected model is saved to your HiveCode settings:

```json
{
  "security": {
    "auth": {
      "selectedType": "ollama",
      "ollamaModel": "llama3.2:1b"
    }
  }
}
```

Location: `~/.hivecode/settings.json`

## Troubleshooting

### Model Download Fails

1. Check Ollama is running: `ollama serve`
2. Check internet connection
3. Try manual download: `ollama pull llama3.2:1b`

### "Cannot connect to Ollama"

1. Ensure Ollama is installed: https://ollama.ai
2. Start Ollama server: `ollama serve`
3. Check if running: `curl http://localhost:11434/api/tags`

### Model Too Slow

1. Switch to a smaller model (Llama 3.2 1B)
2. Close other applications to free RAM
3. Consider using cloud options (Gemini API Key)

## Technical Details

### Model Selection Flow

1. User selects Ollama authentication
2. Model selector dialog opens
3. CLI checks installed models via Ollama API
4. User browses and selects a model
5. If not installed, CLI downloads with progress
6. Selected model saved to settings
7. Auth flow continues with selected model

### API Endpoints Used

- `GET /api/tags` - List installed models
- `POST /api/pull` - Download models (streaming)
- `POST /api/generate` - Generate responses

### Files Modified

- `packages/cli/src/ui/auth/OllamaModelSelector.tsx` - New model selector
  component
- `packages/cli/src/ui/components/DialogManager.tsx` - Integration point
- `packages/core/src/index.ts` - Export Ollama client
- `packages/core/src/providers/ollama-client.ts` - HTTP client with download
  support

## Future Enhancements

- [ ] Add GPU detection and recommendations
- [ ] Show estimated inference speed per model
- [ ] Allow custom model URLs
- [ ] Add model benchmarks/comparisons
- [ ] Support for quantized models (Q4, Q8)
- [ ] Model update notifications
