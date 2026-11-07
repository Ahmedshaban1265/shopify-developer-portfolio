import { $, $$ } from './env.js';

/* ------------------------------------------------------------------ tabs */
export function initDemoTabs() {
  const tabs = $$('.dtab');
  if (!tabs.length) return;
  const panels = $$('.demo-panel');

  const show = (id, focus = false) => {
    tabs.forEach((t) => {
      const on = t.dataset.demo === id;
      t.classList.toggle('on', on);
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
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
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      show(tabs[(i + d + tabs.length) % tabs.length].dataset.demo, true);
    });
  });
}

/* ------------------------------------------------- sticky add to cart */
export function initStickyDemo() {
  const scope = $('#stickyDemo');
  if (!scope) return;
  const main = $('#sdMainBtn', scope);
  const bar = $('#sdSticky', scope);
  const inner = $('.sd-inner', scope);
  if (!main || !bar || !inner) return;

  // The scroll container is the frame itself, so observe against it.
  const io = new IntersectionObserver(
    ([entry]) => {
      const show = !entry.isIntersecting;
      bar.classList.toggle('on', show);
      bar.setAttribute('aria-hidden', String(!show));
    },
    { root: inner, threshold: 0 }
  );
  io.observe(main);

  const flash = (btn) => {
    const original = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.classList.add('done');
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('done');
    }, 1400);
  };
  main.addEventListener('click', () => flash(main));
  $('#sdStickyBtn', scope)?.addEventListener('click', (e) => flash(e.currentTarget));
}

/* ------------------------------------------------------- cart rewards */
const SHIP = 800;
const GIFT = 1500;
const egp = (n) => `EGP ${n.toLocaleString('en-US')}`;

export function initCartDemo() {
  const lines = $('#cdLines');
  if (!lines) return;

  const els = {
    count: $('#cdCount'),
    total: $('#cdTotal'),
    msg: $('#cdMsg'),
    bar: $('#cdBar'),
    wrap: $('#cdBarWrap'),
    ship: $('#cdShip'),
    gift: $('#cdGift'),
    checkout: $('#cdCheckout')
  };
  let cart = [];

  const render = () => {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);

    lines.innerHTML = cart.length
      ? cart
          .map(
            (i, idx) => `<li class="cd-line">
          <span class="cd-sq" aria-hidden="true"></span>
          <span class="cd-ltext"><b>${i.name}</b><i>${egp(i.price)} × ${i.qty}</i></span>
          <button type="button" class="cd-rm" data-rm="${idx}" aria-label="Remove ${i.name}">×</button>
        </li>`
          )
          .join('')
      : '<li class="cd-empty">Cart is empty — add something.</li>';

    els.count.textContent = `${count} item${count === 1 ? '' : 's'}`;
    els.total.textContent = egp(total);
    els.bar.style.width = `${Math.min(100, (total / GIFT) * 100)}%`;
    els.wrap.setAttribute('aria-valuenow', String(total));

    const hasShip = total >= SHIP;
    const hasGift = total >= GIFT;
    els.ship.classList.toggle('won', hasShip);
    els.gift.classList.toggle('won', hasGift);
    els.checkout.disabled = count === 0;

    els.msg.textContent = hasGift
      ? 'Free shipping and a free gift unlocked'
      : hasShip
        ? `Free shipping unlocked — ${egp(GIFT - total)} more for a free gift`
        : `Spend ${egp(SHIP - total)} more for free shipping`;
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

  $('#cartReset')?.addEventListener('click', () => {
    cart = [];
    render();
  });

  render();
}

/* ----------------------------------------------------- variant picker */
const COLOURS = [
  { id: 'oat', name: 'Oatmeal', hex: '#D9D2C2' },
  { id: 'ink', name: 'Ink', hex: '#20232B' },
  { id: 'moss', name: 'Moss', hex: '#4A5A42' },
  { id: 'clay', name: 'Clay', hex: '#9C6B52' }
];
const SIZES = ['S', 'M', 'L', 'XL'];
// Deliberately uneven stock so disabled states are visible.
const SOLD_OUT = new Set(['oat-S', 'ink-XL', 'moss-S', 'moss-M', 'clay-L']);
const PRICE = { S: 1450, M: 1450, L: 1450, XL: 1590 };

export function initVariantDemo() {
  const coloursEl = $('#vdColours');
  const sizesEl = $('#vdSizes');
  if (!coloursEl || !sizesEl) return;

  const swatch = $('#vdSwatch');
  const tag = $('#vdTag');
  const price = $('#vdPrice');
  const was = $('#vdWas');
  const add = $('#vdAdd');
  const sku = $('#vSku');
  const note = $('#vdNote');

  const state = { colour: 'oat', size: 'M' };

  coloursEl.innerHTML = COLOURS.map(
    (c) => `<button type="button" role="radio" class="vd-sw" data-colour="${c.id}"
      aria-checked="${c.id === state.colour}" aria-label="${c.name}" title="${c.name}">
      <span style="background:${c.hex}"></span></button>`
  ).join('');

  sizesEl.innerHTML = SIZES.map(
    (s) => `<button type="button" role="radio" class="vd-size" data-size="${s}"
      aria-checked="${s === state.size}">${s}</button>`
  ).join('');

  const render = () => {
    const colour = COLOURS.find((c) => c.id === state.colour);
    const key = `${state.colour}-${state.size}`;
    const out = SOLD_OUT.has(key);

    swatch.style.background = colour.hex;
    swatch.dataset.colour = colour.name;

    $$('.vd-sw', coloursEl).forEach((b) => {
      const on = b.dataset.colour === state.colour;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', String(on));
    });

    $$('.vd-size', sizesEl).forEach((b) => {
      const s = b.dataset.size;
      const unavailable = SOLD_OUT.has(`${state.colour}-${s}`);
      const on = s === state.size;
      b.classList.toggle('on', on);
      b.classList.toggle('off', unavailable);
      b.disabled = unavailable;
      b.setAttribute('aria-checked', String(on));
      b.title = unavailable ? `${colour.name} / ${s} — sold out` : `${colour.name} / ${s}`;
    });

    price.textContent = egp(PRICE[state.size]);
    was.hidden = state.size === 'XL';
    tag.textContent = out ? 'Sold out' : 'In stock';
    tag.classList.toggle('out', out);
    add.disabled = out;
    add.textContent = out ? 'Sold out' : 'Add to cart';
    sku.textContent = `SKU MC-${state.colour.toUpperCase()}-${state.size}`;
    note.textContent = out
      ? 'That combination is out of stock — try another size.'
      : 'Free returns within 14 days.';
  };

  coloursEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-colour]');
    if (!b) return;
    state.colour = b.dataset.colour;
    // Move off a size that does not exist in the new colour.
    if (SOLD_OUT.has(`${state.colour}-${state.size}`)) {
      const open = SIZES.find((s) => !SOLD_OUT.has(`${state.colour}-${s}`));
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

  add.addEventListener('click', () => {
    if (add.disabled) return;
    const original = add.textContent;
    add.textContent = 'Added ✓';
    add.classList.add('done');
    setTimeout(() => {
      add.textContent = original;
      add.classList.remove('done');
    }, 1400);
  });

  render();
}
