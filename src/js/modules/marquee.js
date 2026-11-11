import { $, $$ } from './env.js';

/** Keep keyboard targets visible instead of leaving them behind the moving track. */
export function initBrandMarquee() {
  const root = $('#marquee');
  if (!root) return;
  root.addEventListener('focusin', (event) => {
    const link = event.target.closest('.marquee-item');
    if (!link?.matches(':focus-visible')) return;
    root.classList.add('marquee--keyboard');
    requestAnimationFrame(() => link.scrollIntoView({ block: 'nearest', inline: 'center' }));
  });
  root.addEventListener('focusout', (event) => {
    if (root.contains(event.relatedTarget)) return;
    root.classList.remove('marquee--keyboard');
    $$('.marquee-row', root).forEach((row) => { row.scrollLeft = 0; });
  });
}
