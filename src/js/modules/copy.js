import { $, $$ } from './env.js';
import { t, fmt } from './i18n.js';

/** "Copy address" buttons on the founder contact cards. */
export function initCopyButtons() {
  const buttons = $$('[data-copy]');
  if (!buttons.length) return;
  const status = $('#copyStatus');
  const s = t();

  const announce = (msg) => {
    if (!status) return;
    status.textContent = msg;
    clearTimeout(announce.t);
    announce.t = setTimeout(() => { status.textContent = ''; }, 2800);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  };

  buttons.forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const email = btn.dataset.copy;
      let ok = false;
      try { await navigator.clipboard.writeText(email); ok = true; } catch { ok = fallbackCopy(email); }
      if (ok) {
        btn.textContent = `${s.copied} ✓`;
        btn.classList.add('done');
        announce(fmt(s.copiedMsg, { email }));
      } else {
        btn.textContent = s.copyFailed;
        announce(fmt(s.copyFailedMsg, { email }));
      }
      setTimeout(() => { btn.textContent = label; btn.classList.remove('done'); }, 1800);
    });
  });
}
