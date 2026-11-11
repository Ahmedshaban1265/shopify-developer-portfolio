/**
 * Project structure — language-independent.
 *
 * Names, domains and URLs are proper nouns and identical in every language.
 * Everything a visitor reads about a project (category, summary, scope,
 * highlights, and the case-study fields) lives in content/i18n/{en,ar}.js
 * under `projects[slug]`, so a translator works in one file per language.
 *
 * Case-study fields left `null` in the i18n files are NOT known and must not
 * be invented. Fill them in and the case-study page renders them:
 *   challenge     — the commercial/technical problem the store had to solve
 *   contribution  — what the studio personally built (say who, and mark any
 *                   AI-assisted work)
 *   solution      — how it was implemented
 *   outcomes      — [{ value, label }] real measured results only
 *   stack         — ['Shopify Liquid', 'JavaScript', ...]
 */

export const featured = [
  { slug: 'skechers-egypt', img: 'skechers', name: 'Skechers', sector: 'sportswear', domain: 'frg.com.eg', url: 'https://frg.com.eg/pages/skechers-home' },
  { slug: 'anta-egypt', img: 'anta', name: 'ANTA', sector: 'sportswear', domain: 'frg.com.eg', url: 'https://frg.com.eg/pages/anta-home' },
  { slug: 'ecco-egypt', img: 'ecco', name: 'ECCO', sector: 'footwear', domain: 'eg.ecco.com', url: 'https://eg.ecco.com' },
  { slug: 'myvi', img: 'myvi', name: 'MyVi', sector: 'wellness', domain: 'myvistores.com', url: 'https://myvistores.com' },
  { slug: 'infinity-clinic-pharma', img: 'infinity', name: 'Infinity Clinic Pharma', sector: 'beauty', domain: 'infinityclinicpharma.com', url: 'https://infinityclinicpharma.com' },
  { slug: 'skinify', img: 'skinify', name: 'Skinify', sector: 'beauty', domain: 'uskinify.com', url: 'https://uskinify.com' },
  { slug: 'imza', img: 'imza', name: 'IMZA', sector: 'fashion', domain: 'imzaeg.com', url: 'https://imzaeg.com' },
  { slug: 'givago', img: 'givago', name: 'Givago', sector: 'beauty', domain: 'givago.com', url: 'https://givago.com' }
];

/** The wider portfolio. Category text is per-language, keyed by domain. */
export const wall = [
  { name: 'Infinity Clinic Pharma', domain: 'infinityclinicpharma.com', sector: 'beauty' },
  { name: 'MyVi', domain: 'myvistores.com', sector: 'wellness' },
  { name: 'Skinify', domain: 'uskinify.com', sector: 'beauty' },
  { name: 'FRG · Fashion Retail Group', domain: 'frg.com.eg', sector: 'sportswear' },
  { name: 'Cole Haan Egypt', domain: 'colehaan.com.eg', sector: 'footwear' },
  { name: 'El Tahan Homewear', domain: 'eltahanhomewear.com', sector: 'fashion' },
  { name: 'Voy Collections', domain: 'voycollections.com', sector: 'fashion' },
  { name: 'Roban', domain: 'robaneg.com', sector: 'fashion' },
  { name: 'Penduline KSA', domain: 'penduline-ksa.com', sector: 'beauty' },
  { name: 'Traumen', domain: 'traumendesign.com', sector: 'fashion' },
  { name: 'Snugglez', domain: 'snugglez.shop', sector: 'home' },
  { name: 'Ranch', domain: 'ranch.com.eg', sector: 'food' },
  { name: 'Anagen', domain: 'anagencare.com', sector: 'beauty' },
  { name: 'Fourteen Scarves', domain: 'fourteenscarves.com', sector: 'fashion' },
  { name: 'SQUARE', domain: 'squaretrends-eg.com', sector: 'home' },
  { name: 'Champs Land', domain: 'champsland.com', sector: 'sportswear' },
  { name: 'Alasdekaa', domain: 'alasdekaastore.com', sector: 'food' },
  { name: 'Murouj Art', domain: 'muroujart.com', sector: 'home' },
  { name: 'Luxuria', domain: 'luxuria-eg.com', sector: 'fashion' },
  { name: 'Be Cosmetics', domain: 'beyourself-club.com', sector: 'beauty' }
];

/**
 * Brands raised for inclusion but NOT yet verifiable. Deliberately absent from
 * the site until a live URL and scope are confirmed.
 */
export const awaitingContent = ['Retro Sport Egypt', 'Italiano', 'MAZY', 'Shopify Slice (custom theme project)'];
