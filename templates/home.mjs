import { site } from '../content/site.js';
import { featured, wall } from '../content/projects.js';
import { prefix, fmt } from '../content/i18n/index.js';
import { showcase, viewsFor, localize, attr, plain, ltr, ARROW, ARROW_R } from './utils.mjs';
import { whatsappUrl } from './layout.mjs';

/** A display heading whose lines reveal one by one, ending on the brand dot. */
const heading = (lines, cls = 'h2', tag = 'h2', extra = '') => `<${tag} class="display ${cls} lines"${extra}>
      ${lines
        .map(
          (l, i) =>
            `<span class="line"><span>${l}${i === lines.length - 1 && !/[?؟]$/.test(plain(l)) ? '<span class="dot" aria-hidden="true"></span>' : ''}</span></span>`
        )
        .join('\n      ')}
    </${tag}>`;

const sectHead = (eyebrow, title, note) => `<div class="sect-head">
    <div>
      <span class="label eyebrow rv">${eyebrow}</span>
      <h2 class="display h2 rv">${title}</h2>
    </div>
    ${note ? `<p class="sect-note rv rv-d1">${note}</p>` : ''}
  </div>`;

/** Two opposing rows, each duplicated once for a seamless CSS-only loop. */
const brandMarquee = () => {
  const rows = [site.marquee.slice(0, 5), site.marquee.slice(5)];
  return `<div class="marquee" id="marquee" dir="ltr" aria-hidden="true">
    ${rows.map((brands) => {
      const group = `<div class="marquee-group">${brands.map((b) => `<span class="marquee-item marquee-item--${b.slug}"><img src="/logos/${b.slug}.svg" width="${b.width}" height="${b.height}" alt="" decoding="async" draggable="false"></span>`).join('')}</div>`;
      return `<div class="marquee-row"><div class="marquee-track">${group}${group.replace('class="marquee-group"', 'class="marquee-group" data-clone')}</div></div>`;
    }).join('\n    ')}
  </div>`;
};

/* ------------------------------------------------------------------ hero */
const hero = (L) => `
<section class="hero" id="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <span class="label eyebrow rv">${L.hero.eyebrow}</span>
      ${heading(L.hero.titleLines, 'h-hero hero-h1', 'h1', ' id="heroH1"')}
      <p class="lead hero-lede rv rv-d1">${L.hero.lede}</p>
      <div class="hero-acts rv rv-d2">
        <a class="btn btn--fill" href="#work" data-magnet>${L.hero.ctaPrimary} ${ARROW_R}</a>
        <a class="btn" href="#contact" data-magnet>${L.hero.ctaSecondary}</a>
      </div>
      <ul class="hero-facts rv rv-d3">
        ${L.hero.facts.map((f) => `<li>${f}</li>`).join('\n        ')}
      </ul>
    </div>
    <figure class="hero-stage hero-mascot">
      <img src="${site.heroIllustration.src}" srcset="${site.heroIllustration.srcset}"
        sizes="(max-width: 680px) 90vw, (max-width: 1080px) 520px, 42vw"
        width="${site.heroIllustration.width}" height="${site.heroIllustration.height}"
        alt="${attr(L.hero.mascotAlt)}" fetchpriority="high" decoding="async">
    </figure>
  </div>
  ${brandMarquee()}
</section>`;

/* ----------------------------------------------------------------- stats */
const stats = (L) => `
<section class="wrap stats-wrap" aria-label="${attr(L.ui.positioning)}">
  <div class="stats" id="stats">
    ${site.stats
      .map(
        (s, i) => `<div class="stat rv rv-d${i}">
      <b${s.text ? ' class="txt"' : ''}${s.value ? ` data-count="${s.value}"${s.suffix ? ` data-suffix="${s.suffix}"` : ''}` : ''}>${s.text || 0}</b>
      <small class="label">${L.stats[i]}</small>
    </div>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* ------------------------------------------------------------------ work */
