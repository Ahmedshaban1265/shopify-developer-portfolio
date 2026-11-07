/**
 * Static page generator.
 *
 * Reads the content layer (content/*.js) and writes the HTML entry points that
 * Vite then bundles. Run via `npm run generate`, which `dev` and `build` call.
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site, isProduction } from '../content/site.js';
import { featured } from '../content/projects.js';
import { layout } from '../templates/layout.mjs';
import { homeBody } from '../templates/home.mjs';
import { caseBody, caseMeta } from '../templates/case.mjs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = (...p) => join(root, ...p);

async function write(relPath, html) {
  const file = out(relPath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  return relPath;
}

async function main() {
  const written = [];

  // Clean previously generated case-study pages so removed projects disappear.
  await rm(out('work'), { recursive: true, force: true });

  written.push(
    await write(
      'index.html',
      layout({
        path: '/',
        depth: 0,
        bodyClass: 'page-home',
        body: homeBody()
      })
    )
  );

  for (const p of featured) {
    const meta = caseMeta(p);
    written.push(
      await write(
        `work/${p.slug}/index.html`,
        layout({ ...meta, bodyClass: 'page-case', body: caseBody(p) })
      )
    );
  }

  // robots.txt + sitemap.xml
  const urls = ['/', ...featured.map((p) => `/work/${p.slug}/`)];
  const today = new Date().toISOString().slice(0, 10);
  await write(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${site.url}${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.7'}</priority></url>`
  )
  .join('\n')}
</urlset>
`
  );
  await write(
    'public/robots.txt',
    isProduction
      ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n'
  );

  console.log(`generated ${written.length} pages:\n  ${written.join('\n  ')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
