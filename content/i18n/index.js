/**
 * Locale registry. Add a language by adding a file with the same shape as
 * en.js and listing it here; scripts/check-i18n.mjs enforces the shape.
 */
import en from './en.js';
import ar from './ar.js';

export const locales = { en, ar };
export const LANGS = Object.keys(locales);
export const DEFAULT_LANG = 'en';

/** URL prefix for a language: '' for the default, '/ar' otherwise. */
export const prefix = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);

/** Fill `{name}` placeholders. Unknown placeholders are left visible. */
export const fmt = (str, vars = {}) =>
  String(str).replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));
