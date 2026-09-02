import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocList } from '@/components/docs/DocBlocks';

export function DocWebhookSecurity() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Webhook Security</DocHeading>
      <DocParagraph>
        Webhook events are signed using HMAC. Your backend must verify the signature before
        trusting any event payload. This prevents forged webhook deliveries and ensures that
        verification events are authentic.
      </DocParagraph>

      <DocHeading level={3} id="signature-verification">Signature verification</DocHeading>
      <DocParagraph>
        Each webhook event includes a signature in the <code className="font-mono text-sm text-ink-800">X-Chirograph-Signature</code> header.
        The signature is computed as an HMAC-SHA256 of the raw request body using your webhook
        secret.
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
}

// In your webhook handler:
const signature = req.headers['x-chirograph-signature'];
const rawBody = await req.text(); // raw body, not parsed JSON

if (!verifyWebhook(rawBody, signature, process.env.CHIROGRAPH_WEBHOOK_SECRET)) {
  return new Response('Invalid signature', { status: 401 });
}

// Signature verified — safe to process the event
const event = JSON.parse(rawBody);`}
        language="ts"
        filename="webhook-handler.ts"
      />

      <DocHeading level={3} id="replay-protection">Replay protection</DocHeading>
      <DocParagraph>
        Webhook events include a timestamp. Your backend should validate that the timestamp is
        within an acceptable window (e.g., 5 minutes) to prevent replay attacks. Events with
        timestamps outside the window should be rejected.
      </DocParagraph>

      <DocHeading level={3} id="timestamp-validation">Timestamp validation</DocHeading>
      <DocList
        items={[
          'Check that the event timestamp is within an acceptable window of the current time',
          'Reject events with timestamps that are too old or too far in the future',
          'This prevents an attacker from replaying a captured webhook event at a later time',
        ]}
      />

      <DocHeading level={3} id="secret-handling">Secret handling</DocHeading>
      <DocCallout variant="danger" title="Protect your webhook secret">
        <ul className="space-y-1">
          <li>Store the webhook secret in server-side environment variables — never in browser code</li>
          <li>Never commit the webhook secret to Git</li>
          <li>Rotate the secret if you suspect it has been exposed</li>
          <li>Use a different secret for development and production environments</li>
        </ul>
      </DocCallout>

      <DocHeading level={3} id="security-checklist">Security checklist</DocHeading>
      <DocList
        items={[
          'Verify the HMAC signature of every webhook event',
          'Use the raw request body for signature computation — not a parsed JSON object',
          'Use timing-safe comparison to prevent timing attacks',
          'Validate the event timestamp to prevent replay attacks',
          'Return a 200 response quickly to acknowledge receipt',
          'Process events asynchronously to avoid timeouts',
          'Store your webhook secret securely',
        ]}
      />
    </DocPageWrapper>
  );
}
