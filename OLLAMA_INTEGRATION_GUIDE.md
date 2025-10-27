# 🐝 Ollama Integration Guide for HiveCode

**Status**: Phase 4 - Technical Analysis Complete
**Estimated Effort**: 4-6 hours of focused development
**Goal**: Replace Google Genai SDK with Ollama for 100% free operation

---

## 📊 Current Architecture Analysis

### Dependencies on `@google/genai` SDK

The HiveCode codebase (forked from Gemini CLI) uses `@google/genai` SDK extensively:

**Key Files Using @google/genai**:
```
packages/core/src/core/geminiChat.ts           - Main chat handler
packages/core/src/core/geminiRequest.ts        - Request formatting
packages/core/src/code_assist/converter.ts     - Response conversion
packages/core/src/routing/routingStrategy.ts   - Model routing
packages/core/src/tools/*.ts                   - Tool calling (20+ files)
```

**Core Types from SDK**:
- `GenerateContentResponse` - API response format
- `Content` - Message content structure
- `Part` - Message parts (text, function calls, etc.)
- `PartListUnion` - Union of different part types
- `FunctionDeclaration` - Tool/function definitions
- `CallableTool` - Tool execution interface

---

## 🎯 Integration Strategy

### Option 1: Adapter Pattern (Recommended)

**Create**: `packages/core/src/providers/ollama-adapter.ts`

**Purpose**: Wrap Ollama API to match @google/genai interface

**Key Components**:

1. **OllamaClient Class**
```typescript
import axios from 'axios';
import type {
  GenerateContentResponse,
  Content,
  Part,
} from '@google/genai';

export class OllamaClient {
  constructor(
    private baseUrl: string = 'http://localhost:11434',
    private model: string = 'qwen2.5-coder'
  ) {}

  async generateContent(request: Content[]): Promise<GenerateContentResponse> {
    // Convert Google Genai format → Ollama format
    const ollamaRequest = this.convertToOllamaFormat(request);

    // Call Ollama API
    const response = await axios.post(
      `${this.baseUrl}/api/generate`,
      ollamaRequest
    );

    // Convert Ollama response → Google Genai format
    return this.convertFromOllamaFormat(response.data);
  }

  async generateContentStream(
    request: Content[]
  ): AsyncGenerator<GenerateContentResponse> {
    // Similar conversion for streaming
  }

  private convertToOllamaFormat(content: Content[]): OllamaRequest {
    // Extract messages from Content[] format
    // Convert to Ollama's {prompt, system} format
  }

  private convertFromOllamaFormat(ollamaResponse: any): GenerateContentResponse {
    // Map Ollama response to Google Genai format
    return {
      candidates: [{
        content: {
          parts: [{ text: ollamaResponse.response }],
          role: 'model'
        },
        finishReason: 'STOP',
        index: 0
      }],
      usageMetadata: {
        promptTokenCount: 0, // Ollama doesn't provide this
        candidatesTokenCount: 0,
        totalTokenCount: 0
      }
    };
  }
}
```

2. **Configuration Switch**
```typescript
// packages/core/src/config/config.ts

import { OllamaClient } from '../providers/ollama-adapter.js';

export class Config {
  // Add Ollama option
  private useOllama: boolean;
  private ollamaClient?: OllamaClient;

  constructor() {
    // Check environment or config
    this.useOllama = process.env.HIVECODE_USE_OLLAMA === 'true' ||
                     process.env.GEMINI_API_KEY === undefined;

    if (this.useOllama) {
      this.ollamaClient = new OllamaClient();
    }
  }

  getClient() {
    return this.useOllama ? this.ollamaClient : this.geminiClient;
  }
}
```

3. **Model Name Mapping**
```typescript
// packages/core/src/config/models.ts

export const OLLAMA_MODEL_MAP = {
  'gemini-2.5-pro': 'qwen2.5-coder',        // 4.7GB, best coding
  'gemini-2.5-flash': 'llama3.2:3b',        // 2GB, faster
  'gemini-2.5-flash-lite': 'llama3.2:1b',   // 1.3GB, fastest
};

export function getEffectiveModel(
  isInFallbackMode: boolean,
  requestedModel: string,
  useOllama: boolean = false
): string {
  if (useOllama && OLLAMA_MODEL_MAP[requestedModel]) {
    return OLLAMA_MODEL_MAP[requestedModel];
  }

  // Original logic...
}
```

---

## 🔧 Implementation Steps

### Step 1: Create Ollama HTTP Client (1 hour)

**File**: `packages/core/src/providers/ollama-client.ts`

