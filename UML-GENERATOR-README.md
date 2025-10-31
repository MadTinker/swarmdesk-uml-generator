# 🔍⚡ SwarmDesk UML Generator

Standalone UML generator that analyzes any codebase and creates JSON data for 3D visualization in SwarmDesk!

## ✨ Features

- 📂 **Analyze Local Repositories**: Point it at any project on your machine
- 🌐 **GitHub Support**: Clone and analyze any public GitHub repository
- 📊 **Git Metrics**: Track commit history, contributors, and file age
- 🔗 **Dependency Analysis**: Automatically detect imports and relationships
- 🎯 **React-Aware**: Special handling for React components
- 🎨 **3D Ready**: Generates UML JSON that SwarmDesk can visualize

## 🚀 Quick Start

### Installation

```bash
cd SwarmDesk
npm install
```

### Usage Examples

**Analyze local directory:**
```bash
node uml-generator.js /path/to/your/project
```

**Analyze current directory:**
```bash
node uml-generator.js .
```

**Analyze GitHub repository:**
```bash
node uml-generator.js https://github.com/facebook/react
```

**Custom output file:**
```bash
node uml-generator.js . --output my-project-uml.json
```

**Filter specific directories:**
```bash
node uml-generator.js . --include "src,components" --exclude "test,dist,node_modules"
```

## 📋 Command Line Options

| Option | Description | Example |
|--------|-------------|---------|
| `[path]` | Local path or GitHub URL | `./my-project` or `https://github.com/user/repo` |
| `--output` | Output JSON file path | `--output data/my-uml.json` |
| `--include` | Comma-separated directories to include | `--include "src,lib,components"` |
| `--exclude` | Comma-separated patterns to exclude | `--exclude "test,dist,build"` |

## 📊 Output Format

The generator creates a JSON file compatible with SwarmDesk's 3D visualization:

```json
{
  "version": "6.0",
  "generated": "2025-10-30T...",
  "project": {
    "name": "my-project",
    "description": "Project description",
    "language": "JavaScript"
  },
  "packages": [...],
  "classes": [
    {
      "id": "component_abc123",
      "name": "MyComponent",
      "type": "class",
      "subtype": "react_component",
      "filePath": "src/components/MyComponent.js",
      "methods": [...],
      "dependencies": ["Header", "Footer"],
      "metrics": {
        "lines": 150,
        "complexity": 12,
        "methodCount": 5
      },
      "gitMetrics": {
        "commitCount": 23,
        "lastCommit": {...}
      }
    }
  ]
}
```

## 🎮 Using in SwarmDesk

1. Generate UML for your project:
   ```bash
   node uml-generator.js ~/my-project --output my-project-uml.json
   ```

2. Copy the output file to SwarmDesk data directory:
   ```bash
   cp my-project-uml.json ../public/data/
   ```

3. Load in SwarmDesk by pressing `I` key to cycle data sources, or update the URL:
   ```
   http://localhost:3000?uml=my-project-uml.json
   ```

## 🧪 Testing

Test the generator on itself:
```bash
npm test
```

## 🔧 Supported File Types

- `.js` - JavaScript
- `.jsx` - React JSX
- `.ts` - TypeScript
- `.tsx` - TypeScript React
- `.mjs` - ES Modules

## 📦 Default Include/Exclude Patterns

**Included by default:**
- `src/`, `lib/`, `components/`, `pages/`, `utils/`, `hooks/`, `services/`

**Excluded by default:**
- `node_modules/`, `dist/`, `build/`, `.git/`, `coverage/`, `test/`, `__tests__/`

## 🎯 Use Cases

1. **Explore New Codebases**: Quickly visualize unfamiliar projects in 3D
2. **Architecture Review**: See dependency relationships and package structure
3. **Refactoring**: Identify tightly coupled components
4. **Documentation**: Generate visual documentation of code structure
5. **Complexity Analysis**: Spot files that might need refactoring

## 🔮 Future Enhancements

- [ ] TypeScript type extraction
- [ ] JSDoc comment parsing
- [ ] Test coverage integration
- [ ] Multiple project comparison
- [ ] Private GitHub repo support (with tokens)
- [ ] GitLab/Bitbucket support

## 🧙‍♂️ Mad Laboratory Notes

This tool is part of the Madness Interactive workshop - built for rapid codebase exploration and visualization. We're pushing the boundaries of what's possible with 3D code visualization!

**Pro Tips:**
- Use with large repos to see amazing 3D cities
- GitHub URLs automatically clone to `.swarmdesk-temp/` and cleanup after
- Git metrics work best with repositories that have commit history
- Combine with SwarmDesk's F7/F8 keys to see dependency arrows

## 📝 License

MIT - Part of the Madness Interactive Laboratory
