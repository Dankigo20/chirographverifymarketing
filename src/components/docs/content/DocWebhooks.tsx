import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocList, DocTable } from '@/components/docs/DocBlocks';

export function DocWebhooks() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Webhooks</DocHeading>
      <DocParagraph>
        Chirograph Verify can deliver signed webhook events to your backend when verification
        events occur. This allows you to react to verification outcomes in real time without
        polling the API.
      </DocParagraph>

      <DocHeading level={3} id="configuration">Configuration</DocHeading>
      <DocParagraph>
        A webhook URL is configured per tenant. The webhook URL must be an HTTPS endpoint
        capable of receiving POST requests and verifying signatures. Deliveries are recorded in
        PostgreSQL and attempted by a background worker, so retry state survives restarts.
      </DocParagraph>

      <DocHeading level={3} id="events">Events</DocHeading>
      <DocTable
        headers={['Event type', 'Description']}
        rows={[
          [<code className="font-mono text-sm text-emerald-300">verification.completed</code>, 'A verification completed successfully.'],
          [<code className="font-mono text-sm text-emerald-300">key.rotated</code>, 'The tenant API key was rotated.'],
        ]}
      />

      <DocHeading level={3} id="headers">Headers</DocHeading>
      <DocTable
        headers={['Header', 'Value']}
        rows={[
          [<code className="font-mono text-sm text-emerald-300">x-chirograph-signature</code>, 'HMAC-SHA256 hex digest of the raw request body.'],
          [<code className="font-mono text-sm text-emerald-300">x-chirograph-delivery-id</code>, 'Unique delivery identifier for this attempt.'],
          [<code className="font-mono text-sm text-emerald-300">content-type</code>, 'application/json'],
        ]}
      />

      <DocHeading level={3} id="payload">Payload</DocHeading>
      <DocCode
        code={`{
  "event": "verification.completed",
  "verification_id": "…",
  "tenant_id": "…",
  "verified": true,
  "device_trust_score": 87,
  "timestamp": "2026-10-28T15:00:00.000Z"
}`}
        language="json"
        filename="payload.json"
      />
      <DocParagraph>
        The <code className="font-mono text-sm">key.rotated</code> event carries{' '}
        <code className="font-mono text-sm">event</code>,{' '}
        <code className="font-mono text-sm">tenant_id</code>,{' '}
        <code className="font-mono text-sm">actor</code>, and{' '}
        <code className="font-mono text-sm">timestamp</code>. Field order is fixed: the exact
        bytes delivered are the bytes that were signed.
      </DocParagraph>

      <DocHeading level={3} id="security">Security</DocHeading>
      <DocParagraph>
        Webhook events are signed using HMAC-SHA256. Your backend must verify the signature
        against the raw request body before trusting any event payload. The webhook secret is
        separate from your API keys.
      </DocParagraph>
      <DocCode
        code={`import crypto from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');

  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}`}
        language="ts"
        filename="verify-webhook.ts"
      />
      <DocCallout variant="warning" title="Security checklist">
        <ul className="space-y-1">
          <li>Use the raw request body — not a parsed JSON object — for signature verification</li>
          <li>Always use timing-safe comparison to prevent timing attacks</li>
          <li>Reject any event whose signature does not match</li>
          <li>Store your webhook secret securely — never expose it to the browser</li>
        </ul>
      </DocCallout>

      <DocHeading level={3} id="retries">Retries</DocHeading>
      <DocCallout variant="info" title="Retry behavior">
        Retry schedule: attempt 1 immediately, then 30s / 5m / 30m, then failed (max 4
        attempts). Concurrent deliveries are bounded. Private destinations (127.0.0.1,
        RFC1918) are rejected in production.
      </DocCallout>

      <DocHeading level={3} id="delivery-guarantees">Delivery guarantees</DocHeading>
      <DocList
        items={[
          'Delivery is asynchronous: POST /v1/verify never blocks on your endpoint.',
          'The webhook job is enqueued in the same transaction that commits the verification, so a committed verification always has a durable delivery job.',
          'Delivery failure never changes the verification result.',
          'Retries stop after 4 attempts; delivery is at-least-once, so de-duplicate using verification_id.',
        ]}
      />
    </DocPageWrapper>
  );
}