```typescript
import axios, { AxiosInstance } from 'axios';

export interface OllamaGenerateRequest {
  model: string;
  prompt: string;
  system?: string;
  stream?: boolean;
  options?: {
    temperature?: number;
    num_predict?: number;
    top_p?: number;
    top_k?: number;
  };
}

export interface OllamaGenerateResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  eval_duration?: number;
}

export class OllamaHttpClient {
  private client: AxiosInstance;

  constructor(baseUrl: string = 'http://localhost:11434') {
    this.client = axios.create({ baseUrl, timeout: 120000 });
  }

  async generate(request: OllamaGenerateRequest): Promise<OllamaGenerateResponse> {
    const response = await this.client.post('/api/generate', request);
    return response.data;
  }

  async checkHealth(): Promise<boolean> {
    try {
      await this.client.get('/api/tags');
      return true;
    } catch {
      return false;
    }
  }

  async listModels(): Promise<string[]> {
    const response = await this.client.get('/api/tags');
    return response.data.models?.map((m: any) => m.name) || [];
  }
}
```

### Step 2: Create Adapter (2-3 hours)

**File**: `packages/core/src/providers/ollama-adapter.ts`

```typescript
import type {
  GenerateContentResponse,
  Content,
  Part,
  GenerateContentConfig,
  SendMessageParameters,
} from '@google/genai';
import { OllamaHttpClient, OllamaGenerateRequest } from './ollama-client.js';

export class OllamaAdapter {
  private client: OllamaHttpClient;
  private model: string;

  constructor(model: string = 'qwen2.5-coder', baseUrl?: string) {
    this.client = new OllamaHttpClient(baseUrl);
    this.model = model;
  }

  async generateContent(
    request: Content[],
    config?: GenerateContentConfig
  ): Promise<GenerateContentResponse> {
    // 1. Convert Content[] to Ollama format
    const ollamaRequest = this.convertRequest(request, config);

    // 2. Call Ollama
    const ollamaResponse = await this.client.generate(ollamaRequest);

    // 3. Convert response back to Google Genai format
    return this.convertResponse(ollamaResponse);
  }

  private convertRequest(
    contents: Content[],
    config?: GenerateContentConfig
  ): OllamaGenerateRequest {
    // Extract system prompt if any
    const systemContent = contents.find(c => c.role === 'system');
    const systemPrompt = systemContent?.parts
      .filter(p => 'text' in p)
      .map(p => (p as any).text)
      .join('\n');

    // Extract user messages
    const userMessages = contents
      .filter(c => c.role === 'user')
      .map(c => c.parts
        .filter(p => 'text' in p)
        .map(p => (p as any).text)
        .join('\n')
      );

    const prompt = userMessages.join('\n');

    return {
      model: this.model,
      prompt,
      system: systemPrompt,
      stream: false,
      options: {
        temperature: config?.generationConfig?.temperature || 0.7,
        num_predict: config?.generationConfig?.maxOutputTokens || 4096,
      },
    };
  }

  private convertResponse(ollamaResponse: any): GenerateContentResponse {
    return {
      candidates: [
        {
          content: {
            parts: [{ text: ollamaResponse.response }],
            role: 'model',
          },
          finishReason: 'STOP',
          index: 0,
        },
      ],
      usageMetadata: {
        promptTokenCount: ollamaResponse.prompt_eval_count || 0,
        candidatesTokenCount: ollamaResponse.eval_count || 0,
        totalTokenCount: (ollamaResponse.prompt_eval_count || 0) + (ollamaResponse.eval_count || 0),
      },
    };
  }

  async checkConnection(): Promise<boolean> {
    return this.client.checkHealth();
  }
}
```

### Step 3: Wire into Config (30 min)

**File**: `packages/core/src/config/config.ts`

```typescript
import { OllamaAdapter } from '../providers/ollama-adapter.js';

export class Config {
  private ollamaAdapter?: OllamaAdapter;
  private useOllama: boolean;

  constructor(params: ConfigParams) {
    // Check if Ollama should be used
    this.useOllama =
      params.settings?.useOllama === true ||
      process.env.HIVECODE_USE_OLLAMA === 'true' ||
      !process.env.GEMINI_API_KEY;

    if (this.useOllama) {
      const ollamaModel = this.getOllamaModel(params.model || DEFAULT_GEMINI_MODEL);
      this.ollamaAdapter = new OllamaAdapter(
        ollamaModel,
        params.settings?.ollamaBaseUrl || 'http://localhost:11434'
      );

      console.log(`🐝 HiveCode: Using Ollama (${ollamaModel}) - 100% Free`);
    } else {
      // Original Gemini initialization
      this.geminiClient = new GeminiClient(this);
      console.log(`Using Gemini API (${params.model})`);
    }
  }

  private getOllamaModel(geminiModel: string): string {
    const mapping: Record<string, string> = {
      'gemini-2.5-pro': 'qwen2.5-coder',
      'gemini-2.5-flash': 'llama3.2:3b',
      'gemini-2.5-flash-lite': 'llama3.2:1b',
    };
    return mapping[geminiModel] || 'qwen2.5-coder';
  }

  async generateContent(
    request: Content[],
    config?: GenerateContentConfig
  ): Promise<GenerateContentResponse> {
    if (this.useOllama && this.ollamaAdapter) {
      return this.ollamaAdapter.generateContent(request, config);
    }

    // Original Gemini logic
    return this.geminiClient.generateContent(request, config);
  }
}
```

