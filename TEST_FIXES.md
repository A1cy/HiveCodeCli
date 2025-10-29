# Test Instructions for AWS Bedrock Fixes

## ✅ What Was Fixed

1. **Speed**: Switched to `amazon.nova-micro-v1:0` (fastest Bedrock model)
2. **Model Selector**: `/MHG_Premium` now works (was blocked by old processes)
3. **Error Indicator**: No more spurious "✖ error" messages

---

## 🚀 START FRESH (IMPORTANT!)

All old HiveCode processes have been killed. You MUST start fresh:

```bash
cd ~/HiveCodeCli && ./start-hivecode.sh
```

**You should see:**
```
🌟 HiveCode: Using MHG AI / AWS Bedrock (amazon.nova-micro-v1:0)
```

---

## 🧪 Test 1: Speed Test

Type in HiveCode:
```
hi
```

**Expected:**
- Response in **1-2 seconds** (not 2-3 seconds like before)
- Using `amazon.nova-micro-v1:0`
- Clean output (no "✖ error" indicator)

---

## 🧪 Test 2: Model Selector

Type in HiveCode:
```
/MHG_Premium
```

**Expected:**
- **Dialog appears** showing model list
- See 10 AWS Bedrock models:
  - ⚡ **Amazon Nova Micro** (fastest - current)
  - ⚡ Meta Llama 3.2 1B (very fast)
  - ⚡ Meta Llama 3.2 3B (fast)
  - 🎯 Amazon Nova Lite (balanced)
  - 🎯 Amazon Nova Pro (powerful)
  - 🎯 Meta Llama 3 8B
  - 🎯 Meta Llama 3.1 8B
  - 🖼️ Meta Llama 3.2 11B Vision
  - 🎨 Amazon Nova Canvas (image gen)
  - 🎨 Amazon Nova Reel (video gen)

- Can select different models
- Press Enter to confirm, Esc to cancel

---

## 🧪 Test 3: Try Faster Models

If Nova Micro isn't fast enough, try the alternatives:

### Option 1: Meta Llama 1B
```
/MHG_Premium
```
Select: `⚡ Meta Llama 3.2 1B`

**Why**: Smallest Llama model, sometimes faster on certain queries

### Option 2: Ollama (100% FREE, INSTANT)
```
/Ollama
```
Select any local model (e.g., `llama3.2:1b`)

**Why**:
- **Sub-second responses** (no network latency)
- Runs on your machine
- 100% FREE
- 34 models available

---

## 📊 Speed Comparison

| Model | Response Time | Cost | Network |
|-------|--------------|------|---------|
| **Nova Micro** | 1-2s | Premium | AWS |
| **Llama 3.2 1B** | 1-2s | Premium | AWS |
| **Ollama Local** | **<1s** | FREE | None |

**Reality Check:**
- Nova Micro IS the fastest AWS Bedrock model available
- If you need faster, **use Ollama** (instant, free, local)

---

## 🔧 If Still Slow

### Check 1: Network Latency
```bash
ping bedrock-runtime.us-east-1.amazonaws.com
```
If ping >100ms, you're far from us-east-1.

**Fix**: Change region in `.env.bedrock`:
```bash
# Europe:
BEDROCK_REGION=eu-west-1

# Asia:
BEDROCK_REGION=ap-southeast-1
```

### Check 2: Reduce Response Length
Edit `.env.bedrock`:
```bash
BEDROCK_MAX_TOKENS=1024  # Instead of 4096
```
**Why**: Shorter responses = faster generation

### Check 3: Use Ollama
```
/Ollama
```
**Why**: Eliminates network latency entirely

---

## ❓ FAQ

**Q: Why isn't `/MHG_Premium` working?**
A: You need to restart HiveCode fresh. Kill all processes and run `./start-hivecode.sh`

**Q: Can Bedrock be faster than 1-2 seconds?**
A: Not really - that's the model inference time. Use Ollama for instant responses.

**Q: Is Nova Micro the fastest Bedrock model?**
A: Yes! It's the smallest text-only model AWS Bedrock offers.

**Q: What if I want better quality?**
A: Use `/MHG_Premium` and select:
- `amazon.nova-lite-v1:0` (balanced)
- `amazon.nova-pro-v1:0` (most powerful)

**Q: Can I switch between Bedrock and Ollama?**
A: Yes! Use `/MHG_Premium` for Bedrock, `/Ollama` for local models.

---

## ✅ Success Criteria

After testing, you should have:
- ✅ 1-2 second responses with Nova Micro
- ✅ `/MHG_Premium` opens model selector
- ✅ No "✖ error" indicator
- ✅ Can switch between 10 Bedrock models
- ✅ Can switch to Ollama for instant responses

---

**Ready to test? Start here:**
```bash
cd ~/HiveCodeCli && ./start-hivecode.sh
```

Then type: `/MHG_Premium`
