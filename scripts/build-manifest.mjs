/**
 * Rebuilds content/images.json from whatever is in public/images/.
 *
 * Filenames must be `<slug>-<view>-<device>-<width>.webp`, e.g.
 *   skinify-product-mobile-560.webp
 *
 * Widths are read from the file itself so srcset never lies about a small
 * source that could not be upscaled.
 */
import { readdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dir = join(root, 'public', 'images');
const NAME = /^(.+?)-(home|product|cart|collection|feature)-(desktop|mobile)-(\d+)\.webp$/;

/** Minimal WebP dimension reader (VP8 / VP8L / VP8X). */
function webpSize(buf) {
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const fourcc = buf.toString('ascii', 12, 16);
  if (fourcc === 'VP8 ') {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourcc === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fourcc === 'VP8X') {
    const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
    return { w, h };
  }
  return null;
}

const manifest = {};
const skipped = [];

for (const file of readdirSync(dir).sort()) {
  if (!file.endsWith('.webp')) continue;
  const m = NAME.exec(file);
  if (!m) {
    skipped.push(file);
    continue;
  }
  const [, slug, view, device] = m;
  const size = webpSize(readFileSync(join(dir, file)));
  if (!size) {
    skipped.push(`${file} (unreadable)`);
    continue;
  }
  ((manifest[slug] ??= {})[view] ??= {})[device] ??= [];
  manifest[slug][view][device].push({ src: `/images/${file}`, w: size.w, h: size.h });
}

// Sort by width and drop duplicate widths (a source too small to upscale).
for (const slug of Object.keys(manifest)) {
  for (const view of Object.keys(manifest[slug])) {
    for (const device of Object.keys(manifest[slug][view])) {
      const seen = new Set();
      manifest[slug][view][device] = manifest[slug][view][device]
        .sort((a, b) => a.w - b.w)
        .filter((f) => (seen.has(f.w) ? false : seen.add(f.w)));
    }
  }
}

writeFileSync(join(root, 'content', 'images.json'), JSON.stringify(manifest, null, 2) + '\n');

const summary = Object.entries(manifest)
  .map(([slug, views]) => `  ${slug}: ${Object.keys(views).join(', ')}`)
  .join('\n');
console.log(`image manifest rebuilt\n${summary}`);
if (skipped.length) console.warn(`skipped (bad name): ${skipped.join(', ')}`);
