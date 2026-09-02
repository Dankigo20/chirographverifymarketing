import { DocPageWrapper, DocHeading, DocParagraph } from '@/components/docs/DocBlocks';

export function DocChangelog() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Changelog</DocHeading>
      <DocParagraph>
        Chirograph Verify API v1
      </DocParagraph>

      <div className="mt-8 rounded-xl border border-ink-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-primary-100 px-2.5 py-1 text-xs font-semibold text-primary-700">
            Initial documentation
          </span>
          <span className="text-sm text-ink-400">September 2, 2026</span>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Added</h4>
            <ul className="mt-2 space-y-1.5 pl-1 text-[15px] text-ink-600">
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Initial developer documentation structure</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Getting Started, Verification, API Reference, SDKs, Security, and Resources sections</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Documentation for the three-step verification flow: Challenge, Ceremony, Redeem</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />API reference for all six endpoints</li>
              <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Security model documentation including replay protection, device trust, and webhook security</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Changed</h4>
            <p className="mt-2 text-[15px] text-ink-500">Nothing yet.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Fixed</h4>
            <p className="mt-2 text-[15px] text-ink-500">Nothing yet.</p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-400">Security</h4>
            <p className="mt-2 text-[15px] text-ink-500">Nothing yet.</p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-400">
        This changelog begins with the initial documentation release. Future updates will be
        recorded here as the API and SDKs evolve.
      </p>
    </DocPageWrapper>
  );
}
