import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Smartphone, Fingerprint, Server, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    label: 'Device',
    desc: 'The user starts verification from your application on their device.',
  },
  {
    icon: Fingerprint,
    label: 'WebAuthn',
    desc: 'The device performs a WebAuthn ceremony — a passkey or biometric — creating a signed cryptographic assertion.',
  },
  {
    icon: Server,
    label: 'Chirograph',
    desc: 'The Chirograph server verifies the assertion against the single-use challenge it issued.',
  },
  {
    icon: ShieldCheck,
    label: 'Verified result',
    desc: 'Your backend receives an opaque, single-use verification result it can redeem.',
  },
];

export function ProductExplanation() {
  return (
    <section id="product" className="relative scroll-mt-20 py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The approach"
            title="Device → WebAuthn → Chirograph → Verified"
            description="Instead of asking users to prove they're human by solving puzzles, Chirograph asks their device to prove it cryptographically."
          />
        </Reveal>

        {/* Horizontal flow */}
        <Reveal delay={100}>
          <div className="mt-20">
            {/* Desktop horizontal */}
            <div className="hidden lg:block">
              <div className="flex items-stretch justify-between gap-2">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <div key={i} className="flex flex-1 items-center">
                      <div className="group flex flex-1 flex-col items-center text-center">
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-ink-200 bg-white shadow-soft transition-all duration-300 group-hover:border-primary-300 group-hover:shadow-glow">
                          <Icon className="h-8 w-8 text-primary-600" strokeWidth={1.8} />
                          <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
                            {i + 1}
                          </span>
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-ink-900">{step.label}</h3>
                        <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-ink-500">
                          {step.desc}
                        </p>
                      </div>
                      {i < steps.length - 1 && <Connector />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile vertical */}
            <div className="lg:hidden">
              <div className="relative">
                <div className="absolute left-10 top-4 bottom-4 w-px bg-ink-200" />
                <div className="space-y-6">
                  {steps.map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <Reveal key={i} delay={i * 100}>
                        <div className="relative flex gap-4">
                          <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-ink-200 bg-white shadow-soft">
                            <Icon className="h-8 w-8 text-primary-600" strokeWidth={1.8} />
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-xs font-semibold text-white">
                              {i + 1}
                            </span>
                          </div>
                          <div className="pt-3">
                            <h3 className="text-sm font-semibold text-ink-900">{step.label}</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-ink-500">{step.desc}</p>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Connector() {
  return (
    <div className="flex flex-1 items-center justify-center px-1">
      <svg width="100%" height="2" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
        <line
          x1="0"
          y1="1"
          x2="100"
          y2="1"
          stroke="rgb(203 213 225)"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>
    </div>
  );
}
