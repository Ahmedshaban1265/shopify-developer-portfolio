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

  // Brand names are proper nouns: identical in both languages.
  marquee: [
    'Skechers', 'ANTA', 'ECCO', 'MyVi', 'Infinity Clinic Pharma',
    'Skinify', 'IMZA', 'Givago', 'Cole Haan', 'Fashion Retail Group'
  ],

  // Values only — labels are per-language. 25 = 8 featured + 17 further
  // distinct stores named in the PDF.
  stats: [
    { value: 50, suffix: '+' },
    { value: 25 },
    { text: 'AR/EN' },
    { value: 2 }
  ],

  /** Real mobile captures shown in the hero, in stacking order. */
  heroPhones: ['skinify', 'givago', 'myvi']
};
