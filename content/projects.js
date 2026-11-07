/**
 * Project content.
 *
 * Every field below is taken verbatim-in-substance from the portfolio PDF.
 *
 * Fields intentionally left `null` are NOT known and must not be invented.
 * Fill them in and the case-study template will render them automatically:
 *   challenge     — the commercial/technical problem the store had to solve
 *   contribution  — what you personally built, in the first person
 *   solution      — how it was implemented (Liquid, sections, apps, APIs)
 *   outcomes      — [{ value, label }] real measured results only
 *   stack         — ['Shopify Liquid', 'JavaScript', ...] technologies used
 */

export const featured = [
  {
    slug: 'skechers-egypt',
    img: 'skechers',
    name: 'Skechers Egypt',
    category: 'Official brand store · Footwear &amp; sportswear',
    sector: 'sportswear',
    domain: 'frg.store',
    url: 'https://frg.store',
    summary:
      "The official Skechers destination for Egypt, built on Shopify for Fashion Retail Group — the brand's exclusive distributor — and wired into a nationwide network of official stores.",
    scope: ['Store design', 'Custom theme', 'Campaign merchandising', 'Bilingual EN/AR', 'Store locator'],
    highlights: [
      ['Brand-official experience', 'Campaign heroes, video content and seasonal sale collections presented to global brand standards.'],
      ['Deep catalogue architecture', 'Men, women and kids across footwear, apparel and accessories — walking, running, lifestyle and more.'],
      ['Retail-connected', 'An online storefront working alongside 38 physical stores, with locator and unified promotions.']
    ],
    challenge: null,
    contribution: null,
    solution: null,
    outcomes: null,
    stack: null
  },
  {
    slug: 'anta-egypt',
    img: 'anta',
    name: 'ANTA Egypt',
    category: 'Official brand store · Performance sportswear',
    sector: 'sportswear',
    domain: 'frg.store',
    url: 'https://frg.store',
    summary:
      'The official ANTA storefront for Egypt — a performance-led brand shop with video-driven campaigns and a collection structure spanning performance, lifestyle and global collaborations.',
    scope: ['Brand storefront design', 'Video hero sections', 'Collection architecture', 'Seasonal campaigns'],
    previewNote:
      'Homepage from the ANTA brand storefront; product page and cart drawer captured live from the shared Fashion Retail Group platform.',
    highlights: [
      ['Campaign-led homepage', '“Keep Moving” brand campaigns with full-width video heroes and seasonal sale takeovers.'],
      ['Performance segmentation', 'Dedicated journeys for performance, lifestyle and collaboration lines.'],
      ['Unified brand platform', 'Runs alongside Skechers and ECCO on one multi-brand Shopify build.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'ecco-egypt',
    img: 'ecco',
    name: 'ECCO Egypt',
    category: 'Official brand store · Premium footwear',
    sector: 'footwear',
    domain: 'frg.store',
    url: 'https://frg.store',
    summary:
      "ECCO's official Egyptian storefront — a premium, minimal presentation for a heritage Scandinavian footwear brand, with formal, casual and outdoor lines merchandised for the local market.",
    scope: ['Premium storefront design', 'Category merchandising', 'Sale campaign systems', 'EN/AR'],
    highlights: [
      ['Premium restraint', 'A clean monochrome presentation that lets craft-led product photography lead.'],
      ['Occasion-based navigation', 'Formal, casual, outdoor and walking journeys mapped to how customers actually shop.'],
      ['Authenticity positioning', 'Exclusive-distributor messaging and official-store trust signals throughout.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'myvi',
    img: 'myvi',
    name: 'MyVi',
    category: 'Gummy vitamins &amp; wellness',
    sector: 'wellness',
    domain: 'myvistores.com',
    url: 'https://myvistores.com',
    summary:
      'A playful, benefit-led vitamin brand where the store itself does the guiding — customers shop by goal, take a personalised vitamin quiz, and build their own bundles with rewards applied automatically.',
    scope: ['Store design', 'Vitamin quiz', 'Bundle builder', 'Auto promotions', 'Benefit-based navigation'],
    highlights: [
      ['Guided selling', 'A vitamin quiz that turns browsing into a personalised routine recommendation.'],
      ['Make-your-own bundles', 'Custom bundle flows with buy-2-get-1 logic applied automatically at cart.'],
      ['Benefit-first catalogue', 'Immunity, beauty, bones, sleep and energy as the primary shopping axis.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'infinity-clinic-pharma',
    img: 'infinity',
    name: 'Infinity Clinic Pharma',
    category: 'Dermo-cosmetics · Bilingual AR / EN',
    sector: 'beauty',
    domain: 'infinityclinicpharma.com',
    url: 'https://infinityclinicpharma.com',
    summary:
      'A bilingual, fully right-to-left dermo-cosmetics platform organising six product lines around skin concerns — with a routine quiz, promotional bundles and a tiered loyalty programme built in.',
    scope: ['Bilingual AR/EN', 'Full RTL', 'Loyalty programme', 'Skincare quiz', 'Bundles &amp; promo packs'],
    highlights: [
      ['True RTL commerce', 'A mirrored Arabic-first experience, not a translated afterthought.'],
      ['Six-line architecture', 'Distinct sub-brand worlds unified under one coherent store system.'],
      ['Retention engineered', 'Tiered loyalty, promo packs and compare tools that bring customers back.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'skinify',
    img: 'skinify',
    name: 'Skinify',
    category: 'Ingredient-led clinical skincare',
    sector: 'beauty',
    domain: 'uskinify.com',
    url: 'https://uskinify.com',
    summary:
      'A clinical, transparency-first skincare store in the ingredient-led tradition — active concentrations on every label, shop-by-ingredient navigation, and a routine builder that composes full regimens.',
    scope: ['Store design', 'Routine builder', 'Before/after modules', 'Skin assessment', 'Cart cross-sell'],
    highlights: [
      ['Ingredient navigation', 'Retinol, niacinamide, acids and more treated as first-class ways to shop.'],
      ['Routine building', 'A guided flow assembling cleanser-to-SPF regimens by skin goal.'],
      ['Proof on the page', 'Before/after sliders and assessment content that build clinical trust.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'imza',
    img: 'imza',
    name: 'IMZA',
    category: 'Premium Turkish menswear',
    sector: 'fashion',
    domain: 'imzaeg.com',
    url: 'https://imzaeg.com',
    summary:
      'A refined menswear house bringing premium Turkish tailoring to Egypt — suits, blazers, knitwear and formal shoes presented with quiet luxury, backed by warranty, alteration and in-store pickup services.',
    scope: ['Store design', 'Service-led merchandising', 'Local pickup', 'ValU / Meeza / Forsa payments'],
    highlights: [
      ['Tailoring-grade presentation', 'Editorial collection storytelling worthy of the garments.'],
      ['Service as a feature', 'One-year warranty, complimentary alteration and pickup woven into the journey.'],
      ['Instalment-ready checkout', 'ValU, Meeza and Forsa integrated for high-ticket purchases.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  },
  {
    slug: 'givago',
    img: 'givago',
    name: 'Givago',
    category: 'Luxury French perfumes · KSA',
    sector: 'beauty',
    domain: 'givago.com',
    url: 'https://givago.com',
    summary:
      'A Saudi luxury perfume house with French-made fragrances — a bilingual, multi-currency boutique spanning niche perfumes, home fragrance, refills and travel sets, connected to physical branches.',
    scope: ['Luxury storefront design', 'AR/EN', 'Multi-currency SAR/EUR/USD/GBP', 'Branch pages'],
    highlights: [
      ['Fragrance-house aesthetic', 'A dark, atmospheric presentation matching the maison positioning.'],
      ['Global-ready selling', 'Four currencies and bilingual content for regional and international clients.'],
      ['Beyond the bottle', 'Home fragrance, refills, boxes and travel sets as complete gifting journeys.']
    ],
    challenge: null, contribution: null, solution: null, outcomes: null, stack: null
  }
];

/** The wider portfolio — name, sector and domain only, exactly as listed in the PDF. */
export const wall = [
  ['Infinity Clinic Pharma', 'Dermo-cosmetics · AR/EN', 'infinityclinicpharma.com', 'beauty'],
  ['MyVi', 'Gummy vitamins &amp; wellness', 'myvistores.com', 'wellness'],
  ['Skinify', 'Clinical skincare', 'uskinify.com', 'beauty'],
  ['FRG · Fashion Retail Group', 'Multi-brand sportswear platform', 'frg.store', 'sportswear'],
  ['Cole Haan Egypt', 'Official footwear brand store', 'colehaan.com.eg', 'footwear'],
  ['El Tahan Homewear', 'Heritage cotton homewear · RTL', 'eltahanhomewear.com', 'fashion'],
  ['Voy Collections', 'Menswear &amp; resortwear', 'voycollections.com', 'fashion'],
  ['Roban', 'Egyptian cotton menswear', 'robaneg.com', 'fashion'],
  ['Penduline KSA', "Kids' hair &amp; baby care · KSA", 'penduline-ksa.com', 'beauty'],
  ['Traumen', 'Womenswear · 7 GCC markets', 'traumendesign.com', 'fashion'],
  ['Snugglez', 'Baby sleep essentials', 'snugglez.shop', 'home'],
  ['Ranch', 'Premium turkey foods', 'ranch.com.eg', 'food'],
  ['Anagen', 'Anti-hair-loss care', 'anagencare.com', 'beauty'],
  ['Fourteen Scarves', 'Modest fashion · RTL', 'fourteenscarves.com', 'fashion'],
  ['SQUARE', 'Artist-designed beach towels', 'squaretrends-eg.com', 'home'],
  ['Champs Land', 'Sportswear &amp; teamwear', 'champsland.com', 'sportswear'],
  ['Alasdekaa', 'Dairies &amp; fresh grocery', 'alasdekaastore.com', 'food'],
  ['Murouj Art', 'Outdoor stone decor · RTL', 'muroujart.com', 'home'],
  ['Luxuria', "Premium men's fashion", 'luxuria-eg.com', 'fashion'],
  ['Be Cosmetics', 'Lip &amp; beauty cosmetics', 'beyourself-club.com', 'beauty']
];

/**
 * Brands raised for inclusion but NOT yet verifiable.
 * They are deliberately absent from the site. Add an entry to `featured`
 * or `wall` once the live URL and scope are confirmed.
 */
export const awaitingContent = [
  'Retro Sport Egypt',
  'Italiano',
  'MAZY',
  'Shopify Slice (custom theme project)'
];
