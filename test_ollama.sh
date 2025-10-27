#!/bin/bash
export HIVECODE_USE_OLLAMA=true
export OLLAMA_MODEL="qwen3:4b"
echo "Testing HiveCode CLI with Ollama..."
echo "5+3" | node bundle/gemini.js
