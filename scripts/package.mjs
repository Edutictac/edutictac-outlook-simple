import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

// 1. Run build
console.log('Building project...');
execSync('node build.mjs', { stdio: 'inherit' });

// 2. Read version from package.json
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = pkg.version;

const distDir = path.resolve('dist');
const zipOutDir = path.resolve('dist-zip');

if (!fs.existsSync(zipOutDir)) {
  fs.mkdirSync(zipOutDir, { recursive: true });
}

const zipName = `edutictac-outlook-simple-v${version}.zip`;
const zipPath = path.join(zipOutDir, zipName);

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

console.log(`Packaging extension to ${zipPath}...`);
execSync(`cd "${distDir}" && zip -r "${zipPath}" ./*`, { stdio: 'inherit' });

console.log(`\n🎉 Extension package created successfully:\n-> ${zipPath}`);
