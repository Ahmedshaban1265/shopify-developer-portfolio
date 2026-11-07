/**
 * Brand identity, contact details and global metadata.
 *
 * SOURCE OF TRUTH: facts here come from the portfolio PDF
 * (Shopify_Ecommerce_Portfolio.pdf) or were stated directly by the founders.
 * No invented team members, results, certifications or years of experience.
 *
 * ⚠ PENDING BEFORE PUBLIC LAUNCH — see `url` and the brand-clearance note
 *   in README.md. veqru.com is unregistered as of 7 Nov 2026.
 */

/**
 * Canonical origin for the environment being built.
 *
 * Priority:
 *   1. SITE_URL            — set this once a custom domain exists
 *   2. production on Vercel → the project's stable production domain
 *   3. preview on Vercel    → that deployment's own URL
 *   4. local dev
 *
 * Canonical tags, Open Graph URLs and sitemap.xml all derive from this, so a
 * preview never advertises itself as the production site.
 */
function resolveSiteUrl() {
  const env = process.env;
  if (env.SITE_URL) return env.SITE_URL.replace(/\/$/, '');
  if (env.VERCEL_ENV === 'production' && env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return 'http://localhost:4173';
}

/** True for anything that is not the production deployment. */
export const isProduction = process.env.VERCEL_ENV === 'production';

export const site = {
  brand: 'VEQRU',
  /** How the brand is written in running text and in the wordmark. */
  brandMark: 'veqru',
  positioning: 'Digital Commerce Studio',
  tagline: 'We Build Commerce That Performs.',
  regions: 'Egypt & GCC',
  year: 'MMXXVI',

  // Resolved per environment at build time — see resolveSiteUrl() above.
  // Set SITE_URL once veqru.com (or the final domain) is registered.
  url: resolveSiteUrl(),

  founders: [
    {
      name: 'Ahmed Shaban',
      initials: 'AS',
      role: 'Co-founder · Shopify development',
      email: 'anmedshaban1265@gmail.com',
      bio: 'Builds the storefronts — custom themes, Liquid sections, cart and checkout logic, and the integrations that keep a store running day to day.'
    },
    {
      name: 'Abdulrahman Magdy',
      initials: 'AM',
      role: 'Co-founder · Commerce design & CRO',
      email: 'Abdulramanmagdy@gmail.com',
      bio: 'Shapes how a store reads and sells — storefront design, merchandising structure, bilingual AR/EN experiences and conversion work after launch.'
    }
  ],

  // Both addresses stay reachable. Neither is replaced.
  emails: ['Abdulramanmagdy@gmail.com', 'anmedshaban1265@gmail.com'],
  phones: [
    { display: '+20 102 013 9953', tel: '+201020139953', whatsapp: '201020139953' },
    { display: '010 9795 0983', tel: '+201097950983', whatsapp: null }
  ],

  meta: {
    title: 'VEQRU — Digital Commerce Studio | Shopify development & CRO',
    description:
      'VEQRU is a digital commerce studio building custom Shopify storefronts, Liquid sections, bilingual AR/EN experiences and conversion-focused commerce for brands across Egypt and the Gulf. 50+ stores delivered.',
    keywords: [
      'Shopify development agency',
      'Shopify theme development',
      'custom Shopify solutions',
      'Shopify development',
      'e-commerce development',
      'Shopify Liquid',
      'conversion rate optimisation',
      'RTL Shopify store',
      'Shopify developer Egypt'
    ]
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Solutions', href: '/#services' },
    { label: 'Shopify Lab', href: '/#demos' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/#about' }
  ],

  announcements: [
    '50+ Shopify stores delivered',
    'Egypt &amp; GCC · Shopify Markets',
    'AR / EN · Full RTL builds',
    'For new projects, redesigns &amp; consultations'
  ],

  marquee: [
    'Skechers', 'ANTA', 'ECCO', 'MyVi', 'Infinity Clinic Pharma',
    'Skinify', 'IMZA', 'Givago', 'Cole Haan', 'Fashion Retail Group'
  ],

  stats: [
    { value: 50, suffix: '+', label: 'Shopify projects delivered' },
    // 8 featured case studies + 17 further distinct stores = 25 named in the PDF.
    { value: 25, suffix: '', label: 'Named stores in this portfolio' },
    { text: 'AR/EN', label: 'Bilingual &amp; full RTL builds' },
    { value: 2, suffix: '', label: 'Regions · Egypt &amp; GCC' }
  ],

  /** Why work with us — each point is demonstrable from the work shown. */
  why: [
    {
      n: '01',
      title: 'We build features, not app stacks',
      body: 'Bundle builders, quizzes, loyalty tiers and cart logic live in the theme. Fewer apps fighting each other, and a store that stays fast.'
    },
    {
      n: '02',
      title: 'We have shipped at brand-flagship scale',
      body: 'Official storefronts for Skechers, ANTA and ECCO run on one multi-brand build alongside a nationwide retail network of 38 stores.'
    },
    {
      n: '03',
      title: 'We build for how this region actually buys',
      body: 'True right-to-left Arabic, Shopify Markets, multi-currency, and instalment checkout with ValU, Meeza and Forsa.'
    }
  ]
};
