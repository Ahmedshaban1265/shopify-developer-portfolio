# VEQRU — launch status

VEQRU is live on a free Vercel address. No custom domain has been purchased,
and none is required for this stage.

| | |
|---|---|
| Production | `main` → the project's `.vercel.app` production domain |
| Previews | every other branch — protected by Vercel auth, `noindex` |
| Personal portfolio backup | `portfolio-personal-backup` |

## Done

- [x] VEQRU branch merged into `main` and live in production
- [x] Production publicly accessible; previews remain protected
- [x] `SITE_URL` set to the production `.vercel.app` address — canonical tags,
      Open Graph, JSON-LD, `sitemap.xml` and `robots.txt` all derive from it
- [x] Demo/project form validates and prepares a WhatsApp request; email delivery
      stays off until the studio mailbox is supplied
- [x] Brand system: design tokens, light/dark themes, English/Arabic with
      true RTL. 18 pages (9 per language) with hreflang + x-default.

## Still open

### Brand clearance

- [ ] **Trademark search** for "VEQRU" in Egypt, the GCC markets you sell into,
      EUIPO and USPTO, ideally through a trademark attorney. A general web
      search on 7 Nov 2026 found no exact mark (nearest: unrelated `VEQ`,
      `VERQ`). That is a preliminary check, not clearance.
- [ ] Social handles (`@veqru` on Instagram, LinkedIn, X, Behance).
- [ ] Domain — optional. `veqru.com` and the other TLDs checked were unregistered
      on 7 Nov 2026. If you buy one later: add it in Vercel, then update
      `SITE_URL`. Nothing in the code needs to change.

### Contact form

The form currently uses an explicit WhatsApp hand-off. To enable email later:

1. Obtain the studio mailbox from the owner and configure a verified sender.
2. Set `RESEND_API_KEY`, `CONTACT_TO` (the studio mailbox) and `CONTACT_FROM`
   in Vercel Production.
3. Set `demoEmail` and `contactEmailEnabled: true` in `content/site.js`, then push.
4. Verify delivery and reply-to with a real test enquiry.

The current interface never reports an enquiry as emailed or a demo as booked.

### Content

- [ ] **Arabic spelling of both founders' names** in `content/site.js`
      (`أحمد شعبان`, `عبدالرحمن مجدي`). Each founder should confirm his own —
      a name is not something to guess at.
- [ ] Read the Arabic copy in `content/i18n/ar.js` end to end. It was written,
      not machine-translated, but it has had no native-speaker review and the
      marketing voice is a judgement call.
- [x] Individual founder profiles replaced by a compact studio section.
- [ ] Fill in `challenge` / `contribution` / `solution` per project in
      `content/i18n/projects.en.js` **and** `projects.ar.js`. They are `null`
      today, and each case study says so rather than inventing a story.
      Say who did what, and mark any work done with AI assistance.
- [ ] Add `outcomes` only where you have real measured numbers.
- [x] Skechers, ANTA and ECCO destinations confirmed by the owner and added
      to the project links and screenshot-capture configuration.
- [ ] Retro Sport Egypt, Italiano, MAZY, Shopify Slice: confirm the URL and
      scope for each, or leave them out.

## Do not claim

- Shopify Partner or Shopify Expert status, unless verified.
- Any team member, review, certification, metric or years of experience
  that isn't documented.
