import { reduceMotion, $, $$ } from './env.js';

/** Short page-load sequence, then hand off to the hero reveal. */
export function initLoader() {
  const loader = $('#loader');
  const num = $('#loadNum');

  const startHero = () => {
    const hero = $('#hero') || $('.cs-head');
    hero?.classList.add('hero-ready', 'is-in');
    $$('#hero .rv, .cs-head .rv').forEach((el) => el.classList.add('is-in'));
    document.body.classList.add('ready');
  };

  if (!loader) return startHero();

  if (reduceMotion) {
    loader.style.display = 'none';
    return startHero();
  }

  requestAnimationFrame(() => loader.classList.add('lit'));
  let n = 0;
  const iv = setInterval(() => {
    n = Math.min(100, n + Math.floor(Math.random() * 13) + 6);
    if (num) num.textContent = String(n).padStart(2, '0');
    if (n < 100) return;
    clearInterval(iv);
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(startHero, 220);
      setTimeout(() => { loader.style.display = 'none'; }, 1200);
    }, 200);
  }, 95);
}
