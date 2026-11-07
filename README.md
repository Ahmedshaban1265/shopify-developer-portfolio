# Shopify Developer Portfolio

Personal portfolio for a Shopify e-commerce developer working across Egypt and the Gulf.
Editorial design, real store previews, and working demonstrations of storefront features.

**Stack:** Vite (multi-page) · vanilla JS modules · GSAP + ScrollTrigger · Lenis · Vercel
(static build + one Node serverless function). No framework runtime ships to the browser.

---

## Quick start

```bash
npm install
npm run dev        # generate pages + start Vite on :5173
npm run build      # generate pages + production build into dist/
npm run preview    # serve dist/
npm run lint       # ESLint, zero-warning policy
npm run check      # lint + build (what CI should run)
```

## How the site is put together

Pages are **generated**, not hand-edited. `scripts/generate.mjs` reads the content layer
and writes `index.html` plus one page per case study, which Vite then bundles. Those
generated files are git-ignored — change the content, not the HTML.

```
content/          the single source of truth — all facts live here
  site.js           identity, contact details, nav, stats, metadata
  projects.js       8 featured case studies + the 20-store wall
  practice.js       services, technical expertise, process, about copy
  images.json       generated manifest: slug → view → device → [files]

templates/        pure functions that return HTML strings
  layout.mjs        document shell, head, meta/OG/JSON-LD, nav, footer
  home.mjs          every home-page section
  case.mjs          case-study page
  utils.mjs         responsive <img>, the showcase component, helpers

scripts/
  generate.mjs      writes index.html, work/<slug>/index.html, sitemap, robots
  build-manifest.mjs rebuilds content/images.json from public/images/

src/
  styles/           tokens → layout → sections → components → responsive
  js/modules/       one concern per module, imported by main.js

api/contact.js    POST endpoint for the contact form (Vercel Node function)
public/images/    store screenshots, <slug>-<view>-<device>-<width>.webp
```

### Adding or changing a project

Edit `content/projects.js`. Fields set to `null` are deliberately unknown and render
nothing — fill them in and the case-study page picks them up automatically:

| Field | What it is |
|---|---|
| `challenge` | the commercial/technical problem the store had to solve |
| `contribution` | what *you* personally built, in the first person |
| `solution` | how it was implemented |
| `outcomes` | `[{ value, label }]` — **real measured results only** |
| `stack` | `['Shopify Liquid', 'JavaScript', …]` |

Nothing in this repo invents client results. Keep it that way.

### Adding a store preview

Drop files into `public/images/` named `<slug>-<view>-<device>-<width>.webp`, where
`view` is one of `home`, `product`, `cart`, `collection`, `feature`, then run:

```bash
node scripts/build-manifest.mjs
```

The showcase renders a segmented control only for views that actually exist, so a
project with just a homepage still works perfectly. Keep the aspect ratios —
**1440×889 desktop** and **390×793 mobile** — so no layout shift is introduced.

### Refreshing screenshots from the live stores

A GitHub Actions workflow does this for you:

**Actions → Capture store screenshots → Run workflow**

It runs Playwright against the live storefronts, captures homepage / product page /
cart drawer at both viewports, rebuilds the manifest and commits the result. Stores it
cannot reach are reported in the run summary rather than faked. Edit the store list in
`scripts/capture-screenshots.mjs`.

## Contact form

`api/contact.js` sends enquiries through [Resend](https://resend.com) using plain `fetch`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | API key from the Resend dashboard |
| `CONTACT_TO` | comma-separated recipients |
| `CONTACT_FROM` | verified sender, e.g. `Portfolio <hello@yourdomain.com>` |

Set these in **Vercel → Settings → Environment Variables**. Until they exist the endpoint
returns `503` and the form tells the visitor to email directly — it never silently drops
an enquiry. Spam handling: hidden honeypot field, a minimum fill time, length/format
validation and a small per-IP throttle.

## Accessibility & performance notes

- Reduced motion is respected throughout; the custom cursor and parallax switch off.
- Showcase tabs are a real ARIA tablist with arrow-key navigation; the lightbox traps
  focus and closes on Escape.
- Every image ships explicit `width`/`height` and `srcset`, so there is no layout shift.
- The first store preview loads eagerly; the rest are lazy, with adjacent tab images
  warmed as a project approaches the viewport.

## Deployment

Vercel builds with `npm run build` and serves `dist/`. Pushing to `main` deploys to
production; any other branch gets a preview deployment.

Before launch, set `site.url` in `content/site.js` to the real domain — canonical tags,
Open Graph URLs and `sitemap.xml` all derive from it.
