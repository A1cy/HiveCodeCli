# 🔄 HiveCode Migration Plan - HiveCode Fork

**Date**: 2025-10-26 **Phase**: Phase 2 - Fork & Setup **Objective**: Fork
HiveCode and customize for HiveCode

---

## 📋 Overview

This document outlines the complete migration plan from Phase 1 (cleanup) to a
working HiveCode v0.1.0 based on forked HiveCode.

### Migration Strategy

**Source**: [google-gemini/gemini-cli](https://github.com/A1cy/HiveCodeCli)

- Version: v0.12.0-nightly
- License: Apache 2.0 (permissive, fork-friendly)
- Language: TypeScript/Node.js
- Structure: Monorepo with `packages/*` workspaces

**Target**: [A1cy/HiveCode](https://github.com/A1cy/HiveCodeCli)

- Binary: `gemini` → `hivecode`
- Package: `@google/gemini-cli` → `@hivecode/cli`
- Config: `~/.gemini/` → `~/.hivecode/`
- Add: Agent orchestration, Ollama routing, hooks, TTS

---

## 🎯 Phase 2: Fork & Setup

### Step 1: Fork Repository (Manual) 🔴 CURRENT

Since GitHub CLI (`gh`) is not installed, fork manually via web interface:

**Instructions**:

1. Open browser and navigate to: https://github.com/A1cy/HiveCodeCli
2. Click "Fork" button (top-right corner)
3. Select owner: **A1cy** (or your GitHub username)
4. Repository name: **HiveCode**
5. Description: "100% Free Agentic AI Development System (forked from HiveCode)"
6. Keep "Copy the main branch only" checked (we don't need all branches)
7. Click "Create fork"

**Expected Result**:

- New repository at `https://github.com/A1cy/HiveCodeCli`
- Fork relationship maintained (can sync updates from upstream)

### Step 2: Backup Current HiveCode Files

Before cloning the fork, backup current documentation:

```bash
cd /home/a1xai/HiveCode
mkdir -p ../HiveCode-backup
cp *.md ../HiveCode-backup/
echo "Documentation backed up to ../HiveCode-backup/"
```

**Backup includes**:

- ACCOMPLISHMENT.md
- OPENCODE_FINDINGS.md
- PRP.md
- README.md (will be replaced)
- STATUS.md (will be replaced)
- MIGRATION_PLAN.md (this file)

### Step 3: Clone Forked Repository

Once fork is created:

```bash
cd /home/a1xai
mv HiveCode HiveCode-docs-only
git clone https://github.com/A1cy/HiveCodeCli.git
cd HiveCode
```

**Expected Result**:

- Full HiveCode codebase in `/home/a1xai/HiveCode/`
- Original docs preserved in `/home/a1xai/HiveCode-docs-only/`

### Step 4: Restore Documentation

Copy our custom documentation into forked repo:

```bash
cd /home/a1xai/HiveCode
cp ../HiveCode-docs-only/ACCOMPLISHMENT.md .
cp ../HiveCode-docs-only/OPENCODE_FINDINGS.md .
cp ../HiveCode-docs-only/PRP.md .
cp ../HiveCode-docs-only/STATUS.md .
cp ../HiveCode-docs-only/MIGRATION_PLAN.md .

# HiveCode's README will be replaced in Phase 3
mv README.md README-GEMINI-ORIGINAL.md
cp ../HiveCode-docs-only/README.md .

git add .
git commit -m "Phase 2: Add HiveCode documentation to forked HiveCode

Preserved documentation:
- ACCOMPLISHMENT.md (Python implementation achievements)
- OPENCODE_FINDINGS.md (research findings)
- PRP.md (project requirements)
- STATUS.md (development journey)
- MIGRATION_PLAN.md (this migration plan)
- README.md (HiveCode introduction)

Original HiveCode README → README-GEMINI-ORIGINAL.md"
```

### Step 5: Verify Base Functionality

Test that HiveCode works before modifications:

```bash
# Install dependencies
npm install

# Check if Node.js 20+ is available
node --version

# Try to build
npm run build

# (Optional) Test original gemini command
npm start -- --help
```

**Expected Result**:

- Dependencies installed successfully
- Build completes without errors
- Original `gemini` command works

---

## 🔧 Phase 3: Renaming & Configuration

### Step 1: Update package.json (Root)

```json
{
  "name": "@hivecode/cli",
  "version": "0.1.0",
  "description": "100% Free Agentic AI Development System",
  "repository": {
    "type": "git",
    "url": "https://github.com/A1cy/HiveCodeCli.git"
  },
  "author": "A1xAI Team",
  "license": "MIT",
  "bin": {
    "hivecode": "./bundle/hivecode.js"
  }
}
```

**Changes**:

- Name: `@google/gemini-cli` → `@hivecode/cli`
- Version: Reset to `0.1.0`
- Repository: Point to A1cy/HiveCode
- Binary: `gemini` → `hivecode`

### Step 2: Rename Binary Files

```bash
cd /home/a1xai/HiveCode

# Rename main entry point
mv bundle/gemini.js bundle/hivecode.js

# Update references in bundle/hivecode.js
sed -i 's/gemini/hivecode/g' bundle/hivecode.js

# (May need to update other files that reference binary name)
grep -r "gemini" packages/ --include="*.ts" --include="*.js" | head -20
```

### Step 3: Configuration Directory Changes

Update code to use `~/.hivecode/` instead of `~/.gemini/`:

**Files to modify** (find with):

```bash
grep -r "\.gemini" packages/ --include="*.ts" | head -20
```

**Replace**:

- `~/.gemini/settings.json` → `~/.hivecode/settings.json`
- `~/.gemini/` → `~/.hivecode/`
- `.gemini/` → `.hivecode/`
- `GEMINI.md` → `HIVECODE.md` (project context files)

### Step 4: Add HiveCode Configuration

Create default config template:

**File**: `~/.hivecode/default-config.json`

```json
{
  "models": {
    "primary": {
      "provider": "ollama",
      "model": "qwen2.5-coder",
      "baseUrl": "http://localhost:11434",
      "enabled": true
    },
    "fallback": {
      "provider": "gemini",
      "model": "gemini-2.0-flash-exp",
      "enabled": true,
      "rateLimit": {
        "rpm": 15,
        "dailyLimit": 1000
      }
    },
    "optional": {
      "provider": "groq",
      "model": "mixtral-8x7b-32768",
      "enabled": false
    }
  },
  "routing": {
    "strategy": "local-first",
    "ollamaPercentage": 80,
    "geminiPercentage": 15,
    "groqPercentage": 5
  },
  "agents": {
    "enabled": true,
    "parallel": true,
    "maxConcurrent": 3
  },
  "features": {
    "hooks": true,
    "tts": false,
    "memory": true,
    "mcp": false
  }
}
```

### Step 5: Test Renamed System

```bash
npm run build
npm start -- --version
# Should output: HiveCode v0.1.0

npm start -- --help
# Should show hivecode commands
```

---

## 🤖 Phase 4: Agent Integration

### Step 1: Create Agent System Directory

```bash
mkdir -p packages/agents
cd packages/agents

# Create package.json for agents
cat > package.json <<EOF
{
  "name": "@hivecode/agents",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  },
  "scripts": {
    "build": "tsc"
  }
}
EOF
```

### Step 2: Port Agent Logic from Python

Reference: `archive/python-implementation` branch

**Agents to port**:

1. **Orchestrator Agent** (`orchestrator_agent.py`)
   - Task decomposition
   - Agent selection
   - Result synthesis

2. **Frontend Agent** (`frontend_agent.py`)
   - React/Vue/Angular
   - HTML/CSS/responsive design
   - Client-side logic

3. **Backend Agent** (`backend_agent.py`)
   - REST/GraphQL APIs
   - Database design
   - Authentication

4. **Tester Agent** (`tester_agent.py`)
   - Unit tests
   - Integration tests
   - Coverage analysis

5. **Refactor Agent** (`refactor_agent.py`)
   - Code cleanup
   - Performance optimization
   - Design patterns

### Step 3: Implement SPARC Workflow

**File**: `packages/agents/src/sparc.ts`

```typescript
export class SparcOrchestrator {
  async execute(task: string): Promise<string> {
    // Phase 1: Specification
    const spec = await this.specificationPhase(task);

    // Phase 2: Pseudocode
    const pseudocode = await this.pseudocodePhase(spec);

    // Phase 3: Architecture
    const architecture = await this.architecturePhase(spec);

    // Phase 4: Refinement (Parallel Execution)
    const results = await this.refinementPhase(architecture);

    // Phase 5: Completion
    return this.completionPhase(results);
  }
}
```

### Step 4: Add Custom Commands

**File**: `packages/cli/src/commands/sparc.ts`

```typescript
export async function sparcCommand(task: string) {
  const orchestrator = new SparcOrchestrator();
  const result = await orchestrator.execute(task);
  console.log(result);
}
```

**File**: `packages/cli/src/commands/prime.ts`

```typescript
export async function primeCommand() {
  // Load project context
  const context = await loadProjectContext(process.cwd());
  console.log('✅ Context loaded:', context.summary);
}
```

**File**: `packages/cli/src/commands/ask.ts`

```typescript
export async function askCommand(question: string) {
  // Q&A with project context
  const answer = await queryWithContext(question);
  console.log('✅ Answer:', answer);
}
```

---

## 🔌 Phase 5: Ollama Integration

### Step 1: Create Ollama Provider

**File**: `packages/providers/src/ollama.ts`

```typescript
import axios from 'axios';

export class OllamaProvider {
  constructor(
    private baseUrl: string = 'http://localhost:11434',
    private model: string = 'qwen2.5-coder',
  ) {}

  async generate(prompt: string, options?: GenerateOptions): Promise<string> {
    const response = await axios.post(`${this.baseUrl}/api/generate`, {
      model: this.model,
      prompt,
      stream: false,
      options: {
        temperature: options?.temperature ?? 0.7,
        num_predict: options?.maxTokens ?? 4096,
      },
    });

    return response.data.response;
  }
}
```

### Step 2: Implement Model Routing

**File**: `packages/core/src/router.ts`

```typescript
export class ModelRouter {
  async route(request: Request): Promise<Provider> {
    const complexity = this.estimateComplexity(request);

    // 80% → Ollama (local)
    if (complexity < 0.7) {
      return this.providers.ollama;
    }

    // 15% → Gemini (fallback)
    if (complexity < 0.95 && this.checkGeminiQuota()) {
      return this.providers.gemini;
    }

    // 5% → Groq (optional complex)
    if (this.providers.groq?.enabled) {
      return this.providers.groq;
    }

    // Fallback to Ollama
    return this.providers.ollama;
  }
}
```

---

## 🪝 Phase 6: Hook System

### Step 1: Create Hook Infrastructure

**File**: `packages/hooks/src/index.ts`

```typescript
export enum HookType {
  PreTool = 'pre-tool',
  PostTool = 'post-tool',
  Notification = 'notification',
  Error = 'error',
}

export class HookManager {
  async trigger(type: HookType, context: HookContext): Promise<void> {
    const hooks = this.getHooks(type);

    for (const hook of hooks) {
      await hook.execute(context);
    }
  }
}
```

### Step 2: Implement TTS Hook (Optional)

**File**: `packages/hooks/src/tts.ts`

```typescript
import axios from 'axios';

export class TTSHook {
  async execute(context: HookContext): Promise<void> {
    if (!context.config.features.tts) return;

    const message = this.formatMessage(context);

    await axios.post('http://localhost:8880/synthesize', {
      text: message,
      voice: 'af_sarah',
    });
  }
}
```

---

## 📝 Phase 7: Documentation & Polish

### Step 1: Rewrite README.md

Update README.md with:

- HiveCode introduction
- Fork acknowledgment (HiveCode)
- Installation instructions (with Ollama)
- Command reference (prime, ask, sparc)
- Cost comparison ($0/month)
- Architecture overview

### Step 2: Create ARCHITECTURE.md

Document:

- System architecture (4 layers)
- Agent system design
- Model routing strategy
- Hook system
- MCP integration (Phase 2+)

### Step 3: Create QUICKSTART.md

5-minute getting started guide:

1. Prerequisites (Node.js 20+, Ollama)
2. Installation
3. First commands
4. Example workflow

### Step 4: Update CONTRIBUTING.md

Fork-specific contribution guidelines:

- Building from source
- Running tests
- Creating agents
- Submitting PRs

---

## 🚀 Phase 8: Installation Script

### Create install.sh

**File**: `install.sh`

```bash
#!/bin/bash
# HiveCode Installation Script

set -e

echo "🐝 HiveCode Installation"
echo "========================"

# 1. Check Node.js 20+
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Install Node.js 20+ first."
  exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node.js 20+ required. Current: $NODE_VERSION"
  exit 1
fi

# 2. Install Ollama (if needed)
if ! command -v ollama &> /dev/null; then
  echo "📦 Installing Ollama..."
  curl -fsSL https://ollama.ai/install.sh | sh
fi

# 3. Start Ollama
ollama serve &> /dev/null &
sleep 2

# 4. Pull model
echo "📥 Downloading qwen2.5-coder model (4.7GB)..."
ollama pull qwen2.5-coder

# 5. Clone HiveCode
echo "📦 Cloning HiveCode..."
git clone https://github.com/A1cy/HiveCodeCli.git ~/.hivecode-source
cd ~/.hivecode-source

# 6. Install dependencies
echo "📦 Installing dependencies..."
npm install

# 7. Build
echo "🔨 Building HiveCode..."
npm run build

# 8. Link globally
npm link

# 9. Test
echo "✅ Testing installation..."
hivecode --version

echo ""
echo "🎉 HiveCode installed successfully!"
echo ""
echo "Try these commands:"
echo "  hivecode prime           # Load project context"
echo "  hivecode ask \"question\"  # Ask about your code"
echo "  hivecode sparc \"task\"    # Multi-agent workflow"
```

---

## ✅ Success Criteria

### Phase 2 Complete When:

- ✅ HiveCode forked to A1cy/HiveCode
- ✅ Forked repo cloned locally
- ✅ HiveCode documentation restored
- ✅ Base build system working

### Phase 3 Complete When:

- ✅ Binary renamed: `gemini` → `hivecode`
- ✅ Package renamed: `@google/gemini-cli` → `@hivecode/cli`
- ✅ Config directory: `~/.gemini/` → `~/.hivecode/`
- ✅ HiveCode configuration structure added
- ✅ System builds and runs with new name

### Phase 4 Complete When:

- ✅ 5 agents ported from Python implementation
- ✅ SPARC workflow implemented
- ✅ Custom commands added (prime, ask, sparc)
- ✅ Parallel execution working

### Phase 5 Complete When:

- ✅ Ollama provider integrated
- ✅ Model routing logic implemented
- ✅ Local-first strategy working (80% Ollama)
- ✅ Fallback to Gemini functional

### Phase 6 Complete When:

- ✅ Hook system infrastructure created
- ✅ Pre-tool and post-tool hooks working
- ✅ (Optional) TTS integration functional

### Phase 7-8 Complete When:

- ✅ All documentation updated
- ✅ Installation script working
- ✅ Tested on Ubuntu/WSL
- ✅ v0.1.0 ready for release

---

## 🎯 Timeline Estimate

**Phase 2 (Fork & Setup)**: 1-2 hours

- Fork: 5 minutes (manual)
- Clone and restore: 15 minutes
- Base verification: 30-60 minutes

**Phase 3 (Renaming)**: 2-3 hours

- Package.json updates: 30 minutes
- Binary renaming: 30 minutes
- Config changes: 1-2 hours
- Testing: 30 minutes

**Phase 4 (Agents)**: 4-6 hours

- Port agent logic: 2-3 hours
- SPARC workflow: 1-2 hours
- Custom commands: 1 hour

**Phase 5 (Ollama)**: 2-3 hours

- Provider implementation: 1 hour
- Routing logic: 1-2 hours

**Phase 6 (Hooks)**: 2-3 hours

- Hook infrastructure: 1-2 hours
- TTS integration: 1 hour

**Phase 7-8 (Polish)**: 2-3 hours

- Documentation: 1-2 hours
- Installation script: 1 hour

**Total Estimate**: 15-22 hours (2-3 days of focused work)

---

## 📞 Current Status

**Phase**: Phase 2 - Step 1 (Fork Repository) **Action Required**: Manual fork
via GitHub web interface **Next**: Clone forked repo and restore documentation

**See [STATUS.md](STATUS.md) for complete development journey.**

---

**Last Updated**: 2025-10-26 **Next Review**: After fork is created and repo is
cloned
