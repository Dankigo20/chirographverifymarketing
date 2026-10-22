/**
 * Central site configuration.
 *
 * APP_URL points to the existing Chirograph Verify application on Railway.
 * All product links (dashboard, sign-in, developers) are derived from it.
 * Override at deploy time via Vite env: VITE_APP_URL
 */
export const siteConfig = {
  name: 'Chirograph Verify',
  shortName: 'Chirograph',
  domain: 'chirographverify.com',
  siteUrl: 'https://chirographverify.com',
  appUrl: (import.meta.env.VITE_APP_URL as string | undefined) ?? 'https://verify.chirographverify.com',
  description:
    'Bot-prevention API using WebAuthn passkeys. Server-verified, single-use, no CAPTCHA or SMS codes.',
  country: 'Egypt',
  emails: {
    hello: 'hello@chirographverify.com',
    support: 'support@chirographverify.com',
    admin: 'admin@chirographverify.com',
  },
  social: {
    x: {
      handle: '@chirograph_V',
      url: 'https://x.com/chirograph_V',
    },
  },
  nav: [
    { label: 'Product', href: '/#product' },
    { label: 'Security', href: '/security' },
    { label: 'Docs', href: '/docs' },
    { label: 'Pricing', href: '/pricing' },
  ],
} as const;

export const appLinks = {
  signIn: `${siteConfig.appUrl}/login`,
  dashboard: `${siteConfig.appUrl}/dashboard`,
  developers: `${siteConfig.appUrl}/developers`,
  getStarted: `${siteConfig.appUrl}/signup`,
} as const;
