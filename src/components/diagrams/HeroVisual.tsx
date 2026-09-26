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
      {/* Card — light console surface on the light hero */}
      <div
        className={`relative overflow-hidden rounded-panel border border-ink-200 bg-white p-6 shadow-card transition-all duration-700 ease-out-expo sm:p-8 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-control border border-primary-200 bg-primary-50 text-primary-600">
                <Fingerprint className="h-3.5 w-3.5" strokeWidth={2.1} />
              </span>
              <span className="text-sm font-semibold text-ink-900">Chirograph</span>
            </div>
            <span className="rounded-control border border-ink-200 bg-ink-50 px-2 py-1 font-mono text-2xs text-ink-500">
              verify.dev
            </span>
          </div>

          {/* Verification panel */}
          <div className="mt-6 rounded-xl border border-ink-200 bg-ink-50/60 p-6 text-center">
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary-200 bg-primary-50 text-primary-600 transition-all duration-1000 ${
                visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}
            >
              <Fingerprint className="h-7 w-7" strokeWidth={1.8} />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink-900">
              Verify you're human
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
              Your device confirms you're human using Face ID, Touch ID,
              or a passkey. No password required.
            </p>

            <button
              className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-control bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-control transition-colors hover:bg-primary-700"
              tabIndex={-1}
            >
              <Fingerprint className="h-4 w-4" />
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
        className={`absolute -right-4 -top-4 flex items-center gap-2 rounded-control border border-accent-200 bg-accent-50 px-3 py-2 shadow-card transition-all duration-700 ease-out-expo sm:-right-6 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{ transitionDelay: '900ms' }}
      >
        <ShieldCheck className="h-4 w-4 text-accent-600" />
        <span className="text-xs font-medium text-accent-700">Cryptographically verified</span>
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
          success ? 'bg-accent-50' : 'bg-primary-50'
        }`}
      >
        <Check
          className={`h-3 w-3 ${success ? 'text-accent-600' : 'text-primary-600'}`}
          strokeWidth={3}
        />
      </span>
      <span className="text-xs text-ink-600">{label}</span>
    </div>
  );
}
