# 🔮 Cartogomancy

## *The Mystical Art of Map Divination*

[![npm version](https://badge.fury.io/js/%40madnessengineering%2Fcartogomancy.svg)](https://www.npmjs.com/package/@madnessengineering/cartogomancy)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/@madnessengineering/cartogomancy)](https://nodejs.org)

**Peer into the ethereal structure of any codebase and divine its true architecture!**

**Cartogomancy** (from *cartography* + *cartomancy*) is the mystical practice of revealing hidden code structures through arcane analysis. This CLI tool conjures UML visualizations for SwarmDesk 3D code cities - analyzing any JavaScript/TypeScript codebase with TypeScript AST parsing, dependency graph analysis, and external library detection.

> *"As above in the source tree, so below in the build artifacts"* - Ancient Developer Proverb

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g @madnessengineering/cartogomancy
```

Then invoke the divination anywhere:
```bash
cartogomancy
# or
cartogomancy /path/to/project
# or
cartogomancy https://github.com/MadnessEngineering/cartogomancy.git
```

### Local Installation
```bash
npm install --save-dev @madnessengineering/cartogomancy
```

Add to your package.json scripts:
```json
{
  "scripts": {
    "visualize": "cartogomancy . --output uml-data.json"
  }
}
```

---

## ☁️ Cloud Integration

Upload your UML data directly to your SwarmDesk account and visualize in the 3D dashboard!

### Login to SwarmDesk

```bash
cartogomancy login
```

This will:
1. Open your browser to authorize the CLI
2. Display a device code to enter
3. Store your credentials securely in `~/.config/`

### Upload While Analyzing

```bash
# Analyze and upload in one command
cartogomancy . --upload

# Analyze GitHub repo and upload
cartogomancy https://github.com/facebook/react --upload
```

### Upload Existing Files

```bash
cartogomancy upload my-project-uml.json
```

### Check Login Status

```bash
cartogomancy whoami
```

### Logout

```bash
cartogomancy logout
```

### View in Dashboard

After upload, visit https://madnessinteractive.cc/dashboard

Navigate to: **Projects → [Your Project] → 3D Code Lab**

### Security

- Tokens stored securely in user's home directory with encryption
- Auto-refresh prevents session expiration
- HTTPS-only API communication
- OAuth Device Flow for secure CLI authentication

---

# 🔍⚡ Features

Now featuring a beautiful interactive TUI mode alongside the classic CLI for maximum flexibility.

## ✨ What's New - TUI Mode!

Launch an interactive terminal UI with menus, progress bars, and live previews:
- 🎨 **Beautiful ASCII art interface** with colored output
- 📂 **Smart project discovery** - automatically suggests projects from common locations
- ⚙️ **Interactive configuration** - customize patterns with visual prompts
- 📊 **Live progress indicators** - watch your analysis happen in real-time
- 🏙️ **ASCII city preview** - see building heights before loading in 3D
- 🔄 **Batch analysis** - analyze multiple projects in one session

## 🚀 Quick Start

### Interactive Mode (TUI)

Simply run without arguments to launch the TUI:
```bash
cd cartogomancy
npm install
node cartogomancy.js
# or
npm start
```

You'll see:
- A beautiful SWARMDESK banner
- Menu to select from suggested projects
- Options to browse local directories or clone GitHub repos
- Interactive configuration wizard
- Real-time analysis progress with spinners
- Results table with top complexity components
- ASCII art city preview!

### Classic CLI Mode

For scripts and automation, use with arguments:
```bash
# Analyze local directory
node cartogomancy.js /path/to/project

# Analyze GitHub repo
node cartogomancy.js https://github.com/facebook/react

# Custom output with options
node cartogomancy.js . --output my-project.json --include "src,lib"

# Show help
node cartogomancy.js --help
```

## 📦 Installation

```bash
cd cartogomancy
npm install
```

Dependencies include:
- `inquirer` - Interactive prompts
- `ora` - Elegant terminal spinners
- `chalk` - Colorful output
- `cli-table3` - Beautiful ASCII tables
- `boxen` - Fancy boxes
- `gradient-string` - Rainbow gradients
- `figlet` - ASCII art text

## 🎮 Usage Modes

### 1. TUI Mode (No Arguments)
**Best for:** Interactive exploration, learning, one-off analyses

```bash
node cartogomancy.js
```

Features:
- Project suggestions from common locations
- Visual menus and prompts
- Real-time progress feedback
- Results preview with complexity metrics
- ASCII art city visualization
- Multi-project batch processing

### 2. CLI Mode (With Arguments)
**Best for:** Automation, CI/CD, scripting

```bash
node cartogomancy.js [path|url] [options]
```

See [UML-GENERATOR-README.md](./UML-GENERATOR-README.md) for full CLI documentation.

## 📚 Working with Monorepos & Custom Directory Structures

### The Problem: Zero Files Detected

If you see output like this:
```
📄 Found 0 source files
✨ UML Generation Complete!
📊 Classes analyzed: 0
```

Your project likely uses a **non-standard directory structure** that doesn't match the default search patterns.

### Default Search Patterns

The generator looks for `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs` files in these directories:
- ✅ `src/`, `lib/`, `components/`, `pages/`, `utils/`, `hooks/`, `services/`
- ❌ `client/`, `server/`, `packages/`, `apps/`, `modules/` (not included by default)

**Excluded by default:** `node_modules/`, `dist/`, `build/`, `.git/`, `coverage/`, `test/`, `__tests__/`

### The Solution: `--include` Flag

Use `--include` to specify your project's actual directory structure:

```bash
node cartogomancy.js /path/to/project \
  --output output.json \
  --include "client,server,shared,servers,packages"
```

### Real-World Examples

#### Monorepo with Client/Server (e.g., Abzena)
```bash
# Structure:
# Abzena/
# ├── client/src/     (React frontend - 170 files)
# ├── server/         (Express backend - 6 files)
# ├── shared/         (Utilities - 4 files)
# ├── servers/        (MCP servers - 7 files)
# └── packages/       (npm packages - 1 file)

node cartogomancy.js /Users/d.edens/lab/Faros/Abzena \
  --output public/data/Abzena-uml.json \
  --include "client,server,shared,servers,packages"
```

**Result:** ✅ 187 TypeScript files analyzed instead of 0!

#### Nx/Turborepo Monorepo
```bash
# Structure: apps/, libs/, packages/
node cartogomancy.js . \
  --include "apps,libs,packages"
```

#### Lerna Monorepo
```bash
# Structure: packages/package-a, packages/package-b
node cartogomancy.js . \
  --include "packages"
```

#### Python Project
```bash
# Most Python projects won't work - this generator only supports JS/TS
# But if you have TypeScript tooling:
node cartogomancy.js . \
  --include "src,scripts,tools"
```

#### Scan Everything (Nuclear Option)
```bash
# Empty include = scan all files (except excludes)
node cartogomancy.js . \
  --include "" \
  --output everything.json
```

### Custom Exclude Patterns

Override default excludes:
```bash
node cartogomancy.js . \
  --include "src,lib" \
  --exclude "node_modules,dist,build,.git,coverage,test,__tests__,tmp,cache"
```

### Automating in package.json

Add to your `package.json` for easy reuse:
```json
{
  "scripts": {
    "visualize": "node path/to/cartogomancy.js . --output uml-data.json",
    "visualize:custom": "node path/to/cartogomancy.js . --output uml-data.json --include \"client,server,shared\""
  }
}
```

Then run: `npm run visualize:custom`

### Troubleshooting

**Still getting 0 files?**
1. Check your directory names match the `--include` patterns
2. Ensure you're using supported file extensions (`.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`)
3. Verify files aren't in excluded directories (`node_modules/`, `dist/`, etc.)
4. Try `--include ""` to see what files would be detected without restrictions

**Getting too many files?**
1. Use more specific include patterns: `--include "src/components,src/services"`
2. Add more exclude patterns: `--exclude "node_modules,test,*.spec.ts"`

## 🎨 TUI Features Showcase

**Smart Project Discovery:**
- Scans `~/lab`, `~/projects`, `~/dev` for projects
- Filters for directories with `package.json`
- Shows suggested projects in menu

**Live Analysis Progress:**
- 🔄 Scanning project files...
- 🔍 Analyzing code structure... (23/150 files)
- 📊 Reading project metadata...
- ✅ Analysis complete!

**Results Dashboard:**
```
┌─────────────────┬────────────────────────────┐
│ Metric          │ Value                      │
├─────────────────┼────────────────────────────┤
│ Project Name    │ my-awesome-project         │
│ Components      │ 158                        │
│ Packages        │ 19                         │
└─────────────────┴────────────────────────────┘

🔥 Most Complex Components:
┌────────────────────┬────────────┬────────┐
│ Component          │ Complexity │ Lines  │
├────────────────────┼────────────┼────────┤
│ Dashboard          │ 45         │ 523    │
│ ProjectManager     │ 38         │ 412    │
└────────────────────┴────────────┴────────┘

🏙️ City Preview (Building Heights):
  ████ ███ ██ █████ ██ █ ███ ████ ...
  (Taller = More Lines, Red = Complex, Green = Simple)
```

## 📝 Notes

### When to Use TUI vs Web UI

**Use TUI when:**
- Working in terminal environment
- Analyzing private/local projects
- Batch processing multiple repos
- CI/CD automation (CLI mode)
- No browser available

**Use Web UI (SwarmDesk) when:**
- Want full 3D visualization
- Need to explore dependencies interactively
- Presenting to others
- Want to navigate the code city

### Compatibility

- **TUI Mode:** Requires TTY (terminal), won't work in pipes
- **CLI Mode:** Works anywhere, perfect for scripts
- Auto-detects and falls back gracefully

## 🔮 Advanced Features

- **GitHub cloning:** Automatically clones, analyzes, and cleans up temp repos
- **Git metrics:** Tracks commit history and file age
- **Dependency analysis:** Maps import relationships
- **React-aware:** Special handling for components
- **Multi-project:** Analyze multiple projects in one session (TUI)

## 📜 History & Name Origin

**Cartogomancy** combines two mystical arts:
- **Cartography** - The science of map-making and spatial representation
- **Cartomancy** - The practice of divination using cards or maps

Together, they form the mystical practice of revealing hidden structures through map divination. This CLI tool peers into the ethereal architecture of codebases, revealing their true form as 3D city visualizations.

### Migration from uml-generator

This project was formerly known as `@madnessengineering/uml-generator` (command: `swarmdesk-uml`). As of January 2026, it has been renamed to **Cartogomancy** to better reflect its mystical nature and to give it a standalone identity separate from SwarmDesk.

**If you're upgrading from uml-generator:**
- Update package name: `npm install -g @madnessengineering/cartogomancy`
- Update command: `swarmdesk-uml` → `cartogomancy`
- Update scripts in package.json to reference `cartogomancy.js` instead of `uml-generator.js`
- The tool functionality remains identical - only the name has changed!

---

## 🧙‍♂️ From the Mad Laboratory

This arcane tool brings the power of SwarmDesk code visualization to your terminal. Experience the thrill of watching your codebase transform into mystical data structures, then load them in SwarmDesk for the full 3D city experience!

The Mad Engineers at [Madness Interactive](https://madnessinteractive.cc) have been brewing this concoction in our digital laboratory, where code meets creativity and structure becomes art.

---

See [EXAMPLES.md](./EXAMPLES.md) for more usage examples.
