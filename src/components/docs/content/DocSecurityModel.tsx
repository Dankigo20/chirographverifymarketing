import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCallout } from '@/components/docs/DocBlocks';

export function DocSecurityModel() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Security Model</DocHeading>
      <DocParagraph>
        The Chirograph Verify security model is designed so that no party — not the browser, not
        the user, not a man-in-the-middle — can forge a verification result.
      </DocParagraph>

      <DocHeading level={3} id="server-authoritative">Server-authoritative verification</DocHeading>
      <DocParagraph>
        The browser does not determine verification. The WebAuthn assertion is sent to the
        Chirograph server, which validates the signature, challenge, origin, and authenticator
        data. Only the server can issue a verified result. A client-side claim is never trusted.
      </DocParagraph>

      <DocHeading level={3} id="single-use">Single-use challenges</DocHeading>
      <DocParagraph>
        Verification challenges cannot be reused. Each challenge is issued for a single
        verification flow and is invalidated after use. Redis-backed temporary state ensures
        challenges expire and cannot be replayed.
      </DocParagraph>

      <DocHeading level={3} id="expiration">Expiration</DocHeading>
      <DocParagraph>
        Challenges expire after a short configured validity period. A challenge that is not
        completed in time must be recreated. This limits the window of opportunity for replay
        or interception attacks.
      </DocParagraph>

      <DocHeading level={3} id="webauthn">WebAuthn cryptographic verification</DocHeading>
      <DocParagraph>
        The server validates the full WebAuthn response: the signature, the challenge, the
        origin, the relying party ID, and the authenticator data. The private key never leaves
        the user's device. Chirograph receives only the cryptographic assertion.
      </DocParagraph>

      <DocHeading level={3} id="user-verification">User verification</DocHeading>
      <DocParagraph>
        A valid cryptographic signature alone is insufficient when user verification is
        required. The WebAuthn ceremony enforces user verification (UV), meaning the device must
        confirm the user's presence through a biometric or PIN. The server checks the UV flag in
        the authenticator data.
      </DocParagraph>

      <DocHeading level={3} id="signature-counter">Signature counter protection</DocHeading>
      <DocParagraph>
        The system checks authenticator signature counters where applicable. If a counter
        value is lower than or equal to a previously seen value for the same credential, this
        may indicate a cloned authenticator. The system can flag or reject such assertions.
      </DocParagraph>

      <DocHeading level={3} id="device-fingerprinting">Device fingerprinting</DocHeading>
      <DocParagraph>
        The system can use a cryptographic fingerprint derived from supported WebAuthn-related
        identifiers for abuse detection. The fingerprint is a hash — it cannot be used to
        identify the person behind a device, and raw biometric data is never stored.
      </DocParagraph>

      <DocHeading level={3} id="abuse-detection">Abuse detection</DocHeading>
      <DocParagraph>
        Repeated use of the same device fingerprint across multiple tenants can cause the
        fingerprint to be flagged according to the configured threshold. A flag is a security
        signal, not proof of fraud.
      </DocParagraph>

      <DocHeading level={3} id="key-separation">Secret and publishable key separation</DocHeading>
      <DocParagraph>
        Secret and publishable keys are separate credential types. The secret key can create
        challenges and redeem results. The publishable key can only initialize the widget. This
        separation ensures that browser-exposed credentials cannot perform privileged
        operations.
      </DocParagraph>

      <DocHeading level={3} id="webhook-security">Webhook security</DocHeading>
      <DocParagraph>
        Webhook results must be validated server-side. Every event is HMAC-signed, and your
        backend must verify the signature before trusting any payload. See the{' '}
        Webhook Security page for details.
      </DocParagraph>

      <DocCallout variant="info" title="Summary">
        The security model ensures that verification is cryptographic, server-authoritative,
        single-use, and tamper-evident. No component — browser, network, or user — can forge a
        result without a valid WebAuthn assertion from an enrolled device.
      </DocCallout>
    </DocPageWrapper>
  );
}
