import { ShieldCheck, Smartphone, Server, KeyRound, Webhook, Lock } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

/**
 * Security architecture diagram showing the layered verification model.
 * Pure SVG + HTML — no images.
 */
export function SecurityDiagram() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const layers = [
    { icon: Smartphone, label: 'Browser / Device', desc: 'User initiates verification', color: 'accent' },
    { icon: KeyRound, label: 'WebAuthn Ceremony', desc: 'Device creates cryptographic assertion', color: 'accent' },
    { icon: Server, label: 'Chirograph Server', desc: 'Verifies assertion server-side', color: 'primary' },
    { icon: Lock, label: 'Opaque Result', desc: 'Single-use, tenant-scoped token', color: 'primary' },
    { icon: Webhook, label: 'Tenant Backend', desc: 'Redeems verification result', color: 'ink' },
    { icon: ShieldCheck, label: 'Verified', desc: 'User confirmed as real', color: 'success' },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Background grid */}
      <div className="absolute inset-0 rounded-3xl bg-grid-dark opacity-40" />

      <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {layers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <div
              key={i}
              className={`group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition-all duration-700 ease-out-expo ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorBg(layer.color)}`}
                >
                  <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-400">
                  Layer {i + 1}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{layer.label}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-400">{layer.desc}</p>
              </div>
              {/* Connector arrow (hidden on last) */}
              {i < layers.length - 1 && (
                <div className="absolute -bottom-2.5 left-1/2 hidden -translate-x-1/2 text-ink-600 lg:block">
                  {i % 3 !== 2 && <ChevronDown />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
      <path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function colorBg(color: string): string {
  switch (color) {
    case 'accent':
      return 'bg-gradient-to-br from-accent-500 to-accent-600';
    case 'primary':
      return 'bg-gradient-to-br from-primary-500 to-primary-600';
    case 'success':
      return 'bg-gradient-to-br from-accent-500 to-accent-600';
    default:
      return 'bg-gradient-to-br from-ink-600 to-ink-700';
  }
}
