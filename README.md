# 🐝 HiveCode - 100% Free Agentic AI Development System

**Revolutionary AI-powered development without subscription costs**

[![Version](https://img.shields.io/badge/version-0.1.0--dev-orange.svg)](https://github.com/A1cy/HiveCodeCli)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-Phase%201%20Complete-blue.svg)](STATUS.md)
[![Powered by](https://img.shields.io/badge/powered%20by-Gemini%20CLI%20%2B%20Ollama-orange.svg)](https://ollama.ai)

---

## 🚧 Development Status: Phase 1 Complete

**HiveCode** is currently under active development. We've completed Phase 1 (research and planning) and are preparing for Phase 2 (Gemini CLI fork).

### Current Phase: Fork Preparation

**Phase 1 Complete ✅**:
- ✅ Research and CLI selection (Gemini CLI chosen)
- ✅ Python implementation built and archived (1,425 lines, working proof-of-concept)
- ✅ Comprehensive documentation created
- ✅ Repository cleaned and prepared for fork

**Phase 2 Next ⏳**:
- Fork Gemini CLI repository
- Rename project to HiveCode
- Integrate custom agent orchestration
- Add Ollama local model routing
- Implement hook system and TTS integration

**See [STATUS.md](STATUS.md) for complete development journey and roadmap.**

---

## 🎯 What is HiveCode?

**HiveCode** is a **100% free, open-source** alternative to Claude Code and GitHub Copilot, powered by **local AI models** (Ollama) and featuring **5 specialized agents** that work together to build complete applications.

### Vision

Build a production-ready agentic AI development system that:
- Costs **$0/month forever** (100% free operation with local models)
- Works **completely offline** (privacy-first, local Ollama primary)
- Provides **multi-agent coordination** (5 specialized agents working in parallel)
- Offers **easy installation** (one-command setup)
- Maintains **full customizability** (open source, fork-friendly)

### Foundation Strategy

HiveCode is built by forking **Gemini CLI** (Google's official CLI tool) and adding:
- **Agent Orchestration**: 5 specialized agents (orchestrator, frontend, backend, tester, refactor)
- **SPARC Workflow**: Multi-agent coordination methodology
- **Local-First Routing**: 80% Ollama (free) → 15% Gemini (free tier) → 5% Groq (optional)
- **Hook System**: Pre-tool, post-tool, notification hooks
- **TTS Integration**: Optional voice announcements
- **Memory System**: Cross-session context persistence

---

## 🏗️ Architecture Overview

```
User Input
    ↓
hivecode [command] [args]
    ↓
HiveCode CLI (forked from Gemini CLI)
├─ Custom commands (prime|sparc|ask)
├─ Agent orchestration layer
├─ Hook system (pre-tool, post-tool)
├─ TTS announcements (optional)
└─ Local-first routing strategy
    ↓
Model Routing
├─ 80% → Ollama (qwen2.5-coder, free, 3-5s)
├─ 15% → Gemini free tier (15 RPM, fast, free)
└─ 5% → Optional Groq (complex tasks, free tier)
    ↓
Agent System (5 specialized)
├─ Orchestrator (coordination)
├─ Frontend (React/Vue/UI)
├─ Backend (APIs/databases)
├─ Tester (unit/integration tests)
└─ Refactor (cleanup/optimization)
    ↓
Results synthesized
    ↓
Output to user
```

---

## 💰 Cost Comparison

| Feature | Claude Code | GitHub Copilot | **HiveCode** |
|---------|-------------|----------------|--------------|
| **Cost** | $20-100/month | $10-20/month | ✅ **$0/month** |
| **AI Quality** | Best (Sonnet 4.5) | Good | ⚡ Good (qwen2.5-coder) |
| **Agents** | Yes (56) | No | ✅ Yes (5 core) |
| **Privacy** | Cloud | Cloud | ✅ **100% Local** |
| **Customizable** | Limited | Limited | ✅ **Fully Open** |
| **Offline** | No | No | ✅ **Yes** |

---

## 📚 Documentation

### Essential Reading

- **[STATUS.md](STATUS.md)** - Complete development journey and current status
- **[PRP.md](PRP.md)** - Project Requirements Package (vision, architecture, roadmap)
- **[ACCOMPLISHMENT.md](ACCOMPLISHMENT.md)** - Python implementation achievements (archived)
- **[OPENCODE_FINDINGS.md](OPENCODE_FINDINGS.md)** - OpenCode research (why rejected)

### Development Journey

**Attempt 1: OpenCode Foundation** ❌
- Selected for MCP native support and 29K stars
- Rejected: Not 100% free (AWS Bedrock costs $12-15/month)
- Lesson: "IM EXPECTING A CLI TO BE FULLY FREE!"

**Attempt 2: Pure Python + Ollama** ⚠️
- Built from scratch: 1,425 lines, 5 agents, working CLI
- Tested successfully with Ollama qwen2.5-coder
- Rejected: "thats was bad steps! we need to fork somthing not start from scartch"
- Result: Archived to `archive/python-implementation` branch for reference

**Attempt 3: Gemini CLI Fork** ✅ Current
- Fork production-ready CLI (Google-maintained)
- Customize with HiveCode features (agents, orchestration, hooks, TTS)
- Keep 100% free with local Ollama primary
- Benefit from existing architecture while maintaining full control

---

## 🤖 Planned Features

### MVP (Phase 2-3)

- ✅ **5 Specialized Agents**: Orchestrator, Frontend, Backend, Tester, Refactor
- ✅ **3 Core Commands**: `hivecode prime`, `hivecode ask`, `hivecode sparc`
- ✅ **Local-First Routing**: Ollama primary (80%), Gemini fallback (15%), optional Groq (5%)
- ✅ **SPARC Workflow**: Multi-agent coordination methodology
- ✅ **Parallel Execution**: 2-3 agents working simultaneously
- ✅ **One-Command Install**: Automatic Ollama setup + model download

### Phase 2+ Enhancements

- ⏳ **MCP Integration**: 6 servers (memory, shadcn-ui, playwright, n8n, blender, clickup)
- ⏳ **Hook System**: Pre-tool, post-tool, notification hooks
- ⏳ **TTS Integration**: Voice announcements (Kokoro TTS)
- ⏳ **Memory System**: 4-tier hierarchy (Global → Project → Session → Task)
- ⏳ **Checkpoint/Rewind**: Safe operation suggestions
- ⏳ **Web UI**: Optional browser interface

---

## 🚀 Roadmap

### Phase 1: Cleanup & Archive ✅ COMPLETE

- ✅ Archive Python implementation to `archive/python-implementation` branch
- ✅ Clean master branch of Python code
- ✅ Update documentation for Gemini CLI pivot

### Phase 2: Fork & Setup ⏳ NEXT

- ⏳ Fork Gemini CLI repository to A1cy/HiveCode
- ⏳ Rename project (gemini → hivecode)
- ⏳ Add HiveCode configuration structure (`.hivecode/` config)
- ⏳ Verify base functionality and build system

### Phase 3: Custom Features ⏳

- ⏳ Integrate agent orchestration (5 agents)
- ⏳ Implement model routing (Ollama, Gemini, Groq)
- ⏳ Add custom commands (prime, ask, sparc)
- ⏳ Implement parallel execution

### Phase 4: Polish & Release ⏳

- ⏳ One-command installation script
- ⏳ Complete documentation rewrite
- ⏳ Test on Ubuntu/WSL/macOS
- ⏳ Release HiveCode v0.1.0

**Target Release**: Week 4

---

## 🏆 Key Decisions

### Why Gemini CLI?

**Chosen for**:
- ✅ 100% free with Ollama primary routing
- ✅ Open source (full TypeScript source code)
- ✅ Production-ready (Google-maintained)
- ✅ Easy to customize (fork and modify)
- ✅ Apache 2.0 license (permissive)

**Alternative Rejected**: OpenCode.ai
- ❌ Not 100% free (AWS Bedrock $12-15/month after free tier)
- ❌ External binary (difficult to modify)

### Why Fork (Not Build from Scratch)?

**Lessons Learned**:
- Building CLI framework from scratch is time-intensive
- Production-ready foundation provides reliability and trust
- Fork strategy: faster to market + battle-tested architecture
- User feedback: "we need to fork somthing not start from scartch"

**Result**: Python implementation archived as reference, fork strategy adopted

### Why Ollama Primary?

**Cost Priority**:
- Ollama: $0/month, unlimited usage, 100% offline
- Gemini free tier: 15 RPM limit (fallback for complex tasks)
- Speed trade-off: 3-5s Ollama vs <1s cloud (acceptable for free operation)

---

## 🤝 Contributing

HiveCode is currently in early development. Contributions will be welcome after v0.1.0 release.

**Current Status**: Pre-fork preparation
**Watch This Repo**: Get notified when Phase 2 fork begins

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Foundation**: [Gemini CLI](https://github.com/google-gemini/gemini-cli) by Google
- **Inspired by**: A1xAI Framework and Claude Code
- **Powered by**: [Ollama](https://ollama.ai) - Amazing local LLM engine
- **Model**: qwen2.5-coder - Specialized coding model

---

## 📞 Status & Updates

**Current Phase**: Phase 1 Complete → Phase 2 Fork Preparation
**Last Updated**: 2025-10-26
**Next Milestone**: Gemini CLI fork

For detailed development status, see [STATUS.md](STATUS.md)

---

<div align="center">

**🐝 HiveCode - 100% Free | 100% Open | 100% Local**

**Phase 1 Complete** | **Phase 2 Next: Fork Gemini CLI**

[📖 Development Status](STATUS.md) | [🎯 Project Plan](PRP.md) | [⭐ Star on GitHub](https://github.com/A1cy/HiveCodeCli)

</div>
