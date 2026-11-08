import { site } from '../content/site.js';
import { featured } from '../content/projects.js';
import { prefix, fmt } from '../content/i18n/index.js';
import { showcase, viewsFor, localize, plain, attr, ARROW, ARROW_R } from './utils.mjs';
import { lightbox } from './home.mjs';

/** A titled block that renders only when real content exists. */
const block = (label, body) =>
  body ? `<section class="cs-block rv"><h2 class="label">${label}</h2><div class="cs-prose">${String(body).split(/\n{2,}/).map((p) => `<p>${p}</p>`).join('')}</div></section>` : '';

export function caseBody(base, L) {
  const p = localize(base, L);
  const pre = prefix(L.lang);
  const i = featured.findIndex((f) => f.slug === p.slug);
  const prev = featured[(i - 1 + featured.length) % featured.length];
  const next = featured[(i + 1) % featured.length];
  const views = viewsFor(p.img, L);
  const hasStory = p.challenge || p.contribution || p.solution;

  const outcomes = p.outcomes?.length
    ? `<div class="cs-outcomes rv">${p.outcomes.map((o) => `<div><b>${o.value}</b><small class="label">${o.label}</small></div>`).join('')}</div>`
    : '';

  return `
<article class="cs">
  <header class="cs-head wrap">
    <nav class="crumbs" aria-label="${attr(L.case.crumbsAria)}">
      <a href="${pre}/">${L.case.home}</a><span class="sep" aria-hidden="true"></span>
      <a href="${pre}/#work">${L.case.work}</a><span class="sep" aria-hidden="true"></span>
      <span aria-current="page">${p.name}</span>
    </nav>
    <h1 class="display cs-title lines"><span class="line"><span>${p.name}<span class="dot" aria-hidden="true"></span></span></span></h1>
    <span class="label cs-cat rv">${p.category}</span>
    <div class="cs-actions rv rv-d1">
      <a class="btn btn--fill" href="${p.url}" target="_blank" rel="noopener noreferrer" data-magnet>${L.case.visit} ${ARROW_R}</a>
      <a class="btn" href="${pre}/#contact" data-magnet>${L.case.startLike}</a>
    </div>
  </header>

  <div class="wrap cs-stage">
    ${showcase(p, L, { eager: true })}
    ${views.length > 1 ? `<p class="proj-meta label">${p.previewNote || L.work.previewNote}</p>` : ''}
  </div>

  <div class="wrap cs-body">
    <div class="cs-main">
      <p class="cs-lede rv">${p.summary}</p>
      ${block(L.case.challenge, p.challenge)}
      ${block(L.case.contribution, p.contribution)}
      ${block(L.case.solution, p.solution)}
      ${hasStory ? '' : `<p class="cs-pending rv">${L.case.pending}</p>`}
      ${outcomes ? `<section class="cs-block"><h2 class="label">${L.case.outcomes}</h2>${outcomes}</section>` : ''}
      <section class="cs-block rv">
        <h2 class="label">${L.case.keyFeatures}</h2>
        <div class="cs-feats">
          ${p.highlights.map((h) => `<div class="feat"><h4>${h[0]}</h4><p>${h[1]}</p></div>`).join('\n          ')}
        </div>
      </section>
    </div>

    <aside class="card cs-aside">
      <dl class="facts">
        <div><dt class="label">${L.case.brand}</dt><dd><bdi dir="ltr">${p.name}</bdi></dd></div>
        <div><dt class="label">${L.case.platform}</dt><dd>Shopify</dd></div>
        <div><dt class="label">${L.case.liveStore}</dt><dd><a class="tlink" href="${p.url}" target="_blank" rel="noopener noreferrer"><span class="mono" dir="ltr">${p.domain}</span> ${ARROW}</a></dd></div>
        <div><dt class="label">${L.case.previews}</dt><dd>${views.map((v) => v.label).join(L.lang === 'ar' ? '، ' : ', ')}</dd></div>
        ${p.stack?.length ? `<div><dt class="label">${L.case.stack}</dt><dd><div class="scope-list">${p.stack.map((s) => `<span class="pill">${s}</span>`).join('')}</div></dd></div>` : ''}
        <div><dt class="label">${L.case.scope}</dt><dd><div class="scope-list">${p.scope.map((s) => `<span class="pill">${s}</span>`).join('')}</div></dd></div>
      </dl>
    </aside>
  </div>

  <nav class="wrap cs-nav" aria-label="${attr(L.case.moreAria)}">
    <a class="card" href="${pre}/work/${prev.slug}/"><span class="label">${L.case.prev}</span><b dir="ltr">${prev.name}</b></a>
    <a class="card cs-next" href="${pre}/work/${next.slug}/"><span class="label">${L.case.next}</span><b dir="ltr">${next.name}</b></a>
  </nav>
</article>
${lightbox(L)}`;
}

export const caseMeta = (base, L) => {
  const p = localize(base, L);
  const pre = prefix(L.lang);
  return {
    lang: L.lang,
    path: `/work/${p.slug}/`,
    title: fmt(L.meta.caseTitle, { name: p.name }),
    description: plain(p.summary).slice(0, 155),
    ogType: 'article',
    breadcrumb: [
      { name: L.case.home, url: `${site.url}${pre}/` },
      { name: L.case.work, url: `${site.url}${pre}/#work` },
      { name: p.name, url: `${site.url}${pre}/work/${p.slug}/` }
    ]
  };
};
