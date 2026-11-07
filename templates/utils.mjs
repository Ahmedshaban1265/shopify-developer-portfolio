import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const manifest = JSON.parse(
  readFileSync(fileURLToPath(new URL('../content/images.json', import.meta.url)), 'utf8')
);

/** Strip markup/entities for use inside attributes and meta tags. */
export const plain = (s = '') =>
  String(s)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/[“”]/g, '"')
    .replace(/’/g, "'");

export const attr = (s = '') => plain(s).replace(/"/g, '&quot;');

/** Which preview views exist on disk for a project, in display order. */
const VIEW_ORDER = ['home', 'product', 'cart', 'collection', 'feature'];
const VIEW_LABEL = {
  home: 'Homepage',
  product: 'Product page',
  cart: 'Cart drawer',
  collection: 'Collection',
  feature: 'Custom feature'
};

export function viewsFor(imgSlug) {
  const entry = manifest[imgSlug] || {};
  return VIEW_ORDER.filter((v) => entry[v]?.desktop?.length).map((v) => ({
    id: v,
    label: VIEW_LABEL[v]
  }));
}

export function hasView(imgSlug, view, device = 'desktop') {
  return Boolean(manifest[imgSlug]?.[view]?.[device]?.length);
}

/**
 * Responsive <img> built from the real files on disk.
 * `width`/`height` are always emitted so the browser reserves space — no CLS.
 */
export function img(slug, view, device, { alt, sizes, eager = false, lazy = true }) {
  const set = manifest[slug]?.[view]?.[device] || [];
  if (!set.length) return '';
  const largest = set[set.length - 1];
  const srcset = set.map((f) => `${f.src} ${f.w}w`).join(', ');
  const loading = eager ? 'fetchpriority="high"' : lazy ? 'loading="lazy"' : '';
  return `<img src="${largest.src}"${set.length > 1 ? ` srcset="${srcset}" sizes="${sizes}"` : ''} width="${largest.w}" height="${largest.h}" alt="${attr(alt)}" ${loading} decoding="async">`;
}

export const ARROW =
  '<svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M1 9L9 1M9 1H3M9 1v6"/></svg>';

/**
 * The signature showcase: browser-chrome desktop preview with the phone
 * overlapping bottom-right, plus a segmented control when a project has more
 * than one captured view. Markup is identical for every project — one
 * component, driven by data.
 */
export function showcase(p, { eager = false } = {}) {
  const views = viewsFor(p.img);
  if (!views.length) return '';

  const tabs =
    views.length > 1
      ? `<div class="seg" role="tablist" aria-label="${attr(p.name)} store views">
      ${views
        .map(
          (v, i) => `<button role="tab" class="seg-btn${i === 0 ? ' on' : ''}"
          id="tab-${p.slug}-${v.id}" aria-selected="${i === 0}" aria-controls="panel-${p.slug}-${v.id}"
          tabindex="${i === 0 ? 0 : -1}" data-view="${v.id}">${v.label}</button>`
        )
        .join('\n      ')}
    </div>`
      : '';

  const panels = views
    .map((v, i) => {
      const first = i === 0;
      return `<div class="view${first ? ' on' : ''}" role="tabpanel" id="panel-${p.slug}-${v.id}"
        aria-labelledby="tab-${p.slug}-${v.id}" data-view="${v.id}"${first ? '' : ' hidden'}>
      <div class="frame-d">
        <div class="chrome"><span class="dots"><i></i><i></i><i></i></span><span class="url">${p.domain}</span></div>
        <button type="button" class="shot shot-btn" data-zoom="${p.slug}-${v.id}-desktop"
          data-cursor="Enlarge" aria-label="Enlarge ${attr(p.name)} ${v.label.toLowerCase()}, desktop">
          ${img(p.img, v.id, 'desktop', {
            alt: `${plain(p.name)} Shopify storefront — ${v.label.toLowerCase()}, desktop`,
            sizes: '(max-width: 860px) 100vw, 68vw',
            eager: eager && first,
            lazy: !(eager && first)
          })}
        </button>
      </div>
      <div class="frame-p">
        <button type="button" class="shot shot-btn" data-zoom="${p.slug}-${v.id}-mobile"
          data-cursor="Enlarge" aria-label="Enlarge ${attr(p.name)} ${v.label.toLowerCase()}, mobile">
          ${img(p.img, v.id, 'mobile', {
            alt: `${plain(p.name)} storefront — ${v.label.toLowerCase()}, mobile`,
            sizes: '(max-width: 860px) 110px, 210px',
            eager: eager && first,
            lazy: !(eager && first)
          })}
        </button>
      </div>
    </div>`;
    })
    .join('\n    ');

  return `<div class="showcase" data-showcase="${p.slug}">
    ${tabs}
    <div class="stage">
      ${panels}
    </div>
    <div class="stage-caps">
      <span class="label">Desktop · <span data-caption="${p.slug}">${views[0].label.toLowerCase()}</span></span>
      <span class="label">Mobile</span>
    </div>
  </div>`;
}
