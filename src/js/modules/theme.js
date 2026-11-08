import { t } from './i18n.js';
import { reduceMotion } from './env.js';

const KEY = 'veqru-theme';
const COLORS = { dark: '#111315', light: '#F5F2EA' };

const stored = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
};

function apply(theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme]);
  const btn = document.getElementById('themeToggle');
  if (btn) {
    const s = t();
    btn.setAttribute('aria-label', theme === 'dark' ? s.themeToLight : s.themeToDark);
    btn.setAttribute('aria-pressed', String(theme === 'light'));
  }
}

/**
 * Theme toggle. The initial theme is set before paint by an inline script in
 * <head> (saved choice → OS setting → dark); this wires the button, persists
 * explicit choices, and follows OS changes until the visitor picks one.
 */
export function initTheme() {
  apply(document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  document.getElementById('themeToggle')?.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    try { localStorage.setItem(KEY, next); } catch { /* private mode: still switch for this page */ }
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(() => apply(next));
    else apply(next);
  });

  const mq = window.matchMedia?.('(prefers-color-scheme: light)');
  mq?.addEventListener?.('change', (e) => {
    if (!stored()) apply(e.matches ? 'light' : 'dark');
  });
}

/** Keep the visitor's place when switching language: carry the #section across. */
export function initLangSwitch() {
  const a = document.getElementById('langSwitch');
  if (!a) return;
  a.addEventListener('click', () => {
    const base = a.getAttribute('href').split('#')[0];
    const section = [...document.querySelectorAll('main section[id]')].find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.4;
    });
    if (section && section.id !== 'hero') a.setAttribute('href', `${base}#${section.id}`);
  });
}
