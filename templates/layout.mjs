import { site, isProduction } from '../content/site.js';
import { locales, LANGS, prefix, fmt } from '../content/i18n/index.js';
import { attr, plain } from './utils.mjs';

const tel = site.phones[0];

export const whatsappUrl = (L) =>
  tel.whatsapp ? `https://wa.me/${tel.whatsapp}?text=${encodeURIComponent(plain(L.contact.whatsappText))}` : null;

const wordmark = (cls = '') => `<span class="wordmark ${cls}">${site.brandMark}<span class="wm-dot" aria-hidden="true"></span></span>`;
export { wordmark };

const ICON_SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>';
const ICON_MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.6A8.2 8.2 0 0 1 9.4 4a8.2 8.2 0 1 0 10.6 10.6z"/></svg>';
const ICON_UP = '<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 10.5V1.5M2 5.5l4-4 4 4"/></svg>';

/* Picks the theme before first paint: saved choice → OS setting → dark. */
const THEME_BOOT = `(function(){var d=document.documentElement,t;try{t=localStorage.getItem('veqru-theme')}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='light'?'#F5F2EA':'#111315')})();`;

function jsonLd(page, L) {
  const url = site.url + prefix(page.lang) + page.path;
  const org = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.brand,
    description: plain(L.ui.positioning),
    slogan: plain(L.ui.tagline),
    url: site.url + prefix(page.lang) + '/',
    inLanguage: L.lang,
    ...(site.demoEmail ? { email: site.demoEmail } : {}),
    telephone: tel.tel,
    areaServed: ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'United States'],
    knowsAbout: L.meta.keywords,
    address: { '@type': 'PostalAddress', addressCountry: 'EG' },
    founder: site.founders.map((f) => ({ '@type': 'Person', name: f.name[L.lang], jobTitle: plain(L.about.founders[f.id].role) }))
  };
  const out = [org];
  if (page.breadcrumb) {
    out.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: plain(b.name), item: b.url }))
    });
  }
  void url;
  return out.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
}

/** Strings the browser needs at runtime, serialised into the page. */
const clientBundle = (L) =>
  JSON.stringify({
    lang: L.lang,
    dir: L.dir,
    announcements: L.announcements.map(plain),
    themeToLight: L.ui.themeToLight,
    themeToDark: L.ui.themeToDark,
    menuOpen: L.ui.menuOpen,
    menuClose: L.ui.menuClose,
    scrollUp: L.ui.scrollUp,
    scrollDown: L.ui.scrollDown,
    form: L.form,
    ...L.client,
    copyFailed: plain(L.client.copyFailed)
  }).replace(/</g, '\\u003c');

/**
 * page: { lang, path (language-neutral, e.g. '/' or '/work/myvi/'), title?,
 *         description?, ogType?, breadcrumb?, bodyClass, body, isHome }
 */
