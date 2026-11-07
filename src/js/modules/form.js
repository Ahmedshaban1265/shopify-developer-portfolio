import { $, $$ } from './env.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const RULES = {
  name: (v) => (v.trim().length >= 2 ? '' : 'Please enter your name.'),
  email: (v) => (EMAIL.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  store: (v) => (!v.trim() || /^https?:\/\/.+\..+/.test(v.trim()) ? '' : 'Use a full URL, e.g. https://yourstore.com'),
  message: (v) => (v.trim().length >= 20 ? '' : 'A sentence or two about the project, please (20+ characters).')
};

/** Contact form: inline validation, honeypot + timing spam checks, real POST. */
export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
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
      setStatus('Please fix the highlighted fields.', 'err');
      $$('.has-err input, .has-err textarea', form)[0]?.focus();
      return;
    }

    // Spam checks: hidden honeypot, and anything submitted in under 3s.
    if (form.elements.company.value || Date.now() - started < 3000) {
      setStatus('Could not send — please try again in a moment.', 'err');
      return;
    }

    submit.disabled = true;
    setStatus('Sending…');

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
        done.innerHTML = `<h3 class="display">Thanks — that's with me.</h3>
          <p>We read every enquiry and usually reply within one working day.
          If it is urgent, ${
            form.dataset.whatsapp
              ? `<a href="${form.dataset.whatsapp}" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>`
              : `email us directly`
          }.</p>`;
        form.parentElement.insertBefore(done, form);
        return;
      }

      if (res.status === 503) {
        setStatus(data.error || 'The form is not connected yet — please email us directly.', 'err');
      } else {
        setStatus(data.error || 'Something went wrong. Please email us directly instead.', 'err');
      }
    } catch {
      setStatus('Network error — please email us directly instead.', 'err');
    } finally {
      submit.disabled = false;
    }
  });
}
