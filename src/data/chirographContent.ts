/**
 * Account-entry destinations.
 *
 * The customer-facing application (sign in, sign up and dashboard) is served
 * from verify.chirographverify.com. app.chirographverify.com remains the API
 * and widget origin (see the /v1/* examples and widget.js below) — it is not a
 * place to send visitors who want to reach their account.
 */
export const APP_URLS = {
  signIn: 'https://verify.chirographverify.com/login',
  getStarted: 'https://verify.chirographverify.com/login',
  dashboard: 'https://verify.chirographverify.com/login',
  developers: 'https://app.chirographverify.com/developers',
  x: 'https://x.com/chirograph_V',
};

export const SITE_EMAILS = {
  hello: 'hello@chirographverify.com',
  support: 'support@chirographverify.com',
  admin: 'admin@chirographverify.com',
};

export interface ProblemCard {
  title: string;
  description: string;
}

export interface ApproachStep {
  step: string;
  title: string;
  description: string;
}

export interface FlowStep {
  step: string;
  actor: 'client' | 'server';
  title: string;
  subtitle: string;
}

export interface KeyFeature {
  id: string;
  title: string;
  description: string;
}

export interface QuickStartTab {
  id: 'challenge' | 'widget' | 'redeem' | 'webhook';
  label: string;
  filename: string;
  language: string;
  code: string;
}

export interface UseCaseCard {
  id: string;
  title: string;
  description: string;
}

export interface SecurityLayer {
  layer: string;
  title: string;
  subtitle: string;
}

export interface SecurityPrinciple {
  title: string;
  description: string;
}

