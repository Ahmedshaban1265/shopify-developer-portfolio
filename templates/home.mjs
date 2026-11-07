import { site } from '../content/site.js';
import { featured, wall } from '../content/projects.js';
import { services, expertise, process, about } from '../content/practice.js';
import { showcase, viewsFor, ARROW } from './utils.mjs';
import { whatsappUrl } from './layout.mjs';

const mail = site.emails[0];

/* ------------------------------------------------------------------ hero */
const hero = () => `
<section class="hero wrap" id="hero">
  <div>
    <div class="hero-top">
      <span class="label">Shopify developer · ${site.regions}</span>
      <span class="label">Portfolio · ${site.year}</span>
    </div>
    <h1 class="hero-h1 display lines" id="heroH1">
      <span class="line"><span>Shopify development</span></span>
      <span class="line"><span>that goes <em>beyond</em></span></span>
      <span class="line"><span>design.</span></span>
    </h1>
  </div>

  <div class="hero-grid">
    <div class="rv rv-d2">
      <p class="hero-lede">I build, customise and optimise Shopify storefronts that look exceptional, perform smoothly and help e-commerce brands grow. <strong>50+ stores delivered across Egypt and the Gulf</strong> — official brand flagships like Skechers, ANTA and ECCO alongside fast-growing local labels.</p>
      <div class="hero-acts">
        <a class="btn btn--fill" href="#work" data-magnet><i></i>View the work</a>
        <a class="btn" href="#contact" data-magnet>Let's work together</a>
      </div>
    </div>
    <div class="hero-side rv rv-d3">
      <div>
        <div class="hero-name">${site.name}</div>
        <div class="hero-role">${site.roleLong} · custom themes, Liquid, bilingual AR/EN and CRO</div>
      </div>
      <div class="hero-meta">
        <a href="mailto:${mail}">${mail}</a>
        <a href="tel:${site.phones[0].tel}">${site.phones[0].display}</a>
      </div>
    </div>
  </div>

  <div class="marquee" aria-hidden="true"><div class="marquee-in" id="marquee"></div></div>
</section>`;

/* ----------------------------------------------------------------- stats */
const stats = () => `
<section class="wrap stats-wrap">
  <div class="stats" id="stats">
    ${site.stats
      .map(
        (s, i) => `<div class="stat rv rv-d${i}">
      <b${s.text ? ' class="txt"' : ''}${s.value ? ` data-count="${s.value}"${s.suffix ? ` data-suffix="${s.suffix}"` : ''}` : ''}>${s.text || 0}</b>
      <small>${s.label}</small>
    </div>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* ------------------------------------------------------------------ work */
function project(p, i) {
  const n = String(i + 1).padStart(2, '0');
  const views = viewsFor(p.img);
  const multi = views.length > 1;
  return `
  <article class="proj" data-n="${n}" id="${p.slug}">
    <div class="proj-head rv">
      <div>
        <span class="label">Featured project — no. ${n}</span>
        <h3 class="proj-title display">${p.name}</h3>
        <span class="label proj-cat">${p.category}</span>
      </div>
      <div class="proj-links">
        <a class="proj-link" href="/work/${p.slug}/">Case study ${ARROW}</a>
        <a class="proj-link" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.domain} ${ARROW}</a>
      </div>
    </div>

    ${showcase(p, { eager: i === 0 })}

    <p class="proj-note rv">${p.summary}</p>
    <div class="proj-scope rv">
      <span class="label">Scope</span>
      <div class="scope-list">${p.scope.map((s) => `<span>${s}</span>`).join('')}</div>
    </div>
    <div class="proj-feats">
      ${p.highlights
        .map(
          (h, j) => `<div class="feat rv rv-d${j + 1}"><h4>${h[0]}</h4><p>${h[1]}</p></div>`
        )
        .join('\n      ')}
    </div>
    ${multi ? `<p class="proj-meta label">${p.previewNote || 'Previews captured from the live store'} · ${views.map((v) => v.label).join(' · ')}</p>` : ''}
  </article>`;
}

