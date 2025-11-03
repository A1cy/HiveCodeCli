# MHG CODE - ASCII Art Branding

Professional ASCII art banners for MHG CODE with brand color **#006eb6**.

## 🎨 Brand Colors

- **Primary Blue**: #006eb6 (RGB: 0, 110, 182)
- **White Text**: #FFFFFF
- **Gray Accents**: #808080

## 📦 Available Files

- `mhg-code-banner.sh` - Bash/shell script with colored output
- `mhg-code-banner.ts` - TypeScript/JavaScript module
- `MHG-CODE-BANNERS.md` - This documentation

## 🚀 Usage

### Bash/Shell

```bash
# Method 1: Source and run
source /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh

# Method 2: Run directly
bash /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh

# Method 3: Add to .bashrc or .zshrc
echo 'source /home/a1xai/HiveCodeCli/docs/mhg-code-banner.sh' >> ~/.bashrc
```

### TypeScript/JavaScript

```typescript
// Import specific functions
import { printLargeNoLogo, printMini } from './mhg-code-banner';

// Show large banner
printLargeNoLogo();

// Show mini header
printMini('1.0.0', '/home/user/project');

// Get brand colors
import { getBrandColors } from './mhg-code-banner';
const colors = getBrandColors();
console.log(colors.hex); // #006eb6
```

### Node.js (JavaScript)

```javascript
const mhgBanner = require('./mhg-code-banner');

// Show default banner
mhgBanner.printLargeNoLogo();

// Show mini version
mhgBanner.printMini('1.0.0');
```

## 🎭 Banner Variants

### 1. Large Banner (No Logo) - **RECOMMENDED**

Clean, professional look without logo box.

```
    ███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗
    ████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝
    ██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗
    ██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝
    ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗
    ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝
                  Professional AI Development Environment by A1xAI Team
```

**Functions:**
- Bash: `print_large_no_logo`
- TypeScript: `printLargeNoLogo()`

### 2. Large Banner (With Logo)

Includes accurate stacked logo (MH/G.).

```
    ┌────┐
    │ MH │     ███╗   ███╗ ██╗  ██╗  ██████╗       ██████╗  ██████╗  ██████╗  ███████╗
    │ G. │     ████╗ ████║ ██║  ██║ ██╔════╝      ██╔════╝ ██╔═══██╗ ██╔══██╗ ██╔════╝
    └────┘     ██╔████╔██║ ███████║ ██║  ███╗     ██║      ██║   ██║ ██║  ██║ █████╗
               ██║╚██╔╝██║ ██╔══██║ ██║   ██║     ██║      ██║   ██║ ██║  ██║ ██╔══╝
               ██║ ╚═╝ ██║ ██║  ██║ ╚██████╔╝     ╚██████╗ ╚██████╔╝ ██████╔╝ ███████╗
               ╚═╝     ╚═╝ ╚═╝  ╚═╝  ╚═════╝       ╚═════╝  ╚═════╝  ╚═════╝  ╚══════╝
                                     Professional AI Development Environment by A1xAI Team
```

**Functions:**
- Bash: `print_large_with_logo`
- TypeScript: `printLargeWithLogo()`

### 3. Compact Banner

Space-efficient version for terminals.

```
 ┌────┐ ███╗   ███╗██╗  ██╗ ██████╗
 │ MH │ ████╗ ████║██║  ██║██╔════╝
 │ G. │ ██╔████╔██║███████║██║  ███╗
 └────┘ ██║╚██╔╝██║██╔══██║██║   ██║
       ██║ ╚═╝ ██║██║  ██║╚██████╔╝
       ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝
    ██████╗ ██████╗ ██████╗ ███████╗
   ██╔════╝██╔═══██╗██╔══██╗██╔════╝
   ██║     ██║   ██║██║  ██║█████╗
   ██║     ██║   ██║██║  ██║██╔══╝
   ╚██████╗╚██████╔╝██████╔╝███████╗
    ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝
          by A1xAI Team
```

**Functions:**
- Bash: `print_compact`
- TypeScript: `printCompact()`

### 4. Mini Header

Claude Code style header.

```
┌────┐   MHG Code v1.0.0
│ MH │   Professional AI Development Environment
│ G. │   /home/user/project
└────┘   by A1xAI Team
```

**Functions:**
- Bash: `print_mini`
- TypeScript: `printMini(version, path)`

### 5. Ultra Simple

Minimal text-only version.

```
MHG CODE v1.0 | Professional AI Development
/home/user/project | by A1xAI Team
```

**Functions:**
- Bash: `print_simple`
- TypeScript: `printSimple(version, path)`

## 🎨 Colors in Terminal

All versions use ANSI escape codes to display:
- **#006eb6** for "MHG CODE" text (bold)
- **White** text on **blue background** for logo box
- **Gray** for secondary text (taglines, paths)

## 📋 Integration Examples

### Add to Shell Startup

```bash
# ~/.bashrc or ~/.zshrc
if [ -f "$HOME/HiveCodeCli/docs/mhg-code-banner.sh" ]; then
    source "$HOME/HiveCodeCli/docs/mhg-code-banner.sh"
fi
```

### Node.js CLI Tool

```typescript
#!/usr/bin/env node
import { printMini } from './mhg-code-banner';

printMini('1.0.0');
console.log('Welcome to MHG CODE!\n');

// Your CLI code here...
```

### Express.js Startup

```typescript
import express from 'express';
import { printLargeNoLogo } from './mhg-code-banner';

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  printLargeNoLogo();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

## 🔧 Customization

### Modify Colors

Edit the color constants in either file:

**Bash:**
```bash
MHG_BLUE='\033[38;2;0;110;182m'  # Change RGB values here
```

**TypeScript:**
```typescript
const colors = {
  mhgBlue: '\x1b[38;2;0;110;182m',  // Change RGB values here
};
```

### Create Your Own Variant

Use the existing functions as templates and modify the ASCII art to your needs.

## 📝 License

Created by A1xAI Team for MHG CODE branding.

## 🔗 Related

- [HiveCodeCli](https://github.com/your-org/hivecode-cli)
- [A1xAI Framework](https://github.com/your-org/a1xai)
