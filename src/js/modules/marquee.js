import { $ } from './env.js';

export function initMarquee(brands) {
  const mq = $('#marquee');
  if (!mq || !brands?.length) return;
  const html = brands.map((b) => `<span>${b}</span>`).join('');
  mq.innerHTML = html + html;
}