const work = () => `
<section class="sect wrap" id="work">
  <div class="sect-head">
    <div>
      <span class="label rv">Selected work</span>
      <h2 class="about-h display rv">Featured Shopify projects</h2>
    </div>
    <p class="sect-note rv rv-d1">Eight storefronts, shown the way a store actually reads — homepage, product page and cart. Switch views on any preview below.</p>
  </div>
  ${featured.map(project).join('\n')}
</section>`;

/* ------------------------------------------------------------ store wall */
const SECTORS = [
  ['all', 'All'],
  ['fashion', 'Fashion'],
  ['beauty', 'Beauty'],
  ['sportswear', 'Sportswear'],
  ['wellness', 'Wellness'],
  ['food', 'Food'],
  ['home', 'Home']
];

const storeWall = () => `
<section class="sect wrap" id="stores">
  <div class="sect-head">
    <div>
      <span class="label rv">The wider portfolio</span>
      <h2 class="about-h display rv">Twenty more, still on Shopify</h2>
    </div>
    <p class="sect-note rv rv-d1">Fashion, beauty, food, home and lifestyle — each with its own identity, audience and commerce logic.</p>
  </div>
  <div class="filters rv" role="group" aria-label="Filter stores by sector">
    ${SECTORS.map(
      ([id, label], i) =>
        `<button class="chip${i === 0 ? ' on' : ''}" data-filter="${id}" aria-pressed="${i === 0}">${label}</button>`
    ).join('\n    ')}
  </div>
  <div class="wall-scroll" id="wallScroll">
    <div class="wall">
      ${wall
        .map(
          ([name, cat, dom, sector], i) => `<a class="store" data-sector="${sector}"
        href="https://${dom}" target="_blank" rel="noopener noreferrer" data-cursor="Visit">
        <div><span class="store-n">${String(i + 1).padStart(2, '0')}</span>
          <h4>${name}</h4><span class="store-cat">${cat}</span></div>
        <span class="store-dom">${dom} ${ARROW}</span>
      </a>`
        )
        .join('\n      ')}
    </div>
  </div>
  <div class="wall-bar"><i id="wallBar"></i></div>
  <p class="wall-empty" id="wallEmpty" hidden>No stores in that sector yet.</p>
</section>`;

/* -------------------------------------------------------------- services */
const servicesSection = () => `
<section class="sect wrap" id="services">
  <div class="sect-head">
    <div>
      <span class="label rv">Services</span>
      <h2 class="about-h display rv">What I take on</h2>
    </div>
    <p class="sect-note rv rv-d1">Engaged for a full build, or for the part of an existing store that is holding it back.</p>
  </div>
  <div class="bento">
    ${services
      .map(
        (s) => `<article class="cell ${s.span ? `cell--${s.span}` : ''} rv">
      <span class="cell-n label">${s.n}</span>
      <h3 class="cell-t">${s.title}</h3>
      <p class="cell-benefit">${s.benefit}</p>
      <p class="cell-body">${s.body}</p>
      <div class="cell-tags">${s.tags.map((t) => `<span>${t}</span>`).join('')}</div>
    </article>`
      )
      .join('\n    ')}
  </div>
</section>`;

