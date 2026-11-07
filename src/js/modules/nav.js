import { $, $$ } from './env.js';
import { lockScroll } from './scroll.js';

export function initNav() {
  const nav = $('#nav');
  const announce = $('#announce');
  const burger = $('#burger');

  const onScroll = () => {
    const stuck = (window.scrollY || 0) > 40;
    nav?.classList.toggle('stuck', stuck);
    announce?.classList.toggle('up', stuck);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger?.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    lockScroll(open);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('menu-open')) burger?.click();
  });

  // Section-aware nav highlighting.
  const links = $$('.nav-links a');
  if (!links.length) return;
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((l) => {
          const id = l.getAttribute('href').split('#')[1];
          l.classList.toggle('active', id === e.target.id);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  ['work', 'services', 'demos', 'process', 'about'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}
