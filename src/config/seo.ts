/**
 * Central SEO metadata for the public marketing site.
 *
 * Keeping these values in one place lets both the client-side `useSeo` hook
 * and the build-time prerenderer use the same titles and descriptions.
 */
export interface SeoMetaValues {
  title: string;
  description: string;
  path: string;
}

export const seo: Record<string, SeoMetaValues> = {
  home: {
    title: 'Chirograph Verify — WebAuthn Bot-Prevention API',
    description:
      'Prevent automated abuse with server-verified WebAuthn passkey challenges. Single-use, origin-bound verification for developers. No CAPTCHA or SMS codes.',
    path: '/',
  },
  security: {
    title: 'Security Architecture — Chirograph Verify',
    description:
      'How Chirograph Verify secures WebAuthn verification with server-side validation, single-use challenges, tenant isolation, signed webhooks, and opaque results.',
    path: '/security',
  },
  developers: {
    title: 'Developer Documentation — Chirograph Verify',
    description:
      'Integrate the Chirograph Verify WebAuthn bot-prevention API with quick start guides, endpoint reference, widget SDK examples, and webhook verification.',
    path: '/developers',
  },
  pricing: {
    title: 'Pricing — Chirograph Verify',
    description:
      'Usage-based pricing for WebAuthn verification. Start free, then scale from 1,000 to 250,000+ verifications per month.',
    path: '/pricing',
  },
  terms: {
    title: 'Terms of Use — Chirograph Verify',
    description:
      'Terms governing use of the Chirograph Verify API, widget SDK, hosted verification flows, and developer tools.',
    path: '/terms',
  },
  privacy: {
    title: 'Privacy Policy — Chirograph Verify',
    description:
      'How Chirograph Verify handles account, API, WebAuthn, device fingerprint, verification, and abuse-detection data.',
    path: '/privacy',
  },
  cookies: {
    title: 'Cookie Policy — Chirograph Verify',
    description:
      'Cookie and similar technology practices for the Chirograph Verify website and application.',
    path: '/cookies',
  },
};

export function docsSeo(slug: string, pageTitle: string): SeoMetaValues {
  return {
    title: `${pageTitle} — Chirograph Verify Docs`,
    description: `${pageTitle} in the Chirograph Verify developer documentation for the WebAuthn bot-prevention API.`,
    path: `/docs/${slug}`,
  };
}
