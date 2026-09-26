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
    surface: 'Device',
    desc: 'Device-level authentication using passkeys and platform authenticators — no shared secrets.',
  },
  {
    icon: RefreshCw,
    title: 'Single-use challenges',
    surface: 'API',
    desc: 'Every verification flow issues a one-time challenge that cannot be replayed or reused.',
  },
  {
    icon: ServerCog,
    title: 'Server-side verification',
    surface: 'Server',
    desc: 'Cryptographic assertions are verified on the Chirograph server — never trusted to the browser.',
  },
  {
    icon: Building2,
    title: 'Tenant isolation',
    surface: 'Platform',
    desc: 'Each tenant gets isolated API keys, widget keys, and verification state — no cross-tenant leakage.',
  },
  {
    icon: Gauge,
    title: 'Verification trust score',
    surface: 'Response',
    desc: 'Each result includes a trust/device score so you can apply risk-based decisions.',
  },
  {
    icon: Webhook,
    title: 'Signed webhook events',
    surface: 'Webhooks',
    desc: 'Verification results are delivered to your backend via cryptographically signed webhooks.',
  },
  {
    icon: Code2,
    title: 'API integration',
    surface: 'REST',
    desc: 'Simple challenge-and-verify endpoints plus a redirect-based widget SDK for the browser.',
  },
  {
    icon: ExternalLink,
    title: 'Redirect-based widget',
    surface: 'Browser',
    desc: 'A lightweight JavaScript SDK that redirects to a hosted ceremony and returns to your app.',
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative scroll-mt-20 border-t border-tertiary py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Capabilities"
            title="Everything needed to verify real users"
            description="Complete verification infrastructure — browser SDK through server-side redemption."
          />
        </Reveal>

        {/* Specification table, not a card grid */}
        <Reveal delay={120}>
          <div className="mt-10 overflow-hidden rounded-panel border border-tertiary">
            <div className="hidden grid-cols-[220px_minmax(0,1fr)_140px] border-b border-tertiary bg-surface-2 px-4 py-2 sm:grid">
              <span className="micro-label">Capability</span>
              <span className="micro-label">Description</span>
              <span className="micro-label text-right">Surface</span>
            </div>
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className={`grid grid-cols-1 items-start gap-1 px-4 py-3 transition-colors hover:\bg-surface/[0.06] sm:grid-cols-[220px_minmax(0,1fr)_140px] sm:items-center sm:gap-4 ${
                    i > 0 ? 'border-t border-tertiary' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-primary-600" strokeWidth={1.9} />
                    <span className="text-[13px] font-medium text-ink-900">{cap.title}</span>
                  </div>
                  <p className="text-[13px] leading-relaxed text-ink-500">{cap.desc}</p>
                  <span className="justify-self-start rounded-xs border border-tertiary bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-secondary sm:justify-self-end">
                    {cap.surface}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
