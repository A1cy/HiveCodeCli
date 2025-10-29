# Debug Instructions for AWS Bedrock Issue

## 🔍 How to Get Error Details

### Method 1: View Error in HiveCode UI
When you see "✖ 1 error", press:
```
Ctrl+O
```
This will show the full error message. **Please copy the entire error text.**

---

### Method 2: Run with stderr Output Visible

I've added debug logs using `console.error()` which should appear in your terminal.

Run HiveCode and look for these messages after typing "hi":

```bash
cd ~/HiveCodeCli && ./start-hivecode.sh 2>&1 | tee bedrock-debug.log
```

Then type:
```
> hi
```

**Look for messages like:**
```
[Bedrock STREAM] Starting stream request to model: amazon.nova-lite-v1:0
[Bedrock STREAM] Request converted, messages: 1
[Bedrock STREAM] Chunk 1 received
[Bedrock STREAM] Stream completed, 3 chunks total
```

**OR if there's an error:**
```
[Bedrock STREAM] Error: [error details here]
```

---

### Method 3: Check the Log File

After running Method 2, check the log:
```bash
cat bedrock-debug.log | grep -E "\[Bedrock|Error|error"
```

---

## 🎯 What I Need

**Please share ONE of these:**

1. **Error message from Ctrl+O** (full text)
2. **Terminal output** showing the `[Bedrock STREAM]` messages
3. **OR** the log file contents from `bedrock-debug.log`

This will tell me exactly what's failing!

---

## ✅ What We Know So Far

- ✅ AWS credentials are valid (standalone test worked)
- ✅ AWS Bedrock API responds correctly
- ✅ Ollama works perfectly
- ❓ HiveCode Bedrock integration has some issue
- ❓ No debug logs appearing (might be suppressed)

**The answer is in that error message!** 🔍
