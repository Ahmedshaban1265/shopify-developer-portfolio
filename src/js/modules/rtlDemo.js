import { $, $$ } from './env.js';

/** Bilingual mirror demo: flips direction, language and numerals together. */
export function initRtlDemo() {
  const demo = $('#demo');
  const toggle = $('#dirToggle');
  if (!demo || !toggle) return;

  toggle.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const dir = btn.dataset.dir;
    if (demo.getAttribute('dir') === dir) return;

    $$('button', toggle).forEach((b) => b.classList.toggle('on', b === btn));
    toggle.classList.toggle('ar', dir === 'rtl');
    demo.classList.add('swap');

    setTimeout(() => {
      demo.setAttribute('dir', dir);
      demo.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      $$('[data-en]', demo).forEach((el) => {
        el.textContent = dir === 'rtl' ? el.dataset.ar : el.dataset.en;
      });
      demo.classList.remove('swap');
    }, 240);
  });
}
