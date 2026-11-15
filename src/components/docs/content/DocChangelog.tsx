import { DocPageWrapper, DocHeading, DocParagraph } from '@/components/docs/DocBlocks';

export function DocChangelog() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Changelog</DocHeading>
      <DocParagraph>
        Chirograph Verify API v1
      </DocParagraph>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
            Initial documentation
          </span>
          <span className="text-sm text-zinc-500">September 2, 2026</span>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Added</h4>
            <ul className="mt-2 space-y-1.5 pl-1 text-[15px] text-zinc-400">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Initial developer documentation structure</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Getting Started, Verification, API Reference, SDKs, Security, and Resources sections</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Documentation for the three-step verification flow: Challenge, Ceremony, Redeem</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />API reference for all six endpoints</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Security model documentation including replay protection, device trust, and webhook security</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Changed</h4>
            <p className="mt-2 text-[15px] text-zinc-500">Nothing yet.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Fixed</h4>
            <p className="mt-2 text-[15px] text-zinc-500">Nothing yet.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Security</h4>
            <p className="mt-2 text-[15px] text-zinc-500">Nothing yet.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white">
            Documentation accuracy pass
          </span>
          <span className="text-sm text-zinc-500">November 15, 2026</span>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Changed</h4>
            <ul className="mt-2 space-y-1.5 pl-1 text-[15px] text-zinc-400">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Widget endpoint paths corrected to <code className="font-mono text-sm">/v1/widget/flows</code>, <code className="font-mono text-sm">/v1/widget/ceremony/options</code>, <code className="font-mono text-sm">/v1/widget/ceremony/complete</code>, and <code className="font-mono text-sm">/v1/widget/redeem</code></li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Credential examples now describe the real 64-character hexadecimal key format (no <code className="font-mono text-sm">sk_</code>/<code className="font-mono text-sm">pk_</code> prefixes)</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Request and response examples for challenge, verify, widget flows, ceremony, and redeem aligned with the backend schemas</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />Webhook event types, headers, payload, and retry schedule documented from the implementation</li>
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-zinc-500">
        This changelog begins with the initial documentation release. Future updates will be
        recorded here as the API and SDKs evolve.
      </p>
    </DocPageWrapper>
  );
}
