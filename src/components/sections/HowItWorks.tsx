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
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden border-y border-ink-800 bg-ink-50/60 py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container-page relative">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="A verification flow in five steps"
            description="Client and server work together. The browser never decides whether a user is verified — only the Chirograph server does."
          />
        </Reveal>

        <div className="mx-auto mt-20 max-w-2xl">
          <Reveal delay={150}>
            <FlowDiagram steps={steps} />
          </Reveal>
        </div>

        {/* Legend */}
        <Reveal delay={300}>
          <div className="mx-auto mt-14 flex flex-wrap justify-center gap-6">
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
      <span className="text-sm text-ink-600">{label}</span>
    </div>
  );
}
