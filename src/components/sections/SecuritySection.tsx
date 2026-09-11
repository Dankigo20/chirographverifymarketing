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
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="dark-surface absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute -top-40 left-1/2 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            dark
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
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-300">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
