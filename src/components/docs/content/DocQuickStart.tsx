import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocQuickStart() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Quick Start</DocHeading>
      <DocParagraph>
        Get from zero to a working verification flow in five steps.
      </DocParagraph>

      <DocHeading level={3} id="step-1">Step 1 — Install the SDK</DocHeading>
      <DocParagraph>
        Install the Node.js SDK for server-side usage:
      </DocParagraph>
      <DocCode code="npm install @chirograph/verify" language="bash" filename="terminal" />
      <DocParagraph>
        Install the browser widget SDK separately:
      </DocParagraph>
      <DocCode code="npm install @chirograph/verify-widget" language="bash" filename="terminal" />
      <DocParagraph>
        Alternatively, load the widget via CDN:
      </DocParagraph>
      <DocCode
        code={`<script src="https://cdn.chirographverify.com/widget.js"></script>`}
        language="html"
        filename="index.html"
      />

      <DocHeading level={3} id="step-2">Step 2 — Configure keys</DocHeading>
      <DocParagraph>
        Set your API keys as environment variables:
      </DocParagraph>
      <DocCode
        code={`CHIROGRAPH_SECRET_KEY="sk_live_..."\nCHIROGRAPH_PUBLISHABLE_KEY="pk_live_..."`}
        language="bash"
        filename=".env"
      />
      <DocCallout variant="danger" title="Secret key — server-side only">
        <ul className="space-y-1">
          <li>Never expose the secret key in browser code</li>
          <li>Never commit it to GitHub</li>
          <li>Store it only in server-side environment variables or secrets management</li>
        </ul>
      </DocCallout>
      <DocCallout variant="info" title="Publishable key — safe for the browser">
        The publishable key is intentionally different from the secret key. It is designed for
        client-side use with the widget SDK.
      </DocCallout>

      <DocHeading level={3} id="step-3">Step 3 — Create a verification flow</DocHeading>
      <DocParagraph>
        On your backend, create a verification challenge:
      </DocParagraph>
      <DocCode
        code={`import { Chirograph } from '@chirograph/verify';

const chiro = new Chirograph(process.env.CHIROGRAPH_SECRET_KEY);

const flow = await chiro.challenges.create({
  tenant: 'acme',
  redirect_url: 'https://yourapp.com/verified',
});`}
        language="ts"
        filename="server.ts"
      />
      <DocParagraph>
        The server receives a <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sm text-ink-800">flow_id</code> and a
        hosted ceremony URL. Send the flow ID to your frontend.
      </DocParagraph>

      <DocHeading level={3} id="step-4">Step 4 — Redirect the browser</DocHeading>
      <DocParagraph>
        On your frontend, use the widget SDK to redirect the user to the hosted ceremony:
      </DocParagraph>
      <DocCode
        code={`<script src="https://cdn.chirographverify.com/widget.js"></script>
<script>
  function startVerification(flowId) {
    Chirograph.verify({
      publishableKey: 'pk_live_...',
      flowId: flowId,
      // The browser is redirected to the hosted
      // WebAuthn ceremony, then back to your app
    });
  }
</script>

<button onclick="startVerification(flowId)">
  Verify you're human
</button>`}
        language="html"
        filename="widget.html"
      />
      <DocParagraph>
        The user authenticates with their device (Face ID, Touch ID, or security key). After
        the ceremony, the browser is redirected back to your <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sm text-ink-800">redirect_url</code> with
        an opaque result token.
      </DocParagraph>

      <DocHeading level={3} id="step-5">Step 5 — Redeem the result</DocHeading>
      <DocParagraph>
        On your backend, redeem the opaque result token to confirm verification:
      </DocParagraph>
      <DocCode
        code={`const result = await chiro.flows.redeem({
  flow_id: flowId,
  result_token: resultToken, // from the redirect
});

if (result.verified) {
  // The user is verified as a real person
  await db.users.markVerified(userId, {
    trust_score: result.trust_score,
    device: result.device,
  });
}`}
        language="ts"
        filename="server.ts"
      />
      <DocCallout variant="danger" title="Never trust a browser-only success state">
        The browser must never be trusted to declare itself verified. Always redeem the result
        token on your backend before acting on the verification.
      </DocCallout>
    </DocPageWrapper>
  );
}
