
import { useReveal } from '@/hooks/useReveal';

/**
 * Original animated hero visual showing the verification ceremony.
 * Pure SVG/CSS — no stock images.
 */
export function HeroVisual() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div ref={ref} className="w-full">
      {/* Terminal panel — the console's native idiom */}
      <div
        className={`overflow-hidden rounded-panel border border-ink-200 bg-ink-100 transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-ink-200 bg-surface-2 px-3 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-micro text-secondary">
            verification-flow
          </span>
          <span className="font-mono text-[10px] text-secondary">HTTP 200</span>
        </div>

        <div className="p-4">
          {/* Request */}
          <div className="font-mono text-[11px] leading-relaxed">
            <div className="flex items-baseline gap-2">
              <span className="text-accent-600">$</span>
              <span className="text-ink-500">curl -X POST</span>
              <span className="text-primary-600">/v1/challenge</span>
            </div>
            <div className="mt-1 pl-4 text-secondary">
              -H <span className="text-ink-600">&apos;X-API-Key: sk_live_…&apos;</span>
            </div>
            <div className="pl-4 text-secondary">
              -d <span className="text-ink-600">&apos;{'{'} &quot;tenant&quot;: &quot;acme&quot; {'}'}'</span>
            </div>
          </div>

          {/* Divider */}
          <div className="my-3 border-t border-ink-200" />

          {/* Response */}
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-ink-500">
            <span className="text-secondary">{'{'}</span>{'\n'}
            {'  '}<span className="text-primary-600">&quot;flow_id&quot;</span>: <span className="text-accent-600">&quot;flw_8f2a91c4&quot;</span>,{'\n'}
            {'  '}<span className="text-primary-600">&quot;expires_in&quot;</span>: <span className="text-ink-900">120</span>,{'\n'}
            {'  '}<span className="text-primary-600">&quot;redirect_url&quot;</span>: <span className="text-accent-600">&quot;https://verify.chirograph…&quot;</span>{'\n'}
            <span className="text-secondary">{'}'}</span>
          </pre>

          {/* Ceremony state */}
          <div className="mt-4 border-t border-ink-200 pt-3">
            <div className="micro-label mb-2">Ceremony</div>
            <div className="space-y-1.5">
              <Step label="WebAuthn challenge issued" delay={400} visible={visible} />
              <Step label="Device signed assertion" delay={700} visible={visible} />
              <Step label="Server-side verification" delay={1000} visible={visible} />
              <Step label="Result token issued" delay={1300} visible={visible} success />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({
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
      className={`flex items-center gap-2 font-mono text-[11px] transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className={success ? 'text-accent-600' : 'text-primary-600'}>
        {success ? '[ok]' : '[..]'}
      </span>
      <span className="text-ink-500">{label}</span>
    </div>
  );
}
