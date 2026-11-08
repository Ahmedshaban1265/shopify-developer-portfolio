/**
 * Fails the build if a locale is missing keys, has extra keys, or has
 * mismatched list lengths compared with the reference locale (en).
 *
 * - Plural maps (listed in PLURALS) are exempt: each language has its own
 *   plural categories.
 * - A string in one locale and null in another is a WARNING, not an error:
 *   it means a case-study field has been written in one language only.
 */
import { locales, DEFAULT_LANG } from '../content/i18n/index.js';

const PLURALS = new Set(['client.cartItems']);
const errors = [];
const warnings = [];

const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);

function compare(a, b, path, lang) {
  if (PLURALS.has(path)) {
    if (kind(b) !== 'object' || !('other' in b)) errors.push(`${lang}: ${path} must be a plural map with an "other" key`);
    return;
  }
  const ka = kind(a);
  const kb = kind(b);
  if (ka !== kb) {
    if ((ka === 'null' && kb === 'string') || (ka === 'string' && kb === 'null')) {
      warnings.push(`${lang}: ${path} is ${kb === 'null' ? 'not yet written' : 'written only'} in ${lang}`);
    } else {
      errors.push(`${lang}: ${path} is ${kb}, expected ${ka}`);
    }
    return;
  }
  if (ka === 'array') {
    if (a.length !== b.length) errors.push(`${lang}: ${path} has ${b.length} items, expected ${a.length}`);
    a.forEach((v, i) => i < b.length && compare(v, b[i], `${path}[${i}]`, lang));
  } else if (ka === 'object') {
    for (const k of Object.keys(a)) {
      if (!(k in b)) errors.push(`${lang}: missing ${path ? `${path}.` : ''}${k}`);
      else compare(a[k], b[k], path ? `${path}.${k}` : k, lang);
    }
    for (const k of Object.keys(b)) if (!(k in a)) errors.push(`${lang}: extra key ${path ? `${path}.` : ''}${k}`);
  } else if (ka === 'string' && /\{\w+\}/.test(a)) {
    // Placeholders must survive translation.
    const need = new Set(a.match(/\{\w+\}/g));
    for (const p of need) if (!b.includes(p)) errors.push(`${lang}: ${path} is missing placeholder ${p}`);
  }
}

const ref = locales[DEFAULT_LANG];
for (const [lang, data] of Object.entries(locales)) {
  if (lang !== DEFAULT_LANG) compare(ref, data, '', lang);
}

for (const w of warnings) console.warn(`  warn  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`  error ${e}`);
  console.error(`\ni18n check failed: ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`i18n ok — ${Object.keys(locales).join(', ')} share one shape` + (warnings.length ? ` (${warnings.length} warning(s))` : ''));
