/**
 * Site identity, contact details and global metadata.
 *
 * SOURCE OF TRUTH: every value here comes from the portfolio PDF
 * (Shopify_Ecommerce_Portfolio.pdf) or was stated directly by the owner.
 * Nothing in this file is inferred marketing copy about results or clients.
 *
 * ⚠ REVIEW BEFORE LAUNCH — see `name` and `whatsapp` notes below.
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
  // ⚠ The PDF does not state a name. Derived from the primary email address.
  //    Change this one value if the spelling differs.
  name: 'Abdulrahman Magdy',
  shortName: 'Abdulrahman',
  role: 'Shopify Developer',
  roleLong: 'Shopify developer & e-commerce engineer',
  regions: 'Egypt & GCC',
  year: 'MMXXVI',

  // Resolved per environment at build time — see resolveSiteUrl() below.
  url: resolveSiteUrl(),

  emails: ['Abdulramanmagdy@gmail.com', 'anmedshaban1265@gmail.com'],
  phones: [
    { display: '+20 102 013 9953', tel: '+201020139953', whatsapp: '201020139953' },
    { display: '010 9795 0983', tel: '+201097950983', whatsapp: null }
  ],

  meta: {
    title: 'Abdulrahman Magdy — Shopify Developer | Custom themes, Liquid & CRO',
    description:
      'Shopify developer building custom themes, Liquid sections, bilingual AR/EN storefronts and conversion-focused commerce for brands across Egypt and the Gulf. 50+ stores delivered.',
    keywords: [
      'Shopify developer',
      'Shopify theme development',
      'Shopify Liquid',
      'custom Shopify sections',
      'Shopify CRO',
      'RTL Shopify store',
      'Shopify developer Egypt'
    ]
  },

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/#services' },
    { label: 'Demos', href: '/#demos' },
    { label: 'Process', href: '/#process' },
    { label: 'About', href: '/#about' }
  ],

  // Announcement bar — all four claims are verifiable from the portfolio PDF.
  announcements: [
    '50+ Shopify stores delivered',
    'Egypt &amp; GCC · Shopify Markets',
    'AR / EN · Full RTL builds',
    'For new projects, redesigns &amp; consultations'
  ],

  // Marquee brands — every name is a store in the portfolio PDF.
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
  ]
};
