/**
 * English copy — the reference locale.
 *
 * Every string a visitor reads lives here. `ar.js` must have exactly the same
 * shape; `npm run check:i18n` fails the build if a key is missing on either
 * side. HTML entities (&amp;) and inline <em>/<strong> are allowed.
 *
 * `{name}`-style placeholders are filled at render time.
 */
import projects from './projects.en.js';

export default {
  projects,

  lang: 'en',
  dir: 'ltr',
  locale: 'en_US',
  /** Label shown on the switcher when THIS language is the target. */
  langName: 'English',
  langShort: 'EN',

  meta: {
    title: 'VEQRU — Digital Commerce Studio | Shopify development & CRO',
    description:
      'VEQRU is a digital commerce studio building custom Shopify storefronts, Liquid sections, bilingual Arabic–English experiences and conversion-focused commerce for brands across Egypt and the Gulf. 50+ stores delivered.',
    keywords: [
      'Shopify development agency',
      'Shopify theme development',
      'custom Shopify solutions',
      'e-commerce development',
      'Shopify Liquid',
      'conversion rate optimisation',
      'Arabic Shopify store'
    ],
    caseTitle: '{name} — Shopify case study | VEQRU'
  },

  ui: {
    skip: 'Skip to content',
    positioning: 'Digital Commerce Studio',
    tagline: 'We build commerce that performs.',
    regions: 'Egypt &amp; GCC',
    nav: [
      { id: 'work', label: 'Work' },
      { id: 'services', label: 'Solutions' },
      { id: 'demos', label: 'Shopify Lab' },
      { id: 'process', label: 'Process' },
      { id: 'about', label: 'About' }
    ],
    contact: 'Contact',
    cta: 'Start a project',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    primaryNav: 'Primary',
    mobileNav: 'Mobile',
    langSwitchAria: 'Read this page in English',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    backToTop: 'Back to top',
    homeAria: 'VEQRU — home'
  },

  announcements: [
    '50+ Shopify stores delivered',
    'Egypt &amp; GCC · Shopify Markets',
    'Arabic / English · full RTL builds',
    'Now taking new builds, redesigns &amp; consultations'
  ],

  hero: {
    eyebrow: 'Digital Commerce Studio',
    titleLines: ['We engineer', '<em>better</em> commerce'],
    lede: 'Custom Shopify experiences, powerful integrations and conversion-focused solutions built to help ambitious brands grow. <strong>50+ stores delivered across Egypt and the Gulf</strong> — official brand flagships like Skechers, ANTA and ECCO alongside fast-growing local labels.',
    ctaPrimary: 'See our work',
    ctaSecondary: 'Start a project',
    facts: ['50+ Shopify stores', 'Arabic / English', 'Egypt &amp; GCC'],
    phonesAria: 'Mobile storefronts built by the studio: Skinify, Givago and MyVi'
  },

  stats: [
    'Shopify projects delivered',
    'Stores named in this portfolio',
    'Bilingual &amp; full RTL builds',
    'Regions · Egypt &amp; GCC'
  ],

  work: {
    eyebrow: 'Selected work',
    title: 'Commerce we have built',
    note: 'Eight storefronts, shown the way a customer actually reads them — homepage, product page and cart. Switch views on any preview.',
    projectLabel: 'Project {n}',
    caseStudy: 'Case study',
    scope: 'Scope',
    previewNote: 'Captured from the live store',
    views: { home: 'Homepage', product: 'Product page', cart: 'Cart drawer', collection: 'Collection', feature: 'Custom feature' },
    viewsAria: '{name} store views',
    desktop: 'Desktop',
    mobile: 'Mobile',
    enlarge: 'Enlarge',
    enlargeAria: 'Enlarge {name} {view}, {device}',
    shotAlt: '{name} storefront — {view}, {device}',
    openStore: 'Open live store',
    openStoreAria: 'Open {name} in a new tab'
  },

  wall: {
    eyebrow: 'The wider portfolio',
    title: 'Twenty more, all on Shopify',
    note: 'Fashion, beauty, food, home and lifestyle — each with its own identity, audience and commerce logic.',
    filterAria: 'Filter stores by sector',
    sectors: {
      all: 'All',
      fashion: 'Fashion',
      beauty: 'Beauty',
      sportswear: 'Sportswear',
      footwear: 'Footwear',
      wellness: 'Wellness',
      food: 'Food',
      home: 'Home'
    },
    empty: 'No stores in that sector yet.',
    visit: 'Visit',
    categories: {
      'infinityclinicpharma.com': 'Dermo-cosmetics · AR/EN',
      'myvistores.com': 'Gummy vitamins &amp; wellness',
      'uskinify.com': 'Clinical skincare',
      'frg.store': 'Multi-brand sportswear platform',
      'colehaan.com.eg': 'Official footwear brand store',
      'eltahanhomewear.com': 'Heritage cotton homewear · RTL',
      'voycollections.com': 'Menswear &amp; resortwear',
      'robaneg.com': 'Egyptian cotton menswear',
      'penduline-ksa.com': 'Kids’ hair &amp; baby care · KSA',
      'traumendesign.com': 'Womenswear · 7 GCC markets',
      'snugglez.shop': 'Baby sleep essentials',
      'ranch.com.eg': 'Premium turkey foods',
      'anagencare.com': 'Anti-hair-loss care',
      'fourteenscarves.com': 'Modest fashion · RTL',
      'squaretrends-eg.com': 'Artist-designed beach towels',
      'champsland.com': 'Sportswear &amp; teamwear',
      'alasdekaastore.com': 'Dairies &amp; fresh grocery',
      'muroujart.com': 'Outdoor stone decor · RTL',
      'luxuria-eg.com': 'Premium men’s fashion',
      'beyourself-club.com': 'Lip &amp; beauty cosmetics'
    }
  },

  why: {
    eyebrow: 'Why work with us',
    title: 'Three things that change the result',
    note: 'Not claims about us — things you can check in the work above.',
    items: [
      {
        title: 'We build features, not app stacks',
        body: 'Bundle builders, quizzes, loyalty tiers and cart logic live in the theme. Fewer apps fighting each other, and a store that stays fast.'
      },
      {
        title: 'We have shipped at brand-flagship scale',
        body: 'Official storefronts for Skechers, ANTA and ECCO run on one multi-brand build alongside a nationwide retail network of 38 stores.'
      },
      {
        title: 'We build for how this region actually buys',
        body: 'True right-to-left Arabic, Shopify Markets, multi-currency, and instalment checkout with ValU, Meeza and Forsa.'
      }
    ]
  },

  services: {
    eyebrow: 'Solutions',
    title: 'What we take on',
    note: 'Engaged for a full build, or for the one part of an existing store that is holding it back.',
    items: [
      {
        span: 'wide',
        title: 'Store design &amp; theme development',
        benefit: 'A storefront that looks like the brand and sells like a sales floor.',
        body: 'Brand-true storefront design and custom Shopify themes — typography, layout systems and product presentation built for conversion rather than decoration.',
        tags: ['Liquid', 'Custom sections', 'Theme architecture', 'Design systems']
      },
      {
        span: '',
        title: 'Custom Shopify development',
        benefit: 'The features your theme cannot do, built properly instead of bolted on.',
        body: 'Bespoke functionality beyond the theme: routine and bundle builders, product quizzes, loyalty mechanics, cart drawers, sticky add-to-cart and tailored checkout journeys.',
        tags: ['Liquid', 'JavaScript', 'Shopify APIs', 'Cart AJAX API']
      },
      {
        span: '',
        title: 'Bilingual &amp; RTL experiences',
        benefit: 'An Arabic store that feels native, not translated.',
        body: 'Arabic–English stores with true right-to-left layouts, mirrored navigation, localised content structures and Arabic-Indic numerals where they belong.',
        tags: ['AR / EN', 'Full RTL', 'Locale files']
      },
      {
        span: '',
        title: 'Shopify Markets &amp; multi-currency',
        benefit: 'Sell across the Gulf without running separate stores.',
        body: 'International selling configured properly — regional pricing, multiple currencies and market-specific storefront behaviour from one build.',
        tags: ['Shopify Markets', 'Multi-currency', 'Geo routing']
      },
      {
        span: '',
        title: 'Payments, BNPL &amp; local logistics',
        benefit: 'Fewer abandoned carts, because the checkout speaks the local language of money.',
        body: 'Regional payment stacks — cards, wallets, Meeza, ValU and instalment providers — integrated alongside courier and fulfilment systems.',
        tags: ['ValU', 'Meeza', 'Forsa', 'Courier integrations']
      },
      {
        span: '',
        title: 'Conversion &amp; retention systems',
        benefit: 'More revenue from the traffic you already pay for.',
        body: 'Cross-sells, promotional logic, free-shipping thresholds, email capture and loyalty programmes engineered into the store rather than stacked as apps.',
        tags: ['CRO', 'Upsell logic', 'Loyalty', 'Promo engines']
      },
      {
        span: 'wide',
        title: 'Migration, launch &amp; growth',
        benefit: 'A replatform that does not cost you a month of sales.',
        body: 'Replatforming to Shopify, structured launches with redirect and data-integrity checks, and continuous iteration after go-live.',
        tags: ['Replatforming', 'Launch QA', 'Iteration']
      }
    ]
  },

  lab: {
    eyebrow: 'Shopify Lab',
    title: 'Features, running — not screenshots',
    note: 'Four storefront mechanics we build, running live in this page. Click, scroll and switch language — these are real components, not mockups.',
    tabsAria: 'Storefront experiments',
    live: 'Live',
    whyLabel: 'Why it matters',
    rtl: {
      tab: 'Bilingual &amp; RTL',
      title: 'Flip the storefront.',
      sub: 'Direction, alignment, icon order, badge placement and numerals all mirror.',
      spec: 'dir · lang · numerals · one component',
      toggleAria: 'Storefront language',
      note: 'Same components, mirrored logic. We build this way for Infinity Clinic Pharma, Givago, El Tahan, Fourteen Scarves and Murouj Art.',
      noteLead: 'Why it matters'
    },
    sticky: {
      tab: 'Sticky add to cart',
      title: 'Scroll the product page.',
      sub: 'The buy button follows the customer down the page instead of disappearing above the fold.',
      spec: 'IntersectionObserver · zero layout shift',
      hint: 'Scroll inside the frame',
      product: 'Retinol 0.3% Night Serum',
      meta: 'Resurfacing · 30 ml',
      price: 890,
      ship: 'Free shipping over {x} · delivery in 2–4 days',
      sections: [
        ['How to use', 'Apply two to three drops to clean, dry skin in the evening. Follow with moisturiser. Introduce gradually — two nights a week for the first fortnight.'],
        ['Ingredients', 'Encapsulated retinol 0.3%, squalane, niacinamide 2%, panthenol, bisabolol. Fragrance-free, and suitable for sensitive skin when introduced slowly.'],
        ['Delivery &amp; returns', 'Dispatched within 24 hours. Free delivery on orders above {x}. Fourteen-day returns on unopened items.'],
        ['Reviews', 'Scroll back up and the sticky bar disappears again — it only appears once the real buy button has left the viewport.']
      ],
      note: 'On long mobile product pages the add-to-cart button spends most of its life off-screen. A sticky bar keeps the action one tap away at every scroll position.'
    },
    rewards: {
      tab: 'Cart rewards',
      title: 'Add items. Watch the thresholds unlock.',
      sub: 'Free-shipping progress and a gift threshold, calculated live from cart value.',
      spec: 'live totals · 2 thresholds',
      reset: 'Reset cart',
      products: [
        ['Vitamin C Serum', '30 ml', 750],
        ['Gentle Cleanser', '150 ml', 420],
        ['SPF 50 Fluid', '50 ml', 560]
      ],
      add: 'Add',
      cart: 'Your cart',
      progressAria: 'Cart rewards progress',
      shipBadge: 'Free shipping · {x}',
      giftBadge: 'Free gift · {x}',
      checkout: 'Checkout',
      note: 'A visible threshold is one of the cheapest ways to lift average order value — the customer decides to add one more item, rather than you discounting.'
    },
    variants: {
      tab: 'Variant picker',
      title: 'Pick a colour and a size.',
      sub: 'Price, image and availability update together — sold-out combinations disable themselves.',
      spec: '4 × 4 matrix · 5 sold out',
      product: 'Merino Crew Knit',
      colour: 'Colour',
      size: 'Size',
      note: 'Variant logic is where most themes get sloppy. Disabled — not hidden — combinations tell the customer what exists before they commit to a choice.'
    }
  },

  /* Storefront mock used inside the bilingual demo. Both languages are always
     present because the demo flips between them. */
  mock: {
    en: {
      bar: 'Free shipping on orders over EGP 800',
      logo: 'STOREFRONT',
      links: ['Home', 'Shop', 'Bundles', 'Offers'],
      chips: ['Best sellers', 'New in', 'Sale'],
      badge: 'Best seller',
      product: 'Vitamin C Serum 15%',
      meta: 'Brightening · 30 ml',
      price: 'EGP 750',
      was: 'EGP 900',
      add: 'Add to cart'
    },
    ar: {
      bar: 'شحن مجاني للطلبات فوق ٨٠٠ ج.م',
      logo: 'المتجر',
      links: ['الرئيسية', 'تسوّق', 'الباقات', 'العروض'],
      chips: ['الأكثر مبيعًا', 'وصل حديثًا', 'التخفيضات'],
      badge: 'الأكثر مبيعًا',
      product: 'سيروم فيتامين سي ١٥٪',
      meta: 'توحيد لون البشرة · ٣٠ مل',
      price: '٧٥٠ ج.م',
      was: '٩٠٠ ج.م',
      add: 'أضف إلى السلة'
    }
  },

  expertise: {
    eyebrow: 'Technical expertise',
    titleLines: ['Built for how', 'this region <em>buys</em>'],
    body: 'Regional commerce is not a translation layer on a Western template. It is mirrored layouts, instalment plans, four currencies in one storefront, and a catalogue that survives a nationwide sale campaign.',
    groups: [
      { group: 'Shopify core', items: ['Shopify Liquid', 'Theme architecture', 'Custom sections &amp; blocks', 'Online Store 2.0', 'Theme customisation', 'Shopify Markets'] },
      { group: 'Storefront engineering', items: ['JavaScript (ES6+)', 'HTML', 'CSS', 'Cart AJAX API', 'Shopify APIs', 'Third-party app integration'] },
      { group: 'Commerce features', items: ['Advanced product pages', 'Product cards', 'Cart drawers', 'Sticky add to cart', 'Upsell &amp; cross-sell', 'Bundle builders', 'Product quizzes', 'Loyalty mechanics'] },
      { group: 'Growth &amp; quality', items: ['Conversion rate optimisation', 'Mobile-first development', 'Store performance', 'Bilingual AR/EN &amp; RTL', 'Accessibility', 'AI-assisted development workflows'] }
    ]
  },

  process: {
    eyebrow: 'Process',
    title: 'From first wireframe to long-term growth',
    note: 'Six stages. You always know which one we are in and what comes out of it.',
    steps: [
      ['Discovery', 'Brand, catalogue, markets and commercial goals. What the store has to do before anything is designed.'],
      ['Store audit', 'Existing theme, speed, journeys and leaks. For a replatform, a full inventory of what must survive the move.'],
      ['Planning', 'Information architecture, section inventory, feature list and the build order — agreed before code.'],
      ['Development', 'Custom theme and Liquid sections built to the plan, with merchant-editable settings so your team can run the store without us.'],
      ['Testing', 'Devices, browsers, both languages, both directions. Cart, checkout, payments and promotional logic exercised end to end.'],
      ['Launch &amp; optimisation', 'A structured go-live with redirects and analytics in place, then iteration against real behaviour.']
    ]
  },

  about: {
    eyebrow: 'About',
    titleLines: ['Two founders,', 'one <em>commerce studio</em>'],
    lede: 'VEQRU is a two-person commerce studio. We build Shopify storefronts for brands that have to sell seriously — official brand stores operating alongside national retail networks, and independent labels growing fast across Egypt and the Gulf.',
    paragraphs: [
      'Our work sits where three things meet: theme engineering, interface design, and an understanding of how a store actually makes money. A product page is a layout problem and a merchandising problem at the same time, and the stores in this portfolio were built treating it that way.',
      'Most of what we build is custom. Bundle builders, routine and vitamin quizzes, loyalty tiers, cart logic, instalment checkout, store locators — features that live in the theme rather than in a stack of apps that slow the site down and fight each other.',
      'A large share of the catalogue is bilingual. Arabic–English with true right-to-left is not a translation layer; it is a mirrored build, and getting it right is one of the things this region quietly demands.'
    ],
    facts: [
      ['Studio', 'Two founders, Egypt-based'],
      ['Built on', 'Shopify, end to end'],
      ['Markets', 'Egypt &amp; the Gulf'],
      ['Languages', 'Arabic &amp; English, full RTL'],
      ['Largest platform', 'Multi-brand build running Skechers, ANTA &amp; ECCO']
    ],
    founders: {
      ahmed: {
        role: 'Co-founder · Shopify development',
        bio: 'Builds the storefronts — custom themes, Liquid sections, cart and checkout logic, and the integrations that keep a store running day to day.'
      },
      abdulrahman: {
        role: 'Co-founder · Commerce design &amp; CRO',
        bio: 'Shapes how a store reads and sells — storefront design, merchandising structure, bilingual AR/EN experiences and conversion work after launch.'
      }
    }
  },

  contact: {
    eyebrow: 'Contact',
    titleLines: ['Have a Shopify', 'project <em>in mind</em>?'],
    lede: 'Tell us what the store needs to do. We reply to every serious enquiry — new builds, redesigns, rescue jobs and consultations.',
    emailCta: 'Email {first}',
    copy: 'Copy address',
    copyAria: 'Copy {name}’s email address',
    includeTitle: 'For a faster, better reply, include',
    includeItems: [
      'Your store URL, if you already have one',
      'What you need — new build, redesign, a custom feature, Arabic/English, or CRO',
      'A rough timeline'
    ],
    includeNote: 'The email buttons open your mail app with these prompts filled in. Prefer webmail? Copy an address instead.',
    whatsapp: 'WhatsApp',
    whatsappCta: 'Message us on WhatsApp',
    whatsappText: 'Hi VEQRU — I’d like to talk about a Shopify project.',
    phone: 'Phone',
    email: 'Email',
    note: 'Based in Egypt, working with brands across the Gulf and further afield. We work in Arabic and English.',
    mailSubject: 'Shopify project enquiry',
    mailBody: [
      'Hi VEQRU,',
      '',
      'Store URL (if you have one):',
      'What we need (new build / redesign / custom feature / Arabic-English / CRO):',
      'Rough timeline:',
      'A bit about the project:',
      '',
      'Thanks,'
    ]
  },

  /** Contact form — only rendered when site.contactForm is true. */
  form: {
    name: 'Your name',
    email: 'Email',
    store: 'Store URL',
    optional: 'optional',
    need: 'What do you need?',
    needs: ['New Shopify build', 'Redesign of an existing store', 'Custom feature or section', 'Arabic/English or RTL build', 'Speed &amp; CRO improvements', 'Something else'],
    details: 'Project details',
    submit: 'Send enquiry',
    errName: 'Please enter your name.',
    errEmail: 'Please enter a valid email address.',
    errStore: 'Use a full URL, e.g. https://yourstore.com',
    errMessage: 'A sentence or two about the project, please (20+ characters).',
    fixFields: 'Please fix the highlighted fields.',
    sending: 'Sending…',
    tooQuick: 'Could not send — please try again in a moment.',
    notConnected: 'The form is not connected yet — please email us directly.',
    failed: 'Something went wrong. Please email us directly instead.',
    network: 'Network error — please email us directly instead.',
    doneTitle: 'Thanks — that’s with us.',
    doneBody: 'We read every enquiry and usually reply within one working day.'
  },

  lightbox: {
    dialogAria: 'Enlarged store preview',
    close: 'Close preview'
  },

  case: {
    home: 'Home',
    work: 'Work',
    crumbsAria: 'Breadcrumb',
    visit: 'Visit the live store',
    startLike: 'Start a project like this',
    challenge: 'The challenge',
    contribution: 'What we worked on',
    solution: 'The solution',
    keyFeatures: 'Key features',
    outcomes: 'Outcomes',
    brand: 'Brand',
    platform: 'Platform',
    liveStore: 'Live store',
    previews: 'Previews',
    stack: 'Technologies',
    scope: 'Scope',
    prev: 'Previous',
    next: 'Next',
    moreAria: 'More projects',
    pending: 'The full write-up for this project — the challenge, what we built and how — is being prepared.'
  },

  /** Strings the browser needs at runtime. Serialised into the page. */
  client: {
    copied: 'Copied',
    copiedMsg: '{email} copied to your clipboard.',
    copyFailed: 'Select &amp; copy',
    copyFailedMsg: 'Couldn’t copy automatically — the address is {email}.',
    added: 'Added',
    money: 'EGP {n}',
    cartItems: { one: '{n} item', other: '{n} items' },
    cartEmpty: 'Cart is empty — add something.',
    msgShip: 'Spend {x} more for free shipping',
    msgGift: 'Free shipping unlocked — {x} more for a free gift',
    msgBoth: 'Free shipping and a free gift unlocked',
    remove: 'Remove {name}',
    inStock: 'In stock',
    soldOut: 'Sold out',
    addToCart: 'Add to cart',
    returns: 'Free returns within 14 days.',
    soldOutNote: 'That combination is out of stock — try another size.',
    sku: 'SKU',
    sizeTitle: '{colour} / {size}',
    sizeSoldOut: '{colour} / {size} — sold out',
    colours: { oat: 'Oatmeal', ink: 'Ink', moss: 'Moss', clay: 'Clay' }
  }
};
