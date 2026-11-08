import { gsap, ScrollTrigger } from './gsap.js';
import { reduceMotion } from './env.js';

/** Subtle scrub parallax on the store previews. */
export function initParallax() {
  if (reduceMotion) return;
  ScrollTrigger.config({ ignoreMobileResize: true });

  gsap.utils.toArray('.view.on .frame-d img').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -3.2 },
      {
        yPercent: 3.2,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.stage'), start: 'top bottom', end: 'bottom top', scrub: 0.6 }
      }
    );
  });

  // Hero phones drift at different depths as the page scrolls.
  gsap.utils.toArray('.hphone').forEach((el) => {
    const depth = parseFloat(el.dataset.depth || '1');
    gsap.to(el, {
      yPercent: -9 * depth,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
    });
  });

  gsap.utils.toArray('.frame-p').forEach((p) => {
    gsap.fromTo(
      p,
      { y: 24 },
      {
        y: -24,
        ease: 'none',
        scrollTrigger: { trigger: p.closest('.stage'), start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      }
    );
  });
}
