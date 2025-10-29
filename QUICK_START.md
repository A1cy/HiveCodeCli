# HiveCode Quick Start Guide

## 🎯 Ultra-Simple Setup (2 Commands)

### Option 1: Start with Ollama (100% FREE - Works Immediately)

```bash
# Start HiveCode with free local AI
hivecode
```

That's it! HiveCode is now configured to use Ollama (gemma:2b) which is already
installed on your system.

**Test it:**

- Type: `hi` → Should get instant response
- Type: `/Ollama` → Switch models (gemma:2b, qwen2.5:3b, qwen3:4b, etc.)

---

### Option 2: Use AWS Bedrock (Premium AI)

```bash
# Load AWS credentials and start
cd ~/HiveCodeCli && ./start-hivecode.sh
```

**What this does:**

1. Loads AWS credentials from `.env.bedrock`
2. Starts HiveCode with AWS Bedrock (amazon.nova-lite-v1:0)

**Test it:**

- Type: `hi` → Should get response from AWS Bedrock
- Type: `/MHG_Premium` → Switch Bedrock models
- If errors → Type: `/Ollama` to fall back to free local AI

---

## 🔀 Switching Between Providers

### Inside HiveCode:

```bash
# Switch to Ollama (FREE)
/Ollama

# Switch to AWS Bedrock (PREMIUM)
/MHG_Premium
```

**Both work independently!** If one fails, switch to the other.

---

## 📁 Current Configuration

**Settings Location:** `~/.gemini-code/settings.json`

**Default:** Ollama (gemma:2b) - works out of the box

**To restore AWS Bedrock:**

```bash
cp ~/.gemini-code/settings.json.bedrock-backup ~/.gemini-code/settings.json
cd ~/HiveCodeCli && ./start-hivecode.sh
```

---

## 🐛 Troubleshooting

### Issue: "hi" gives no response

**Fix:**

```bash
# Switch provider
/Ollama          # or /MHG_Premium
```

### Issue: Ollama not working

**Check Ollama is running:**

```bash
ollama list
```

**If not installed:**

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull gemma:2b
```

### Issue: AWS Bedrock not working

**Check credentials:**

```bash
echo $AWS_ACCESS_KEY_ID
# Should show: your-bedrock-access-key-id

# If empty, reload:
cd ~/HiveCodeCli && ./start-hivecode.sh
```

---

## ✅ What Was Fixed (v0.1.4 - October 28, 2025)

### Critical Fixes:

1. ✅ **Removed blocking health check** - System no longer crashes on Bedrock
   failure
2. ✅ **Added proper error handling** - Bedrock errors don't kill Ollama
3. ✅ **Fixed environment variable export** - AWS credentials properly loaded
4. ✅ **Made providers independent** - Ollama and Bedrock work separately

### Result:

- **Ollama:** Works 100% out of the box (default)
- **AWS Bedrock:** Works when credentials loaded with startup script
- **Switching:** Both `/Ollama` and `/MHG_Premium` commands work smoothly
- **Failover:** If one fails, switch to the other instantly

---

## 🚀 Recommended Usage

**Start HiveCode with Ollama (default):**

```bash
hivecode
```

**When you need premium AI:**

```bash
cd ~/HiveCodeCli && ./start-hivecode.sh
# Inside HiveCode, already using Bedrock!
```

**Or switch anytime with:** `/Ollama` or `/MHG_Premium`

---

**Created by A1xAI Team** | Last Updated: 2025-10-28 (v0.1.4)
