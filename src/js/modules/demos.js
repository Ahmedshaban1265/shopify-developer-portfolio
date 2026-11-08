import { $, $$ } from './env.js';
import { t, fmt, money, plural, arrowStep } from './i18n.js';

/* ------------------------------------------------------------------ tabs */
export function initDemoTabs() {
  const tabs = $$('.dtab');
  if (!tabs.length) return;
  const panels = $$('.demo-panel');

  const show = (id, focus = false) => {
    tabs.forEach((tab) => {
      const on = tab.dataset.demo === id;
      tab.classList.toggle('on', on);
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      if (on && focus) tab.focus();
    });
    panels.forEach((p) => {
      const on = p.id === `demo-${id}`;
      p.hidden = !on;
      p.classList.toggle('on', on);
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => show(tab.dataset.demo));
    tab.addEventListener('keydown', (e) => {
      const step = arrowStep(e.key);
      if (!step) return;
      e.preventDefault();
      show(tabs[(i + step + tabs.length) % tabs.length].dataset.demo, true);
    });
  });
}

const flash = (btn) => {
  const original = btn.textContent;
  btn.textContent = `${t().added} ✓`;
  btn.classList.add('done');
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove('done');
  }, 1400);
};

/* --------------------------------------------- EXP-02 sticky add to cart */
export function initStickyDemo() {
  const scope = $('#stickyDemo');
  if (!scope) return;
  const main = $('#sdMainBtn', scope);
  const bar = $('#sdSticky', scope);
  const inner = $('.sd-inner', scope);
  const stickyBtn = $('#sdStickyBtn', scope);
  if (!main || !bar || !inner) return;

  // The scroll container is the frame itself, so observe against it.
  new IntersectionObserver(
    ([entry]) => {
      const show = !entry.isIntersecting;
      bar.classList.toggle('on', show);
      bar.setAttribute('aria-hidden', String(!show));
      if (stickyBtn) stickyBtn.tabIndex = show ? 0 : -1;
    },
    { root: inner, threshold: 0 }
  ).observe(main);

  main.addEventListener('click', () => flash(main));
  stickyBtn?.addEventListener('click', () => flash(stickyBtn));
}

/* --------------------------------------------------- EXP-03 cart rewards */
const SHIP = 800;
const GIFT = 1500;

export function initCartDemo() {
  const lines = $('#cdLines');
  if (!lines) return;
  const s = t();
  const els = {
    count: $('#cdCount'), total: $('#cdTotal'), msg: $('#cdMsg'), bar: $('#cdBar'),
    wrap: $('#cdBarWrap'), ship: $('#cdShip'), gift: $('#cdGift'), checkout: $('#cdCheckout')
  };
  let cart = [];

  const render = () => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const count = cart.reduce((sum, i) => sum + i.qty, 0);

    lines.innerHTML = cart.length
      ? cart
          .map(
            (i, idx) => `<li class="cd-line">
          <span class="cd-sq" aria-hidden="true"></span>
          <span class="cd-ltext"><b>${i.name}</b><i>${money(i.price)} × ${i.qty}</i></span>
          <button type="button" class="cd-rm" data-rm="${idx}" aria-label="${fmt(s.remove, { name: i.name })}">×</button>
        </li>`
          )
          .join('')
      : `<li class="cd-empty">${s.cartEmpty}</li>`;

    els.count.textContent = plural(s.cartItems, count);
    els.total.textContent = money(total);
    els.bar.style.width = `${Math.min(100, (total / GIFT) * 100)}%`;
    els.wrap.setAttribute('aria-valuenow', String(total));
    els.wrap.setAttribute('aria-valuetext', money(total));

    const hasShip = total >= SHIP;
    const hasGift = total >= GIFT;
    els.ship.classList.toggle('won', hasShip);
    els.gift.classList.toggle('won', hasGift);
    els.checkout.disabled = count === 0;
    els.msg.textContent = hasGift
      ? s.msgBoth
      : hasShip
        ? fmt(s.msgGift, { x: money(GIFT - total) })
        : fmt(s.msgShip, { x: money(SHIP - total) });
  };

  $$('.cd-add').forEach((btn) =>
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = Number(btn.dataset.add);
      const found = cart.find((i) => i.name === name);
      if (found) found.qty++;
      else cart.push({ name, price, qty: 1 });
      render();
    })
  );

  lines.addEventListener('click', (e) => {
    const rm = e.target.closest('[data-rm]');
    if (!rm) return;
    const i = Number(rm.dataset.rm);
    if (cart[i].qty > 1) cart[i].qty--;
    else cart.splice(i, 1);
    render();
  });

  $('#cartReset')?.addEventListener('click', () => { cart = []; render(); });
  render();
}

