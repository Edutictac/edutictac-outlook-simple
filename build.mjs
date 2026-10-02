import * as esbuild from 'esbuild';
import * as fs from 'node:fs';
import * as path from 'node:path';

const isWatch = process.argv.includes('--watch');

const distDir = path.resolve('dist');

function copyStaticFiles() {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copy manifest
  fs.copyFileSync('public/manifest.json', path.join(distDir, 'manifest.json'));

  // Copy icons if any
  const iconsDist = path.join(distDir, 'icons');
  if (!fs.existsSync(iconsDist)) {
    fs.mkdirSync(iconsDist, { recursive: true });
  }
  if (fs.existsSync('public/icons')) {
    const icons = fs.readdirSync('public/icons');
    for (const icon of icons) {
      fs.copyFileSync(path.join('public/icons', icon), path.join(iconsDist, icon));
    }
  }

  // Copy popup.html
  if (fs.existsSync('src/ui/popup.html')) {
    fs.copyFileSync('src/ui/popup.html', path.join(distDir, 'popup.html'));
  }

  // Copy css files
  const stylesDist = path.join(distDir, 'styles');
  if (!fs.existsSync(stylesDist)) {
    fs.mkdirSync(stylesDist, { recursive: true });
  }
  if (fs.existsSync('src/styles')) {
    const styles = fs.readdirSync('src/styles');
    for (const file of styles) {
      if (file.endsWith('.css')) {
        fs.copyFileSync(path.join('src/styles', file), path.join(stylesDist, file));
      }
    }
  }
}

const buildOptions = {
  entryPoints: {
    content: 'src/content/index.ts',
    popup: 'src/ui/popup.ts'
  },
  bundle: true,
  outdir: 'dist',
  target: ['chrome110', 'edge110'],
  format: 'iife',
  sourcemap: true,
  logLevel: 'info'
};

copyStaticFiles();

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('Build completed successfully.');
}
