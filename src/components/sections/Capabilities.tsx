import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  Fingerprint,
  RefreshCw,
  ServerCog,
  Building2,
  Gauge,
  Webhook,
  Code2,
  ExternalLink,
} from 'lucide-react';

const capabilities = [
  {
    icon: Fingerprint,
    title: 'WebAuthn verification',
    desc: 'Device-level authentication using passkeys and platform authenticators — no shared secrets, nothing to phish.',
  },
  {
    icon: RefreshCw,
    title: 'Single-use challenges',
    desc: 'Every verification flow issues a one-time challenge that cannot be replayed or reused.',
  },
  {
    icon: ServerCog,
    title: 'Server-side verification',
    desc: 'Cryptographic assertions are verified on the Chirograph server — never trusted to the browser.',
  },
  {
    icon: Building2,
    title: 'Tenant isolation',
    desc: 'Each tenant gets isolated API keys, widget keys and verification state — no cross-tenant leakage.',
  },
  {
    icon: Gauge,
    title: 'Verification trust score',
    desc: 'Each result includes a trust and device score so you can apply risk-based decisions.',
  },
  {
    icon: Webhook,
    title: 'Signed webhook events',
    desc: 'Verification results are delivered to your backend via cryptographically signed webhooks.',
  },
  {
    icon: Code2,
    title: 'API integration',
    desc: 'Simple challenge-and-verify endpoints plus a redirect-based widget SDK for the browser.',
  },
  {
    icon: ExternalLink,
    title: 'Redirect-based widget',
    desc: 'A lightweight JavaScript SDK that redirects to a hosted ceremony and returns to your app.',
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Key features"
            title="Everything needed to verify real users"
            aside="Complete verification infrastructure — browser SDK through server-side redemption, with no CAPTCHA and no shared secrets."
          />
        </Reveal>

        {/* Four columns separated by vertical hairlines, matching the
            reference feature block. The dividers are drawn with a
            left+right border pair that collapses cleanly on mobile. */}
        <Reveal delay={120}>
          <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col lg:border-l lg:border-ink-200 lg:pl-8 lg:first:border-l-0 lg:first:pl-0 ${
                    i > 0 ? 'lg:ml-0' : ''
                  }`}
                >
                  <Icon className="h-7 w-7 text-ink-900" strokeWidth={1.6} />
                  <h3 className="mt-6 text-lg font-medium text-ink-900">{cap.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
