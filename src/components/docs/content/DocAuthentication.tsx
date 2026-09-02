import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocAuthentication() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Authentication</DocHeading>
      <DocParagraph>
        Chirograph Verify uses two distinct credential types. Understanding the difference is
        critical for keeping your integration secure.
      </DocParagraph>

      <DocHeading level={3} id="secret-key">Secret key</DocHeading>
      <DocCode code="sk_live_..." language="text" filename="format" />
      <DocParagraph>
        <strong>Purpose:</strong> Server-side API authentication. Used to create challenges,
        redeem results, and manage tenant configuration.
      </DocParagraph>
      <DocCallout variant="danger" title="Rules">
        <ul className="space-y-1">
          <li>Never expose the secret key to the browser</li>
          <li>Never put it in frontend source code</li>
          <li>Never commit it to Git</li>
          <li>Store it only in server-side environment variables or secrets management</li>
        </ul>
      </DocCallout>

      <DocHeading level={3} id="publishable-key">Publishable key</DocHeading>
      <DocCode code="pk_live_..." language="text" filename="format" />
      <DocParagraph>
        <strong>Purpose:</strong> Browser and widget integration. Used by the client-side
        widget SDK to initiate verification flows.
      </DocParagraph>
      <DocCallout variant="info" title="Intentionally different">
        The publishable key is a separate credential type from the secret key. It is designed to
        be safe for browser use and cannot be used to redeem results or access tenant
        configuration. Only the secret key can perform server-side operations.
      </DocCallout>

      <DocHeading level={3} id="visual-summary">Summary</DocHeading>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-error-200 bg-error-500/5 p-5">
          <div className="font-mono text-sm font-semibold text-error-600">sk_live_...</div>
          <div className="mt-2 text-xs font-medium uppercase tracking-wider text-error-600">Secret</div>
          <ul className="mt-2 space-y-1 text-sm text-ink-600">
            <li>Server-side only</li>
            <li>Creates challenges</li>
            <li>Redeems results</li>
            <li>Never in browser code</li>
          </ul>
        </div>
        <div className="rounded-xl border border-primary-200 bg-primary-50/50 p-5">
          <div className="font-mono text-sm font-semibold text-primary-700">pk_live_...</div>
          <div className="mt-2 text-xs font-medium uppercase tracking-wider text-primary-700">Publishable</div>
          <ul className="mt-2 space-y-1 text-sm text-ink-600">
            <li>Browser-safe</li>
            <li>Widget SDK initialization</li>
            <li>Cannot redeem results</li>
            <li>Cannot access tenant config</li>
          </ul>
        </div>
      </div>
    </DocPageWrapper>
  );
}
