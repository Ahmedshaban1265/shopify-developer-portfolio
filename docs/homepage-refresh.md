# Homepage refresh — 11 November 2026

The homepage now leads with a shorter hero, six service cards and a two-column
work gallery. Detailed project copy remains on the case-study pages. Individual
founder profiles are replaced by a studio statement and three concise facts.

## Store previews

Clicking any featured screenshot or “Explore store” opens a native dialog with
desktop/mobile screenshot controls. Escape and the close button dismiss it and
return focus to the trigger. “Open live store” uses the project’s original HTTPS
URL and opens a new tab.

Live browsing inside an iframe is unavailable: all eight destinations checked on
11 November returned `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`:

- FRG Skechers: https://frg.com.eg/pages/skechers-home
- FRG ANTA: https://frg.com.eg/pages/anta-home
- ECCO: https://eg.ecco.com
- MyVi: https://myvistores.com
- Infinity Clinic Pharma: https://infinityclinicpharma.com
- Skinify: https://uskinify.com
- IMZA: https://imzaeg.com
- Givago: https://givago.com

The dialog is deliberately a screenshot preview. It does not proxy pages, strip
security headers or imply that the screenshots are interactive storefronts.

## ECCO images

The owner’s desktop and mobile attachments were encoded as WebP without changing
the artwork. They use `ecco-current-home-{desktop,mobile}-<width>.webp`, so immutable
caches do not retain the previous screenshots. The image manifest carries the
actual aspect ratios. The screenshot-capture script uses the new slug too.

## Demo enquiries

The physical left-center CTA reads “Book a demo” vertically. It scrolls to the
contact form and selects the demo request type. The form also supports project
enquiries and the six service categories.

`contactEmailEnabled` is false and `demoEmail` is empty. For now, submission
validates the details and prepares a WhatsApp link using the existing business
number. The visitor must click that link and send the message themselves. Editing
any field clears the prepared link to prevent sending stale details. No demo is
automatically booked and no email-delivery claim is shown.

When the mailbox is supplied, configure Vercel’s `RESEND_API_KEY`, `CONTACT_TO`
and verified `CONTACT_FROM`, then set `demoEmail` and `contactEmailEnabled: true`
in `content/site.js`. Test real delivery before relying on this path.

## Motion and controls

Existing GSAP/ScrollTrigger fills whole words on scroll without breaking Arabic
letter joining. Service cards tilt subtly on devices with a fine pointer. Reduced
motion disables the fills, tilt and drift while keeping content fully readable.
No additional animation library or purported Apple skill was installed.

There is one reversible scroll button: down to the end from the upper page, up to
the top after passing 45% of the scroll range. Its icon and accessible label change
together. The floating demo CTA hides when the contact section is visible; both
floating controls hide while a menu or dialog locks scrolling.
