import { site } from '../content/site.js';
import { featured } from '../content/projects.js';
import { showcase, viewsFor, ARROW, plain } from './utils.mjs';

/** Render a block only when real content exists for it. */
const block = (label, body) =>
  body ? `<section class="cs-block rv"><h2 class="label">${label}</h2><div class="cs-prose">${body}</div></section>` : '';

export function caseBody(p) {
  const i = featured.findIndex((f) => f.slug === p.slug);
  const prev = featured[(i - 1 + featured.length) % featured.length];
  const next = featured[(i + 1) % featured.length];
  const views = viewsFor(p.img);

  const outcomes = p.outcomes?.length
    ? `<div class="cs-outcomes rv">${p.outcomes
        .map((o) => `<div><b>${o.value}</b><small>${o.label}</small></div>`)
        .join('')}</div>`
    : '';

  const stack = p.stack?.length
    ? `<div class="proj-scope rv"><span class="label">Technologies</span>
       <div class="scope-list">${p.stack.map((s) => `<span>${s}</span>`).join('')}</div></div>`
    : '';

  return `
<article class="cs">
  <header class="cs-head wrap">
    <nav class="crumbs label" aria-label="Breadcrumb">
      <a href="/">Home</a> <span aria-hidden="true">/</span> <a href="/#work">Work</a> <span aria-hidden="true">/</span> <span>${plain(p.name)}</span>
    </nav>
    <h1 class="cs-title display">${p.name}</h1>
    <p class="cs-cat label">${p.category}</p>
    <div class="cs-actions">
      <a class="btn btn--fill" href="${p.url}" target="_blank" rel="noopener noreferrer" data-magnet><i></i>Visit the live store</a>
      <a class="btn" href="/#contact" data-magnet>Start a project like this</a>
    </div>
  </header>

  <div class="wrap cs-stage">
    ${showcase(p, { eager: true })}
  </div>

  <div class="wrap cs-body">
    <div class="cs-main">
      <p class="cs-lede">${p.summary}</p>
      ${block('The challenge', p.challenge)}
      ${block('What I worked on', p.contribution)}
      ${block('The solution', p.solution)}
      ${outcomes}

      <section class="cs-block rv">
        <h2 class="label">Key features</h2>
        <div class="cs-feats">
          ${p.highlights.map((h) => `<div class="feat"><h4>${h[0]}</h4><p>${h[1]}</p></div>`).join('\n          ')}
        </div>
      </section>
    </div>

    <aside class="cs-aside">
      <dl class="facts">
        <div><dt>Brand</dt><dd>${p.name}</dd></div>
        <div><dt>Platform</dt><dd>Shopify</dd></div>
        <div><dt>Live store</dt><dd><a href="${p.url}" target="_blank" rel="noopener noreferrer">${p.domain} ${ARROW}</a></dd></div>
        <div><dt>Previews</dt><dd>${views.map((v) => v.label).join(', ')}</dd></div>
      </dl>
      ${stack}
      <div class="proj-scope cs-scope">
        <span class="label">Scope</span>
        <div class="scope-list">${p.scope.map((s) => `<span>${s}</span>`).join('')}</div>
      </div>
    </aside>
  </div>

  <nav class="wrap cs-nav" aria-label="More projects">
    <a href="/work/${prev.slug}/"><span class="label">← Previous</span><b class="display">${prev.name}</b></a>
    <a href="/work/${next.slug}/" class="cs-next"><span class="label">Next →</span><b class="display">${next.name}</b></a>
  </nav>

  <div class="lb" id="lightbox" hidden>
    <div class="lb-backdrop" data-lb-close></div>
    <div class="lb-panel" role="dialog" aria-modal="true" aria-label="Enlarged store preview" id="lbPanel">
      <div class="lb-head">
        <span class="label" id="lbTitle"></span>
        <button class="lb-x" type="button" id="lbClose" aria-label="Close preview">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg>
        </button>
      </div>
      <div class="lb-scroll" id="lbScroll"></div>
    </div>
  </div>
</article>`;
}

export const caseMeta = (p) => ({
  title: `${plain(p.name)} — Shopify case study | ${site.name}`,
  description: `${plain(p.summary).slice(0, 150)}`,
  path: `/work/${p.slug}/`,
  depth: 1,
  ogType: 'article',
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/#work' },
    { name: plain(p.name), path: `/work/${p.slug}/` }
  ]
});
