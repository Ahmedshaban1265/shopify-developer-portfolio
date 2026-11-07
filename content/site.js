/**
 * Site identity, contact details and global metadata.
 *
 * SOURCE OF TRUTH: every value here comes from the portfolio PDF
 * (Shopify_Ecommerce_Portfolio.pdf) or was stated directly by the owner.
 * Nothing in this file is inferred marketing copy about results or clients.
 *
 * ⚠ REVIEW BEFORE LAUNCH — see `name` and `whatsapp` notes below.
 */

export const site = {
  // ⚠ The PDF does not state a name. Derived from the primary email address.
  //    Change this one value if the spelling differs.
  name: 'Abdulrahman Magdy',
  shortName: 'Abdulrahman',
  role: 'Shopify Developer',
  roleLong: 'Shopify developer & e-commerce engineer',
  regions: 'Egypt & GCC',
  year: 'MMXXVI',

  // Replace with the real production domain before launch.
  url: 'https://example.com',

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
