#!/usr/bin/env node

/**
 * Build Script for Daily Digest
 * Compiles React app with specific digest JSON and outputs to date folder
 *
 * Usage: node scripts/build-digest.js 2026-06-15-digest.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/build-digest.js <digest-json-file>');
  process.exit(1);
}

const digestFile = args[0];
const digestPath = path.resolve(digestFile);

if (!fs.existsSync(digestPath)) {
  console.error(`Error: ${digestFile} not found`);
  process.exit(1);
}

// Read digest to get the date
const digest = JSON.parse(fs.readFileSync(digestPath, 'utf8'));
const date = digest.date;
const outputDir = path.resolve(date);

console.log(`\n📦 Building digest for ${date}...`);
console.log(`   Input: ${digestFile}`);
console.log(`   Output: ${outputDir}/\n`);

// Update App.jsx to import the correct digest file
const appJsxPath = path.resolve('src/App.jsx');
const appJsxContent = `import React from 'react';
import DigestLayout from './components/DigestLayout';
import digestData from '../${digestFile}';

export default function App() {
  return <DigestLayout digest={digestData} />;
}
`;

fs.writeFileSync(appJsxPath, appJsxContent);
console.log('✓ Updated App.jsx with digest data');

// Build the app
console.log('\n🔨 Running Vite build...\n');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed');
  process.exit(1);
}

// Create date directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Copy build output to date folder
const distPath = path.resolve('dist');
console.log(`\n📁 Copying build to ${outputDir}/...`);

// Copy digest.html as index.html
fs.copyFileSync(
  path.join(distPath, 'digest.html'),
  path.join(outputDir, 'index.html')
);

// Copy assets folder if it exists
const assetsDir = path.join(distPath, 'assets');
if (fs.existsSync(assetsDir)) {
  const outputAssetsDir = path.join(outputDir, 'assets');
  if (!fs.existsSync(outputAssetsDir)) {
    fs.mkdirSync(outputAssetsDir, { recursive: true });
  }

  const assets = fs.readdirSync(assetsDir);
  assets.forEach(asset => {
    fs.copyFileSync(
      path.join(assetsDir, asset),
      path.join(outputAssetsDir, asset)
    );
  });
}

console.log('\n✅ Build complete!');
console.log(`   Output: ${outputDir}/index.html`);
console.log(`\n🌐 To test locally: npx serve ${outputDir}\n`);