### Step 4: Update Settings Schema (15 min)

**File**: `packages/cli/src/config/settingsSchema.ts`

Add Ollama settings:
```typescript
export const settingsSchema = {
  // ... existing settings

  useOllama: {
    type: 'boolean',
    default: true,  // Default to free tier
    description: 'Use local Ollama models (100% free)',
  },

  ollamaBaseUrl: {
    type: 'string',
    default: 'http://localhost:11434',
    description: 'Ollama API base URL',
  },

  ollamaModel: {
    type: 'string',
    default: 'qwen2.5-coder',
    description: 'Ollama model to use',
    enum: ['qwen2.5-coder', 'llama3.2:3b', 'llama3.2:1b', 'codellama'],
  },
};
```

### Step 5: Test (30 min)

```bash
# 1. Ensure Ollama is running
ollama serve &
ollama pull qwen2.5-coder

# 2. Test Ollama health
curl http://localhost:11434/api/tags

# 3. Set environment
export HIVECODE_USE_OLLAMA=true

# 4. Rebuild
cd /home/a1xai/HiveCodeCli
npm run build

# 5. Test CLI
node bundle/hivecode.js -p "What is 2+2?"

# Expected: Response from Ollama qwen2.5-coder
# Cost: $0
```

---

## ⚠️ Challenges & Limitations

### 1. Tool Calling
**Challenge**: Ollama's function calling is different from Google's
**Solution**: Map tool definitions or disable tools for Ollama

### 2. Streaming
**Challenge**: Ollama streams differently
**Solution**: Implement separate streaming handler

### 3. Response Format
**Challenge**: Ollama responses are simpler
**Solution**: Adapter converts to expected format

### 4. Context Window
**Challenge**: Different models have different limits
**Solution**: Configure per-model limits

---

## 🎯 Quick Win: Manual Configuration

**For immediate testing without full adapter**:

1. **Install Ollama SDK**:
```bash
npm install ollama --save
```

2. **Create Simple Test**:
```typescript
// test-ollama.ts
import { Ollama } from 'ollama';

const ollama = new Ollama({ host: 'http://localhost:11434' });

const response = await ollama.generate({
  model: 'qwen2.5-coder',
  prompt: 'What is 2+2?',
});

console.log(response.response);
```

3. **Run**:
```bash
npx tsx test-ollama.ts
```

---

## 📊 Estimated Timeline

| Task | Time | Complexity |
|------|------|------------|
| Ollama HTTP Client | 1 hour | Low |
| Adapter Implementation | 2-3 hours | Medium |
| Config Integration | 30 min | Low |
| Settings Schema | 15 min | Low |
| Testing & Debugging | 1 hour | Medium |
| **Total** | **4-6 hours** | **Medium** |

---

## 🚀 Alternative: Fork-Specific Approach

**Simpler but less compatible**:

1. Replace `@google/genai` imports with Ollama SDK
2. Update all type references
3. Rewrite geminiChat.ts as ollamaChat.ts
4. Update 20+ tool files

**Pros**: Cleaner architecture
**Cons**: 8-10 hours work, loses Gemini fallback

---

## 📝 Next Steps

### Option A: Full Adapter (Recommended)
- Implement adapter pattern
- Maintain Google compatibility
- Keep optional Gemini fallback
- **Time**: 4-6 hours

### Option B: Quick Prototype
- Test Ollama connectivity
- Create proof-of-concept
- Document full integration path
- **Time**: 1 hour

### Option C: Community Contribution
- Document integration needs
- Create GitHub issue
- Tag as "help wanted"
- Community implements

---

## 🐝 Status

**Current**: Technical analysis complete
**Ready**: Architecture defined, path forward clear
**Next**: Implement OllamaAdapter or wait for community

**Priority**: Medium (CLI works with Gemini free tier for now)
**Impact**: High (enables 100% free operation)

---

**Last Updated**: 2025-10-26
**Phase**: 4 (Ollama Integration)
**Status**: Analysis Complete → Implementation Pending
