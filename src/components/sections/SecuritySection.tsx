import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SecurityDiagram } from '@/components/diagrams/SecurityDiagram';
import { ShieldCheck, Lock, KeyRound, Webhook, Server, RefreshCw } from 'lucide-react';

const pillars = [
  {
    icon: KeyRound,
    title: 'WebAuthn foundation',
    desc: 'Verification is rooted in public-key cryptography. Private keys never leave the device.',
  },
  {
    icon: Server,
    title: 'Server-side verification',
    desc: 'The browser never decides verification. Assertions are validated on the Chirograph server.',
  },
  {
    icon: RefreshCw,
    title: 'Single-use flows',
    desc: 'Each challenge is one-time. Redis-backed temporary state prevents replay attacks.',
  },
  {
    icon: Lock,
    title: 'Tenant isolation',
    desc: 'Separate API keys, widget origins, and verification state per tenant.',
  },
  {
    icon: Webhook,
    title: 'Signed webhooks',
    desc: 'Every event is HMAC-signed. Your backend verifies the signature before trusting it.',
  },
  {
    icon: ShieldCheck,
    title: 'Opaque results',
    desc: 'Verification results are opaque tokens redeemed server-side — not browser claims.',
  },
];

export function SecuritySection() {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-white py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="Security"
            title="Verified by cryptography, not by trust"
            description="The security model is designed so that no party — not the browser, not the user, not a man-in-the-middle — can forge a verification result."
          />
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-20">
            <SecurityDiagram />
          </div>
        </Reveal>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div className="h-full rounded-panel border border-ink-200 bg-white p-7 transition-colors duration-150 hover:border-ink-300">
                  <div className="flex h-10 w-10 items-center justify-center rounded-control border border-primary-200 bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