/* ------------------------------------------------- EXP-04 variant picker */
const COLOURS = [
  { id: 'oat', hex: '#D9D2C2' },
  { id: 'ink', hex: '#20232B' },
  { id: 'moss', hex: '#4A5A42' },
  { id: 'clay', hex: '#9C6B52' }
];
const SIZES = ['S', 'M', 'L', 'XL'];
// Deliberately uneven stock so disabled states are visible.
const SOLD_OUT = new Set(['oat-S', 'ink-XL', 'moss-S', 'moss-M', 'clay-L']);
const PRICE = { S: 1450, M: 1450, L: 1450, XL: 1590 };

export function initVariantDemo() {
  const coloursEl = $('#vdColours');
  const sizesEl = $('#vdSizes');
  if (!coloursEl || !sizesEl) return;
  const s = t();
  const name = (id) => s.colours?.[id] || id;

  const els = {
    swatch: $('#vdSwatch'), tag: $('#vdTag'), price: $('#vdPrice'), was: $('#vdWas'),
    add: $('#vdAdd'), sku: $('#vSku'), note: $('#vdNote')
  };
  const state = { colour: 'oat', size: 'M' };

  coloursEl.innerHTML = COLOURS.map(
    (c) => `<button type="button" role="radio" class="vd-sw" data-colour="${c.id}" aria-checked="${c.id === state.colour}"
      aria-label="${name(c.id)}" title="${name(c.id)}"><span style="background:${c.hex}"></span></button>`
  ).join('');
  sizesEl.innerHTML = SIZES.map(
    (sz) => `<button type="button" role="radio" class="vd-size" data-size="${sz}" aria-checked="${sz === state.size}">${sz}</button>`
  ).join('');

  const render = () => {
    const colour = COLOURS.find((c) => c.id === state.colour);
    const out = SOLD_OUT.has(`${state.colour}-${state.size}`);

    els.swatch.style.background = colour.hex;
    $$('.vd-sw', coloursEl).forEach((b) => {
      const on = b.dataset.colour === state.colour;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    $$('.vd-size', sizesEl).forEach((b) => {
      const sz = b.dataset.size;
      const unavailable = SOLD_OUT.has(`${state.colour}-${sz}`);
      const on = sz === state.size;
      b.classList.toggle('on', on);
      b.classList.toggle('off', unavailable);
      b.disabled = unavailable;
      b.setAttribute('aria-checked', String(on));
      b.title = fmt(unavailable ? s.sizeSoldOut : s.sizeTitle, { colour: name(colour.id), size: sz });
    });

    els.price.textContent = money(PRICE[state.size]);
    els.was.hidden = state.size === 'XL';
    els.tag.textContent = out ? s.soldOut : s.inStock;
    els.tag.classList.toggle('out', out);
    els.add.disabled = out;
    els.add.textContent = out ? s.soldOut : s.addToCart;
    els.sku.textContent = `${s.sku} MC-${state.colour.toUpperCase()}-${state.size}`;
    els.note.textContent = out ? s.soldOutNote : s.returns;
  };

  coloursEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-colour]');
    if (!b) return;
    state.colour = b.dataset.colour;
    // Move off a size that doesn't exist in the new colour.
    if (SOLD_OUT.has(`${state.colour}-${state.size}`)) {
      const open = SIZES.find((sz) => !SOLD_OUT.has(`${state.colour}-${sz}`));
      if (open) state.size = open;
    }
    render();
  });

  sizesEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-size]');
    if (!b || b.disabled) return;
    state.size = b.dataset.size;
    render();
  });

  els.add.addEventListener('click', () => { if (!els.add.disabled) flash(els.add); });
  render();
}
