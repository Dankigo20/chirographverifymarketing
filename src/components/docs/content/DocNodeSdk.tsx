import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocTable, DocList } from '@/components/docs/DocBlocks';

export function DocNodeSdk() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Node.js SDK</DocHeading>
      <DocParagraph>
        The official Node.js SDK provides a typed client for server-side integration with the
        Chirograph Verify API.
      </DocParagraph>

      <DocHeading level={3} id="installation">Installation</DocHeading>
      <DocParagraph>No npm package is required for server-side integration — use fetch or your HTTP client against the REST API.</DocParagraph>

      <DocHeading level={3} id="initialization">Initialization</DocHeading>
      <DocCode
        code={`const SK_LIVE_KEY = process.env.SK_LIVE_KEY;

// Use fetch or your HTTP client against the REST API
// POST /v1/widget/flows, POST /v1/widget/redeem, etc.`}
        language="ts"
        filename="server.ts"
      />
      <DocCallout variant="danger" title="Server-side only">
        The Node.js SDK uses your secret API key. Never import or initialize it in browser code.
      </DocCallout>

      <DocHeading level={3} id="methods">Methods</DocHeading>
      <DocCallout variant="info" title="No published npm package">
        There is no published npm package for server-side integration. The widget SDK is
        self-hosted as <code className="font-mono text-sm">/widget.js</code> on your Chirograph
        domain. Server-side API calls use the REST endpoints directly via fetch or your HTTP
        client of choice.
      </DocCallout>

      <DocHeading level={3} id="example">Complete example</DocHeading>
      <DocCode
        code={`// Server-side: create a widget flow
const response = await fetch('https://YOUR-CHIROGRAPH-DOMAIN/v1/widget/flows', {
  method: 'POST',
  headers: {
    'X-Widget-Key': 'YOUR_PUBLISHABLE_WIDGET_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_reference: 'user@example.com',
    redirect_url: 'https://yourapp.com/auth/callback',
    purpose: 'register',
  }),
});

const { flow_id, hosted_url } = await response.json();
// Redirect browser to hosted_url

// After the ceremony, redeem the result
const redeemResponse = await fetch('https://YOUR-CHIROGRAPH-DOMAIN/v1/widget/redeem', {
  method: 'POST',
  headers: {
    'X-API-Key': 'YOUR_TENANT_SECRET_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ result_token: flowResult }),
});

const result = await redeemResponse.json();
if (result.verified) {
  console.log('User verified with trust score:', result.device_trust_score);
} else {
  console.log('Verification failed');
}`}
        language="ts"
        filename="server.ts"
      />

      <DocHeading level={3} id="errors">Error behavior</DocHeading>
      <DocParagraph>
        The SDK throws typed errors for API failures. Common error types include:
      </DocParagraph>
      <DocList
        items={[
          <><code className="font-mono text-sm text-ink-800">AuthenticationError</code> — Invalid or missing API key</>,
          <><code className="font-mono text-sm text-ink-800">ValidationError</code> — Missing or invalid request parameters</>,
          <><code className="font-mono text-sm text-ink-800">RateLimitError</code> — Rate limit exceeded</>,
          <><code className="font-mono text-sm text-ink-800">ExpiredFlowError</code> — The flow or challenge has expired</>,
          <><code className="font-mono text-sm text-ink-800">AlreadyRedeemedError</code> — The result token has already been used</>,
        ]}
      />
    </DocPageWrapper>
  );
}