/* ----------------------------------------------------------------- demos */
const demos = () => `
<section class="sect noir" id="demos">
  <div class="wrap">
    <div class="sect-head">
      <div>
        <span class="label rv">Live demonstrations</span>
        <h2 class="exp-h display rv">Features, running — not screenshots.</h2>
      </div>
      <p class="sect-note rv rv-d1">Four storefront mechanics I build, working here in the page. Click, drag and switch language: they are real components, not mockups.</p>
    </div>

    <div class="demo-tabs rv" role="tablist" aria-label="Storefront feature demonstrations">
      <button role="tab" class="dtab on" data-demo="rtl" aria-selected="true" aria-controls="demo-rtl" id="dt-rtl" tabindex="0">Bilingual &amp; RTL</button>
      <button role="tab" class="dtab" data-demo="sticky" aria-selected="false" aria-controls="demo-sticky" id="dt-sticky" tabindex="-1">Sticky add to cart</button>
      <button role="tab" class="dtab" data-demo="rewards" aria-selected="false" aria-controls="demo-rewards" id="dt-rewards" tabindex="-1">Cart rewards</button>
      <button role="tab" class="dtab" data-demo="variants" aria-selected="false" aria-controls="demo-variants" id="dt-variants" tabindex="-1">Variant picker</button>
    </div>

    <!-- ============ RTL ============ -->
    <div class="demo-panel on" role="tabpanel" id="demo-rtl" aria-labelledby="dt-rtl">
      <div class="demo-wrap">
        <div class="demo-top">
          <div>
            <div class="demo-h">Flip the storefront.</div>
            <p class="demo-sub">Direction, alignment, icon order, badge placement and numerals all mirror.</p>
          </div>
          <div class="toggle" id="dirToggle" role="group" aria-label="Storefront language">
            <i></i>
            <button class="on" data-dir="ltr">EN</button>
            <button data-dir="rtl" lang="ar">العربية</button>
          </div>
        </div>
        <div class="demo" id="demo" dir="ltr" lang="en">
          <div class="demo-bar" data-en="Free shipping on orders over EGP 800" data-ar="شحن مجاني للطلبات فوق ٨٠٠ ج.م">Free shipping on orders over EGP 800</div>
          <div class="demo-nav">
            <div class="demo-logo"><b></b><span data-en="STOREFRONT" data-ar="المتجر">STOREFRONT</span></div>
            <div class="demo-links">
              <span data-en="Home" data-ar="الرئيسية">Home</span>
              <span data-en="Shop" data-ar="تسوق">Shop</span>
              <span data-en="Bundles" data-ar="الباقات">Bundles</span>
              <span data-en="Offers" data-ar="العروض">Offers</span>
            </div>
            <div class="demo-icons">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
            </div>
          </div>
          <div class="demo-chips">
            <span class="demo-chip on" data-en="Best sellers" data-ar="الأكثر مبيعًا">Best sellers</span>
            <span class="demo-chip" data-en="New in" data-ar="وصل حديثًا">New in</span>
            <span class="demo-chip" data-en="Sale" data-ar="التخفيضات">Sale</span>
          </div>
          <div class="demo-card">
            <div class="demo-thumb">
              <span class="demo-badge" data-en="Best seller" data-ar="الأكثر مبيعًا">Best seller</span>
              <svg width="34" height="52" viewBox="0 0 34 52" fill="none" stroke="#141310" stroke-width="1.4" aria-hidden="true">
                <rect x="12" y="2" width="10" height="7" rx="1.6"/><path d="M15 9v4M19 9v4"/>
                <rect x="6" y="13" width="22" height="36" rx="4"/>
                <path d="M10 24h14" stroke-opacity=".35"/><path d="M10 30h9" stroke-opacity=".35"/>
              </svg>
            </div>
            <div class="demo-info">
              <h5 data-en="Vitamin C Serum 15%" data-ar="سيروم فيتامين سي ١٥٪">Vitamin C Serum 15%</h5>
              <p data-en="Brightening · 30 ml" data-ar="توحيد لون البشرة · ٣٠ مل">Brightening · 30 ml</p>
              <div class="demo-price">
                <b data-en="EGP 750" data-ar="٧٥٠ ج.م">EGP 750</b>
                <s data-en="EGP 900" data-ar="٩٠٠ ج.م">EGP 900</s>
              </div>
              <span class="demo-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/></svg>
                <span data-en="Add to cart" data-ar="أضف إلى السلة">Add to cart</span>
              </span>
            </div>
          </div>
        </div>
        <p class="demo-note"><b>Same components, mirrored logic.</b> Built this way for Infinity Clinic Pharma, Givago, El Tahan, Fourteen Scarves and Murouj Art.</p>
      </div>
    </div>

    <!-- ============ STICKY ATC ============ -->
    <div class="demo-panel" role="tabpanel" id="demo-sticky" aria-labelledby="dt-sticky" hidden>
      <div class="demo-wrap">
        <div class="demo-top">
          <div>
            <div class="demo-h">Scroll the product page.</div>
            <p class="demo-sub">The buy button follows the customer down the page instead of disappearing above the fold.</p>
          </div>
          <span class="label">Scroll inside the frame ↓</span>
        </div>
        <div class="demo demo-scroll" id="stickyDemo">
          <div class="sd-inner">
            <div class="sd-hero">
              <div class="sd-img" aria-hidden="true">
                <svg viewBox="0 0 60 90" fill="none" stroke="#141310" stroke-width="1.3"><rect x="18" y="4" width="24" height="12" rx="3"/><path d="M24 16v6M36 16v6"/><rect x="8" y="22" width="44" height="64" rx="7"/><path d="M16 42h28" stroke-opacity=".3"/><path d="M16 52h18" stroke-opacity=".3"/></svg>
              </div>
              <div>
                <h5 class="sd-title">Retinol 0.3% Night Serum</h5>
                <p class="sd-meta">Resurfacing · 30 ml</p>
                <div class="sd-price"><b>EGP 890</b></div>
                <button class="sd-atc" type="button" id="sdMainBtn">Add to cart</button>
                <p class="sd-ship">Free shipping over EGP 800 · Delivery in 2–4 days</p>
              </div>
            </div>
            <div class="sd-body">
              <h6>How to use</h6>
              <p>Apply two to three drops to clean, dry skin in the evening. Follow with moisturiser. Introduce gradually — two nights a week for the first fortnight.</p>
              <h6>Ingredients</h6>
              <p>Encapsulated retinol 0.3%, squalane, niacinamide 2%, panthenol, bisabolol. Fragrance free and suitable for sensitive skin when introduced slowly.</p>
              <h6>Delivery &amp; returns</h6>
              <p>Dispatched within 24 hours. Free delivery on orders above EGP 800. Fourteen-day returns on unopened items.</p>
              <h6>Reviews</h6>
              <p>Scroll back up and the sticky bar disappears again — it only appears once the real buy button has left the viewport.</p>
            </div>
          </div>
          <div class="sd-sticky" id="sdSticky" aria-hidden="true">
            <div class="sd-sticky-l">
              <span class="sd-sticky-thumb" aria-hidden="true"></span>
              <span><b>Retinol 0.3% Night Serum</b><i>EGP 890</i></span>
            </div>
            <button class="sd-atc sd-atc--sm" type="button" id="sdStickyBtn">Add to cart</button>
          </div>
        </div>
        <p class="demo-note"><b>Why it matters.</b> On long mobile product pages the add-to-cart button spends most of its life off-screen. A sticky bar keeps the action one tap away at every scroll position.</p>
      </div>
    </div>

    <!-- ============ CART REWARDS ============ -->
    <div class="demo-panel" role="tabpanel" id="demo-rewards" aria-labelledby="dt-rewards" hidden>
      <div class="demo-wrap">
        <div class="demo-top">
          <div>
            <div class="demo-h">Add items. Watch the thresholds unlock.</div>
            <p class="demo-sub">Free-shipping progress and a gift threshold, calculated live from cart value.</p>
          </div>
          <button class="ghost-btn" type="button" id="cartReset">Reset cart</button>
        </div>
        <div class="demo cart-demo">
          <div class="cd-products">
            ${[
              ['Vitamin C Serum', '30 ml', 750],
              ['Gentle Cleanser', '150 ml', 420],
              ['SPF 50 Fluid', '50 ml', 560]
            ]
              .map(
                ([n, m, p]) => `<div class="cd-prod">
              <span class="cd-sq" aria-hidden="true"></span>
              <span class="cd-info"><b>${n}</b><i>${m} · EGP ${p}</i></span>
              <button type="button" class="cd-add" data-add="${p}" data-name="${n}">Add</button>
            </div>`
              )
              .join('\n            ')}
          </div>
          <div class="cd-cart">
            <div class="cd-head"><b>Your cart</b><span id="cdCount">0 items</span></div>
            <ul class="cd-lines" id="cdLines"><li class="cd-empty">Cart is empty — add something.</li></ul>
            <div class="cd-reward">
              <div class="cd-rline"><span id="cdMsg">Spend EGP 800 more for free shipping</span><b id="cdTotal">EGP 0</b></div>
              <div class="cd-track" role="progressbar" aria-valuemin="0" aria-valuemax="1500" aria-valuenow="0" aria-label="Cart rewards progress" id="cdBarWrap">
                <i id="cdBar"></i>
                <span class="cd-tick" style="left:53.33%"><em>800</em></span>
                <span class="cd-tick" style="left:100%"><em>1500</em></span>
              </div>
              <div class="cd-badges">
                <span class="cd-badge" id="cdShip">Free shipping · EGP 800</span>
                <span class="cd-badge" id="cdGift">Free gift · EGP 1,500</span>
              </div>
            </div>
            <button class="sd-atc" type="button" disabled id="cdCheckout">Checkout</button>
          </div>
        </div>
        <p class="demo-note"><b>Why it matters.</b> A visible threshold is one of the cheapest ways to lift average order value — the customer decides to add one more item rather than you discounting.</p>
      </div>
    </div>

    <!-- ============ VARIANTS ============ -->
    <div class="demo-panel" role="tabpanel" id="demo-variants" aria-labelledby="dt-variants" hidden>
      <div class="demo-wrap">
        <div class="demo-top">
          <div>
            <div class="demo-h">Pick a colour and a size.</div>
            <p class="demo-sub">Price, image and availability update together — sold-out combinations disable themselves.</p>
          </div>
          <span class="label" id="vSku">SKU —</span>
        </div>
        <div class="demo var-demo">
          <div class="vd-media"><div class="vd-swatch" id="vdSwatch" aria-hidden="true"></div>
            <span class="vd-tag" id="vdTag">In stock</span>
          </div>
          <div class="vd-opts">
            <h5 class="vd-title">Merino Crew Knit</h5>
            <div class="vd-price"><b id="vdPrice">EGP 1,450</b><s id="vdWas">EGP 1,800</s></div>
            <fieldset class="vd-group">
              <legend class="label">Colour</legend>
              <div class="vd-row" id="vdColours" role="radiogroup" aria-label="Colour"></div>
            </fieldset>
            <fieldset class="vd-group">
              <legend class="label">Size</legend>
              <div class="vd-row" id="vdSizes" role="radiogroup" aria-label="Size"></div>
            </fieldset>
            <button class="sd-atc" type="button" id="vdAdd">Add to cart</button>
            <p class="vd-note" id="vdNote">Free returns within 14 days.</p>
          </div>
        </div>
        <p class="demo-note"><b>Why it matters.</b> Variant logic is where most themes get sloppy. Disabled-not-hidden combinations tell the customer what exists before they commit to a choice.</p>
      </div>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- expertise */
const expertiseSection = () => `
<section class="sect noir noir--top" id="expertise">
  <div class="wrap">
    <div class="exp-grid">
      <div>
        <span class="label rv">Technical expertise</span>
        <h2 class="exp-h display lines rv">
          <span class="line"><span>Built for how</span></span>
          <span class="line"><span>this region <em class="serif-i">buys.</em></span></span>
        </h2>
        <p class="exp-p rv rv-d1">Regional commerce is not a translation layer on a Western template. It is mirrored layouts, instalment plans, four currencies in one storefront, and a catalogue that survives a nationwide sale campaign.</p>
      </div>
      <div class="exp-cols rv rv-d1">
        ${expertise
          .map(
            (g) => `<div class="exp-col">
          <h4 class="label label--ink2">${g.group}</h4>
          <ul>${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
        </div>`
          )
          .join('\n        ')}
      </div>
    </div>
  </div>
