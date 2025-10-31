#!/usr/bin/env node
/**
 * 🔍⚡ SWARMDESK UML GENERATOR
 * Standalone UML generator for any codebase - visualize any repo in 3D!
 *
 * Features:
 * - Analyze local Git repositories
 * - Clone and analyze GitHub repositories
 * - Generate UML JSON for SwarmDesk 3D visualization
 * - Support for JavaScript/TypeScript/React codebases
 * - Git metrics and dependency analysis
 *
 * Usage:
 *   node uml-generator.js /path/to/repo
 *   node uml-generator.js https://github.com/user/repo
 *   node uml-generator.js . --output my-project.json
 *   node uml-generator.js /path/to/repo --include "src,lib" --exclude "test,dist"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { parse: parseComments } = require('comment-parser');

// Configuration from command line
const args = process.argv.slice(2);
let targetPath = args[0] || '.';
let outputFile = null;
let includePatterns = ['src', 'lib', 'components', 'pages', 'utils', 'hooks', 'services'];
let excludePatterns = ['node_modules', 'dist', 'build', '.git', 'coverage', 'test', '__tests__'];

// Parse command line arguments
for (let i = 1; i < args.length; i++) {
    if (args[i] === '--output' && args[i + 1]) {
        outputFile = args[i + 1];
        i++;
    } else if (args[i] === '--include' && args[i + 1]) {
        includePatterns = args[i + 1].split(',');
        i++;
    } else if (args[i] === '--exclude' && args[i + 1]) {
        excludePatterns = args[i + 1].split(',');
        i++;
    }
}

/**
 * 🌐 Check if input is a GitHub URL
 */
function isGitHubUrl(input) {
    return input.startsWith('http://') || input.startsWith('https://') || input.startsWith('git@');
}

/**
 * 📥 Clone GitHub repository to temp directory
 */
function cloneRepository(url) {
    console.log(`🔄 Cloning repository: ${url}`);
    const tempDir = path.join(process.cwd(), '.swarmdesk-temp', `repo-${Date.now()}`);

    try {
        fs.mkdirSync(tempDir, { recursive: true });
        execSync(`git clone --depth 1 ${url} ${tempDir}`, { stdio: 'inherit' });
        console.log(`✅ Cloned to: ${tempDir}`);
        return tempDir;
    } catch (error) {
        console.error(`❌ Failed to clone repository: ${error.message}`);
        throw error;
    }
}

/**
 * 🧹 Cleanup temporary directory
 */
function cleanupTemp(tempDir) {
    if (tempDir && tempDir.includes('.swarmdesk-temp')) {
        try {
            fs.rmSync(tempDir, { recursive: true, force: true });
            console.log(`🧹 Cleaned up temp directory`);
        } catch (error) {
            console.warn(`⚠️ Could not cleanup temp directory: ${error.message}`);
        }
    }
}

/**
 * 📊 Get Git metrics for a file
 */
function getGitMetrics(filePath, projectRoot) {
    try {
        const relativePath = path.relative(projectRoot, filePath);

        // Get commit count
        const commitCount = execSync(
            `git -C "${projectRoot}" log --oneline -- "${relativePath}" | wc -l`,
            { encoding: 'utf8' }
        ).trim();

        // Get last commit info
        const lastCommitInfo = execSync(
            `git -C "${projectRoot}" log -1 --format="%H|%an|%ae|%ai|%s" -- "${relativePath}"`,
            { encoding: 'utf8' }
        ).trim();

        if (lastCommitInfo) {
            const [hash, author, email, date, message] = lastCommitInfo.split('|');
            const commitDate = new Date(date);
            const daysAgo = Math.floor((Date.now() - commitDate.getTime()) / (1000 * 60 * 60 * 24));

            return {
                commitCount: parseInt(commitCount) || 0,
                lastCommit: {
                    hash: hash.substring(0, 7),
                    author,
                    email,
                    date: commitDate.toISOString(),
                    message: message || '',
                    daysAgo
                },
                isGitTracked: true
            };
        }
    } catch (error) {
        // File not in git or git not available
    }

    return {
        commitCount: 0,
        lastCommit: null,
        isGitTracked: false
    };
}

/**
 * 📁 Find all source files
 */
function findSourceFiles(dir, includes, excludes) {
    const files = [];

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);
            const relativePath = path.relative(dir, fullPath);

            // Skip excluded patterns
            if (excludes.some(pattern => relativePath.includes(pattern))) {
                continue;
            }

            if (entry.isDirectory()) {
                walk(fullPath);
            } else if (entry.isFile()) {
                const ext = path.extname(entry.name);
                if (['.js', '.jsx', '.ts', '.tsx', '.mjs'].includes(ext)) {
                    // Check if file is in included patterns
                    if (includes.length === 0 || includes.some(pattern => relativePath.startsWith(pattern))) {
                        files.push(fullPath);
                    }
                }
            }
        }
    }

    walk(dir);
    return files;
}

/**
 * 🔍 Analyze a single file
 */
