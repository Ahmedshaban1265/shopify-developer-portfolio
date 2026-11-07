import { defineConfig } from 'vite';
import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

/** Every generated HTML file is a build entry point. */
function htmlEntries() {
  const entries = { main: resolve(__dirname, 'index.html') };
  const workDir = resolve(__dirname, 'work');
  if (existsSync(workDir)) {
    for (const slug of readdirSync(workDir)) {
      const file = resolve(workDir, slug, 'index.html');
      if (existsSync(file)) entries[`work-${slug}`] = file;
    }
  }
  return entries;
}

export default defineConfig({
  appType: 'mpa',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    rollupOptions: { input: htmlEntries() }
  },
  server: { port: 5173, open: false }
});
