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
    desc: 'Device-level authentication using passkeys and platform authenticators — no shared secrets.',
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
    desc: 'Each tenant gets isolated API keys, widget keys, and verification state — no cross-tenant leakage.',
  },
  {
    icon: Gauge,
    title: 'Verification trust score',
    desc: 'Each result includes a trust/device score so you can apply risk-based decisions.',
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
    <section id="capabilities" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="Everything you need to verify real users"
            description="A complete verification infrastructure — from the browser SDK to server-side redemption — designed for developers who need to stop bots without stopping humans."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <Reveal key={i} delay={(i % 4) * 80}>
                <div className="group h-full rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:border-primary-200 hover:shadow-card hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-ink-900">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{cap.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
