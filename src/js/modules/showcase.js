import { $, $$ } from './env.js';

/**
 * Store showcase: segmented control that swaps the desktop AND mobile preview
 * together, with a crossfade and no layout shift (panels are stacked, the
 * stage keeps the height of the tallest).
 *
 * One component drives every project — behaviour is read from the DOM.
 */
export function initShowcase() {
  $$('[data-showcase]').forEach(setup);
}

function setup(root) {
  const slug = root.dataset.showcase;
  const tabs = $$('.seg-btn', root);
  if (tabs.length < 2) return;

  const panels = $$('.view', root);
  const caption = $(`[data-caption="${slug}"]`);

  const show = (id, { focus = false } = {}) => {
    tabs.forEach((t) => {
      const on = t.dataset.view === id;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
      if (on && caption) caption.textContent = t.textContent.toLowerCase();
    });

    panels.forEach((p) => {
      const on = p.dataset.view === id;
      if (on) {
        p.hidden = false;
        // next frame so the transition runs from the hidden state
        requestAnimationFrame(() => p.classList.add('on'));
      } else {
        p.classList.remove('on');
        // keep it in the layout until the fade finishes
        setTimeout(() => {
          if (!p.classList.contains('on')) p.hidden = true;
        }, 320);
      }
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(tab.dataset.view));
    tab.addEventListener('keydown', (e) => {
      const map = { ArrowRight: 1, ArrowLeft: -1, Home: 'first', End: 'last' };
      if (!(e.key in map)) return;
      e.preventDefault();
      const next =
        map[e.key] === 'first' ? 0 : map[e.key] === 'last' ? tabs.length - 1 : (i + map[e.key] + tabs.length) % tabs.length;
      show(tabs[next].dataset.view, { focus: true });
    });
  });

  // Warm the adjacent views once the project scrolls near the viewport so a
  // tab switch never shows an empty frame.
  const warm = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        warm.unobserve(e.target);
        $$('img', e.target).forEach((im) => {
          im.loading = 'eager';
          if (!im.complete) im.decode?.().catch(() => {});
        });
      });
    },
    { rootMargin: '600px 0px' }
  );
  warm.observe(root);
}

/** Fullscreen viewer for any preview image. */
export function initLightbox() {
  const lb = $('#lightbox');
  if (!lb) return;
  const panel = $('#lbPanel');
  const scroll = $('#lbScroll');
  const title = $('#lbTitle');
  let lastFocus = null;

  const close = () => {
    lb.hidden = true;
    document.body.classList.remove('is-locked');
    scroll.innerHTML = '';
    lastFocus?.focus();
  };

  const open = (btn) => {
    const src = $('img', btn);
    if (!src) return;
    lastFocus = btn;
    title.textContent = btn.getAttribute('aria-label')?.replace(/^Enlarge /, '') || 'Preview';
    const clone = document.createElement('img');
    clone.src = src.currentSrc || src.src;
    clone.alt = src.alt;
    scroll.innerHTML = '';
    scroll.appendChild(clone);
    lb.hidden = false;
    document.body.classList.add('is-locked');
    $('#lbClose').focus();
  };

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-zoom]');
    if (btn) { e.preventDefault(); open(btn); return; }
    if (e.target.closest('[data-lb-close]') || e.target.closest('#lbClose')) close();
  });

  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    // Simple focus trap: only the close button is focusable inside.
    const focusables = $$('button, a[href]', panel);
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
}
