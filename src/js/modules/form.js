import { $, $$ } from './env.js';
import { t } from './i18n.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const rules = (F) => ({
  name: (v) => (v.trim().length >= 2 ? '' : F.errName),
  email: (v) => (EMAIL.test(v.trim()) ? '' : F.errEmail),
  store: (v) => (!v.trim() || /^https?:\/\/.+\..+/.test(v.trim()) ? '' : F.errStore),
  message: (v) => (v.trim().length >= 20 ? '' : F.errMessage)
});

/** Contact form: inline validation, honeypot + timing spam checks, real POST. */
export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const F = t();
  const RULES = rules(F);
  const status = $('#cfStatus');
  const submit = $('#cfSubmit');
  const started = Date.now();
  $('#cf-t').value = String(started);

  const fieldError = (name, msg) => {
    const slot = $(`.err[data-for="${name}"]`, form);
    const input = form.elements[name];
    if (slot) slot.textContent = msg;
    if (input) {
      input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      input.closest('.field')?.classList.toggle('has-err', Boolean(msg));
    }
    return !msg;
  };

  Object.keys(RULES).forEach((name) => {
    const input = form.elements[name];
    if (!input) return;
    input.addEventListener('blur', () => fieldError(name, RULES[name](input.value)));
    input.addEventListener('input', () => {
      if (input.closest('.field')?.classList.contains('has-err')) {
        fieldError(name, RULES[name](input.value));
      }
    });
  });

  const setStatus = (msg, kind) => {
    status.textContent = msg;
    status.className = `form-status${kind ? ` is-${kind}` : ''}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let ok = true;
    for (const name of Object.keys(RULES)) {
      const input = form.elements[name];
      if (!input) continue;
      if (!fieldError(name, RULES[name](input.value))) ok = false;
    }
    if (!ok) {
      setStatus(F.fixFields, 'err');
      $$('.has-err input, .has-err textarea', form)[0]?.focus();
      return;
    }

    // Spam checks: hidden honeypot, and anything submitted in under 3s.
    if (form.elements.company.value || Date.now() - started < 3000) {
      setStatus(F.tooQuick, 'err');
      return;
    }

    submit.disabled = true;
    setStatus(F.sending);

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        form.hidden = true;
        const done = document.createElement('div');
        done.className = 'form-done';
        done.setAttribute('role', 'status');
        done.innerHTML = `<h3 class="display h3">${F.doneTitle}</h3><p>${F.doneBody}</p>`;
        form.parentElement.insertBefore(done, form);
        return;
      }

      if (res.status === 503) {
        setStatus(data.error || F.notConnected, 'err');
      } else {
        setStatus(data.error || F.failed, 'err');
      }
    } catch {
      setStatus(F.network, 'err');
    } finally {
      submit.disabled = false;
    }
  });
}
