# 🔍⚡ UML Generator CLI

**Standalone command-line tool for generating UML data from any codebase.**

This tool has been superseded by the integrated web-based UML Generator in SwarmDesk (press `Y` key). However, it remains useful for:
- Batch processing multiple repositories
- CI/CD pipeline integration
- Offline analysis
- Scripting and automation

## 📦 Installation

```bash
cd uml-generator-cli
npm install
```

## 🚀 Usage

See [UML-GENERATOR-README.md](./UML-GENERATOR-README.md) for full documentation.

**Quick Examples:**
```bash
# Analyze local directory
node uml-generator.js /path/to/project

# Analyze GitHub repo
node uml-generator.js https://github.com/facebook/react

# Custom output
node uml-generator.js . --output my-project.json
```

## 📝 Note

For most use cases, we recommend using the integrated UML Generator in SwarmDesk:
1. Open SwarmDesk
2. Press `Y` key
3. Paste GitHub URL
4. Generate and visualize instantly!

The CLI tool is maintained for advanced scripting and automation scenarios.
