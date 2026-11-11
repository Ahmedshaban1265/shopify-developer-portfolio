import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap.js';
import { reduceMotion, $$ } from './env.js';

let lenis = null;

export function initScroll() {
  if (!reduceMotion) {
    try {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 });
      const raf = (t) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
      if (gsap && ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
    } catch {
      lenis = null;
    }
  }

  $$('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.getAttribute('href'), location.href);
      // A link to an anchor on ANOTHER page (e.g. /ar/#work from a case
      // study) must navigate, not scroll.
      if (url.origin !== location.origin || url.pathname !== location.pathname) return;
      const hash = url.hash;
      if (!hash) return;
      const el = hash === '#top' ? document.body : document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      closeMenu();
      goTo(el, hash === '#top');
      if (hash !== '#top') history.replaceState(null, '', hash);
    });
  });
}

function closeMenu() {
  document.body.classList.remove('menu-open', 'is-locked');
  const b = document.getElementById('burger');
  if (b) b.setAttribute('aria-expanded', 'false');
  lenis?.start();
}

export function goTo(el, _top = false) {
  // No manual offset: sections carry scroll-margin-top (nav height + gap),
  // which Lenis and scrollIntoView both honour. Adding one here doubled it.
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

export const lockScroll = (on) => {
  document.body.classList.toggle('is-locked', on);
  if (lenis) on ? lenis.stop() : lenis.start();
};

export function scrollToEdge(edge) {
  closeMenu();
  if (lenis) lenis.scrollTo(edge === 'top' ? 0 : 'bottom');
  else window.scrollTo({ top: edge === 'top' ? 0 : document.documentElement.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
}