export interface SecurityDeepDiveCard {
  title: string;
  description: string;
  points: string[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  volume: string;
  description: string;
  cta: string;
  href: string;
  popular?: boolean;
}

export interface PricingFeatureRow {
  label: string;
  values: (boolean | string)[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const PROBLEM_CARDS: ProblemCard[] = [
  {
    title: 'Automated account creation',
    description: 'Bots sign up at scale, flooding your platform with fake users and synthetic activity.',
  },
  {
    title: 'CAPTCHA friction',
    description: 'Image puzzles annoy real users, are increasingly solvable by bots, and kill conversion.',
  },
  {
    title: 'SMS verification abuse',
    description: 'Phone-based OTPs are expensive, interceptable, and trivially bypassed with disposable numbers.',
  },
  {
    title: 'Password-based identity',
    description: 'Passwords are reused, phished, and leaked. They prove possession of a secret, not personhood.',
  },
  {
    title: 'Disposable accounts',
    description: 'Throwaway identities let bad actors evade bans, rate limits, and community moderation.',
  },
  {
    title: 'Community raids',
    description: 'Coordinated automated attacks overwhelm Discord servers, marketplaces, and launches.',
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    step: '1',
    title: 'Device',
    description: 'The user starts verification from your application on their device.',
  },
  {
    step: '2',
    title: 'WebAuthn',
    description: 'The device performs a WebAuthn ceremony — a passkey or biometric — creating a signed cryptographic assertion.',
  },
  {
    step: '3',
    title: 'Chirograph',
    description: 'The Chirograph server verifies the assertion against the single-use challenge it issued.',
  },
  {
    step: '4',
    title: 'Verified result',
    description: 'Your backend receives an opaque, single-use verification result it can redeem.',
  },
];

export const HOW_IT_WORKS_STEPS: FlowStep[] = [
  {
    step: '1',
    actor: 'client',
    title: 'User starts verification',
    subtitle: 'From your website or app',
  },
  {
    step: '2',
    actor: 'server',
    title: 'Chirograph creates a single-use flow',
    subtitle: 'Server issues a one-time challenge',
  },
  {
    step: '3',
    actor: 'client',
    title: 'User verifies with their device',
    subtitle: 'WebAuthn / passkey ceremony',
  },
  {
    step: '4',
    actor: 'server',
    title: 'Chirograph verifies the assertion',
    subtitle: 'Cryptographic validation server-side',
  },
  {
    step: '5',
    actor: 'server',
    title: 'Your backend receives the result',
    subtitle: 'Redeem the opaque verification token',
  },
];

export const KEY_FEATURES: KeyFeature[] = [
  {
    id: 'webauthn',
    title: 'WebAuthn verification',
    description: 'Device-level authentication using passkeys and platform authenticators — no shared secrets, nothing to phish.',
  },
  {
    id: 'single-use',
    title: 'Single-use challenges',
    description: 'Every verification flow issues a one-time challenge that cannot be replayed or reused.',
  },
  {
    id: 'server-side',
    title: 'Server-side verification',
    description: 'Cryptographic assertions are verified on the Chirograph server — never trusted to the browser.',
  },
  {
    id: 'tenant-isolation',
    title: 'Tenant isolation',
    description: 'Each tenant gets isolated API keys, widget keys and verification state — no cross-tenant leakage.',
  },
  {
    id: 'trust-score',
    title: 'Verification trust score',
    description: 'Each result includes a trust and device score so you can apply risk-based decisions.',
  },
  {
    id: 'webhooks',
    title: 'Signed webhook events',
    description: 'Verification results are delivered to your backend via cryptographically signed webhooks.',
  },
  {
    id: 'api',
    title: 'API integration',
    description: 'Simple challenge-and-verify endpoints plus a redirect-based widget SDK for the browser.',
  },
  {
    id: 'widget',
    title: 'Redirect-based widget',
    description: 'A lightweight JavaScript SDK that redirects to a hosted ceremony and returns to your app.',
  },
];

export const QUICK_START_TABS: QuickStartTab[] = [
  {
    id: 'challenge',
    label: 'Challenge',
    filename: 'challenge.ts',
    language: 'ts',
    code: `// 1. Create a verification challenge (server-side)
const res = await fetch('https://app.chirographverify.com/v1/challenge', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tenant: 'acme',
    redirect_url: 'https://yourapp.com/verified',
  }),
});

const { flow_id, redirect_url } = await res.json();
// flow_id is single-use. Redirect the user to redirect_url.`,
  },
  {
    id: 'widget',
    label: 'Widget',
    filename: 'widget.html',
    language: 'html',
    code: `<!-- 2. Trigger the widget from your frontend -->
<script src="https://app.chirographverify.com/widget.js"></script>
<button onclick="startVerification()">Verify you're human</button>
<script>
  function startVerification() {
    Chirograph.verify({
      publishableKey: 'a1b2c3d4... (64 hex chars)',
      flowId: flowIdFromYourBackend,
      // user is redirected to the hosted
      // WebAuthn ceremony, then back here
    });
  }
</script>`,
  },
  {
    id: 'redeem',
    label: 'Redeem',
    filename: 'redeem.ts',
    language: 'ts',
    code: `// 3. Redeem the result on your backend (server-side)
const res = await fetch('https://app.chirographverify.com/widget/redeem', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    flow_id: flowId,
    result_token: resultTokenFromRedirect,
  }),
});

const { verified, trust_score, device } = await res.json();
// verified === true  → a valid passkey assertion was verified
// trust_score        → risk-based confidence signal`,
  },
  {
    id: 'webhook',
    label: 'Webhook',
    filename: 'webhook.ts',
    language: 'ts',
    code: `// 4. Receive signed webhook events
import crypto from 'crypto';

export async function POST(req) {
  const signature = req.headers.get('X-Chirograph-Signature');
  const body = await req.text();

  // Verify the webhook signature
  const expected = crypto
    .createHmac('sha256', process.env.CHIROGRAPH_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (!crypto.timingSafeEqual(
    Buffer.from(signature), Buffer.from(expected)
  )) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type === 'verification.succeeded') {
    // Mark user as verified in your database
    await markVerified(event.data.flow_id);
  }
}`,
  },
];

export const USE_CASES: UseCaseCard[] = [
  {
    id: 'web3',
    title: 'Web3 applications',
    description: 'Gate token claims, presale access, and airdrops without KYC friction.',
  },
  {
    id: 'discord',
    title: 'Discord & communities',
    description: 'Raise the cost of automated signups and mass account creation in community apps.',
  },
  {
    id: 'saas',
    title: 'SaaS platforms',
    description: 'Block automated signups and trial abuse. Let real users in instantly with passkeys instead of email loops.',
  },
  {
    id: 'marketplaces',
    title: 'Marketplaces',
    description: 'Verify buyers and sellers at onboarding. Reduce fake listings, review manipulation, and fraudulent accounts.',
  },
  {
    id: 'communities',
    title: 'Online communities',
    description: 'Protect forums and social platforms from mass account creation and coordinated inauthentic behavior.',
  },
  {
    id: 'anti-abuse',
    title: 'Anti-abuse systems',
    description: 'Layer Chirograph into your existing abuse pipeline as a strong, low-friction passkey signal.',
  },
];

export const SECURITY_LAYERS: SecurityLayer[] = [
  {
    layer: 'Layer 1',
    title: 'Browser / Device',
    subtitle: 'User initiates verification',
  },
  {
    layer: 'Layer 2',
    title: 'WebAuthn Ceremony',
    subtitle: 'Device creates cryptographic assertion',
  },
  {
    layer: 'Layer 3',
    title: 'Chirograph Server',
    subtitle: 'Verifies assertion server-side',
  },
  {
    layer: 'Layer 4',
    title: 'Opaque Result',
    subtitle: 'Single-use, tenant-scoped token',
  },
  {
    layer: 'Layer 5',
    title: 'Tenant Backend',
    subtitle: 'Redeems verification result',
  },
  {
    layer: 'Layer 6',
    title: 'Verified',
    subtitle: 'User confirmed as real',
  },
];

export const SECURITY_PRINCIPLES: SecurityPrinciple[] = [
  {
    title: 'WebAuthn foundation',
    description: 'Verification is rooted in public-key cryptography. Private keys never leave the device.',
  },
  {
    title: 'Server-side verification',
    description: 'The browser never decides verification. Assertions are validated on the Chirograph server.',
  },
  {
    title: 'Single-use flows',
    description: 'Each challenge is one-time. Redis-backed temporary state prevents replay attacks.',
  },
  {
    title: 'Tenant isolation',
    description: 'Separate API keys, widget origins, and verification state per tenant.',
  },
  {
    title: 'Signed webhooks',
    description: 'Every event is HMAC-signed. Your backend verifies the signature before trusting it.',
  },
  {
    title: 'Opaque results',
    description: 'Verification results are opaque tokens redeemed server-side — not browser claims.',
  },
];

export const SECURITY_DEEP_DIVE: SecurityDeepDiveCard[] = [
  {
    title: 'WebAuthn foundation',
    description:
      'Verification is rooted in the WebAuthn standard. Each user device holds a private key that never leaves the authenticator. During the ceremony, the device signs a challenge; the signature is verified against the corresponding public key on the server. There is no shared secret to phish, leak, or reuse.',
    points: [
      'Public-key cryptography — no shared secrets',
      'Private keys never leave the device',
      'Resistant to phishing via origin binding',
    ],
  },
  {
    title: 'Server-side verification',
    description:
      'The browser never decides whether a user is verified. The WebAuthn assertion is sent to the Chirograph server, which validates the signature, challenge, origin, and authenticator data. Only the server can issue a verified result — a client-side claim is never trusted.',
    points: [
      'Assertion validated server-side',
      'Origin and RP ID checked',
      'Client claims are never trusted',
    ],
  },
  {
    title: 'Single-use challenges',
    description:
      'Every verification flow begins with a one-time challenge. Once a challenge is consumed, it cannot be replayed. Redis-backed temporary state ensures challenges expire and are invalidated after use, preventing replay and fixation attacks.',
    points: [
      'One-time challenges — no replay',
      'Redis-backed temporary state',
      'Automatic expiration',
    ],
  },
  {
    title: 'Tenant isolation',
    description:
      "Each tenant operates in isolation with its own API keys, publishable widget keys, and verification state. Widget allowed-origin configuration restricts where a tenant's verification flows can be initiated, preventing cross-tenant abuse.",
    points: [
      'Separate secret and publishable keys per tenant',
      'Widget origin allowlisting',
      'No cross-tenant data leakage',
    ],
  },
  {
    title: 'Webhook security',
    description:
      'Outbound webhooks are signed using HMAC. Your backend must verify the signature before trusting any event payload. This prevents forged webhook deliveries and ensures verification events are authentic.',
    points: [
      'HMAC-signed webhook payloads',
      'Signature verification on your backend',
      'Tamper-evident event delivery',
    ],
  },
  {
    title: 'Opaque verification results',
    description:
      'Verification results are opaque tokens. They are not interpretable by the browser and must be redeemed by your backend via the API. This prevents a user from fabricating or modifying a verification outcome client-side.',
    points: [
      'Opaque, single-use result tokens',
      'Redeemed server-side only',
      'Cannot be forged by the browser',
    ],
  },
  {
    title: 'Rate limiting',
    description:
      'API endpoints enforce rate limiting to prevent abuse, brute-force, and automated flooding. Limits apply at the request and flow level to protect both the API and the hosted ceremony.',
    points: [
      'Request-level rate limiting',
      'Flow-level abuse prevention',
      'Protects API and ceremony',
    ],
  },
  {
    title: 'PostgreSQL + Redis',
    description:
      'PostgreSQL provides durable persistence for tenants, API keys, and verification records. Redis provides fast, ephemeral state for single-use challenges and ceremony sessions — each used for what it does best.',
    points: [
      'PostgreSQL for durable records',
      'Redis for ephemeral challenge state',
      'Clear separation of concerns',
    ],
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/ month',
    volume: '1,000 verifications / month',
    description: 'For developers testing Chirograph Verify, prototypes, personal projects, and small applications.',
    cta: 'Start building',
    href: APP_URLS.getStarted,
  },
  {
    id: 'developer',
    name: 'Developer',
    price: '$29',
    period: '/ month',
    volume: '10,000 verifications / month',
    description: 'For production applications beginning to scale beyond development and testing.',
    cta: 'Start building',
    href: APP_URLS.getStarted,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$99',
    period: '/ month',
    volume: '50,000 verifications / month',
    description: 'For growing SaaS platforms, Web3 applications, communities, marketplaces, and services dealing with increasing automated abuse.',
    cta: 'Start building',
    href: APP_URLS.getStarted,
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$299',
    period: '/ month',
    volume: '250,000 verifications / month',
    description: 'For high-volume platforms and services requiring substantial verification capacity.',
    cta: 'Start building',
    href: APP_URLS.getStarted,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    volume: 'Custom verification volume',
    description: 'For organizations requiring higher scale, custom operational requirements, and dedicated support.',
    cta: 'Contact us',
    href: `mailto:${SITE_EMAILS.hello}?subject=Chirograph%20Verify%20Enterprise`,
  },
];

export const PRICING_COMPARISON_ROWS: PricingFeatureRow[] = [
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

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is Chirograph Verify?',
    answer:
      'Chirograph Verify is bot-prevention infrastructure for developers. It checks for a valid passkey assertion from an enrolled device, verified server-side, without passwords, SMS, or CAPTCHA. It does not prove identity, uniqueness, or liveness.',
  },
  {
    question: 'Does Chirograph use CAPTCHA?',
    answer:
      'No. Chirograph does not use image puzzles, traffic lights, or any traditional CAPTCHA interaction. Verification is based on cryptographic device authentication instead of visual challenges.',
  },
  {
    question: 'Does Chirograph use passwords?',
    answer:
      'No. Verification relies on WebAuthn/passkey-capable device authentication. The user proves possession of a device authenticator using biometrics or a device PIN — never a shared password.',
  },
  {
    question: 'What is WebAuthn?',
    answer:
      'WebAuthn (Web Authentication) is a W3C standard for public-key-based authentication. It lets a device create a cryptographic assertion signed by a private key that never leaves the device. Chirograph verifies that assertion server-side.',
  },
  {
    question: 'How does verification work?',
    answer:
      'Your backend creates a single-use challenge via the Chirograph API. The user is redirected to a hosted WebAuthn ceremony where their device signs the challenge. Chirograph verifies the assertion server-side and issues an opaque result your backend redeems.',
  },
  {
    question: 'What is the widget?',
    answer:
      'The Chirograph widget is a lightweight JavaScript SDK. It triggers a top-level browser redirect to the hosted verification ceremony, then returns the user to your application with the verification result.',
  },
  {
    question: 'Does the widget use an iframe?',
    answer:
      'No. The current widget performs a top-level browser redirect to a hosted verification flow. It is not an iframe, modal, or inline React component.',
  },
  {
    question: 'Where does verification happen?',
    answer:
      "The WebAuthn ceremony happens on the user's device. The cryptographic verification of that ceremony happens on the Chirograph server. Your backend then redeems the opaque result. The browser never decides whether a user is verified.",
  },
  {
    question: 'Does the browser decide whether a user is verified?',
    answer:
      'No. The browser only facilitates the device ceremony. The actual verification decision is made server-side by Chirograph, and your backend confirms it by redeeming the result token.',
  },
  {
    question: 'How does a developer integrate Chirograph?',
    answer:
      'Create a challenge from your backend, redirect the user to the hosted ceremony using the widget SDK, then redeem the returned result token server-side. You can also receive signed webhook events for verification outcomes.',
  },
  {
    question: 'What happens after verification?',
    answer:
      'Your backend receives an opaque, single-use verification result that it redeems via the API. The result includes a verification status and a trust/device score. You can also subscribe to signed webhook events for real-time updates.',
  },
];
