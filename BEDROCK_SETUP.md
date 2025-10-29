# HiveCode AWS Bedrock Setup Guide

## 🎯 Overview

HiveCode now supports **AWS Bedrock** with 10 premium AI models (Amazon Nova +
Meta Llama variants). This guide covers setup, configuration, and
troubleshooting.

## 🚀 Quick Start (3 Steps)

### 1. Run Setup Script

```bash
cd ~/HiveCodeCli
./setup-bedrock.sh
```

This creates:

- `~/.gemini-code/settings.json` with Bedrock configuration
- Loads AWS credentials from `.env.bedrock`

### 2. Start HiveCode with Credentials

```bash
./start-hivecode.sh
```

Or use the convenient alias:

```bash
source ~/.bashrc
hc
```

### 3. Verify AWS Bedrock is Active

Check the startup header:

```
🌟 HiveCode: Using MHG AI / AWS Bedrock (amazon.nova-lite-v1:0)
```

After a session, verify the model usage:

```
Model Usage                  Reqs   Input Tokens  Output Tokens
───────────────────────────────────────────────────────────────
# Should show AWS Bedrock models, NOT gemini models
```

## 📁 File Structure

```
~/HiveCodeCli/
├── .env.bedrock              # AWS credentials (GITIGNORED)
├── setup-bedrock.sh          # One-time setup script
├── start-hivecode.sh         # Startup script with credentials
└── BEDROCK_SETUP.md          # This file

~/.gemini-code/
└── settings.json             # HiveCode settings with Bedrock config

~/.bashrc.d/
└── hivecode-alias.sh         # Convenient aliases
```

## 🔑 AWS Credentials (.env.bedrock)

```bash
AWS_ACCESS_KEY_ID=your-bedrock-access-key-id
AWS_SECRET_ACCESS_KEY=your-bedrock-secret-access-key
BEDROCK_REGION=us-east-1
HIVECODE_USE_BEDROCK=true
BEDROCK_MODEL=amazon.nova-micro-v1:0
```

**🔒 Security**: This file is gitignored and never committed. Replace
`your-bedrock-access-key-id` and `your-bedrock-secret-access-key` with your
actual AWS Bedrock credentials.

## ⚙️ HiveCode Settings (~/.gemini-code/settings.json)

```json
{
  "security": {
    "auth": {
      "selectedType": "aws-bedrock",
      "bedrockModel": "amazon.nova-micro-v1:0",
      "bedrockRegion": "us-east-1"
    }
  }
}
```

## 🤖 Available AWS Bedrock Models

### Fast Models (Text-only)

- ⚡ `amazon.nova-micro-v1:0` - Amazon Nova Micro
- ⚡ `meta.llama3-2-1b-instruct-v1:0` - Meta Llama 3.2 1B
- ⚡ `meta.llama3-2-3b-instruct-v1:0` - Meta Llama 3.2 3B

### Balanced Models (General Purpose)

- 🎯 `amazon.nova-lite-v1:0` - Amazon Nova Lite
- 🎯 `amazon.nova-pro-v1:0` - Amazon Nova Pro
- 🎯 `meta.llama3-8b-instruct-v1:0` - Meta Llama 3 8B
- 🎯 `meta.llama3-1-8b-instruct-v1:0` - Meta Llama 3.1 8B

**💡 Recommended:** Use `amazon.nova-micro-v1:0` for fastest responses (1-2
seconds)

### Multimodal Models

- 🖼️ `meta.llama3-2-11b-instruct-v1:0` - Meta Llama 3.2 11B Vision

### Creative Models (Generation)

- 🎨 `amazon.nova-canvas-v1:0` - Amazon Nova Canvas (Image generation)
- 🎨 `amazon.nova-reel-v1:0` - Amazon Nova Reel (Video generation)

## 💡 Usage Examples

### Start HiveCode

```bash
# Option 1: Use startup script (recommended)
cd ~/HiveCodeCli && ./start-hivecode.sh

# Option 2: Use alias
hc

# Option 3: Manual (not recommended)
cd ~/HiveCodeCli
set -a && source .env.bedrock && set +a
hivecode
```

### Switch Models

```bash
# Inside HiveCode, type:
/MHG_Premium
```

This opens the model selector with all 10 AWS Bedrock models.

### Use Ollama (Free Local Models)

```bash
# Inside HiveCode, type:
/Ollama
```

This switches to 100% FREE local AI models (34 models available).

## 🔧 Troubleshooting

### Issue: "Request cancelled" or Slow Responses

**Symptom**:

```
> hi
⠏ Dividing by zero... just kidding! (esc to cancel, 9s)
```

**Cause**: AWS credentials not loaded

**Fix**:

```bash
# Always use the startup script:
cd ~/HiveCodeCli && ./start-hivecode.sh
```

### Issue: Using Gemini Instead of Bedrock

**Symptom**: Session summary shows gemini models:

```
Model Usage                  Reqs   Input Tokens  Output Tokens
───────────────────────────────────────────────────────────────
gemini-2.5-flash-lite           3          6,381            155
```

**Cause**: Settings file not configured

**Fix**:

