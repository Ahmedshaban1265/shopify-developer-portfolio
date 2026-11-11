/**
 * POST /api/contact — contact form handler (Vercel Node function).
 *
 * Sends the enquiry by email through Resend (https://resend.com) using plain
 * fetch, so there is no SDK dependency.
 *
 * Required environment variables (set in Vercel → Settings → Environment Variables):
 *   RESEND_API_KEY   API key from the Resend dashboard
 *   CONTACT_TO       comma-separated recipient addresses
 *   CONTACT_FROM     a sender on a domain you own and have verified in Resend
 *
 * Without the required configuration the endpoint returns 503. The front end
 * uses an explicit WhatsApp hand-off while contactEmailEnabled is false.
 */

const MAX = { name: 80, email: 120, store: 200, message: 2000, projectType: 60 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** Very small in-memory throttle. Per-instance only — a speed bump, not a wall. */
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 500) hits.clear();
  return list.length > 5;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Invalid request.' });

  const { name = '', email = '', store = '', message = '', projectType = '', company = '', t = '' } = body;
  if ([name, email, store, message, projectType, company].some((v) => typeof v !== 'string')) {
    return res.status(422).json({ error: 'Please check the form and try again.' });
  }
  const requestType = body.requestType === 'demo' ? 'Demo request' : 'Project enquiry';

  // Spam gates: honeypot and a minimum fill time.
  if (company) return res.status(200).json({ ok: true });
  const started = Number(t);
  if (!Number.isFinite(started) || started <= 0 || Date.now() - started < 3000) {
    return res.status(400).json({ error: 'That was too quick — please try again.' });
  }

  const errors = [];
  if (name.trim().length < 2 || name.length > MAX.name) errors.push('name');
  if (!EMAIL_RE.test(email.trim()) || email.length > MAX.email) errors.push('email');
  if (message.trim().length < 20 || message.length > MAX.message) errors.push('message');
  if (store && (store.length > MAX.store || !/^https?:\/\//i.test(store))) errors.push('store');
  if (projectType.length > MAX.projectType) errors.push('projectType');
  if (errors.length) return res.status(422).json({ error: 'Please check the form and try again.', fields: errors });

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many enquiries from this connection. Please email us directly.' });
  }

  const key = process.env.RESEND_API_KEY;
  const to = (process.env.CONTACT_TO || '').split(',').map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM;

  if (!key || !to.length || !from) {
    return res.status(503).json({
      error: 'The contact form is not connected yet — please email us directly.',
      detail: 'Missing RESEND_API_KEY, CONTACT_TO or CONTACT_FROM.'
    });
  }

  const html = `
    <h2>VEQRU — ${requestType}</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    ${store ? `<p><strong>Store:</strong> ${esc(store)}</p>` : ''}
    <p><strong>Needs:</strong> ${esc(projectType).slice(0, MAX.projectType)}</p>
    <hr>
    <p style="white-space:pre-wrap">${esc(message)}</p>
    <hr>
    <p style="color:#888;font-size:12px">Sent from the portfolio contact form · ${esc(ip)}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to,
        reply_to: email.trim(),
        subject: `VEQRU ${requestType} — ${name.trim().replace(/[\r\n]+/g, ' ')}`,
        html
      })
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => '');
      console.error('Resend error', r.status, detail.slice(0, 300));
      return res.status(502).json({ error: 'Could not send right now. Please email us directly.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler failed:', err?.message);
    return res.status(502).json({ error: 'Could not send right now. Please email us directly.' });
  }
}
