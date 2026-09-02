/**
 * Centralized pricing data for Chirograph Verify.
 *
 * All plan names, prices, verification allowances, features, CTAs,
 * and comparison-table values live here. Both the home page pricing
 * preview and the full pricing page import from this single source.
 *
 * Do NOT duplicate these values elsewhere.
 */

export interface PricingTier {
  name: string;
  price: string;
  unit: string;
  verifications: string;
  desc: string;
  features: string[];
  cta: string;
  featured: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    unit: '/ month',
    verifications: '1,000 verifications / month',
    desc: 'For developers testing Chirograph Verify, prototypes, personal projects, and small applications.',
    features: [
      '1,000 verifications/month',
      'WebAuthn verification',
      'Device trust score',
      'Single-use verification flows',
      'Server-side verification',
      'Hosted verification',
      'JavaScript widget SDK',
      'API access',
      'Basic usage information',
      'API-key management',
      '1 allowed widget origin',
    ],
    cta: 'Start building',
    featured: false,
  },
  {
    name: 'Developer',
    price: '$29',
    unit: '/ month',
    verifications: '10,000 verifications / month',
    desc: 'For production applications beginning to scale beyond development and testing.',
    features: [
      'Everything in Free, plus:',
      '10,000 verifications/month',
      'Webhooks',
      'Webhook configuration',
      'Up to 5 allowed widget origins',
      'Improved usage analytics',
      'Flagged-device visibility',
      'Standard support',
    ],
    cta: 'Start building',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$99',
    unit: '/ month',
    verifications: '50,000 verifications / month',
    desc: 'For growing SaaS platforms, Web3 applications, communities, marketplaces, and services dealing with increasing automated abuse.',
    features: [
      'Everything in Developer, plus:',
      '50,000 verifications/month',
      'Up to 25 allowed widget origins',
      'Advanced usage analytics',
      'Advanced flagged-device visibility',
      'Higher usage capacity',
      'Priority support',
    ],
    cta: 'Start building',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$299',
    unit: '/ month',
    verifications: '250,000 verifications / month',
    desc: 'For high-volume platforms and services requiring substantial verification capacity.',
    features: [
      'Everything in Growth, plus:',
      '250,000 verifications/month',
      'Up to 100 allowed widget origins',
      'Higher API/rate capacity',
      'Advanced operational controls',
      'Priority support',
      'Integration assistance',
    ],
    cta: 'Start building',
    featured: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: '',
    verifications: 'Custom verification volume',
    desc: 'For organizations requiring higher scale, custom operational requirements, and dedicated support.',
    features: [
      'Everything in Scale, plus configurable:',
      'Custom verification volume',
      'Custom allowed origins',
      'Custom rate limits',
      'Dedicated support',
      'SLA options',
      'Custom security requirements',
      'Enterprise integration assistance',
      'Custom commercial terms',
    ],
    cta: 'Contact us',
    featured: false,
  },
];

/**
 * Feature comparison table rows.
 * Each row maps a feature label to per-plan values (string | boolean).
 * `true` = checkmark, `false` = dash, string = display as-is.
 */
export interface ComparisonRow {
  label: string;
  values: (string | boolean)[];
}

export const comparisonRows: ComparisonRow[] = [
  { label: 'WebAuthn verification', values: [true, true, true, true, true] },
  { label: 'Device trust score', values: [true, true, true, true, true] },
  { label: 'Single-use verification', values: [true, true, true, true, true] },
  { label: 'Server-side verification', values: [true, true, true, true, true] },
  { label: 'Hosted verification', values: [true, true, true, true, true] },
  { label: 'Widget SDK', values: [true, true, true, true, true] },
  { label: 'API access', values: [true, true, true, true, true] },
  { label: 'Verifications', values: ['1,000/mo', '10,000/mo', '50,000/mo', '250,000/mo', 'Custom'] },
  { label: 'Webhooks', values: [false, true, true, true, true] },
  { label: 'Allowed origins', values: ['1', '5', '25', '100', 'Custom'] },
  { label: 'Usage analytics', values: ['Basic', 'Standard', 'Advanced', 'Advanced', 'Advanced'] },
  { label: 'Flagged-device visibility', values: ['Basic', true, 'Advanced', 'Advanced', 'Advanced'] },
  { label: 'API-key management', values: [true, true, true, true, true] },
  { label: 'Support', values: ['Basic', 'Standard', 'Priority', 'Priority', 'Dedicated'] },
  { label: 'Custom rate limits', values: [false, false, false, false, true] },
  { label: 'SLA options', values: [false, false, false, false, true] },
  { label: 'Custom security requirements', values: [false, false, false, false, true] },
  { label: 'Integration assistance', values: [false, false, false, true, true] },
];
