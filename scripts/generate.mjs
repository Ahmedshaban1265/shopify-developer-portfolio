/**
 * Static page generator — every page, in every language.
 *
 *   en:  /                 /work/<slug>/
 *   ar:  /ar/              /ar/work/<slug>/
 *
 * Reads content/ and templates/, writes HTML entry points that Vite then
 * bundles. Run via `npm run generate` (called by `dev` and `build`).
 */
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { site, isProduction } from '../content/site.js';
import { featured } from '../content/projects.js';
import { locales, LANGS, prefix } from '../content/i18n/index.js';
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

  // Remove previously generated pages so deleted projects/languages disappear.
  await rm(out('work'), { recursive: true, force: true });
  for (const lang of LANGS) if (prefix(lang)) await rm(out(prefix(lang).slice(1)), { recursive: true, force: true });

  for (const lang of LANGS) {
    const L = locales[lang];
    const dir = prefix(lang).slice(1); // '' or 'ar'

    written.push(
      await write(join(dir, 'index.html'), layout({ lang, path: '/', isHome: true, bodyClass: 'page-home', body: homeBody(L) }))
    );

    for (const p of featured) {
      written.push(
        await write(
          join(dir, 'work', p.slug, 'index.html'),
          layout({ ...caseMeta(p, L), bodyClass: 'page-case', body: caseBody(p, L) })
        )
      );
    }
  }

  // sitemap.xml with hreflang alternates for every page.
  const paths = ['/', ...featured.map((p) => `/work/${p.slug}/`)];
  const today = new Date().toISOString().slice(0, 10);
  const entries = [];
  for (const path of paths) {
    const alts = LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${site.url}${prefix(l)}${path}"/>`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${path}"/>`)
      .join('\n');
    for (const l of LANGS) {
      entries.push(`  <url>
    <loc>${site.url}${prefix(l)}${path}</loc>
${alts}
    <lastmod>${today}</lastmod>
    <priority>${path === '/' ? '1.0' : '0.7'}</priority>
  </url>`);
    }
  }
  await write(
    'public/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
  );

  await write(
    'public/robots.txt',
    isProduction ? `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n'
  );

  console.log(`generated ${written.length} pages (${LANGS.join(' + ')})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
