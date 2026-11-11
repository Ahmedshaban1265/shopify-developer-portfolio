import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { fmt } from '../content/i18n/index.js';

export const manifest = JSON.parse(
  readFileSync(fileURLToPath(new URL('../content/images.json', import.meta.url)), 'utf8')
);

/** Strip markup/entities for attributes and meta tags. */
export const plain = (s = '') =>
  String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ');

export const attr = (s = '') => plain(s).replace(/"/g, '&quot;');

/** Wrap a Latin run (email, domain, phone) so it never reorders inside Arabic. */
export const ltr = (s) => `<bdi class="ltr" dir="ltr">${s}</bdi>`;

const VIEW_ORDER = ['home', 'product', 'cart', 'collection', 'feature'];

/** Views that exist on disk for a project, in display order, labelled per language. */
export function viewsFor(imgSlug, L) {
  const entry = manifest[imgSlug] || {};
  return VIEW_ORDER.filter((v) => entry[v]?.desktop?.length).map((v) => ({ id: v, label: L.work.views[v] }));
}

/** Responsive <img> from real files. width/height always set — no layout shift. */
export function img(slug, view, device, { alt, sizes, eager = false, lazy = true, priority = false }) {
  const set = manifest[slug]?.[view]?.[device] || [];
  if (!set.length) return '';
  const largest = set[set.length - 1];
  const srcset = set.map((f) => `${f.src} ${f.w}w`).join(', ');
  const loading = eager ? (priority ? 'fetchpriority="high"' : '') : lazy ? 'loading="lazy"' : '';
  return `<img src="${largest.src}"${set.length > 1 ? ` srcset="${srcset}" sizes="${sizes}"` : ''} width="${largest.w}" height="${largest.h}" alt="${attr(alt)}" ${loading} decoding="async">`;
}

export const ARROW =
  '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M1 9L9 1M9 1H3M9 1v6"/></svg>';
export const ARROW_R =
  '<svg class="arr" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 8h12M9 3l5 5-5 5"/></svg>';

/**
 * The signature showcase: browser-chrome desktop preview with the phone
 * overlapping at the inline end, on an exhibition plate, plus a segmented
 * control when a project has more than one captured view. One component,
 * driven entirely by data and the language bundle.
 */
export function showcase(p, L, { eager = false } = {}) {
  const views = viewsFor(p.img, L);
  if (!views.length) return '';
  const name = p.name;
  const dev = { desktop: L.work.desktop, mobile: L.work.mobile };

  const tabs =
    views.length > 1
      ? `<div class="seg" role="tablist" aria-label="${attr(fmt(L.work.viewsAria, { name }))}">
      ${views
        .map(
          (v, i) => `<button role="tab" class="seg-btn${i === 0 ? ' on' : ''}" id="tab-${p.slug}-${v.id}"
          aria-selected="${i === 0}" aria-controls="panel-${p.slug}-${v.id}" tabindex="${i === 0 ? 0 : -1}" data-view="${v.id}">${v.label}</button>`
        )
        .join('\n      ')}
    </div>`
      : '';

  const shot = (v, device, first) => {
    const label = fmt(L.work.enlargeAria, { name, view: v.label, device: dev[device] });
    const title = `${name} · ${v.label} · ${dev[device]}`;
    const source = manifest[p.img]?.[v.id]?.[device]?.at(-1);
    return `<button type="button" class="shot shot-btn" data-zoom data-device="${device}" data-title="${attr(title)}"${source ? ` style="--shot-ratio:${source.w}/${source.h}"` : ''}
          data-cursor="${attr(L.work.enlarge)}" aria-label="${attr(label)}">
          ${img(p.img, v.id, device, {
            alt: fmt(L.work.shotAlt, { name, view: v.label, device: dev[device] }),
            sizes: device === 'desktop' ? '(max-width: 680px) 100vw, 66vw' : '(max-width: 680px) 31vw, 214px',
            eager: eager && first,
            priority: eager && first && device === 'desktop',
            lazy: !(eager && first)
          })}
        </button>`;
  };

  const panels = views
    .map((v, i) => {
      const first = i === 0;
      return `<div class="view${first ? ' on' : ''}" role="tabpanel" id="panel-${p.slug}-${v.id}"
        ${views.length > 1 ? `aria-labelledby="tab-${p.slug}-${v.id}"` : `aria-label="${attr(v.label)}"`} data-view="${v.id}"${first ? '' : ' hidden'}>
      <div class="frame-d">
        <div class="chrome"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="url">${p.domain}</span></div>
        ${shot(v, 'desktop', first)}
      </div>
      <div class="frame-p">${shot(v, 'mobile', first)}</div>
    </div>`;
    })
    .join('\n    ');

  return `<div class="showcase" data-showcase="${p.slug}" data-store-name="${attr(p.name)}" data-store-url="${attr(p.url)}">
    ${tabs}
    <div class="stage">
      ${panels}
    </div>
    <div class="stage-caps">
      <span class="label">${L.work.desktop} · <span data-caption="${p.slug}">${views[0].label}</span></span>
      <span class="label">${L.work.mobile}</span>
    </div>
  </div>`;
}

/** Localised copy for one project, merged onto its structure. */
export const localize = (p, L) => ({ ...p, ...L.projects[p.slug] });
