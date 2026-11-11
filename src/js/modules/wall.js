import { $, $$ } from './env.js';

/** Store wall: gentle reversible autoplay, native scrolling, drag and filters. */
export function initWall() {
  const ws = $('#wallScroll');
  const bar = $('#wallBar');
  const toggle = $('#wallPlay');
  if (!ws) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const rtl = getComputedStyle(ws).direction === 'rtl';
  const maxScroll = () => Math.max(0, ws.scrollWidth - ws.clientWidth);
  const readPosition = () => Math.min(maxScroll(), Math.max(0, Math.abs(ws.scrollLeft)));
  let position = readPosition(), direction = 1, paused = false, visible = false;
  let hover = false, touching = false, resumeAt = 0, previous = 0;
  const giveControl = () => { resumeAt = performance.now() + 4000; };

  const update = () => {
    const max = maxScroll();
    const p = max > 0 ? readPosition() / max : 0;
    if (bar) bar.style.width = `${12 + p * 88}%`;
    ws.classList.toggle('is-auto', !motion.matches && max > 1);
    if (toggle) toggle.hidden = motion.matches || max <= 1;
  };
  ws.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', () => { position = readPosition(); update(); });
  motion.addEventListener('change', () => { position = readPosition(); update(); });
  update();

  toggle?.addEventListener('click', () => {
    paused = !paused;
    toggle.textContent = paused ? toggle.dataset.play : toggle.dataset.pause;
  });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.05 }).observe(ws);
  ws.addEventListener('pointerenter', (e) => { if (e.pointerType !== 'touch') hover = true; });
  ws.addEventListener('pointerleave', () => { hover = false; });
  ws.addEventListener('wheel', giveControl, { passive: true });
  ws.addEventListener('focusin', giveControl);
  ws.addEventListener('touchstart', () => { touching = true; }, { passive: true });
  const releaseTouch = () => { if (touching) { touching = false; giveControl(); } };
  window.addEventListener('touchend', releaseTouch, { passive: true });
  window.addEventListener('touchcancel', releaseTouch, { passive: true });

  // Pointer drag (mouse only — touch already scrolls natively).
  let down = false, startX = 0, startLeft = 0, moved = 0;
  ws.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' || e.button !== 0) return;
    down = true; moved = 0; startX = e.clientX; startLeft = ws.scrollLeft;
    ws.classList.add('dragging');
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const d = e.clientX - startX;
    moved = Math.abs(d);
    ws.scrollLeft = startLeft - d;
  });
  const releaseDrag = () => {
    if (down) giveControl();
    down = false;
    ws.classList.remove('dragging');
  };
  window.addEventListener('pointerup', releaseDrag);
  window.addEventListener('pointercancel', releaseDrag);
  window.addEventListener('blur', () => { releaseDrag(); releaseTouch(); hover = false; });
  ws.addEventListener('click', (e) => { if (moved > 8) e.preventDefault(); moved = 0; }, true);

  const animate = (now) => {
    const seconds = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    const max = maxScroll();
    if (motion.matches || !visible || document.hidden || paused || hover || touching || down || ws.contains(document.activeElement) || now < resumeAt || max <= 1) {
      position = readPosition();
    } else {
      position += direction * 28 * seconds;
      if (position >= max || position <= 0) {
        position = Math.min(max, Math.max(0, position));
        direction = position >= max ? -1 : 1;
        resumeAt = now + 1200;
      }
      ws.scrollLeft = rtl ? -position : position;
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);

  // Filtering retains the chosen sector and restarts its own scroll range.
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
      direction = 1;
      giveControl();
      ws.scrollTo({ left: 0, behavior: 'instant' });
      position = 0;
      update();
    });
  });
}
