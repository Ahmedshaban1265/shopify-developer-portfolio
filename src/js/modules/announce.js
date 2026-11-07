import { reduceMotion, $ } from './env.js';

export function initAnnounce(messages) {
  const track = $('#announceTrack');
  if (!track || !messages?.length) return;

  messages.forEach((m, i) => {
    const d = document.createElement('div');
    d.className = 'announce-item' + (i === 0 ? ' on' : '');
    d.textContent = m;
    track.appendChild(d);
  });

  if (reduceMotion || messages.length < 2) return;
  const items = Array.from(track.children);
  let i = 0;
  setInterval(() => {
    const prev = i;
    items[prev].classList.replace('on', 'off');
    i = (i + 1) % items.length;
    items[i].classList.add('on');
    setTimeout(() => items[prev].classList.remove('off'), 520);
  }, 3800);
}