function project(base, i, L) {
  const p = localize(base, L);
  const n = String(i + 1).padStart(2, '0');
  const views = viewsFor(p.img, L);
  const pre = prefix(L.lang);
  return `
  <article class="proj" data-n="${n}" id="${p.slug}">
    <div class="proj-head rv">
      <div>
        <span class="label">${fmt(L.work.projectLabel, { n })}</span>
        <h3 class="display proj-title">${p.name}</h3>
        <span class="label">${p.category}</span>
      </div>
      <div class="proj-links">
        <a class="tlink" href="${pre}/work/${p.slug}/">${L.work.caseStudy} ${ARROW}</a>
        <a class="tlink" href="${p.url}" target="_blank" rel="noopener noreferrer"><span class="mono" dir="ltr">${p.domain}</span> ${ARROW}</a>
      </div>
    </div>

    ${showcase(p, L, { eager: i === 0 })}

    <div class="proj-body">
      <div>
        <p class="proj-note rv">${p.summary}</p>
        <div class="proj-scope rv">
          <span class="label">${L.work.scope}</span>
          <div class="scope-list">${p.scope.map((s) => `<span class="pill">${s}</span>`).join('')}</div>
        </div>
      </div>
      <div class="proj-feats">
        ${p.highlights.map((h, j) => `<div class="feat rv rv-d${j + 1}"><h4>${h[0]}</h4><p>${h[1]}</p></div>`).join('\n        ')}
      </div>
    </div>
    ${views.length > 1 ? `<p class="proj-meta label">${p.previewNote || L.work.previewNote} · ${views.map((v) => v.label).join(' · ')}</p>` : ''}
  </article>`;
}

const work = (L) => `
<section class="sect wrap" id="work">
  ${sectHead(L.work.eyebrow, L.work.title, L.work.note)}
  ${featured.map((p, i) => project(p, i, L)).join('\n')}
</section>`;