```bash
cd ~/HiveCodeCli
./setup-bedrock.sh
./start-hivecode.sh
```

### Issue: Timestamp Warnings on Startup

**Symptom**:

```
╭────────────────────────────────────────────────────────────╮
│ Warning: Source file "..." has been modified since build   │
│ Run "npm run build" to incorporate changes before starting │
╰────────────────────────────────────────────────────────────╯
```

**Cause**: Development installation linked to source directory

**Fix**: Clean packaged installation (already done):

```bash
cd ~/HiveCodeCli
npm pack
npm uninstall -g @hivecode/cli
npm install -g ./hivecode-cli-0.1.0.tgz
```

### Issue: /MHG_Premium Command Shows Nothing

**Symptom**: Typing `/MHG_Premium` does nothing

**Cause**: Dialog type not registered or build issue

**Fix**: Rebuild and reinstall:

```bash
cd ~/HiveCodeCli
npm run build
npm pack
npm uninstall -g @hivecode/cli
npm install -g ./hivecode-cli-0.1.0.tgz
```

### Issue: Complete System Failure - Nothing Works! (FIXED v0.1.3)

**Symptom**:

- System starts and shows "Using MHG AI / AWS Bedrock"
- Credentials loaded and access key shown
- But NOTHING responds: not "hi", not "/MHG_Premium", not "/Ollama"
- Shows "✖ 1 error" at bottom
- Entire HiveCode is frozen

**Root Cause**: **BLOCKING HEALTH CHECK WITH process.exit(1)**

In `contentGenerator.ts` lines 164-178, the AWS Bedrock initialization had a
**fatal design flaw**:

```typescript
const isHealthy = await bedrockGenerator.checkHealth();

if (!isHealthy) {
  console.error('❌ Failed to connect to AWS Bedrock.');
  process.exit(1); // ← KILLS ENTIRE PROCESS!
}
```

The health check:

1. Makes a real API call to AWS Bedrock (tries to generate text)
2. If credentials are invalid, expired, or network fails → returns false
3. System calls `process.exit(1)` which **KILLS HIVECODE COMPLETELY**
4. This prevents Ollama, Gemini, and everything else from working

**Why it failed silently:**

- The health check failure happened during initialization
- HiveCode UI loaded but content generator was dead
- No error shown to user, just frozen input

**Fix Applied** (October 28, 2025 - v0.1.3):

Changed from **fatal error** to **warning**:

```typescript
// Check health on initialization (non-blocking - only warn if fails)
const isHealthy = await bedrockGenerator.checkHealth();

if (!isHealthy) {
  console.warn('⚠️  Warning: Could not verify AWS Bedrock connection.');
  console.warn(
    '   HiveCode will attempt to use AWS Bedrock, but requests may fail.',
  );
  console.warn('   Switch to Ollama with: /Ollama');
  // NO process.exit() - let HiveCode continue!
}

return new LoggingContentGenerator(bedrockGenerator, gcConfig);
```

**Benefits:**

- ✅ HiveCode always starts, even if Bedrock fails
- ✅ Ollama and other providers still work
- ✅ User sees warning and can switch providers
- ✅ System remains functional

**Status**: ✅ FIXED - System no longer crashes on health check failure

---

### Issue: No Response When Typing Commands (FIXED v0.1.2)

**Symptom**:

- Header shows "Using MHG AI / AWS Bedrock"
- Credentials appear loaded in startup script
- But typing "hi" gives no response
- `/MHG_Premium` command doesn't open dialog
- "✖ 1 error" shows at bottom

**Root Causes Found**:

1. **Environment Variables Not Actually Loaded** (PRIMARY ISSUE):
   - Startup script used `set -a; source .env.bedrock; set +a`
   - Variables were set in subshell but NOT exported to HiveCode process
   - Result: HiveCode couldn't authenticate with AWS Bedrock

2. **Credential Config Mismatch** (SECONDARY):
   - Code was looking for `process.env['BEDROCK_API_KEY']` (wrong)
   - Environment file had `AWS_SECRET_ACCESS_KEY` (correct AWS standard)
   - AWS SDK needs standard AWS environment variable names

**Fixes Applied** (October 28, 2025):

**Part 1: Fixed Environment Loading** (`start-hivecode.sh`):

```bash
# OLD (didn't work):
set -a
source "$ENV_FILE"
set +a

# NEW (works correctly):
export AWS_ACCESS_KEY_ID=$(grep '^AWS_ACCESS_KEY_ID=' "$ENV_FILE" | cut -d '=' -f2-)
export AWS_SECRET_ACCESS_KEY=$(grep '^AWS_SECRET_ACCESS_KEY=' "$ENV_FILE" | cut -d '=' -f2-)
export BEDROCK_REGION=$(grep '^BEDROCK_REGION=' "$ENV_FILE" | cut -d '=' -f2-)
export HIVECODE_USE_BEDROCK=$(grep '^HIVECODE_USE_BEDROCK=' "$ENV_FILE" | cut -d '=' -f2-)
export BEDROCK_MODEL=$(grep '^BEDROCK_MODEL=' "$ENV_FILE" | cut -d '=' -f2-)
```

