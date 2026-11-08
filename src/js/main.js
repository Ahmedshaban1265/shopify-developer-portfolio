import '../styles/main.css';

import { t } from './modules/i18n.js';
import { initTheme, initLangSwitch } from './modules/theme.js';
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
import { initCopyButtons } from './modules/copy.js';

const BRANDS = [
  'Skechers', 'ANTA', 'ECCO', 'MyVi', 'Infinity Clinic Pharma',
  'Skinify', 'IMZA', 'Givago', 'Cole Haan', 'Fashion Retail Group'
];

function boot() {
  initTheme();
  initLangSwitch();
  initScroll();
  initNav();
  initAnnounce(t().announcements);
  initMarquee(BRANDS);
  initShowcase();
  initLightbox();
  initWall();
  initDemoTabs();
  initRtlDemo();
  initStickyDemo();
  initCartDemo();
  initVariantDemo();
  initContactForm(); // no-op when the form is switched off
  initCopyButtons();
  initReveal();
  initCursor();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();

// Loader and parallax wait for full load so measurements are correct.
window.addEventListener('load', () => {
  initLoader();
  initParallax();
});