function analyzeFile(filePath, projectRoot) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(projectRoot, filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    const packagePath = path.dirname(relativePath);

    // Extract imports
    const dependencies = [];
    const importRegex = /import\s+(?:{[^}]+}|[\w]+|\*\s+as\s+\w+)?\s*(?:,\s*{[^}]+})?\s*from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        // Only track local imports
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
            const depName = path.basename(importPath, path.extname(importPath));
            dependencies.push(depName);
        }
    }

    // Extract React component or class/function
    const isReactComponent = /export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/.test(content) &&
                            (content.includes('import React') || content.includes('from \'react\''));

    const componentMatch = content.match(/export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/);
    const name = componentMatch ? componentMatch[1] : fileName;

    // Count methods/functions
    const methodMatches = content.match(/(?:function\s+\w+|const\s+\w+\s*=\s*(?:async\s+)?\([^)]*\)\s*=>|^\s*\w+\s*\([^)]*\)\s*{)/gm) || [];

    // Calculate complexity (simple metric: conditionals + loops)
    const complexity = (content.match(/\b(if|else|for|while|switch|case|catch)\b/g) || []).length;

    // Get git metrics
    const gitMetrics = getGitMetrics(filePath, projectRoot);

    // Get file stats
    const stats = fs.statSync(filePath);
    const lines = content.split('\n').length;

    return {
        id: `component_${Math.random().toString(36).substring(2, 9)}`,
        name,
        type: 'class',
        subtype: isReactComponent ? 'react_component' : 'utility',
        package: packagePath || 'root',
        filePath: relativePath,
        methods: methodMatches.map((m, i) => ({
            name: m.trim().split(/[\s(]/)[1] || `method_${i}`,
            visibility: 'public',
            type: 'method'
        })),
        fields: [],
        dependencies,
        metrics: {
            lines,
            complexity,
            methodCount: methodMatches.length,
            coverage: Math.random() * 100 // Placeholder - would need actual coverage data
        },
        gitMetrics,
        testMetrics: {
            exists: fs.existsSync(filePath.replace(/\.(jsx?|tsx?)$/, '.test$1')),
            coverage: 0
        }
    };
}

/**
 * 🏗️ Generate UML data structure
 */
function generateUML(projectPath, projectName) {
    console.log(`🔍 Analyzing project: ${projectPath}`);
    console.log(`📦 Include patterns: ${includePatterns.join(', ')}`);
    console.log(`🚫 Exclude patterns: ${excludePatterns.join(', ')}`);

    // Find all source files
    const files = findSourceFiles(projectPath, includePatterns, excludePatterns);
    console.log(`📄 Found ${files.length} source files`);

    // Analyze each file
    const classes = [];
    const packages = new Map();

    for (const filePath of files) {
        try {
            const classData = analyzeFile(filePath, projectPath);
            classes.push(classData);

            // Group by package
            const pkgPath = classData.package;
            if (!packages.has(pkgPath)) {
                packages.set(pkgPath, {
                    id: `package_${Math.random().toString(36).substring(2, 9)}`,
                    name: pkgPath.split('/').pop() || 'root',
                    path: pkgPath,
                    classes: []
                });
            }
            packages.get(pkgPath).classes.push(classData.id);
        } catch (error) {
            console.warn(`⚠️ Error analyzing ${filePath}: ${error.message}`);
        }
    }

    // Get project metadata
    let projectDescription = 'Codebase visualization';
    let projectLanguage = 'JavaScript';

    // Try to read package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            projectName = packageJson.name || projectName;
            projectDescription = packageJson.description || projectDescription;
        } catch (error) {
            console.warn(`⚠️ Could not read package.json: ${error.message}`);
        }
    }

    // Build UML structure
    return {
        version: '6.0',
        generated: new Date().toISOString(),
        project: {
            name: projectName,
            description: projectDescription,
            language: projectLanguage
        },
        packages: Array.from(packages.values()),
        classes
    };
}

/**
 * 🚀 Main execution
 */
function main() {
    console.log('🔍⚡ SWARMDESK UML GENERATOR');
    console.log('═══════════════════════════════\n');

    let workingPath = targetPath;
    let isTemp = false;

    try {
        // Handle GitHub URLs
        if (isGitHubUrl(targetPath)) {
            workingPath = cloneRepository(targetPath);
            isTemp = true;
        } else {
            // Resolve local path
            workingPath = path.resolve(targetPath);
            if (!fs.existsSync(workingPath)) {
                throw new Error(`Path does not exist: ${workingPath}`);
            }
        }

        // Extract project name
        const projectName = path.basename(workingPath);

        // Generate UML
        const umlData = generateUML(workingPath, projectName);

        // Determine output file
        if (!outputFile) {
            outputFile = path.join(process.cwd(), `${projectName}-uml.json`);
        }

        // Write output
        fs.writeFileSync(outputFile, JSON.stringify(umlData, null, 2));

        console.log('\n✨ UML Generation Complete!');
        console.log(`📊 Classes analyzed: ${umlData.classes.length}`);
        console.log(`📦 Packages: ${umlData.packages.length}`);
        console.log(`💾 Output file: ${outputFile}`);
        console.log('\n🎮 Load this file in SwarmDesk to visualize in 3D!');

    } catch (error) {
        console.error(`\n❌ Error: ${error.message}`);
        process.exit(1);
    } finally {
        // Cleanup temp directory if needed
        if (isTemp) {
            cleanupTemp(workingPath);
        }
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateUML, analyzeFile, findSourceFiles };
