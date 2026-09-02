import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityDiagram } from '@/components/diagrams/SecurityDiagram';
import { Badge } from '@/components/ui/Badge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { ButtonLink } from '@/components/ui/Button';
import { appLinks } from '@/config/site';
import {
  KeyRound,
  ServerCog,
  RefreshCw,
  Building2,
  Lock,
  Webhook,
  Gauge,
  ShieldCheck,
  Database,
  ArrowRight,
} from 'lucide-react';

const sections = [
  {
    icon: KeyRound,
    title: 'WebAuthn foundation',
    desc: 'Verification is rooted in the WebAuthn standard. Each user device holds a private key that never leaves the authenticator. During the ceremony, the device signs a challenge; the signature is verified against the corresponding public key on the server. There is no shared secret to phish, leak, or reuse.',
    points: [
      'Public-key cryptography — no shared secrets',
      'Private keys never leave the device',
      'Resistant to phishing via origin binding',
    ],
  },
  {
    icon: ServerCog,
    title: 'Server-side verification',
    desc: 'The browser never decides whether a user is verified. The WebAuthn assertion is sent to the Chirograph server, which validates the signature, challenge, origin, and authenticator data. Only the server can issue a verified result — a client-side claim is never trusted.',
    points: [
      'Assertion validated server-side',
      'Origin and RP ID checked',
      'Client claims are never trusted',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Single-use challenges',
    desc: 'Every verification flow begins with a one-time challenge. Once a challenge is consumed, it cannot be replayed. Redis-backed temporary state ensures challenges expire and are invalidated after use, preventing replay and fixation attacks.',
    points: [
      'One-time challenges — no replay',
      'Redis-backed temporary state',
      'Automatic expiration',
    ],
  },
  {
    icon: Building2,
    title: 'Tenant isolation',
    desc: 'Each tenant operates in isolation with its own API keys, publishable widget keys, and verification state. Widget allowed-origin configuration restricts where a tenant\'s verification flows can be initiated, preventing cross-tenant abuse.',
    points: [
      'Separate secret and publishable keys per tenant',
      'Widget origin allowlisting',
      'No cross-tenant data leakage',
    ],
  },
  {
    icon: Webhook,
    title: 'Webhook security',
    desc: 'Outbound webhooks are signed using HMAC. Your backend must verify the signature before trusting any event payload. This prevents forged webhook deliveries and ensures verification events are authentic.',
    points: [
      'HMAC-signed webhook payloads',
      'Signature verification on your backend',
      'Tamper-evident event delivery',
    ],
  },
  {
    icon: Lock,
    title: 'Opaque verification results',
    desc: 'Verification results are opaque tokens. They are not interpretable by the browser and must be redeemed by your backend via the API. This prevents a user from fabricating or modifying a verification outcome client-side.',
    points: [
      'Opaque, single-use result tokens',
      'Redeemed server-side only',
      'Cannot be forged by the browser',
    ],
  },
  {
    icon: Gauge,
    title: 'Rate limiting',
    desc: 'API endpoints enforce rate limiting to prevent abuse, brute-force, and automated flooding. Limits apply at the request and flow level to protect both the API and the hosted ceremony.',
    points: [
      'Request-level rate limiting',
      'Flow-level abuse prevention',
      'Protects API and ceremony',
    ],
  },
  {
    icon: Database,
    title: 'PostgreSQL + Redis',
    desc: 'PostgreSQL provides durable persistence for tenants, API keys, and verification records. Redis provides fast, ephemeral state for single-use challenges and ceremony sessions — each used for what it does best.',
    points: [
      'PostgreSQL for durable records',
      'Redis for ephemeral challenge state',
      'Clear separation of concerns',
    ],
  },
];

const webhookVerify = `import crypto from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// In your webhook handler:
// const signature = req.headers['x-chirograph-signature'];
// const rawBody = await req.text(); // raw, not parsed
// if (!verifyWebhook(rawBody, signature, process.env.CHIROGRAPH_WEBHOOK_SECRET)) {
//   return res.status(401).send('Invalid signature');
// }`;

export function SecurityPage() {
  useSeo({
    title: 'Security — Chirograph Verify',
    description:
      'The security architecture behind Chirograph Verify: WebAuthn, server-side verification, single-use challenges, tenant isolation, signed webhooks, and opaque results.',
    path: '/security',
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div className="dark-surface absolute inset-0 bg-ink-900" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="container-page relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="dark" className="mb-5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Security architecture
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Verified by cryptography,
                <br />
                <span className="text-gradient-light">not by trust.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
                No party — not the browser, not the user, not a man-in-the-middle — can
                forge a verification result. Here's how the security model works.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-16">
              <SecurityDiagram />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Detailed sections */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-2">
            {sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={i} delay={(i % 2) * 100}>
                  <div className="h-full rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:border-ink-300 hover:shadow-card">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-primary-600">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </div>
                      <h2 className="text-lg font-semibold text-ink-900">{s.title}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-500">{s.desc}</p>
                    <ul className="mt-4 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-sm text-ink-600">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-1 shrink-0" aria-hidden="true">
                            <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" />
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Webhook code example */}
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  eyebrow="Implementation"
                  title="Verify webhooks on your backend"
                  description="Every webhook event is HMAC-signed. Always verify the signature using the raw request body before trusting the payload."
                />
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-2.5 text-sm text-ink-600">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    Use the raw request body — not a parsed JSON object — for signature verification.
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-ink-600">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    Always use timing-safe comparison to prevent timing attacks.
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-ink-600">
                    <Lock className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                    Reject any event whose signature does not match.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <CodeBlock
                code={webhookVerify}
                language="ts"
                filename="verify-webhook.ts"
                showLineNumbers
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-ink-200 bg-gradient-to-br from-ink-50 to-primary-50/30 p-10 text-center lg:p-14">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Start verifying users securely
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink-500">
                Get API keys, configure your widget origins, and integrate in an afternoon.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={appLinks.getStarted} size="lg" external>
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/developers" variant="secondary" size="lg">
                  Read the docs
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
