# Platform marks — provenance and usage terms

Unlike `public/logos/`, which holds client brand artwork, this folder holds
**platform** marks used by the "Trusted by" section. Third-party trademarks
belong to their owners. Record the source for anything added here.

## shopify-bag.svg

- **Source:** downloaded 12 Nov 2026 from Shopify's official brand-assets page,
  `shopify-logo-shopping-bag-full-color` on `cdn.shopify.com`. Unmodified.
- **Why the bag and not the full logo:** Shopify publishes "The Shopping Bag"
  as a standalone asset. The full logo would need a second file for dark mode,
  and Shopify's guidelines say *"the 'S' on The Shopping Bag is always white,
  regardless of background colour"* — so one file is correct in both themes.
- **Rules we follow:** not recoloured, stretched, rotated, stacked, given
  gradients or shadows, and never placed on a busy or low-contrast background.
  Clear space of at least ½ the bag's width is reserved around it. Shopify also
  says *"don't use the wordmark alone"* — we use the bag, and "Shopify Partner"
  appears beside it as descriptive text, not as a re-drawn wordmark.
- **Claim:** "Shopify Partner" is permitted for enrolled partners. Shopify's
  partner branding page allows partners to state partnership status in
  marketing without separate written permission.
- **Tier badges are a separate thing.** Silver tier or higher, officially
  confirmed, downloaded from the Dev Dashboard, and per Shopify's page not
  downloadable until 1 Jan 2027. We deliberately ship **no tier badge**. Do not
  add one until the tier is confirmed, and update it within 48 hours if it
  changes.

## Meta — deliberately absent

There is **no Meta logo in this folder, and that is intentional.**

Meta's brand resources state plainly: *"All usage of the Meta logo requires
approval."* The permitted-use list covers formal partnerships or sponsorships
under a Meta agreement, editorial, books and film, packaging, and TV or online
marketing — with no exception for a company that merely advertises on Meta.
Running client campaigns does not grant logo rights and does not make a studio
a Meta Business Partner.

So the Meta tile uses **plain text naming the platform** plus a VEQRU-drawn
glyph. Naming a product in prose is ordinary nominative reference; reproducing
the logomark is not. No partner, certification or endorsement wording is used.

To add the real logo later: obtain Brand Review approval through a Meta
counterpart, then drop the approved file in here and set `logo` on the `meta`
entry in `content/site.js`. The template already renders a logo when present.
