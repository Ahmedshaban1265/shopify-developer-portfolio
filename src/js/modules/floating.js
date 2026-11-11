import { $ } from './env.js';
import { t } from './i18n.js';
import { scrollToEdge } from './scroll.js';

/** One reversible scroll control, plus the persistent vertical demo CTA. */
export function initFloatingActions() {
  const button = $('#scrollToggle');
  const demo = $('#floatingDemo');
  if (!button) return;
  let scheduled = false;
  const update = () => {
    scheduled = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const up = max > 0 && scrollY / max > 0.45;
    button.dataset.direction = up ? 'up' : 'down';
    button.setAttribute('aria-label', up ? t().scrollUp : t().scrollDown);
    button.hidden = max < 30;
  };
  const onScroll = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  button.addEventListener('click', () => scrollToEdge(button.dataset.direction === 'up' ? 'top' : 'bottom'));
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', update);
  addEventListener('load', update, { once: true });
  update();
  const contact = $('#contact');
  if (contact && demo) new IntersectionObserver(([entry]) => { demo.hidden = entry.isIntersecting; }, { threshold: 0.15 }).observe(contact);
}
