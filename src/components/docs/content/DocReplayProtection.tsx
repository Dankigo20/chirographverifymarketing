import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCallout } from '@/components/docs/DocBlocks';

export function DocReplayProtection() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Replay Protection</DocHeading>
      <DocParagraph>
        Chirograph Verify is designed to prevent replay attacks at every stage of the
        verification flow. Multiple layers of protection ensure that captured challenges,
        assertions, and result tokens cannot be reused.
      </DocParagraph>

      <DocHeading level={3} id="short-lived">Short-lived challenges</DocHeading>
      <DocParagraph>
        Verification challenges are short-lived. Each challenge has a configured validity
        period after which it expires. A challenge that is not completed in time must be
        recreated. This limits the window of opportunity for replay.
      </DocParagraph>

      <DocHeading level={3} id="single-use-flow">Single-use flow</DocHeading>
      <DocParagraph>
        Each verification flow is single-use. Once a challenge has been consumed (the assertion
        has been verified), the flow cannot be reused. Any attempt to submit another assertion
        for the same flow will be rejected.
      </DocParagraph>

      <DocHeading level={3} id="server-side-verification">Server-side verification</DocHeading>
      <DocParagraph>
        All verification happens on the Chirograph server. The server validates the WebAuthn
        assertion against the original challenge, checking the signature, origin, relying party
        ID, and authenticator data. A forged or replayed assertion will fail verification.
      </DocParagraph>

      <DocHeading level={3} id="challenge-expiration">Challenge and result expiration</DocHeading>
      <DocParagraph>
        Both challenges and result tokens expire after a short validity period. An expired
        challenge cannot be used to start a ceremony, and an expired result token cannot be
        redeemed. Expiration is enforced server-side.
      </DocParagraph>

      <DocHeading level={3} id="server-side-redemption">Server-side redemption</DocHeading>
      <DocParagraph>
        Result tokens can only be redeemed by the customer's backend using the secret API key.
        The browser cannot redeem results directly. This prevents a captured token from being
        used by an attacker without access to the secret key.
      </DocParagraph>

      <DocHeading level={3} id="replay-rejection">Replay rejection</DocHeading>
      <DocParagraph>
        Each result token is single-use. Once a token has been redeemed, any subsequent
        redemption attempt for the same token will fail with an "already redeemed" error. This
        ensures that even if a token is intercepted, it can only be used once.
      </DocParagraph>

      <DocCallout variant="info" title="Summary">
        Replay protection is enforced through: short-lived challenges, single-use flows,
        server-side verification, token expiration, server-side redemption, and replay
        rejection. Together, these mechanisms make replay attacks impractical.
      </DocCallout>
    </DocPageWrapper>
  );
}