export function layout(page) {
  const L = locales[page.lang];
  const pre = prefix(page.lang);
  const other = LANGS.find((l) => l !== page.lang);
  const O = locales[other];
  const title = page.title || L.meta.title;
  const desc = page.description || L.meta.description;
  const canonical = site.url + pre + page.path;
  const home = `${pre}/`;
  const anchor = (id) => (page.isHome ? `#${id}` : `${home}#${id}`);
  const ogImage = `${site.url}/${page.lang === 'ar' ? 'og-ar.png' : 'og.png'}`;

  const alternates = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${l}" href="${site.url}${prefix(l)}${page.path}">`
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="${L.lang}" dir="${L.dir}" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${attr(title)}</title>
<meta name="theme-color" content="#111315">
<script>${THEME_BOOT}</script>
<meta name="description" content="${attr(desc)}">
<meta name="keywords" content="${attr(L.meta.keywords.join(', '))}">
<meta name="author" content="${site.brand}">
${isProduction ? '' : '<meta name="robots" content="noindex, nofollow">'}
<link rel="canonical" href="${canonical}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${site.url}${page.path}">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="${site.brand}">
<meta property="og:locale" content="${L.locale}">
<meta property="og:locale:alternate" content="${O.locale}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${attr(title)}">
<meta name="twitter:description" content="${attr(desc)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/src/styles/main.css">
<noscript><style>
  /* Reveals and the preloader are both driven by script. Without it the
     loader never dismisses and every .rv stays at opacity 0, so the page is
     a blank screen. Serve the whole thing statically instead — the same
     overrides the reduced-motion block uses. */
  #loader, .cursor, #scrollToggle { display: none !important; }
  .rv, .hero-mascot img { opacity: 1 !important; transform: none !important; translate: none !important; }
  .line { overflow: visible !important; }
  .line > span { transform: none !important; opacity: 1 !important; }
  .frame-d, .frame-p { clip-path: none !important; }
  /* Tab panels are hidden via the hidden attribute; show them all stacked. */
  .demo-panel[hidden] { display: block !important; }
</style></noscript>
${jsonLd(page, L)}
</head>
<body class="${page.bodyClass || ''}">

<a class="skip" href="#main">${L.ui.skip}</a>

<div id="loader" aria-hidden="true">
  <div class="loader-mark">${wordmark()}</div>
  <div class="loader-num" id="loadNum">00</div>
</div>

<div class="cursor" id="cursor" aria-hidden="true"><div class="cursor-dot"></div><div class="cursor-txt" id="cursorTxt"></div></div>

<div class="announce" id="announce" aria-hidden="true"><div class="announce-track" id="announceTrack"></div></div>

<header class="nav" id="nav">
  <div class="nav-in">
    <a class="brand" href="${home}#top" aria-label="${attr(L.ui.homeAria)}">${wordmark()}</a>
    <nav class="nav-links" aria-label="${attr(L.ui.primaryNav)}">
      ${L.ui.nav.map((n) => `<a href="${anchor(n.id)}">${n.label}</a>`).join('\n      ')}
    </nav>
    <div class="nav-tools">
      <a class="tool lang-switch" id="langSwitch" href="${prefix(other)}${page.path}" hreflang="${other}" lang="${other}"
        aria-label="${attr(O.ui.langSwitchAria)}">${O.langName}</a>
      <button class="tool theme-toggle" id="themeToggle" type="button" aria-label="${attr(L.ui.themeToLight)}">${ICON_MOON}${ICON_SUN}</button>
      <a class="btn btn--fill btn--sm nav-cta" href="${anchor('contact')}" data-enquiry="demo" data-magnet>${L.ui.cta}</a>
      <button class="burger" id="burger" type="button" aria-label="${attr(L.ui.menuOpen)}" aria-expanded="false" aria-controls="menu"><span></span></button>
    </div>
  </div>
</header>

<div class="menu" id="menu">
  <nav aria-label="${attr(L.ui.mobileNav)}">
    ${L.ui.nav.map((n) => `<a class="m-link" href="${anchor(n.id)}">${n.label}</a>`).join('\n    ')}
    <a class="m-link" href="${anchor('contact')}">${L.ui.contact}</a>
  </nav>
  <div class="menu-foot">
    ${site.demoEmail ? `<a href="mailto:${site.demoEmail}" dir="ltr">${site.demoEmail}</a>` : ''}
    <a href="tel:${tel.tel}" dir="ltr">${tel.display}</a>
  </div>
</div>

<main id="main">
${page.body}
</main>

<footer class="foot-wrap">
  <div class="wrap foot">
    ${wordmark()}
    <div class="foot-meta">
      <span class="label">${L.ui.positioning}</span>
      <span class="label">${L.ui.regions} · ${site.year}</span>
    </div>
    <a class="to-top" href="${home}#top" data-magnet>${L.ui.backToTop} ${ICON_UP}</a>
  </div>
</footer>

<a class="floating-demo" id="floatingDemo" href="${anchor('contact')}" data-enquiry="demo"><span>${L.ui.bookDemo}</span></a>
<button class="scroll-toggle" id="scrollToggle" type="button" data-direction="down" aria-label="${attr(L.ui.scrollDown)}">${ICON_UP}</button>

<script type="application/json" id="i18n">${clientBundle(L)}</script>
<script type="module" src="/src/js/main.js"></script>
</body>
</html>
`;
}

export { fmt };
