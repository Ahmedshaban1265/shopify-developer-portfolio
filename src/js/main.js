import '../styles/main.css';

import { site } from '../../content/site.js';
import { initScroll } from './modules/scroll.js';
import { initLoader } from './modules/loader.js';
import { initAnnounce } from './modules/announce.js';
import { initNav } from './modules/nav.js';
import { initReveal } from './modules/reveal.js';
import { initMarquee } from './modules/marquee.js';
import { initParallax } from './modules/parallax.js';
import { initWall } from './modules/wall.js';
import { initRtlDemo } from './modules/rtlDemo.js';
import { initCursor } from './modules/cursor.js';
import { initShowcase, initLightbox } from './modules/showcase.js';
import { initDemoTabs, initStickyDemo, initCartDemo, initVariantDemo } from './modules/demos.js';
import { initContactForm } from './modules/form.js';

/** Decode the HTML entities the content layer uses, for text-node output. */
const decode = (s) => {
  const el = document.createElement('textarea');
  el.innerHTML = s;
  return el.value;
};

function boot() {
  // Structure first — these must not depend on images or fonts.
  initScroll();
  initNav();
  initAnnounce(site.announcements.map(decode));
  initMarquee(site.marquee);
  initShowcase();
  initLightbox();
  initWall();
  initDemoTabs();
  initRtlDemo();
  initStickyDemo();
  initCartDemo();
  initVariantDemo();
  initContactForm();
  initReveal();
  initCursor();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}

// Loader + parallax wait for full load so measurements are correct.
window.addEventListener('load', () => {
  initLoader();
  initParallax();
});
