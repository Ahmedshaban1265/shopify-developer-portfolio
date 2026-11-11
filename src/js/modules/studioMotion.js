import { gsap, ScrollTrigger } from './gsap.js';
import { reduceMotion, finePointer, $$ } from './env.js';

/** Scroll-linked word fills keep Arabic words whole and readable. */
export function initStudioMotion() {
  if (reduceMotion) return;
  $$('[data-draw]').forEach((heading) => {
    const words = $$('.draw-word', heading);
    gsap.fromTo(words, { '--reveal': '0%' }, {
      '--reveal': '100%', ease: 'none', stagger: 0.18,
      scrollTrigger: { trigger: heading, start: 'top 88%', end: 'bottom 48%', scrub: 0.5 }
    });
  });
  if (finePointer) $$('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--tilt-x', `${((e.clientX - r.left) / r.width - 0.5) * 5}deg`);
      card.style.setProperty('--tilt-y', `${-((e.clientY - r.top) / r.height - 0.5) * 5}deg`);
    });
    card.addEventListener('pointerleave', () => { card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg'); });
  });
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
