import { finePointer, reduceMotion, $, $$ } from './env.js';

/** Custom cursor + magnetic buttons. Desktop pointers only. */
export function initCursor() {
  if (!finePointer || reduceMotion) return;
  const cur = $('#cursor');
  const txt = $('#cursorTxt');
  if (!cur) return;

  document.documentElement.classList.add('has-cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  const loop = () => {
    cx += (tx - cx) * 0.18;
    cy += (ty - cy) * 0.18;
    cur.style.transform = `translate(${cx}px,${cy}px)`;
    requestAnimationFrame(loop);
  };
  loop();

  const bind = (el) => {
    el.addEventListener('mouseenter', () => {
      cur.classList.add('big');
      if (txt) txt.textContent = el.dataset.cursor;
    });
    el.addEventListener('mouseleave', () => cur.classList.remove('big'));
  };
  $$('[data-cursor]').forEach(bind);

  $$('[data-magnet]').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${mx * 0.22}px,${my * 0.3}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
      el.style.transform = '';
      setTimeout(() => { el.style.transition = ''; }, 520);
    });
  });
}
