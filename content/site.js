/**
 * Language-independent site data: identity, contact details, flags.
 *
 * Everything a visitor reads lives in content/i18n/{en,ar}.js — this file
 * holds only what is the same in every language.
 *
 * SOURCE OF TRUTH: facts here come from the portfolio PDF or were stated
 * directly by the founders. No invented team members, results,
 * certifications or years of experience.
 */

/**
 * Canonical origin for the environment being built.
 *
 * Priority:
 *   1. SITE_URL             — set in Vercel (Production) to the public address
 *   2. production on Vercel → the project's stable production domain
 *   3. preview on Vercel    → that deployment's own URL
 *   4. local dev
 *
 * Canonical tags, hreflang, Open Graph and sitemap.xml all derive from this,
 * so a preview never advertises itself as the production site.
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

/** Only the production deployment may be indexed. */
export const isProduction = process.env.VERCEL_ENV === 'production';

export const site = {
  brand: 'VEQRU',
  /** Lowercase form used by the wordmark. The full stop is drawn, not typed. */
  brandMark: 'veqru',
  year: 'MMXXVI',
  url: resolveSiteUrl(),

  /**
   * Contact form switch — OFF until email delivery is configured.
   * Resend's free testing sender only delivers to the single address that
   * owns the Resend account; sending anywhere else needs a verified domain.
   * See LAUNCH.md for how to turn it on.
   */
  contactForm: false,

  // Both addresses stay reachable. Neither is replaced.
  emails: ['Abdulramanmagdy@gmail.com', 'anmedshaban1265@gmail.com'],
  phones: [
    { display: '+20 102 013 9953', tel: '+201020139953', whatsapp: '201020139953' },
    { display: '010 9795 0983', tel: '+201097950983', whatsapp: null }
  ],

  /**
   * Founders. Names are given in both scripts; role and bio are per-language
   * in content/i18n. ⚠ Arabic spellings should be confirmed by each founder.
   */
  founders: [
    { id: 'ahmed', name: { en: 'Ahmed Shaban', ar: 'أحمد شعبان' }, initials: 'AS', email: 'anmedshaban1265@gmail.com' },
    { id: 'abdulrahman', name: { en: 'Abdulrahman Magdy', ar: 'عبدالرحمن مجدي' }, initials: 'AM', email: 'Abdulramanmagdy@gmail.com' }
  ],

  // Original artwork, shared by both languages. See public/logos/README.md.
  // Width/height describe the transparent asset; CSS balances its visual size.
  marquee: [
    { slug: 'skechers', name: 'Skechers', width: 150, height: 15 },
    { slug: 'anta', name: 'ANTA', width: 544, height: 298 },
    { slug: 'ecco', name: 'ECCO', width: 110, height: 30 },
    { slug: 'myvi', name: 'MyVi', width: 527, height: 542 },
    { slug: 'infinity', name: 'Infinity Clinic Pharma', width: 518, height: 361 },
    { slug: 'skinify', name: 'Skinify', width: 611, height: 116 },
    { slug: 'imza', name: 'IMZA', width: 640, height: 189 },
    { slug: 'givago', name: 'Givago', width: 207, height: 114 },
    { slug: 'cole-haan', name: 'Cole Haan', width: 520, height: 124 },
    { slug: 'frg', name: 'Fashion Retail Group', width: 640, height: 237 }
  ],

  // Values only — labels are per-language. Egypt, GCC and USA are 3 markets.
  stats: [
    { value: 50, suffix: '+' },
    { text: 'AR/EN' },
    { value: 3 }
  ],

  /** Original VEQRU mascot, supplied at two sizes with transparent alpha. */
  heroIllustration: {
    src: '/images/veqru-developer-1100.webp',
    srcset: '/images/veqru-developer-640.webp 640w, /images/veqru-developer-1100.webp 1100w',
    width: 1100,
    height: 1100
  }
};
