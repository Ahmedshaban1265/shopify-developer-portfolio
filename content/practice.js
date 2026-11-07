/**
 * Services, capabilities and process.
 *
 * Service definitions come from the portfolio PDF ("Services", section three).
 * Specialisation tags come from the owner's own stated positioning.
 * Business-benefit lines describe what the service is for — they make no
 * claim about results achieved for any specific client.
 */

/** Bento grid. `span` drives the layout: 'wide' = 2 cols, 'tall' = 2 rows. */
export const services = [
  {
    n: '01',
    title: 'Store design &amp; theme development',
    span: 'wide',
    benefit: 'A storefront that looks like the brand and sells like a sales floor.',
    body: 'Brand-true storefront design and custom Shopify themes — typography, layout systems and product presentation built for conversion rather than decoration.',
    tags: ['Liquid', 'Custom sections', 'Theme architecture', 'Design systems']
  },
  {
    n: '02',
    title: 'Custom Shopify development',
    span: '',
    benefit: 'The features your theme cannot do, built properly instead of bolted on.',
    body: 'Bespoke functionality beyond the theme: routine and bundle builders, product quizzes, loyalty mechanics, cart drawers, sticky add-to-cart and tailored checkout journeys.',
    tags: ['Liquid', 'JavaScript', 'Shopify APIs', 'Cart AJAX API']
  },
  {
    n: '03',
    title: 'Bilingual &amp; RTL experiences',
    span: '',
    benefit: 'An Arabic store that feels native, not translated.',
    body: 'Arabic–English stores with true right-to-left layouts, mirrored navigation, localised content structures and Arabic-Indic numerals where they belong.',
    tags: ['AR / EN', 'Full RTL', 'Locale files']
  },
  {
    n: '04',
    title: 'Shopify Markets &amp; multi-currency',
    span: '',
    benefit: 'Sell across the Gulf without running separate stores.',
    body: 'International selling configured properly — regional pricing, multiple currencies and market-specific storefront behaviour from one build.',
    tags: ['Shopify Markets', 'Multi-currency', 'Geo routing']
  },
  {
    n: '05',
    title: 'Payments, BNPL &amp; local logistics',
    span: '',
    benefit: 'Fewer abandoned carts because the checkout speaks the local language of money.',
    body: 'Regional payment stacks — cards, wallets, Meeza, ValU and instalment providers — integrated alongside courier and fulfilment systems.',
    tags: ['ValU', 'Meeza', 'Forsa', 'Courier integrations']
  },
  {
    n: '06',
    title: 'Conversion &amp; retention systems',
    span: '',
    benefit: 'More revenue from the traffic you already pay for.',
    body: 'Cross-sells, promotional logic, free-shipping thresholds, email capture and loyalty programmes engineered into the store experience rather than stacked as apps.',
    tags: ['CRO', 'Upsell logic', 'Loyalty', 'Promo engines']
  },
  {
    n: '07',
    title: 'Migration, launch &amp; growth',
    span: 'wide',
    benefit: 'A replatform that does not cost you a month of sales.',
    body: 'Replatforming to Shopify, structured launches with redirect and data integrity checks, and continuous iteration after go-live.',
    tags: ['Replatforming', 'Launch QA', 'Iteration']
  }
];

/**
 * Technical expertise. Grouped capabilities — each one is either evidenced by a
 * project in this portfolio or stated by the owner as a core specialisation.
 */
export const expertise = [
  {
    group: 'Shopify core',
    items: ['Shopify Liquid', 'Theme architecture', 'Custom sections &amp; blocks', 'Online Store 2.0', 'Theme customization', 'Shopify Markets']
  },
  {
    group: 'Storefront engineering',
    items: ['JavaScript (ES6+)', 'HTML', 'CSS', 'Cart AJAX API', 'Shopify APIs', 'Third-party app integration']
  },
  {
    group: 'Commerce features',
    items: ['Advanced product pages', 'Product cards', 'Cart drawers', 'Sticky add to cart', 'Upsell &amp; cross-sell', 'Bundle builders', 'Product quizzes', 'Loyalty mechanics']
  },
  {
    group: 'Growth &amp; quality',
    items: ['Conversion rate optimisation', 'Mobile-first development', 'Store performance', 'Bilingual AR/EN &amp; RTL', 'Accessibility', 'AI-assisted development workflows']
  }
];

/** Delivery process — the sequence a project actually runs through. */
export const process = [
  { n: '01', title: 'Discovery', body: 'Brand, catalogue, markets and commercial goals. What the store has to do before anything is designed.' },
  { n: '02', title: 'Store audit', body: 'Existing theme, speed, journeys and leaks. For a replatform, a full inventory of what must survive the move.' },
  { n: '03', title: 'Planning', body: 'Information architecture, section inventory, feature list and the build order — agreed before code.' },
  { n: '04', title: 'Development', body: 'Custom theme and Liquid sections built to the plan, with merchant-editable settings so the team can run the store without me.' },
  { n: '05', title: 'Testing', body: 'Devices, browsers, both languages, both directions. Cart, checkout, payments and promotional logic exercised end to end.' },
  { n: '06', title: 'Launch &amp; optimisation', body: 'Structured go-live with redirects and analytics in place, then iteration against real behaviour.' }
];

/** About — written from the portfolio's own evidence. No invented history. */
export const about = {
  lede: 'I build Shopify storefronts for brands that have to sell seriously — official brand stores operating alongside national retail networks, and independent labels growing fast across Egypt and the Gulf.',
  paragraphs: [
    'My work sits where three things meet: theme engineering, interface design, and an understanding of how a store actually makes money. A product page is a layout problem and a merchandising problem at the same time, and the stores in this portfolio were built treating it that way.',
    'Most of what I build is custom. Bundle builders, routine and vitamin quizzes, loyalty tiers, cart logic, instalment checkout, store locators — features that live in the theme rather than in a stack of apps that slow the site down and fight each other.',
    'A large share of the catalogue is bilingual. Arabic–English with true right-to-left is not a translation layer; it is a mirrored build, and getting it right is one of the things this region quietly demands.'
  ],
  // Verifiable facts only.
  facts: [
    ['Built on', 'Shopify, end to end'],
    ['Markets', 'Egypt &amp; the Gulf'],
    ['Languages', 'Arabic &amp; English, full RTL'],
    ['Largest platform', 'Multi-brand build running Skechers, ANTA &amp; ECCO']
  ]
};
