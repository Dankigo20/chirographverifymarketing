import { DocPageWrapper, DocHeading, DocParagraph, DocTable, DocCallout, ComingSoonBadge } from '@/components/docs/DocBlocks';

export function DocErrors() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Errors</DocHeading>
      <DocParagraph>
        Chirograph Verify uses standard HTTP status codes to indicate the outcome of API
        requests. Error responses include an error code and a human-readable message.
      </DocParagraph>

      <DocHeading level={3} id="authentication-errors">Authentication errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">401</span>, <code className="font-mono text-sm text-ink-800">unauthorized</code>, 'Missing or invalid API key', 'Verify your secret key is correct and has not been revoked.'],
          [<span className="font-mono text-sm text-ink-800">403</span>, <code className="font-mono text-sm text-ink-800">forbidden</code>, 'The API key does not have permission for this operation', 'Check that your key has the required permissions.'],
        ]}
      />

      <DocHeading level={3} id="validation-errors">Validation errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">400</span>, <code className="font-mono text-sm text-ink-800">invalid_request</code>, 'Missing or invalid request parameters', 'Check the request body and parameters against the API reference.'],
          [<span className="font-mono text-sm text-ink-800">400</span>, <code className="font-mono text-sm text-ink-800">invalid_assertion</code>, 'The WebAuthn assertion is invalid', 'Ensure the assertion data is complete and unmodified. Retry with a new challenge.'],
        ]}
      />

      <DocHeading level={3} id="expired-challenge">Expired challenge</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">410</span>, <code className="font-mono text-sm text-ink-800">expired</code>, 'The challenge or flow has expired', 'Create a new challenge and restart the verification flow.'],
        ]}
      />

      <DocHeading level={3} id="replayed-challenge">Replayed challenge</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">409</span>, <code className="font-mono text-sm text-ink-800">already_used</code>, 'The challenge has already been used', 'Create a new challenge.'],
          [<span className="font-mono text-sm text-ink-800">409</span>, <code className="font-mono text-sm text-ink-800">already_redeemed</code>, 'The result token has already been redeemed', 'The token is single-use. Create a new flow if re-verification is needed.'],
        ]}
      />

      <DocHeading level={3} id="rate-limiting">Rate limiting</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">429</span>, <code className="font-mono text-sm text-ink-800">rate_limited</code>, 'Rate limit exceeded', 'Reduce request frequency. Retry after the cooldown period indicated by the Retry-After header.'],
        ]}
      />

      <DocHeading level={3} id="server-errors">Server errors</DocHeading>
      <DocTable
        headers={['Status', 'Code', 'Meaning', 'Recommended action']}
        rows={[
          [<span className="font-mono text-sm text-ink-800">500</span>, <code className="font-mono text-sm text-ink-800">server_error</code>, 'Internal server error', 'Retry with exponential backoff. Contact support if the error persists.'],
          [<span className="font-mono text-sm text-ink-800">503</span>, <code className="font-mono text-sm text-ink-800">service_unavailable</code>, 'Service temporarily unavailable', 'Retry after a short delay. Check status page if available.'],
        ]}
      />

      <DocCallout variant="info" title="Error response format">
        <ComingSoonBadge />
        The exact error response schema (field names, error code format, and additional
        metadata) is pending finalization in the backend. The error codes listed above are
        based on the known API behavior. This page will be updated when the final error schema
        is documented.
      </DocCallout>
    </DocPageWrapper>
  );
}
