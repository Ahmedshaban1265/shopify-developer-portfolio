/**
 * Runtime strings for the current page, serialised by the generator into
 * <script type="application/json" id="i18n">. Falls back to an empty bundle.
 */
let bundle = null;

export function t() {
  if (bundle) return bundle;
  try {
    bundle = JSON.parse(document.getElementById('i18n')?.textContent || '{}');
  } catch {
    bundle = {};
  }
  return bundle;
}

export const isRTL = () => document.documentElement.dir === 'rtl';

/** Fill `{name}` placeholders. */
export const fmt = (s = '', vars = {}) => String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] ?? m));

/** Money in the page's convention: "EGP 1,450" / "1,450 ج.م". */
export const money = (n) => fmt(t().money || 'EGP {n}', { n: Number(n).toLocaleString('en-US') });

/** Pick the right plural form (Arabic has six) and fill {n}. */
export function plural(forms, n) {
  if (!forms) return String(n);
  let key = 'other';
  try {
    key = new Intl.PluralRules(t().lang || 'en').select(n);
  } catch {
    /* very old browsers: fall back to "other" */
  }
  return fmt(forms[key] ?? forms.other, { n });
}

/** Arrow-key direction for horizontal tablists: ArrowRight means "next" in LTR, "previous" in RTL. */
export const arrowStep = (key) => {
  const d = key === 'ArrowRight' ? 1 : key === 'ArrowLeft' ? -1 : 0;
  return isRTL() ? -d : d;
};
