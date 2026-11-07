import { reduceMotion, $$ } from './env.js';

/** Scroll-triggered reveals + number counters. */
export function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );
  $$('.rv, .proj, .lines, .showcase').forEach((el) => {
    if (el.closest('#hero') || el.closest('.cs-head')) return;
    obs.observe(el);
  });

  const counters = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        counters.unobserve(el);
        const end = parseFloat(el.dataset.count);
        const sfx = el.dataset.suffix || '';
        if (reduceMotion) { el.textContent = end + sfx; return; }
        const dur = 1500;
        let t0 = null;
        const step = (t) => {
          if (!t0) t0 = t;
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? sfx : '');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.5 }
  );
  $$('[data-count]').forEach((el) => counters.observe(el));
}
