import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocWebhooks() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Webhooks</DocHeading>
      <DocParagraph>
        Chirograph Verify can deliver signed webhook events to your backend when verification
        events occur. This allows you to react to verification outcomes in real time without
        polling the API.
      </DocParagraph>

      <DocHeading level={3} id="configuration">Configuration</DocHeading>
      <DocParagraph>
        Customers can configure a webhook URL through the tenant dashboard. The webhook URL
        must be an HTTPS endpoint capable of receiving POST requests and verifying signatures.
      </DocParagraph>

      <DocHeading level={3} id="events">Events</DocHeading>
      <DocCallout variant="info" title="Webhook events">
        Webhook events are delivered via a PostgreSQL outbox with a background worker.
        Supported event types are listed on the /dashboard/webhooks endpoint. Each event is
        HMAC-signed using your webhook secret and delivered with retries (30s / 5m / 30m,
        max 4 attempts).
      </DocCallout>
      <DocParagraph>
        When the event reference is finalized, this page will document:
      </DocParagraph>
      <ul className="mt-2 space-y-1.5 pl-1 text-[15px] text-ink-600">
        <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Event type names</li>
        <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Payload structure for each event</li>
        <li className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />Retry behavior and delivery guarantees</li>
      </ul>

      <DocHeading level={3} id="security">Security</DocHeading>
      <DocParagraph>
        Webhook events are signed using HMAC. Your backend must verify the signature before
        trusting any event payload. The signature is computed using your webhook secret, which
        is separate from your API keys.
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
    </DocPageWrapper>
  );
}
