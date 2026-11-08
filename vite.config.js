import { defineConfig } from 'vite';
import { readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, relative } from 'node:path';

/** Every generated index.html (any language, any depth) is a build entry. */
function htmlEntries(dir = __dirname, out = {}) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', 'dist', 'public', 'src', '.git', '.github', 'content', 'templates', 'scripts', 'api', '_recovered'].includes(name)) continue;
    const full = resolve(dir, name);
    if (statSync(full).isDirectory()) htmlEntries(full, out);
    else if (name === 'index.html') out[relative(__dirname, full).replace(/\/?index\.html$/, '') || 'main'] = full;
  }
  return out;
}

export default defineConfig({
  appType: 'mpa',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
    rollupOptions: { input: existsSync(resolve(__dirname, 'index.html')) ? htmlEntries() : {} }
  },
  server: { port: 5173, open: false }
});
