import { $, $$ } from './env.js';

/** "Copy address" buttons in the direct-contact cards. */
export function initCopyButtons() {
  const buttons = $$('[data-copy]');
  if (!buttons.length) return;
  const status = $('#copyStatus');

  const announce = (msg) => {
    if (!status) return;
    status.textContent = msg;
    clearTimeout(announce.t);
    announce.t = setTimeout(() => { status.textContent = ''; }, 2600);
  };

  const fallbackCopy = (text) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
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
      const text = btn.dataset.copy;
      let ok = false;
      try {
        await navigator.clipboard.writeText(text);
        ok = true;
      } catch {
        ok = fallbackCopy(text);
      }
      if (ok) {
        btn.textContent = 'Copied ✓';
        btn.classList.add('done');
        announce(`${text} copied to your clipboard.`);
      } else {
        // Clipboard blocked: leave the address visible and selectable.
        btn.textContent = 'Select & copy';
        announce(`Couldn't copy automatically — the address is ${text}.`);
      }
      setTimeout(() => {
        btn.textContent = label;
        btn.classList.remove('done');
      }, 1800);
    });
  });
}
