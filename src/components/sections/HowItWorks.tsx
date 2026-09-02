import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowDiagram, type FlowStep } from '@/components/diagrams/FlowDiagram';

const steps: FlowStep[] = [
  { label: 'User starts verification', sublabel: 'From your website or app', side: 'client' },
  { label: 'Chirograph creates a single-use flow', sublabel: 'Server issues a one-time challenge', side: 'server' },
  { label: 'User verifies with their device', sublabel: 'WebAuthn / passkey ceremony', side: 'client' },
  { label: 'Chirograph verifies the assertion', sublabel: 'Server-side cryptographic check', side: 'server' },
  { label: 'Your backend receives the result', sublabel: 'Redeem the opaque verification', side: 'server' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden py-20 lg:py-28">
      {/* Dark surface */}
      <div className="dark-surface absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute left-1/2 top-1/2 -z-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            dark
            eyebrow="How it works"
            title="A verification flow in five steps"
            description="Client and server work together. The browser never decides whether a user is verified — only the Chirograph server does."
          />
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl">
          <Reveal delay={150}>
            <FlowDiagram steps={steps} dark />
          </Reveal>
        </div>

        {/* Legend */}
        <Reveal delay={300}>
          <div className="mx-auto mt-12 flex flex-wrap justify-center gap-6">
            <LegendDot color="accent" label="Client / browser" />
            <LegendDot color="primary" label="Server-side" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: 'accent' | 'primary'; label: string }) {
  const bg = color === 'accent' ? 'bg-accent-500' : 'bg-primary-500';
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${bg}`} />
      <span className="text-sm text-ink-300">{label}</span>
    </div>
  );
}
