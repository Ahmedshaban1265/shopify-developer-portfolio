import { $, $$ } from './env.js';
import { arrowStep } from './i18n.js';
import { lockScroll } from './scroll.js';

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
      let next = null;
      if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else {
        const step = arrowStep(e.key); // mirrored in RTL
        if (step) next = (i + step + tabs.length) % tabs.length;
      }
      if (next === null) return;
      e.preventDefault();
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

/** Native dialog preview. Store headers currently prohibit live embedding. */
export function initLightbox() {
  const dialog = $('#storePreview');
  if (!dialog) return;
  const image = $('#previewImage');
  const canvas = $('#previewCanvas');
  const title = $('#previewTitle');
  const domain = $('#previewDomain');
  const live = $('#previewLive');
  const controls = $$('[data-preview-device]', dialog);
  let lastFocus = null;
  let sources = {};

  const setDevice = (device) => {
    const source = sources[device] || sources.desktop || sources.mobile;
    if (!source) return;
    image.src = source.src;
    image.alt = source.alt;
    canvas.dataset.device = device;
    controls.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.previewDevice === device)));
  };
  const open = (button) => {
    const root = button.closest('[data-showcase]') || $('[data-showcase]', button.closest('.proj'));
    if (!root) return;
    const view = button.closest('.view') || $('.view.on', root);
    const url = new URL(root.dataset.storeUrl);
    if (url.protocol !== 'https:') return;
    sources = {};
    ['desktop', 'mobile'].forEach((device) => {
      const shot = $(`[data-device="${device}"] img`, view);
      if (shot) sources[device] = { src: shot.srcset ? shot.srcset.split(',').at(-1).trim().split(/\s+/)[0] : shot.src, alt: shot.alt };
    });
    title.textContent = root.dataset.storeName;
    domain.textContent = url.host;
    live.href = url.href;
    lastFocus = button;
    setDevice(button.dataset.device || 'desktop');
    dialog.showModal();
    lockScroll(true);
    document.body.classList.add('preview-open');
    $('#previewClose').focus();
  };
  document.addEventListener('click', (e) => {
    const button = e.target.closest('[data-zoom], [data-preview-open]');
    if (button) { e.preventDefault(); open(button); }
  });
  controls.forEach((button) => button.addEventListener('click', () => setDevice(button.dataset.previewDevice)));
  $('#previewClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    lockScroll(false);
    document.body.classList.remove('preview-open');
    image.removeAttribute('src');
    lastFocus?.focus({ preventScroll: true });
  });
}