/* ------------------------------------------------------------ store wall */
const storeWall = (L) => {
  const present = new Set(wall.map((s) => s.sector));
  const sectors = Object.entries(L.wall.sectors).filter(([id]) => id === 'all' || present.has(id));
  return `
<section class="sect wrap" id="stores">
  ${sectHead(L.wall.eyebrow, L.wall.title, L.wall.note)}
  <div class="filters rv" role="group" aria-label="${attr(L.wall.filterAria)}">
    ${sectors
      .map(([id, label], i) => `<button class="chip${i === 0 ? ' on' : ''}" type="button" data-filter="${id}" aria-pressed="${i === 0}">${label}</button>`)
      .join('\n    ')}
  </div>
  <div class="wall-scroll" id="wallScroll">
    <div class="wall">
      ${wall
        .map(
          (s, i) => `<a class="store" data-sector="${s.sector}" href="https://${s.domain}" target="_blank" rel="noopener noreferrer" data-cursor="${attr(L.wall.visit)}">
        <div><span class="store-n">${String(i + 1).padStart(2, '0')}</span>
          <h4 dir="ltr">${s.name}</h4><span class="store-cat">${L.wall.categories[s.domain]}</span></div>
        <span class="store-dom"><span dir="ltr">${s.domain}</span> ${ARROW}</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
  <div class="wall-bar"><i id="wallBar"></i></div>
  <p class="wall-empty" id="wallEmpty" hidden>${L.wall.empty}</p>
</section>`;
};

/* ------------------------------------------------------------------- why */
const why = (L) => `
<section class="sect wrap" id="why">
  ${sectHead(L.why.eyebrow, L.why.title, L.why.note)}
  <div class="why">
    ${L.why.items
      .map(
        (w, i) => `<div class="card why-item rv rv-d${i}">
      <span class="why-n">0${i + 1}</span>
      <h3 class="h3">${w.title}</h3>
      <p>${w.body}</p>
    </div>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* -------------------------------------------------------------- services */
const servicesSection = (L) => `
<section class="sect wrap" id="services">
  ${sectHead(L.services.eyebrow, L.services.title, L.services.note)}
  <div class="bento">
    ${L.services.items
      .map(
        (s, i) => `<article class="card cell${s.span ? ` cell--${s.span}` : ''} rv">
      <div class="cell-top"><span class="cell-n">${String(i + 1).padStart(2, '0')}</span></div>
      <h3 class="h3">${s.title}</h3>
      <p class="cell-benefit">${s.benefit}</p>
      <p class="cell-body">${s.body}</p>
      <div class="cell-tags">${s.tags.map((t) => `<span class="pill">${t}</span>`).join('')}</div>
    </article>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* ------------------------------------------------------------------ lab */
const CART_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>';
const SEARCH_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
const DOWN_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2v12M3 9l5 5 5-5"/></svg>';
const BOTTLE = (w, h, vb) => `<svg width="${w}" height="${h}" viewBox="${vb}" fill="none" stroke="#141310" stroke-width="1.4" aria-hidden="true">`;

const EXPS = ['rtl', 'sticky', 'rewards', 'variants'];

function bench(L, key, i, controls, rig) {
  const E = L.lab[key];
  const id = `EXP-0${i + 1}`;
  return `<div class="demo-panel${i === 0 ? ' on' : ''}" role="tabpanel" id="demo-${key}" aria-labelledby="dt-${key}"${i === 0 ? '' : ' hidden'}>
      <div class="bench">
        <div class="bench-head">
          <span class="lab-id">${id}</span>
          <span class="live"><i aria-hidden="true"></i>${L.lab.live}</span>
          <span class="spec">${E.spec}</span>
        </div>
        <div class="bench-grid">
          <div class="bench-copy">
            <h3 class="h3">${E.title}</h3>
            <p class="sub">${E.sub}</p>
            ${controls ? `<div class="bench-ctrl">${controls}</div>` : ''}
            <div class="bench-note"><span class="label">${L.lab.whyLabel}</span><p>${E.note}</p></div>
          </div>
          <div class="bench-rig">${rig}</div>
        </div>
      </div>
    </div>`;
}

function lab(L) {
  const money = (n) => fmt(L.client.money, { n: Number(n).toLocaleString('en-US') });
  const isAr = L.lang === 'ar';
  const M = L.mock[isAr ? 'ar' : 'en'];

  // EXP-01 — bilingual mirror. Server-rendered in the page's own language.
  const rtlRig = `<div class="demo" id="demo" dir="${isAr ? 'rtl' : 'ltr'}" lang="${isAr ? 'ar' : 'en'}">
          <div class="demo-bar" data-en="${attr(L.mock.en.bar)}" data-ar="${attr(L.mock.ar.bar)}">${M.bar}</div>
          <div class="demo-nav">
            <div class="demo-logo"><b></b><span data-en="${L.mock.en.logo}" data-ar="${L.mock.ar.logo}">${M.logo}</span></div>
            <div class="demo-links">${M.links.map((l, j) => `<span data-en="${L.mock.en.links[j]}" data-ar="${L.mock.ar.links[j]}">${l}</span>`).join('')}</div>
            <div class="demo-icons">${SEARCH_ICON}${CART_ICON}</div>
          </div>
          <div class="demo-chips">${M.chips.map((c, j) => `<span class="demo-chip${j === 0 ? ' on' : ''}" data-en="${L.mock.en.chips[j]}" data-ar="${L.mock.ar.chips[j]}">${c}</span>`).join('')}</div>
          <div class="demo-card">
            <div class="demo-thumb">
              <span class="demo-badge" data-en="${L.mock.en.badge}" data-ar="${L.mock.ar.badge}">${M.badge}</span>
              ${BOTTLE(34, 52, '0 0 34 52')}<rect x="12" y="2" width="10" height="7" rx="1.6"/><path d="M15 9v4M19 9v4"/><rect x="6" y="13" width="22" height="36" rx="4"/><path d="M10 24h14" stroke-opacity=".35"/><path d="M10 30h9" stroke-opacity=".35"/></svg>
            </div>
            <div class="demo-info">
              <h5 data-en="${L.mock.en.product}" data-ar="${L.mock.ar.product}">${M.product}</h5>
              <p data-en="${L.mock.en.meta}" data-ar="${L.mock.ar.meta}">${M.meta}</p>
              <div class="demo-price"><b data-en="${L.mock.en.price}" data-ar="${L.mock.ar.price}">${M.price}</b><s data-en="${L.mock.en.was}" data-ar="${L.mock.ar.was}">${M.was}</s></div>
              <span class="demo-btn">${CART_ICON}<span data-en="${L.mock.en.add}" data-ar="${L.mock.ar.add}">${M.add}</span></span>
            </div>
          </div>
        </div>`;
  const rtlCtrl = `<div class="toggle${isAr ? ' ar' : ''}" id="dirToggle" role="group" aria-label="${attr(L.lab.rtl.toggleAria)}">
              <i></i>
              <button type="button" class="${isAr ? '' : 'on'}" data-dir="ltr" lang="en" aria-pressed="${!isAr}">EN</button>
              <button type="button" class="${isAr ? 'on' : ''}" data-dir="rtl" lang="ar" aria-pressed="${isAr}">العربية</button>
            </div>`;

  // EXP-02 — sticky add to cart.
  const S = L.lab.sticky;
  const stickyRig = `<div class="demo demo-scroll" id="stickyDemo">
          <div class="sd-inner" tabindex="0" aria-label="${attr(S.title)}">
            <div class="sd-hero">
              <div class="sd-img" aria-hidden="true">${BOTTLE(60, 90, '0 0 60 90').replace('stroke-width="1.4"', 'stroke-width="1.3"')}<rect x="18" y="4" width="24" height="12" rx="3"/><path d="M24 16v6M36 16v6"/><rect x="8" y="22" width="44" height="64" rx="7"/><path d="M16 42h28" stroke-opacity=".3"/><path d="M16 52h18" stroke-opacity=".3"/></svg></div>
              <div>
                <h5 class="sd-title">${S.product}</h5>
                <p class="sd-meta">${S.meta}</p>
                <div class="sd-price"><b>${money(S.price)}</b></div>
                <button class="sd-atc" type="button" id="sdMainBtn">${L.client.addToCart}</button>
                <p class="sd-ship">${fmt(S.ship, { x: money(800) })}</p>
              </div>
            </div>
            <div class="sd-body">
              ${S.sections.map(([h, t]) => `<h6>${h}</h6><p>${fmt(t, { x: money(800) })}</p>`).join('\n              ')}
            </div>
          </div>
          <div class="sd-sticky" id="sdSticky" aria-hidden="true">
            <div class="sd-sticky-l"><span class="sd-sticky-thumb"></span><span><b>${S.product}</b><i>${money(S.price)}</i></span></div>
            <button class="sd-atc sd-atc--sm" type="button" id="sdStickyBtn" tabindex="-1">${L.client.addToCart}</button>
          </div>
        </div>`;
  const stickyCtrl = `<span class="hint">${DOWN_ICON}${S.hint}</span>`;

  // EXP-03 — cart rewards.
  const R = L.lab.rewards;
  const rewardsRig = `<div class="demo cart-demo">
          <div class="cd-products">
            ${R.products
              .map(
                ([n, m, price]) => `<div class="cd-prod">
              <span class="cd-sq" aria-hidden="true"></span>
              <span class="cd-info"><b>${n}</b><i>${m} · ${money(price)}</i></span>
              <button type="button" class="cd-add" data-add="${price}" data-name="${attr(n)}">${R.add}</button>
            </div>`
              )
              .join('\n            ')}
          </div>
          <div class="cd-cart">
            <div class="cd-head"><b>${R.cart}</b><span id="cdCount"></span></div>
            <ul class="cd-lines" id="cdLines"><li class="cd-empty">${L.client.cartEmpty}</li></ul>
            <div class="cd-reward">
              <div class="cd-rline"><span id="cdMsg" aria-live="polite"></span><b id="cdTotal">${money(0)}</b></div>
              <div class="cd-track" role="progressbar" aria-valuemin="0" aria-valuemax="1500" aria-valuenow="0" aria-label="${attr(R.progressAria)}" id="cdBarWrap">
                <i id="cdBar"></i>
                <span class="cd-tick" style="inset-inline-start:53.33%"><em>800</em></span>
                <span class="cd-tick" style="inset-inline-start:calc(100% - 1px)"><em>1500</em></span>
              </div>
              <div class="cd-badges">
                <span class="cd-badge" id="cdShip">${fmt(R.shipBadge, { x: money(800) })}</span>
                <span class="cd-badge" id="cdGift">${fmt(R.giftBadge, { x: money(1500) })}</span>
              </div>
            </div>
            <button class="sd-atc" type="button" disabled id="cdCheckout">${R.checkout}</button>
          </div>
        </div>`;
  const rewardsCtrl = `<button class="btn btn--sm" type="button" id="cartReset">${R.reset}</button>`;

  // EXP-04 — variant picker.
  const V = L.lab.variants;
  const variantsRig = `<div class="demo var-demo">
          <div class="vd-media"><div class="vd-swatch" id="vdSwatch" aria-hidden="true"></div><span class="vd-tag" id="vdTag">${L.client.inStock}</span></div>
          <div class="vd-opts">
            <h5 class="vd-title">${V.product}</h5>
            <div class="vd-price"><b id="vdPrice">${money(1450)}</b><s id="vdWas">${money(1800)}</s></div>
            <fieldset class="vd-group"><legend>${V.colour}</legend><div class="vd-row" id="vdColours" role="radiogroup" aria-label="${attr(V.colour)}"></div></fieldset>
            <fieldset class="vd-group"><legend>${V.size}</legend><div class="vd-row" id="vdSizes" role="radiogroup" aria-label="${attr(V.size)}"></div></fieldset>
            <button class="sd-atc" type="button" id="vdAdd">${L.client.addToCart}</button>
            <p class="vd-note" id="vdNote" aria-live="polite">${L.client.returns}</p>
          </div>
        </div>`;
  const variantsCtrl = `<span class="pill mono" id="vSku" dir="ltr">${L.client.sku} —</span>`;

  const rigs = { rtl: [rtlCtrl, rtlRig], sticky: [stickyCtrl, stickyRig], rewards: [rewardsCtrl, rewardsRig], variants: [variantsCtrl, variantsRig] };

  return `
<section class="sect band" id="demos">
  <div class="wrap">
    ${sectHead(L.lab.eyebrow, L.lab.title, L.lab.note)}
    <div class="lab-tabs rv" role="tablist" aria-label="${attr(L.lab.tabsAria)}">
      ${EXPS.map(
        (k, i) => `<button role="tab" type="button" class="dtab${i === 0 ? ' on' : ''}" data-demo="${k}" id="dt-${k}" aria-selected="${i === 0}" aria-controls="demo-${k}" tabindex="${i === 0 ? 0 : -1}">
        <span class="lab-id">EXP-0${i + 1}</span><span class="lab-name">${L.lab[k].tab}</span>
      </button>`
      ).join('\n      ')}
    </div>
    ${EXPS.map((k, i) => bench(L, k, i, rigs[k][0], rigs[k][1])).join('\n    ')}
  </div>
</section>`;
}

/* ------------------------------------------------------------- expertise */
const expertiseSection = (L) => `
<section class="sect band" id="expertise" style="padding-top:0">
  <div class="wrap">
    <div class="exp-grid">
      <div>
        <span class="label eyebrow rv">${L.expertise.eyebrow}</span>
        ${heading(L.expertise.titleLines)}
        <p class="exp-body rv rv-d1">${L.expertise.body}</p>
      </div>
      <div class="exp-cols rv rv-d1">
        ${L.expertise.groups
          .map((g) => `<div class="exp-col"><h3 class="label">${g.group}</h3><ul>${g.items.map((i) => `<li>${i}</li>`).join('')}</ul></div>`)
          .join('\n        ')}
      </div>
    </div>
  </div>
</section>`;

/* --------------------------------------------------------------- process */
const processSection = (L) => `
<section class="sect wrap" id="process">
  ${sectHead(L.process.eyebrow, L.process.title, L.process.note)}
  <ol class="flow">
    ${L.process.steps
      .map(
        ([t, b], i) => `<li class="card flow-step rv">
      <span class="flow-n">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="h3">${t}</h3>
      <p>${b}</p>
    </li>`
      )
      .join('\n    ')}
  </ol>
</section>`;

/* ----------------------------------------------------------------- about */
const aboutSection = (L) => `
<section class="sect wrap" id="about">
  <div class="about-grid">
    <div class="about-aside">
      <span class="label eyebrow rv">${L.about.eyebrow}</span>
      ${heading(L.about.titleLines)}
      <dl class="facts rv rv-d2">
        ${L.about.facts.map(([k, v]) => `<div><dt class="label">${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <div class="about-body">
      <p class="rv">${L.about.lede}</p>
      ${L.about.paragraphs.map((t, i) => `<p class="rv rv-d${i + 1}">${t}</p>`).join('\n      ')}
    </div>
  </div>
  <div class="founders">
    ${site.founders
      .map((f) => {
        const F = L.about.founders[f.id];
        return `<article class="card founder rv">
      <span class="avatar" aria-hidden="true">${f.initials}</span>
      <span class="label role">${F.role}</span>
      <h3 class="h3">${f.name[L.lang]}</h3>
      <p>${F.bio}</p>
      <a class="tlink" href="mailto:${f.email}"><span class="mono" dir="ltr">${f.email}</span> ${ARROW}</a>
    </article>`;
      })
      .join('\n    ')}
  </div>
</section>`;

/* --------------------------------------------------------------- contact */
const mailto = (L, to) =>
  `mailto:${to}?subject=${encodeURIComponent(L.contact.mailSubject)}&body=${encodeURIComponent(L.contact.mailBody.join('\n'))}`;

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.6.6 0 0 0 0-.6c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.9 2.9 0 0 0 6.7 12a5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9 5 5 0 0 0 3.1.6 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z"/></svg>';

const contactDirect = (L) => `
      <div class="rv">
        <div class="ccards">
          ${site.founders
            .map((f) => {
              const name = f.name[L.lang];
              const first = name.split(' ')[0];
              return `<article class="card ccard">
            <div class="ccard-who">
              <span class="avatar" aria-hidden="true">${f.initials}</span>
              <div><h3 class="h3">${name}</h3><span class="label">${L.about.founders[f.id].role}</span></div>
            </div>
            <span class="ccard-email">${f.email}</span>
            <div class="ccard-acts">
              <a class="btn btn--fill btn--sm" href="${mailto(L, f.email)}" data-magnet><i></i>${fmt(L.contact.emailCta, { first })}</a>
              <button type="button" class="btn btn--sm copy-btn" data-copy="${f.email}" aria-label="${attr(fmt(L.contact.copyAria, { name }))}">${L.contact.copy}</button>
            </div>
          </article>`;
            })
            .join('\n          ')}
        </div>
        <div class="card cinclude">
          <h3 class="label">${L.contact.includeTitle}</h3>
          <ul>${L.contact.includeItems.map((t) => `<li>${t}</li>`).join('')}</ul>
          <p>${L.contact.includeNote}</p>
          <p class="copy-status" id="copyStatus" role="status" aria-live="polite"></p>
        </div>
      </div>`;

/** Live form — rendered only when site.contactForm is true (see LAUNCH.md). */
const contactForm = (L) => {
  const F = L.form;
  return `
      <form class="card cform rv" id="contactForm" novalidate>
        <div class="field"><label for="cf-name">${F.name}</label>
          <input id="cf-name" name="name" type="text" required autocomplete="name" maxlength="80"><span class="err" data-for="name"></span></div>
        <div class="field"><label for="cf-email">${F.email}</label>
          <input id="cf-email" name="email" type="email" required autocomplete="email" maxlength="120" dir="ltr"><span class="err" data-for="email"></span></div>
        <div class="field"><label for="cf-store">${F.store} <span class="opt">${F.optional}</span></label>
          <input id="cf-store" name="store" type="url" placeholder="https://" autocomplete="url" maxlength="200" dir="ltr"><span class="err" data-for="store"></span></div>
        <div class="field"><label for="cf-type">${F.need}</label>
          <select id="cf-type" name="projectType">${F.needs.map((n) => `<option>${n}</option>`).join('')}</select></div>
        <div class="field field--full"><label for="cf-msg">${F.details}</label>
          <textarea id="cf-msg" name="message" rows="4" required maxlength="2000"></textarea><span class="err" data-for="message"></span></div>
        <div class="hp" aria-hidden="true"><label for="cf-company">Company</label><input id="cf-company" name="company" type="text" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="t" id="cf-t">
        <div class="field field--full form-actions">
          <button class="btn btn--fill" type="submit" id="cfSubmit"><i></i>${F.submit}</button>
          <p class="form-status" id="cfStatus" role="status" aria-live="polite"></p>
        </div>
      </form>`;
};

const contact = (L) => {
  const wa = whatsappUrl(L);
  return `
<section class="band contact" id="contact">
  <div class="wrap">
    <span class="label eyebrow rv">${L.contact.eyebrow}</span>
    ${heading(L.contact.titleLines, 'h1 contact-h')}
    <p class="lead contact-lede rv">${L.contact.lede}</p>
    <div class="contact-grid">
      ${site.contactForm ? contactForm(L) : contactDirect(L)}
      <aside class="card cdirect rv rv-d1">
        ${
          wa
            ? `<div class="cblock">
          <span class="label">${L.contact.whatsapp}</span>
          <a class="btn btn--fill wa" href="${wa}" target="_blank" rel="noopener noreferrer" data-magnet>${WA_ICON} ${L.contact.whatsappCta}</a>
        </div>`
            : ''
        }
        <div class="cblock">
          <span class="label">${L.contact.phone}</span>
          ${site.phones.map((p) => `<a class="num" href="tel:${p.tel}">${p.display}</a>`).join('\n          ')}
        </div>
        <p class="cnote">${L.contact.note}</p>
      </aside>
    </div>
  </div>
</section>`;
};

/* ------------------------------------------------------------- lightbox */
export const lightbox = (L) => `
<div class="lb" id="lightbox" hidden>
  <div class="lb-backdrop" data-lb-close></div>
  <div class="lb-panel" role="dialog" aria-modal="true" aria-label="${attr(L.lightbox.dialogAria)}" id="lbPanel">
    <div class="lb-head">
      <span class="label" id="lbTitle"></span>
      <button class="lb-x" type="button" id="lbClose" aria-label="${attr(L.lightbox.close)}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
      </button>
    </div>
    <div class="lb-scroll" id="lbScroll"></div>
  </div>
</div>`;

export const homeBody = (L) =>
  [hero(L), stats(L), work(L), storeWall(L), why(L), servicesSection(L), lab(L), expertiseSection(L), processSection(L), aboutSection(L), contact(L), lightbox(L)].join('\n');

export { ltr };
