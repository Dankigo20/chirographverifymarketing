import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocList } from '@/components/docs/DocBlocks';

export function DocNodeSdk() {
  return (
    <DocPageWrapper>
      <DocHeading level={1}>Node.js SDK</DocHeading>
      <DocParagraph>
        Server-side integration with the Chirograph Verify API. There is no published npm
        package today — call the REST API with <code className="font-mono text-sm text-zinc-200">fetch</code>{' '}
        or your HTTP client of choice.
      </DocParagraph>

      <DocHeading level={3} id="installation">Installation</DocHeading>
      <DocParagraph>
        No npm package is required for server-side integration — use fetch or your HTTP client
        against the REST API.
      </DocParagraph>

      <DocHeading level={3} id="initialization">Initialization</DocHeading>
      <DocCode
        code={`const CHIROGRAPH_SECRET_KEY = process.env.CHIROGRAPH_SECRET_KEY;
const CHIROGRAPH_API = 'https://app.chirographverify.com';

// Server-side endpoints:
// POST /v1/challenge, POST /v1/verify, POST /v1/widget/redeem`}
        language="ts"
        filename="server.ts"
      />
      <DocCallout variant="danger" title="Server-side only">
        Server-side calls use your secret API key. Never send it from browser code.
      </DocCallout>

      <DocHeading level={3} id="methods">Methods</DocHeading>
      <DocCallout variant="info" title="No published npm package">
        There is no published npm package for server-side integration. The browser widget SDK is
        self-hosted as <code className="font-mono text-sm">/widget.js</code> on your Chirograph
        domain. Server-side API calls use the REST endpoints directly via fetch or your HTTP
        client of choice.
      </DocCallout>

      <DocHeading level={3} id="example">Complete example</DocHeading>
      <DocCode
        code={`// Server-side: create a single-use challenge
const response = await fetch('https://YOUR-CHIROGRAPH-DOMAIN/v1/challenge', {
  method: 'POST',
  headers: {
    'X-API-Key': CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tenant_id: 'YOUR_TENANT_UUID',
    user_reference: 'user@example.com',
    redirect_url: 'https://yourapp.com/auth/callback',
    purpose: 'authenticate',
  }),
});

const { challenge_id, challenge_url } = await response.json();
// Send the challenge options to the browser and complete the WebAuthn ceremony,
// then verify the assertion (POST /v1/verify) or redeem a widget result
// (POST /v1/widget/redeem) on your server.

const redeemResponse = await fetch('https://YOUR-CHIROGRAPH-DOMAIN/v1/widget/redeem', {
  method: 'POST',
  headers: {
    'X-API-Key': CHIROGRAPH_SECRET_KEY,
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
        The API returns JSON error bodies with a stable{' '}
        <code className="font-mono text-sm text-zinc-200">error</code> code. Common codes:
      </DocParagraph>
      <DocList
        items={[
          <><code className="font-mono text-sm text-zinc-200">unauthorized</code> — Invalid or missing API key (401)</>,
          <><code className="font-mono text-sm text-zinc-200">forbidden</code> — Tenant mismatch or origin/redirect not allowlisted (403)</>,
          <><code className="font-mono text-sm text-zinc-200">invalid_request</code> — Missing or invalid request parameters (400)</>,
          <><code className="font-mono text-sm text-zinc-200">user_not_enrolled</code> — No credential enrolled for authentication (400)</>,
          <><code className="font-mono text-sm text-zinc-200">verification_failed</code> — Invalid, expired, or already-consumed challenge (400)</>,
          <><code className="font-mono text-sm text-zinc-200">invalid_result_token</code> — Result token invalid or already redeemed (400)</>,
          <><code className="font-mono text-sm text-zinc-200">rate_limited</code> / <code className="font-mono text-sm text-zinc-200">quota_exceeded</code> — Rate or quota limit (429)</>,
        ]}
      />
    </DocPageWrapper>
  );
}