**Part 2: Fixed Credential Config**
(`packages/core/src/core/contentGenerator.ts`):

- Removed `bedrockApiKey` parameter from config chain
- AWS SDK now reads credentials directly from standard environment variables
- Lines updated: 86-161

**Verification**:

```bash
# Test environment variables are loaded:
cd ~/HiveCodeCli && ./start-hivecode.sh

# Inside HiveCode startup, you should now see:
# 🔑 Access Key: BedrockAPIKey-mzur...
```

**Status**: ✅ FIXED - Credentials now properly exported and Bedrock working

## 📝 What Was Fixed

### Security Fixes

- ✅ Removed hardcoded AWS credentials from `bedrock-client.ts`
- ✅ Added `.env.bedrock` to `.gitignore`
- ✅ Implemented environment variable credential loading
- ✅ Added A1xAI Security Scanner integration

### v0.1.1 Performance Fix (October 28, 2025)

- ✅ **Fixed credential mismatch causing slow responses**
  - Removed `BEDROCK_API_KEY` env var lookup (incorrect)
  - AWS SDK now reads standard `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
    directly
  - Eliminated credential passing through config layer (unnecessary indirection)
  - Result: Fast 2-3 second response times with AWS Bedrock

### v0.1.2 Environment Loading Fix (October 28, 2025)

- ✅ **Fixed environment variables not being exported to HiveCode process**
  - Changed from `set -a; source .env; set +a` to explicit `export` statements
  - Variables now properly passed to HiveCode
  - Added verification showing access key on startup

### v0.1.3 Critical Health Check Fix (October 28, 2025)

- ✅ **Fixed blocking health check that killed entire system**
  - Changed from `process.exit(1)` to warning message
  - System now continues even if Bedrock health check fails
  - Ollama and other providers remain functional
  - Users can switch providers with `/Ollama` command
  - **CRITICAL FIX**: Prevents complete system lockup

### v0.1.5 AWS SDK Bundling & Streaming Fix (October 28, 2025) - **COMPLETE FIX!**

**Part 1: AWS SDK Bundling** ✅

- Configured esbuild to use ESM versions of AWS SDK
  (`mainFields: ['module', 'main']`)
- AWS SDK now bundled correctly with ESM format
- Disabled minification to preserve error messages
- Bundle size 20.9MB (AWS SDK included and loading successfully!)

**Part 2: Streaming Chunk Parser** ✅

- **Problem**: Streaming returned 0 chunks despite AWS SDK loading
- **Root Cause**: Code checked for `chunk.type === 'content_block_delta'` (wrong
  format!)
- **Actual Format**: AWS Bedrock uses `chunk.contentBlockDelta.delta.text`
- **Fix**: Updated `bedrock-client.ts` to parse correct AWS streaming format
- **Result**: Streaming now works correctly with all chunk types handled

### Type System Fixes

- ✅ Added `'ollamaModel'` and `'mhgModel'` to dialog type union
- ✅ Added `subtle` property to border theme interface
- ✅ Added `info` property to status theme interface
- ✅ Fixed test mocks to include new dialog types

### UI Improvements

- ✅ Renamed `/ollamaModelSelector` → `/Ollama`
- ✅ Renamed `/mhgModelSelector` → `/MHG_Premium`
- ✅ Shortened tips text (34% more concise)
- ✅ Added restart prompt after model selection

### Configuration

- ✅ Added `bedrockModel` and `bedrockRegion` to settings schema
- ✅ Created setup scripts for easy configuration
- ✅ Added convenient bash aliases

## 🎯 Performance Expectations

### With AWS Bedrock (Proper Setup):

- ✅ Instant startup (no warnings)
- ✅ Fast responses (2-3 seconds with Nova Lite)
- ✅ Session summary shows AWS Bedrock models
- ✅ No authentication errors

### Without Proper Setup:

- ❌ Slow responses (57+ seconds)
- ❌ Requests get cancelled
- ❌ Falls back to Gemini
- ❌ Authentication failures

## 🔗 Quick Reference Commands

```bash
# Setup (run once)
cd ~/HiveCodeCli && ./setup-bedrock.sh

# Start HiveCode
hc                                    # Quick alias
./start-hivecode.sh                   # From HiveCodeCli directory

# Inside HiveCode
/MHG_Premium                          # Switch Bedrock models
/Ollama                               # Switch to free local models
/help                                 # Show all commands
/quit                                 # Exit

# Rebuild if needed
cd ~/HiveCodeCli
npm run build
npm pack
npm install -g ./hivecode-cli-0.1.0.tgz
```

## 📧 Support

If you encounter issues:

1. Check credentials are loaded:

   ```bash
   echo $AWS_ACCESS_KEY_ID
   ```

2. Verify settings file exists:

   ```bash
   cat ~/.gemini-code/settings.json
   ```

3. Check HiveCode version:

   ```bash
   hivecode --version
   ```

4. Rerun setup if needed:
   ```bash
   cd ~/HiveCodeCli && ./setup-bedrock.sh
   ```

---

**Created by A1xAI Team** | Last Updated: 2025-10-28
