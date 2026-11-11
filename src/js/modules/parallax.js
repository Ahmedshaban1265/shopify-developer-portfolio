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

  // A small drift keeps the mascot anchored to the hero without large motion.
  gsap.utils.toArray('.hero-mascot').forEach((el) => {
    gsap.to(el, {
      yPercent: -4,
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
