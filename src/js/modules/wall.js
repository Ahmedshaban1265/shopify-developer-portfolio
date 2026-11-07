import { $, $$ } from './env.js';

/** Horizontal store wall: drag to scroll, progress bar, sector filters. */
export function initWall() {
  const ws = $('#wallScroll');
  const bar = $('#wallBar');
  if (!ws) return;

  const update = () => {
    const max = ws.scrollWidth - ws.clientWidth;
    const p = max > 0 ? ws.scrollLeft / max : 0;
    if (bar) bar.style.width = `${12 + p * 88}%`;
  };
  ws.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();

  // Pointer drag (mouse only — touch already scrolls natively).
  let down = false, startX = 0, startLeft = 0, moved = 0;
  ws.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') return;
    down = true; moved = 0; startX = e.clientX; startLeft = ws.scrollLeft;
    ws.classList.add('dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const d = e.clientX - startX;
    moved = Math.abs(d);
    ws.scrollLeft = startLeft - d;
  });
  window.addEventListener('pointerup', () => { down = false; ws.classList.remove('dragging'); });
  ws.addEventListener('click', (e) => { if (moved > 8) e.preventDefault(); }, true);

  // Sector filters.
  const chips = $$('.filters .chip');
  const stores = $$('.store', ws);
  const empty = $('#wallEmpty');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle('on', on);
        c.setAttribute('aria-pressed', String(on));
      });
      let shown = 0;
      stores.forEach((s) => {
        const match = f === 'all' || s.dataset.sector === f;
        s.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown > 0;
      ws.scrollTo({ left: 0, behavior: 'smooth' });
      update();
    });
  });
}
