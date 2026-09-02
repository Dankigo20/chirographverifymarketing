import { DocPageWrapper, DocHeading, DocParagraph, DocCode, DocCallout, DocTable, DocList, ComingSoonBadge } from '@/components/docs/DocBlocks';

export function DocNodeSdk() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Node.js SDK</DocHeading>
      <DocParagraph>
        The official Node.js SDK provides a typed client for server-side integration with the
        Chirograph Verify API.
      </DocParagraph>

      <DocHeading level={3} id="installation">Installation</DocHeading>
      <DocCode code="npm install @chirograph/verify" language="bash" filename="terminal" />

      <DocHeading level={3} id="initialization">Initialization</DocHeading>
      <DocCode
        code={`import { Chirograph } from '@chirograph/verify';

const chiro = new Chirograph(process.env.CHIROGRAPH_SECRET_KEY);`}
        language="ts"
        filename="server.ts"
      />
      <DocCallout variant="danger" title="Server-side only">
        The Node.js SDK uses your secret API key. Never import or initialize it in browser code.
      </DocCallout>

      <DocHeading level={3} id="methods">Methods</DocHeading>
      <ComingSoonBadge />
      <DocCallout variant="info" title="SDK method reference pending implementation">
        The <code className="font-mono text-sm">@chirograph/verify</code> npm package is planned
        but not yet published. The methods below represent the intended API surface based on the
        existing backend endpoints. When the SDK is published, this page will be updated with
        complete method signatures, parameter types, return types, and error behavior.
      </DocCallout>

      <DocTable
        headers={['Method', 'Parameters', 'Description']}
        rows={[
          [<code className="font-mono text-sm text-ink-800">chiro.challenges.create()</code>, <code className="font-mono text-sm text-ink-800">{'{ tenant, redirect_url }'}</code>, 'Creates a single-use verification challenge and returns a flow ID.'],
          [<code className="font-mono text-sm text-ink-800">chiro.flows.redeem()</code>, <code className="font-mono text-sm text-ink-800">{'{ flow_id, result_token }'}</code>, 'Redeems an opaque result token and returns the verification result.'],
          [<code className="font-mono text-sm text-ink-800">chiro.verify()</code>, <code className="font-mono text-sm text-ink-800">{'{ flow_id, assertion }'}</code>, 'Verifies a WebAuthn assertion server-side.'],
        ]}
      />

      <DocHeading level={3} id="example">Complete example</DocHeading>
      <DocCode
        code={`import { Chirograph } from '@chirograph/verify';

const chiro = new Chirograph(process.env.CHIROGRAPH_SECRET_KEY);

// 1. Create a challenge
const flow = await chiro.challenges.create({
  tenant: 'acme',
  redirect_url: 'https://yourapp.com/verified',
});

// Send flow.flow_id to your frontend

// 2. After the ceremony, redeem the result
// (result_token comes from the redirect back to your app)
const result = await chiro.flows.redeem({
  flow_id: flow.flow_id,
  result_token: resultToken,
});

if (result.verified) {
  console.log('User verified with trust score:', result.trust_score);
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
