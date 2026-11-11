import { $, $$ } from './env.js';
import { t } from './i18n.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const rules = (F) => ({
  name: (v) => v.trim().length >= 2 ? '' : F.errName,
  email: (v) => EMAIL.test(v.trim()) ? '' : F.errEmail,
  store: (v) => !v.trim() || /^https?:\/\/.+\..+/.test(v.trim()) ? '' : F.errStore,
  message: (v) => v.trim().length >= 20 ? '' : F.errMessage
});

/** Email-ready form, with an explicit WhatsApp hand-off until mail is configured. */
export function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const F = t().form;
  const RULES = rules(F);
  const status = $('#cfStatus');
  const submit = $('#cfSubmit');
  const whatsapp = $('#cfWhatsApp');
  const started = Date.now();
  $('#cf-t').value = String(started);

  const setStatus = (message, kind = '') => {
    status.textContent = message;
    status.className = `form-status${kind ? ` is-${kind}` : ''}`;
  };
  const fieldError = (name, message) => {
    const input = form.elements[name];
    $(`.err[data-for="${name}"]`, form).textContent = message;
    input.setAttribute('aria-invalid', String(Boolean(message)));
    input.closest('.field').classList.toggle('has-err', Boolean(message));
    return !message;
  };
  $$('[data-enquiry]').forEach((control) => control.addEventListener('click', () => {
    const kind = control.dataset.enquiry;
    form.elements.requestType.value = kind;
    if (control.dataset.service) form.elements.projectType.value = control.dataset.service;
    $$('[data-enquiry]', form).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.enquiry === kind)));
    whatsapp.hidden = true;
    setStatus('');
  }));
  Object.keys(RULES).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener('blur', () => fieldError(name, RULES[name](input.value)));
    input.addEventListener('input', () => {
      if (input.closest('.has-err')) fieldError(name, RULES[name](input.value));
    });
  });
  const clearDraft = () => { whatsapp.hidden = true; whatsapp.removeAttribute('href'); setStatus(''); };
  form.addEventListener('input', clearDraft);
  form.addEventListener('change', clearDraft);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    for (const [name, rule] of Object.entries(RULES)) if (!fieldError(name, rule(form.elements[name].value))) valid = false;
    if (!valid) { setStatus(F.fixFields, 'err'); $('.has-err input, .has-err textarea', form)?.focus(); return; }
    if (form.elements.company.value || Date.now() - started < 3000) { setStatus(F.tooQuick, 'err'); return; }
    const payload = Object.fromEntries(new FormData(form).entries());
    if (form.dataset.delivery === 'whatsapp') {
      const parts = [payload.requestType === 'demo' ? F.demoType : F.projectTypeLabel, '', `${F.name}: ${payload.name.trim()}`, `${F.email}: ${payload.email.trim()}`];
      if (payload.store.trim()) parts.push(`${F.store}: ${payload.store.trim()}`);
      parts.push(`${F.need}: ${payload.projectType}`, '', payload.message.trim());
      whatsapp.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(parts.join('\n'))}`;
      whatsapp.hidden = false;
      setStatus(F.whatsappReady);
      whatsapp.focus();
      return;
    }
    submit.disabled = true;
    setStatus(F.sending);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (response.ok) {
        form.reset();
        $$('[data-enquiry]', form).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.enquiry === 'demo')));
        setStatus(`${F.doneTitle} ${F.doneBody}`);
      } else setStatus(response.status === 503 ? F.notConnected : F.failed, 'err');
    } catch { setStatus(F.network, 'err'); }
    finally { submit.disabled = false; }
  });
}
