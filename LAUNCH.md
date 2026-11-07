# VEQRU — launch checklist

This branch (`veqru-rebrand`) is the agency site. It deploys as a **protected
preview** and is not merged into `main`. Work through this list before launch.

## 1. Brand clearance — blocking

- [ ] **Register the domain.** `veqru.com`, `.io`, `.co`, `.net`, `.dev`,
      `.studio` and `.agency` were all unregistered on 7 Nov 2026. Nothing has
      been purchased.
- [ ] **Trademark search** in Egypt, the GCC states you sell into, EUIPO and
      USPTO, ideally through a trademark attorney. A general web search found
      no exact "VEQRU" mark (nearest: unrelated `VEQ`, `VERQ`). That is a
      preliminary check, not clearance.
- [ ] Check social handles (`@veqru` on Instagram, LinkedIn, X, Behance).

## 2. Content — blocking

- [ ] Both founders approve their role line and bio in `content/site.js`.
- [ ] Fill `challenge` / `contribution` / `solution` per project in
      `content/projects.js`. Say who did what, and mark any AI-assisted work.
      The fields render automatically once they're filled in.
- [ ] Add `outcomes` only where you have real measured numbers.
- [ ] Skechers & ECCO: provide the brand-specific frg.store URLs so the capture
      workflow can add product-page and cart-drawer previews.
- [ ] Retro Sport Egypt, Italiano, MAZY, Shopify Slice: confirm URL + scope,
      or leave them out.

## 3. Contact form — blocking

Set in **Vercel → Project → Settings → Environment Variables** (Production):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | from resend.com |
| `CONTACT_TO` | `Abdulramanmagdy@gmail.com,anmedshaban1265@gmail.com` |
| `CONTACT_FROM` | `VEQRU <hello@veqru.com>` — requires the domain verified in Resend |

Until these exist, `/api/contact` returns 503 and the form tells visitors to
email you directly.

## 4. Go-live steps

1. Add the domain to the Vercel project and point DNS at it.
2. Set `SITE_URL=https://veqru.com` (Production). Canonical tags, Open Graph
   URLs and `sitemap.xml` all derive from it.
3. Open a PR from `veqru-rebrand` into `main`, review the preview, and merge.
4. Check the live site: canonical tags, `robots.txt` allows crawling, there's
   no `noindex` tag, the OG card renders when shared, and the form delivers.
5. Submit `sitemap.xml` in Google Search Console.

## Do not claim

- Shopify Partner or Shopify Expert status, unless verified.
- Any team member, review, certification, metric or years of experience
  that isn't documented.
