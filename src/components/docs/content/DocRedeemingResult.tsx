import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCode, DocCallout } from '@/components/docs/DocBlocks';

export function DocRedeemingResult() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Redeeming the Result</DocHeading>
      <DocParagraph>
        After the hosted ceremony completes, the browser is redirected back to your application
        with an opaque result token. This token is meaningless on its own — it must be redeemed
        server-side via the Chirograph API to obtain the final verification result.
      </DocParagraph>

      <DocHeading level={3} id="flow">The redemption flow</DocHeading>
      <DocCode
        code={`browser
→ opaque result
→ customer's backend
→ Chirograph API
→ verification result`}
        language="text"
      />

      <DocHeading level={3} id="opaque-token">Opaque result token</DocHeading>
      <DocParagraph>
        The result token returned to the browser is opaque. It cannot be interpreted or
        validated client-side. It is a single-use, short-lived token that can only be redeemed
        by your backend using your secret API key.
      </DocParagraph>

      <DocHeading level={3} id="server-side-example">Server-side example</DocHeading>
      <DocCode
        code={`import { Chirograph } from '@chirograph/verify';

const chiro = new Chirograph(process.env.CHIROGRAPH_SECRET_KEY);

// The result_token comes from the redirect back to your app
const result = await chiro.flows.redeem({
  flow_id: flowId,
  result_token: resultToken,
});

if (result.verified) {
  // Verification confirmed by Chirograph server-side
  await db.users.markVerified(userId, {
    trust_score: result.trust_score,
    device: result.device,
  });
} else {
  // Verification failed or was invalid
  throw new Error('Verification failed');
}`}
        language="ts"
        filename="redeem.ts"
      />

      <DocHeading level={3} id="outcomes">Redemption outcomes</DocHeading>
      <DocList
        items={[
          <><strong>Successful redemption</strong> — The result token is valid, the flow was verified, and the verification result is returned with a trust score.</>,
          <><strong>Invalid or expired result</strong> — The result token has expired or has already been redeemed. The API returns an error indicating the token is no longer valid.</>,
          <><strong>Replay rejection</strong> — Each result token is single-use. Attempting to redeem the same token twice will fail on the second attempt.</>,
        ]}
      />

      <DocCallout variant="danger" title="Never trust a browser-only verified state">
        The browser must never be trusted to declare itself verified. A client-side{' '}
        <code className="font-mono text-sm">verified = true</code> is never sufficient. Always
        redeem the result token on your backend before acting on the verification.
      </DocCallout>

      <DocHeading level={3} id="replay-protection">Replay protection</DocHeading>
      <DocParagraph>
        Result tokens are single-use. Once a token has been redeemed, it cannot be redeemed
        again. This prevents replay attacks where a captured token is reused. Additionally,
        tokens expire after a short validity period, so a token that is not redeemed in time
        will be rejected.
      </DocParagraph>
    </DocPageWrapper>
  );
}
