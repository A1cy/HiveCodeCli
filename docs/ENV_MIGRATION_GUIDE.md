# Environment Variable Migration Guide
## MHG Code CLI Rebranding

**Date:** 2025-11-02
**Status:** Complete
**Version:** v1.0

---

## Overview

MHG Code CLI (formerly HiveCode/Gemini CLI) has undergone a complete rebranding of environment variables to reflect the new product identity. This guide documents all required changes.

## Environment Variable Changes

### Core Variables

| Old Variable | New Variable | Purpose | Status |
|-------------|-------------|---------|--------|
| `GEMINI_API_KEY` | `MHGCODE_API_KEY` | API authentication key | Backward compatible |
| `GEMINI_MODEL` | `MHGCODE_MODEL` | Model selection | Backward compatible |
| `HIVECODE_USE_BEDROCK` | `MHGCODE_USE_BEDROCK` | AWS Bedrock provider flag | Backward compatible |
| `HIVECODE_USE_OLLAMA` | `MHGCODE_USE_OLLAMA` | Ollama provider flag | Backward compatible |

### Unchanged Variables

These variables remain unchanged as they reference external services:
- `BEDROCK_MODEL` - AWS Bedrock model ID
- `BEDROCK_REGION` - AWS region
- `AWS_BEARER_TOKEN_BEDROCK` - AWS authentication token
- `OLLAMA_MODEL` - Ollama model name
- `OLLAMA_BASE_URL` - Ollama server URL
- `GOOGLE_API_KEY` - Google API key
- `GOOGLE_CLOUD_PROJECT` - Google Cloud project ID

---

## Migration Instructions

### 1. Update `.env` File

If you have a `.env` file, update it as follows:

```bash
# OLD (deprecated but still works)
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-1.5-pro
HIVECODE_USE_BEDROCK=true
HIVECODE_USE_OLLAMA=false

# NEW (recommended)
MHGCODE_API_KEY=your_api_key_here
MHGCODE_MODEL=gemini-1.5-pro
MHGCODE_USE_BEDROCK=true
MHGCODE_USE_OLLAMA=false
```

### 2. Update `.env.bedrock` File

```bash
# OLD (deprecated but still works)
HIVECODE_USE_BEDROCK=true
BEDROCK_MODEL=openai.gpt-oss-120b-1:0
BEDROCK_REGION=us-east-1
AWS_BEARER_TOKEN_BEDROCK=your_token_here

# NEW (recommended)
MHGCODE_USE_BEDROCK=true
BEDROCK_MODEL=openai.gpt-oss-120b-1:0
BEDROCK_REGION=us-east-1
AWS_BEARER_TOKEN_BEDROCK=your_token_here
```

### 3. Update Shell Scripts

If you have custom shell scripts that set these variables:

```bash
# OLD
export HIVECODE_USE_BEDROCK=true
export GEMINI_API_KEY=your_key

# NEW
export MHGCODE_USE_BEDROCK=true
export MHGCODE_API_KEY=your_key
```

### 4. Update Docker/Container Configurations

```dockerfile
# OLD
ENV HIVECODE_USE_BEDROCK=true
ENV GEMINI_MODEL=gemini-1.5-pro

# NEW
ENV MHGCODE_USE_BEDROCK=true
ENV MHGCODE_MODEL=gemini-1.5-pro
```

### 5. Update CI/CD Pipelines

Update environment variable names in:
- GitHub Actions workflows (.github/workflows/*.yml)
- GitLab CI (.gitlab-ci.yml)
- Jenkins pipelines
- Other CI/CD configurations

---

## Backward Compatibility

**Important:** The codebase maintains full backward compatibility. Old environment variables will continue to work indefinitely.

### Priority Order

When both old and new variables are set, the new variables take precedence:

1. `MHGCODE_*` (highest priority)
2. `HIVECODE_*` or `GEMINI_*` (backward compatibility)
3. Default values (fallback)

### Example

```bash
# Both set - MHGCODE_USE_BEDROCK takes precedence
export MHGCODE_USE_BEDROCK=true
export HIVECODE_USE_BEDROCK=false
# Result: Bedrock is ENABLED
```

---

## Testing Your Migration

### Verify Environment Variables

```bash
# Check current environment
env | grep -E '(MHGCODE|HIVECODE|GEMINI)'

# Test with new variables
export MHGCODE_USE_BEDROCK=true
export MHGCODE_API_KEY=test_key
npm start

# Verify logs show correct provider
# Should see: "🔄 Using AWS Bedrock provider..."
```

### Validation Checklist

- [ ] Updated `.env` file with new variable names
- [ ] Updated `.env.bedrock` file with new variable names
- [ ] Updated custom shell scripts
- [ ] Updated Docker/container configurations
- [ ] Updated CI/CD pipelines
- [ ] Tested application startup
- [ ] Verified provider selection works correctly
- [ ] Confirmed no errors in logs

---

## Rollback Plan

If you encounter issues, you can instantly rollback by:

1. **Keep old variables:** The old variables still work
2. **Mixed mode:** Use old and new variables together
3. **No code changes needed:** Just environment variable updates

---

## Support & Resources

### Documentation
- Main README: `/home/a1xai/HiveCodeCli/README.md`
- Bedrock Setup: `/home/a1xai/HiveCodeCli/BEDROCK_SETUP.md`
- Ollama Guide: `/home/a1xai/HiveCodeCli/OLLAMA_INTEGRATION_GUIDE.md`

### Files Modified (Reference)
See `ENV_MIGRATION_REPORT.md` for complete file-by-file changes

### Getting Help
- GitHub Issues: [Your repository URL]
- Documentation: [Your docs URL]

---

## Migration Timeline

**Recommended Timeline:**
- **Immediate:** Update local development environments
- **Week 1:** Update staging/test environments
- **Week 2:** Update production environments
- **Week 3:** Update all documentation
- **Ongoing:** Old variables supported indefinitely

---

## FAQ

### Q: Do I need to migrate immediately?
**A:** No, old variables will continue to work indefinitely. Migrate at your convenience.

### Q: What happens if I set both old and new variables?
**A:** New variables take precedence, old variables are used as fallback.

### Q: Will this break my existing setup?
**A:** No, full backward compatibility is maintained.

### Q: Can I use some new and some old variables?
**A:** Yes, you can mix old and new variables freely.

### Q: How do I know which variables I'm using?
**A:** Check startup logs for messages like "Using AWS Bedrock provider..." which show active configuration.

---

**Document Version:** 1.0
**Last Updated:** 2025-11-02
**Maintained By:** MHG Code Team
