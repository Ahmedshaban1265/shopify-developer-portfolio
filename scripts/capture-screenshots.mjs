/**
 * Captures real screenshots from the live Shopify storefronts.
 *
 * Run locally (`npm i --no-save playwright sharp && npx playwright install --with-deps chromium` first) or, more
 * easily, through the "Capture store screenshots" GitHub Actions workflow.
 *
 *   node scripts/capture-screenshots.mjs            # every store below
 *   node scripts/capture-screenshots.mjs myvi imza  # only these slugs
 *
 * Viewports are fixed at 1440×889 desktop and 390×793 mobile so the output
 * matches the aspect ratios the showcase CSS reserves — no layout shift.
 *
 * Nothing is ever faked: a store that cannot be reached, or a view that cannot
 * be reached, is reported in the summary and simply has no tab on the site.
 */
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const OUT = join(root, 'public', 'images');

/** `slug` must match the `img` field of a project in content/projects.js. */
const STORES = [
  { slug: 'myvi', url: 'https://myvistores.com' },
  { slug: 'infinity', url: 'https://infinityclinicpharma.com' },
  { slug: 'skinify', url: 'https://uskinify.com' },
  { slug: 'imza', url: 'https://imzaeg.com' },
  { slug: 'givago', url: 'https://givago.com' },
  // Skechers, ANTA and ECCO all live on the Fashion Retail Group platform.
  // Point these at the brand-specific paths once confirmed.
  { slug: 'frg', url: 'https://frg.store' }
];

const DEVICES = {
  desktop: { width: 1440, height: 889, isMobile: false, out: 1400 },
  mobile: { width: 390, height: 793, isMobile: true, out: 560 }
};

const MOBILE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const CLOSE_LABELS = [/^close$/i, /^×$/, /^✕$/, /^x$/i, /no thanks/i, /^accept/i, /got it/i, /إغلاق/, /لا شكر/];

const only = process.argv.slice(2);
const stores = only.length ? STORES.filter((s) => only.includes(s.slug)) : STORES;

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  // Walk the page to trigger lazy images, then return to the top.
  await page
    .evaluate(async () => {
      const wait = () => new Promise((r) => setTimeout(r, 160));
      for (let y = 0; y < 2600; y += 400) {
        window.scrollTo(0, y);
        await wait();
      }
      window.scrollTo(0, 0);
    })
    .catch(() => {});
  await page.waitForTimeout(1400);
}

async function dismissOverlays(page) {
  for (let pass = 0; pass < 2; pass++) {
    await page.keyboard.press('Escape').catch(() => {});
    const candidates = await page.$$(
      'button, [role=button], a.close, .modal__close, [aria-label*=lose], [aria-label*=إغلاق]'
    );
    for (const el of candidates.slice(0, 40)) {
      try {
        if (!(await el.isVisible())) continue;
        const label = ((await el.getAttribute('aria-label')) || (await el.innerText()) || '').trim();
        if (CLOSE_LABELS.some((re) => re.test(label))) {
          await el.click({ timeout: 1200 });
          await page.waitForTimeout(500);
        }
      } catch {
        /* overlay vanished mid-click — fine */
      }
    }
    await page.waitForTimeout(300);
  }
}

async function shoot(page, slug, view, device) {
  const png = await page.screenshot({ type: 'png' });
  const width = DEVICES[device].out;
  const file = join(OUT, `${slug}-${view}-${device}-${width}.webp`);
  await sharp(png).resize({ width }).webp({ quality: 64, effort: 6 }).toFile(file);
  return `${slug}-${view}-${device}-${width}.webp`;
}

async function findProductUrl(page, base) {
  const pick = () =>
    page.evaluate(() =>
      [...document.querySelectorAll('a[href*="/products/"]')]
        .map((a) => a.href)
        .filter((h) => !/cart|gift-card|#/.test(h))[0] || null
    );
  const url = await pick();
  if (url) return url;
  await page.goto(`${base}/collections/all`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(2500);
  return pick();
}

async function openCart(page, base) {
  const selectors = [
    'form[action*="/cart/add"] button[type=submit]',
    'button[name=add]',
    '.product-form__submit',
    'button.add-to-cart',
    '[data-add-to-cart]'
  ];
  for (const sel of selectors) {
    const el = await page.$(sel);
    if (!el) continue;
    if (!(await el.isVisible())) continue;
    if (await el.isDisabled().catch(() => false)) continue;
    await el.click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(3500);
    const drawerOpen = await page.evaluate(() => {
      const sel2 =
        '[id*=art-drawer],[class*=art-drawer],cart-drawer,[id*=CartDrawer],[class*=drawer][class*=cart],[class*=mini-cart]';
      return [...document.querySelectorAll(sel2)].some((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 180 && r.height > 180 && getComputedStyle(e).visibility !== 'hidden';
      });
    });
    if (drawerOpen) return 'drawer';
    await page.goto(`${base}/cart`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await settle(page);
    return 'cart page';
  }
  return null;
}

const report = [];
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();

for (const store of stores) {
  for (const device of Object.keys(DEVICES)) {
    const d = DEVICES[device];
    const context = await browser.newContext({
      viewport: { width: d.width, height: d.height },
      deviceScaleFactor: 2,
      isMobile: d.isMobile,
      hasTouch: d.isMobile,
      userAgent: d.isMobile ? MOBILE_UA : undefined,
      locale: 'en-US'
    });
    const page = await context.newPage();
    const row = { slug: store.slug, device, captured: [], missing: [], productUrl: null };

    try {
      await page.goto(store.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await settle(page);
      await dismissOverlays(page);
      row.captured.push(await shoot(page, store.slug, 'home', device));
    } catch (err) {
      row.missing.push(`home — ${err.message.slice(0, 80)}`);
    }

    let productUrl = null;
    try {
      productUrl = await findProductUrl(page, store.url);
      if (!productUrl) throw new Error('no product link found');
      row.productUrl = productUrl;
      await page.goto(productUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await settle(page);
      await dismissOverlays(page);
      row.captured.push(await shoot(page, store.slug, 'product', device));
    } catch (err) {
      row.missing.push(`product — ${err.message.slice(0, 80)}`);
    }

    try {
      if (!productUrl) throw new Error('no product page to add from');
      const how = await openCart(page, store.url);
      if (!how) throw new Error('no add-to-cart button matched');
      row.captured.push(`${await shoot(page, store.slug, 'cart', device)} (${how})`);
    } catch (err) {
      row.missing.push(`cart — ${err.message.slice(0, 80)}`);
    }

    report.push(row);
    console.log(JSON.stringify(row));
    await context.close();
  }
}

await browser.close();

const lines = report.map(
  (r) =>
    `### ${r.slug} · ${r.device}\n` +
    (r.captured.length ? r.captured.map((c) => `- ✅ ${c}`).join('\n') : '- (nothing captured)') +
    (r.missing.length ? `\n${r.missing.map((m) => `- ❌ ${m}`).join('\n')}` : '')
);
await writeFile(join(root, 'capture-report.md'), `# Screenshot capture\n\n${lines.join('\n\n')}\n`);
console.log('\nWrote capture-report.md');
