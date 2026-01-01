# @madnessengineering/uml-generator

[![npm version](https://badge.fury.io/js/%40madnessengineering%2Fuml-generator.svg)](https://www.npmjs.com/package/@madnessengineering/uml-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/node/v/@madnessengineering/uml-generator)](https://nodejs.org)

**Interactive Text User Interface for generating UML city visualizations from any codebase!**

Standalone UML generator for SwarmDesk 3D code visualization - analyze any JavaScript/TypeScript codebase with TypeScript AST parsing, dependency graph analysis, and external library detection.

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g @madnessengineering/uml-generator
```

Then run anywhere:
```bash
swarmdesk-uml
# or
swarmdesk-uml /path/to/project
# or
swarmdesk-uml https://github.com/user/repo
```

### Local Installation
```bash
npm install --save-dev @madnessengineering/uml-generator
```

Add to your package.json scripts:
```json
{
  "scripts": {
    "visualize": "swarmdesk-uml . --output uml-data.json"
  }
}
```

---

## ☁️ Cloud Integration

Upload your UML data directly to your SwarmDesk account and visualize in the 3D dashboard!

### Login to SwarmDesk

```bash
swarmdesk-uml login
```

This will:
1. Open your browser to authorize the CLI
2. Display a device code to enter
3. Store your credentials securely in `~/.config/`

### Upload While Analyzing

```bash
# Analyze and upload in one command
swarmdesk-uml . --upload

# Analyze GitHub repo and upload
swarmdesk-uml https://github.com/facebook/react --upload
```

### Upload Existing Files

```bash
swarmdesk-uml upload my-project-uml.json
```

### Check Login Status

```bash
swarmdesk-uml whoami
```

### Logout

```bash
swarmdesk-uml logout
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
cd uml-generator-cli
npm install
node uml-generator.js
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
node uml-generator.js /path/to/project

# Analyze GitHub repo
node uml-generator.js https://github.com/facebook/react

# Custom output with options
node uml-generator.js . --output my-project.json --include "src,lib"

# Show help
node uml-generator.js --help
```

## 📦 Installation

```bash
cd uml-generator-cli
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
node uml-generator.js
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
node uml-generator.js [path|url] [options]
```

See [UML-GENERATOR-README.md](./UML-GENERATOR-README.md) for full CLI documentation.

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

## 🧙‍♂️ From the Mad Laboratory

This TUI edition brings the power of SwarmDesk code visualization to your terminal. Experience the thrill of watching your codebase transform into data, then load it in SwarmDesk for the full 3D city experience!

---

See [EXAMPLES.md](./EXAMPLES.md) for more usage examples.
