import { DocPageWrapper, DocHeading, DocParagraph, DocTable, DocCallout } from '@/components/docs/DocBlocks';

export function DocErrors() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Errors</DocHeading>
      <DocParagraph>
        Chirograph Verify uses standard HTTP status codes to indicate the outcome of API
        requests. Error responses carry a stable machine-readable{' '}
        <code className="font-mono text-sm text-zinc-200">error</code> code.
      </DocParagraph>

      <DocHeading level={3} id="authentication-errors">Authentication errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">401</span>, <code className="font-mono text-sm text-zinc-200">unauthorized</code>, 'Missing, malformed, or unknown API key', 'Verify your secret key is correct and has not been revoked.'],
          [<span className="font-mono text-sm text-zinc-200">403</span>, <code className="font-mono text-sm text-zinc-200">forbidden</code>, 'Tenant mismatch, or origin/redirect URL not allowlisted', 'Send the tenant_id that belongs to your key; add the origin and redirect URL to the widget client configuration.'],
        ]}
      />

      <DocHeading level={3} id="validation-errors">Validation errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">400</span>, <code className="font-mono text-sm text-zinc-200">invalid_request</code>, 'Missing or invalid request parameters', 'Check the request body against the API reference. Unknown fields are rejected.'],
          [<span className="font-mono text-sm text-zinc-200">400</span>, <code className="font-mono text-sm text-zinc-200">user_not_enrolled</code>, 'No credential is enrolled for this user (purpose=authenticate)', 'Run a registration flow first, or use purpose=register.'],
          [<span className="font-mono text-sm text-zinc-200">400</span>, <code className="font-mono text-sm text-zinc-200">invalid_flow</code>, 'The widget flow token is invalid, expired, or already consumed', 'Create a new flow.'],
        ]}
      />

      <DocHeading level={3} id="verification-failures">Verification failures</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">400</span>, <code className="font-mono text-sm text-zinc-200">verification_failed</code>, 'The assertion could not be verified (invalid, expired, or already consumed challenge)', 'Create a new challenge and restart the flow. Do not retry the same challenge.'],
        ]}
      />

      <DocHeading level={3} id="redeem-errors">Redemption errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">400</span>, <code className="font-mono text-sm text-zinc-200">invalid_result_token</code>, 'The result token is invalid, expired, or already redeemed', 'Tokens are single-use. Treat a consumed token as unverified for that attempt.'],
          [<span className="font-mono text-sm text-zinc-200">403</span>, <code className="font-mono text-sm text-zinc-200">forbidden</code>, 'The result token belongs to a different tenant', 'Redeem only tokens issued for your own tenant.'],
        ]}
      />

      <DocHeading level={3} id="rate-limiting">Rate limiting and quotas</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">429</span>, <code className="font-mono text-sm text-zinc-200">rate_limited</code>, 'Request rate limit exceeded', 'Reduce request frequency and retry after the cooldown period.'],
          [<span className="font-mono text-sm text-zinc-200">429</span>, <code className="font-mono text-sm text-zinc-200">quota_exceeded</code>, 'The tenant has reached its verification quota for the current tier', 'Upgrade the tenant plan or wait for the quota window to reset.'],
        ]}
      />

      <DocHeading level={3} id="server-errors">Server errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-zinc-200">503</span>, <code className="font-mono text-sm text-zinc-200">unavailable</code>, 'Challenge, flow, or result state store unavailable', 'Retry with exponential backoff.'],
        ]}
      />

      <DocCallout variant="info" title="Error response format">
        Errors are returned as JSON with a stable code, for example{' '}
        <code className="font-mono text-sm">{'{"error":"verification_failed"}'}</code>. The
        backend deliberately returns generic codes for authentication and verification failures
        so it never reveals whether a tenant, key, or credential exists.
      </DocCallout>
    </DocPageWrapper>
  );
}
