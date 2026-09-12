/**
 * Documentation navigation structure.
 *
 * Each section contains ordered pages. The `slug` is the URL path
 * relative to /docs (e.g. slug "introduction" → /docs/introduction).
 * The `comingSoon` flag marks pages where the backend implementation
 * does not yet exist — content is shown but clearly labeled.
 */

export interface DocPageMeta {
  slug: string;
  title: string;
  comingSoon?: boolean;
}

export interface DocSection {
  label: string;
  pages: DocPageMeta[];
}

export const docSections: DocSection[] = [
  {
    label: 'Getting Started',
    pages: [
      { slug: 'introduction', title: 'Introduction' },
      { slug: 'quick-start', title: 'Quick Start' },
      { slug: 'authentication', title: 'Authentication' },
      { slug: 'environment-variables', title: 'Environment Variables' },
    ],
  },
  {
    label: 'Verification',
    pages: [
      { slug: 'verification-flow', title: 'Verification Flow' },
      { slug: 'hosted-ceremony', title: 'Hosted Ceremony' },
      { slug: 'redeeming-the-result', title: 'Redeeming the Result' },
      { slug: 'webhooks', title: 'Webhooks' },
    ],
  },
  {
    label: 'API Reference',
    pages: [
      { slug: 'api-challenge', title: 'POST /v1/challenge' },
      { slug: 'api-verify', title: 'POST /v1/verify' },
      { slug: 'api-widget-flows', title: 'POST /widget/flow' },
      { slug: 'api-ceremony-options', title: 'POST /widget/ceremony' },
      { slug: 'api-ceremony-complete', title: 'POST /widget/ceremony (alias)' },
      { slug: 'api-widget-redeem', title: 'POST /widget/redeem' },
    ],
  },
  {
    label: 'SDKs',
    pages: [
      { slug: 'node-sdk', title: 'Node.js SDK' },
      { slug: 'widget-sdk', title: 'Browser Widget SDK' },
    ],
  },
  {
    label: 'Security',
    pages: [
      { slug: 'security-model', title: 'Security Model' },
      { slug: 'api-keys', title: 'API Keys' },
      { slug: 'replay-protection', title: 'Replay Protection' },
      { slug: 'device-trust', title: 'Device Trust & Abuse Detection' },
      { slug: 'webhook-security', title: 'Webhook Security' },
    ],
  },
  {
    label: 'Resources',
    pages: [
      { slug: 'errors', title: 'Errors' },
      { slug: 'faq', title: 'FAQ' },
      { slug: 'changelog', title: 'Changelog' },
    ],
  },
];

/** Flatten all pages for prev/next navigation. */
export const allDocPages: DocPageMeta[] = docSections.flatMap((s) => s.pages);

/** Find the previous and next page for a given slug. */
export function getAdjacentPages(slug: string): {
  prev: DocPageMeta | null;
  next: DocPageMeta | null;
} {
  const idx = allDocPages.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? allDocPages[idx - 1] : null,
    next: idx >= 0 && idx < allDocPages.length - 1 ? allDocPages[idx + 1] : null,
  };
}

/** Default docs landing page. */
export const docsLandingSlug = 'introduction';
