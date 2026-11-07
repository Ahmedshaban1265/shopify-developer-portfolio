import { site } from '../content/site.js';
import { attr, plain } from './utils.mjs';

const mail = site.emails[0];
const tel = site.phones[0];

export const whatsappUrl = tel.whatsapp
  ? `https://wa.me/${tel.whatsapp}?text=${encodeURIComponent(
      "Hi — I'd like to talk about a Shopify project."
    )}`
  : null;

function jsonLd(page) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.brand,
    description: site.positioning,
    slogan: site.tagline,
    email: `mailto:${mail}`,
    telephone: tel.tel,
    url: site.url,
    areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates'],
    knowsAbout: site.meta.keywords,
    address: { '@type': 'PostalAddress', addressCountry: 'EG' },
    founder: site.founders.map((f) => ({ '@type': 'Person', name: f.name, jobTitle: f.role }))
  };
  const out = [org];
  if (page.breadcrumb) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: plain(b.name),
        item: site.url + b.path
      }))
    });
  }
  return out.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
}

const navLinks = (prefix) =>
  site.nav
    .map((l) => `<a href="${prefix}${l.href.replace(/^\//, '')}">${l.label}</a>`)
    .join('\n      ');

export function layout(page) {
  const title = page.title || site.meta.title;
  const desc = page.description || site.meta.description;
  const canonical = site.url + page.path;
  const prefix = page.depth ? '/' : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${attr(title)}</title>
<meta name="description" content="${attr(desc)}">
<meta name="author" content="${attr(site.brand)}">
<meta name="keywords" content="${attr(site.meta.keywords.join(', '))}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#EDEBE6" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E0E0D" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${attr(site.brand)}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${site.url}/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/src/styles/main.css">
${jsonLd(page)}
</head>
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>

<a class="skip" href="#main">Skip to content</a>

<div id="loader" aria-hidden="true">
  <div class="loader-row">
    <div class="loader-word">Shopify e&#8209;commerce</div>
    <div class="loader-num" id="loadNum">00</div>
  </div>
</div>

<div class="cursor" id="cursor" aria-hidden="true"><div class="cursor-dot"></div><div class="cursor-txt" id="cursorTxt"></div></div>

<div class="announce" id="announce"><div class="announce-track" id="announceTrack"></div></div>

<header class="nav" id="nav">
  <div class="nav-in">
    <a class="brand" href="${prefix || '/'}#top" aria-label="${attr(site.brand)} — home"><i></i>${site.brandMark}<span class="dot">.</span></a>
    <nav class="nav-links" aria-label="Primary">
      ${navLinks(prefix)}
    </nav>
    <a class="nav-cta" href="${prefix}#contact" data-magnet>Start a project</a>
    <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span></button>
  </div>
</header>

<div class="menu" id="menu">
  <nav aria-label="Mobile">
    ${site.nav.map((l) => `<a class="m-link" href="${prefix}${l.href.replace(/^\//, '')}">${l.label}</a>`).join('\n    ')}
    <a class="m-link" href="${prefix}#contact">Contact</a>
  </nav>
  <div class="menu-foot">
    <a href="mailto:${mail}">${mail}</a>
    <a href="tel:${tel.tel}">${tel.display}</a>
  </div>
</div>

<main id="main">
${page.body}
</main>

<footer class="noir foot-wrap">
  <div class="wrap foot">
    <span class="studio-line">${site.brand} · ${site.positioning}</span>
    <span class="label">${site.regions} · ${site.year}</span>
    <a class="to-top" href="${prefix}#top" data-magnet>Back to top ↑</a>
  </div>
</footer>

<script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}