</section>`;

/* --------------------------------------------------------------- process */
const processSection = () => `
<section class="sect wrap" id="process">
  <div class="sect-head">
    <div>
      <span class="label rv">How a project runs</span>
      <h2 class="about-h display rv">From first wireframe to long-term growth</h2>
    </div>
    <p class="sect-note rv rv-d1">Six stages. You always know which one we are in and what comes out of it.</p>
  </div>
  <ol class="flow">
    ${process
      .map(
        (s) => `<li class="flow-step rv">
      <span class="flow-n">${s.n}</span>
      <h3 class="flow-t">${s.title}</h3>
      <p class="flow-b">${s.body}</p>
    </li>`
      )
      .join('\n    ')}
  </ol>
</section>`;

/* ----------------------------------------------------------------- about */
const aboutSection = () => `
<section class="sect wrap" id="about">
  <div class="about-grid">
    <div>
      <span class="label rv">About</span>
      <h2 class="about-h display lines rv">
        <span class="line"><span>Commerce,</span></span>
        <span class="line"><span>crafted <em class="serif-i">end to end.</em></span></span>
      </h2>
      <dl class="facts rv rv-d2">
        ${about.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
    </div>
    <div class="about-body">
      <p class="rv">${about.lede}</p>
      ${about.paragraphs.map((t, i) => `<p class="rv rv-d${i + 1}">${t}</p>`).join('\n      ')}
    </div>
  </div>
</section>`;

/* --------------------------------------------------------------- contact */
const contact = () => `
<section class="noir contact" id="contact">
  <div class="wrap">
    <span class="label rv">Contact</span>
    <h2 class="contact-h display lines rv">
      <span class="line"><span>Have a Shopify</span></span>
      <span class="line"><span>project <em class="serif-i">in mind?</em></span></span>
    </h2>
    <p class="contact-lede rv">Tell me what the store needs to do. I reply to every serious enquiry — new builds, redesigns, rescue jobs and consultations.</p>

    <div class="contact-grid">
      <form class="cform rv" id="contactForm" novalidate>
        <div class="field">
          <label for="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required autocomplete="name" maxlength="80">
          <span class="err" data-for="name"></span>
        </div>
        <div class="field">
          <label for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autocomplete="email" maxlength="120">
          <span class="err" data-for="email"></span>
        </div>
        <div class="field">
          <label for="cf-store">Store URL <span class="opt">optional</span></label>
          <input id="cf-store" name="store" type="url" placeholder="https://" autocomplete="url" maxlength="200">
          <span class="err" data-for="store"></span>
        </div>
        <div class="field">
          <label for="cf-type">What do you need?</label>
          <select id="cf-type" name="projectType">
            <option>New Shopify build</option>
            <option>Redesign of an existing store</option>
            <option>Custom feature or section</option>
            <option>Bilingual AR/EN or RTL build</option>
            <option>Speed &amp; CRO improvements</option>
            <option>Something else</option>
          </select>
        </div>
        <div class="field field--full">
          <label for="cf-msg">Project details</label>
          <textarea id="cf-msg" name="message" rows="4" required maxlength="2000"></textarea>
          <span class="err" data-for="message"></span>
        </div>
        <div class="hp" aria-hidden="true">
          <label for="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabindex="-1" autocomplete="off">
        </div>
        <input type="hidden" name="t" id="cf-t">
        <div class="field field--full form-actions">
          <button class="btn btn--fill" type="submit" id="cfSubmit" data-magnet><i></i>Send enquiry</button>
          <p class="form-status" id="cfStatus" role="status" aria-live="polite"></p>
        </div>
      </form>

      <aside class="cdirect rv rv-d1">
        <div class="cblock">
          <h3 class="label">Email</h3>
          ${site.emails.map((e) => `<a href="mailto:${e}">${e}</a>`).join('\n          ')}
        </div>
        <div class="cblock">
          <h3 class="label">Phone</h3>
          ${site.phones.map((p) => `<a href="tel:${p.tel}">${p.display}</a>`).join('\n          ')}
        </div>
        ${
          whatsappUrl
            ? `<div class="cblock">
          <h3 class="label">WhatsApp</h3>
          <a class="wa" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-magnet>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.6.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2a.6.6 0 0 0 0-.6c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3A2.9 2.9 0 0 0 6.7 12a5.1 5.1 0 0 0 1.1 2.7 11.6 11.6 0 0 0 4.4 3.9 5 5 0 0 0 3.1.6 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3z"/></svg>
            Message on WhatsApp
          </a>
        </div>`
            : ''
        }
        <p class="cnote">Based in Egypt, working with brands across the Gulf and further afield. Happy to work in Arabic or English.</p>
      </aside>
    </div>
  </div>
</section>`;

/* ------------------------------------------------------------- lightbox */
const lightbox = () => `
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
</div>`;

export const homeBody = () =>
  [
    hero(),
    stats(),
    work(),
    storeWall(),
    servicesSection(),
    demos(),
    expertiseSection(),
    processSection(),
    aboutSection(),
    contact(),
    lightbox()
  ].join('\n');
