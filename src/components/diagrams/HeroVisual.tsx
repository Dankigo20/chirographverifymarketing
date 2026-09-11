import { Fingerprint, ShieldCheck, ArrowRight, Check } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

/**
 * Original animated hero visual showing the verification ceremony.
 * Pure SVG/CSS — no stock images.
 */
export function HeroVisual() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      {/* Glow */}
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary-500/25 via-accent-500/15 to-transparent blur-2xl" />

      {/* Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900 p-6 shadow-2xl transition-all duration-700 ease-out-expo sm:p-8 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 bg-grid-dark opacity-50" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
                <Fingerprint className="h-4 w-4 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-sm font-semibold text-white">Chirograph</span>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-2xs font-medium text-ink-300">
              verify.dev
            </span>
          </div>

          {/* Verification panel */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow transition-all duration-1000 ${
                visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            >
              <Fingerprint className="h-8 w-8 text-white" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-white">
              Verify you're human
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-400">
              Your device confirms you're human using Face ID, Touch ID,
              or a passkey. No password required.
            </p>

            <button
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink-900 transition-all hover:bg-ink-100 active:scale-[0.98]"
              tabIndex={-1}
            >
              <Fingerprint className="h-4 w-4 text-primary-600" />
              Verify with passkey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Steps */}
          <div className="mt-5 space-y-2.5">
            <VerifyStep
              label="WebAuthn challenge issued"
              delay={400}
              visible={visible}
            />
            <VerifyStep
              label="Device signed assertion"
              delay={700}
              visible={visible}
            />
            <VerifyStep
              label="Server-side verification"
              delay={1000}
              visible={visible}
            />
            <VerifyStep
              label="Verification confirmed"
              delay={1300}
              visible={visible}
              success
            />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div
        className={`absolute -right-4 -top-4 flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/90 px-3 py-2 shadow-xl backdrop-blur transition-all duration-700 ease-out-expo sm:-right-6 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ transitionDelay: '900ms' }}
      >
        <ShieldCheck className="h-4 w-4 text-accent-400" />
        <span className="text-xs font-medium text-ink-200">Cryptographically verified</span>
      </div>
    </div>
  );
}

function VerifyStep({
  label,
  delay,
  visible,
  success = false,
}: {
  label: string;
  delay: number;
  visible: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 transition-all duration-500 ease-out-expo ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          success ? 'bg-accent-500/20' : 'bg-primary-500/20'
        }`}
      >
        <Check
          className={`h-3 w-3 ${success ? 'text-accent-400' : 'text-primary-400'}`}
          strokeWidth={3}
        />
      </span>
      <span className="text-xs text-ink-300">{label}</span>
    </div>
  );
}
