import { useReveal } from '@/hooks/useReveal';

export interface FlowStep {
  label: string;
  sublabel?: string;
  side?: 'client' | 'server';
}

interface FlowDiagramProps {
  steps: FlowStep[];
  dark?: boolean;
  className?: string;
}

/**
 * Vertical flow diagram with animated connecting lines.
 * Alternates client/server sides with subtle color coding.
 */
export function FlowDiagram({ steps, dark = false, className }: FlowDiagramProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={className}>
      <div className="relative">
        {/* Center line */}
        <div
          className={`absolute left-[19px] top-3 bottom-3 w-px ${dark ? 'bg-white/15' : 'bg-ink-200'} md:left-1/2 md:-translate-x-1/2`}
        />

        <ol className="space-y-3 md:space-y-0">
          {steps.map((step, i) => {
            const isClient = step.side === 'client';
            const isServer = step.side === 'server';
            const onRight = isServer;

            return (
              <li
                key={i}
                className={`relative flex items-center gap-4 md:gap-0 transition-all duration-700 ease-out-expo ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } md:py-3`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Node */}
                <div className="relative z-10 flex shrink-0 items-center md:w-1/2">
                  <div
                    className={`flex items-center gap-3 ${onRight ? 'md:ml-auto md:flex-row-reverse md:text-right' : ''}`}
                  >
                    <Node index={i} dark={dark} side={step.side} />
                    <div className={onRight ? 'md:pr-4' : 'md:pl-4'}>
                      <div
                        className={`text-sm font-semibold ${dark ? 'text-white' : 'text-ink-900'}`}
                      >
                        {step.label}
                      </div>
                      {step.sublabel && (
                        <div
                          className={`mt-0.5 text-xs ${dark ? 'text-ink-400' : 'text-ink-500'}`}
                        >
                          {step.sublabel}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Node({
  index,
  dark,
  side,
}: {
  index: number;
  dark: boolean;
  side?: 'client' | 'server';
}) {
  const color =
    side === 'client'
      ? 'from-accent-500 to-accent-600'
      : side === 'server'
        ? 'from-primary-500 to-primary-600'
        : 'from-ink-500 to-ink-600';
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-sm font-semibold text-white shadow-lg`}
    >
      {index + 1}
    </span>
  );
}
