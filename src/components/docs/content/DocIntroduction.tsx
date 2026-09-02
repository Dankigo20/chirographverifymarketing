import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCallout } from '@/components/docs/DocBlocks';

export function DocIntroduction() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Introduction</DocHeading>
      <DocParagraph>
        Chirograph Verify is a device-biometric bot-prevention API that uses WebAuthn to help
        applications distinguish legitimate human interactions from automated or abusive activity.
      </DocParagraph>
      <DocParagraph>
        Instead of relying on CAPTCHA puzzles, SMS codes, or passwords, Chirograph Verify uses
        platform authenticators — such as Face ID, Touch ID, and compatible security keys — to
        produce a cryptographic signal that a real human successfully authenticated through an
        enrolled device.
      </DocParagraph>

      <DocCallout variant="info" title="What Chirograph Verify is not">
        Chirograph Verify is not facial-recognition software. It does not receive or store raw
        Face ID or Touch ID data, fingerprint images, or raw biometric sensor data. Biometric
        authentication is performed locally by the user's device. Chirograph Verify receives only
        the cryptographic WebAuthn information required for verification.
      </DocCallout>

      <DocHeading level={3} id="architecture">Fundamental architecture</DocHeading>
      <DocParagraph>
        The core principle of Chirograph Verify is:
      </DocParagraph>
      <DocCallout variant="info" title="The browser is never the authority">
        The customer's backend creates the verification flow. The browser performs the hosted
        WebAuthn ceremony. The customer's backend redeems the resulting opaque token. The
        customer's backend decides what to do with the verification result.
      </DocCallout>

      <DocHeading level={3} id="three-steps">Three steps</DocHeading>
      <DocParagraph>
        Every verification follows the same three-step pattern:
      </DocParagraph>
      <DocList
        ordered
        items={[
          <><strong>Challenge</strong> — Your backend creates a verification flow via the Chirograph API and receives a single-use flow ID.</>,
          <><strong>Ceremony</strong> — The browser is redirected to the hosted WebAuthn ceremony where the user authenticates with their device.</>,
          <><strong>Redeem</strong> — Your backend redeems the opaque result token server-side to confirm the verification.</>,
        ]}
      />
      <DocParagraph>
        The browser never decides whether a user is verified. Only the Chirograph server can
        verify the WebAuthn assertion, and only your backend can redeem the final result.
      </DocParagraph>

      <DocHeading level={3} id="what-you-build">What you build</DocHeading>
      <DocList
        items={[
          'A backend integration that creates challenges and redeems results using your secret API key',
          'A frontend that triggers the widget SDK to redirect users to the hosted ceremony',
          'A webhook endpoint (optional) to receive signed verification events in real time',
        ]}
      />
    </DocPageWrapper>
  );
}
