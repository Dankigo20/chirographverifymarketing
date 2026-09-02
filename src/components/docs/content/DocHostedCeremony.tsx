import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCallout } from '@/components/docs/DocBlocks';

export function DocHostedCeremony() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Hosted Ceremony</DocHeading>
      <DocParagraph>
        The hosted ceremony is the core of the Chirograph Verify verification process. It is a
        Chirograph-hosted WebAuthn flow that runs in the user's browser after the widget SDK
        redirects them.
      </DocParagraph>

      <DocHeading level={3} id="how-it-works">How it works</DocHeading>
      <DocList
        ordered
        items={[
          'The customer backend creates a flow via the Chirograph API.',
          'The customer backend sends the flow information to the client.',
          'The widget SDK redirects the browser to the Chirograph-hosted ceremony.',
          'The user authenticates using a supported WebAuthn authenticator (Face ID, Touch ID, or security key).',
          'Chirograph verifies the authentication server-side.',
          'An opaque result is returned for server-side redemption.',
        ]}
      />

      <DocHeading level={3} id="what-happens">What happens during the ceremony</DocHeading>
      <DocParagraph>
        During the ceremony, the user's device performs a WebAuthn authentication. The device
        uses a platform authenticator (such as Face ID or Touch ID) or a roaming authenticator
        (such as a security key) to sign the challenge. The private key never leaves the
        device. Chirograph receives only the cryptographic assertion and verifies it
        server-side.
      </DocParagraph>

      <DocCallout variant="info" title="Biometrics stay on the device">
        Chirograph Verify does not receive or store raw biometric data. Face ID, Touch ID, or
        another platform authenticator performs the local authentication process. Chirograph
        receives only the cryptographic WebAuthn result necessary for verification.
      </DocCallout>

      <DocHeading level={3} id="redirect">Redirect behavior</DocHeading>
      <DocParagraph>
        The widget SDK performs a top-level browser redirect to the hosted ceremony. It is not
        an iframe, modal, or inline component. After the ceremony completes, the browser is
        redirected back to the <code className="rounded bg-ink-100 px-1 py-0.5 font-mono text-sm text-ink-800">redirect_url</code> specified
        when the flow was created.
      </DocParagraph>

      <DocCallout variant="danger" title="Never trust a browser-only success state">
        The customer's backend must redeem the result. A browser-only success state is never
        sufficient to consider a user verified. Always perform server-side redemption before
        acting on the verification.
      </DocCallout>

      <DocHeading level={3} id="unsupported-browsers">Unsupported browsers</DocHeading>
      <DocParagraph>
        If the user's browser does not support WebAuthn, or no authenticator is available, the
        ceremony will fail gracefully. The user will be redirected back to the application with
        an error result. Your application should handle this case and provide an appropriate
        fallback or message.
      </DocParagraph>
    </DocPageWrapper>
  );
}
