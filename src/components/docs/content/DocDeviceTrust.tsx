import { DocPageWrapper, DocHeading, DocParagraph, DocList, DocCallout } from '@/components/docs/DocBlocks';

export function DocDeviceTrust() {
  return (
    <DocPageWrapper>
      <DocHeading level={2}>Device Trust &amp; Abuse Detection</DocHeading>
      <DocParagraph>
        Chirograph Verify produces a trust score and device-level signals to help you make
        risk-based decisions. These signals are based on the WebAuthn ceremony, device
        fingerprinting, and cross-tenant abuse detection.
      </DocParagraph>

      <DocHeading level={3} id="device-fingerprinting">Device fingerprinting</DocHeading>
      <DocParagraph>
        The backend can generate a cryptographic device fingerprint from supported
        WebAuthn-related identifiers. The resulting hash is stored for security and
        abuse-detection purposes. The fingerprint is a hash — it cannot be used to identify the
        person behind a device, and raw biometric data is never stored.
      </DocParagraph>

      <DocHeading level={3} id="trust-score">Trust score</DocHeading>
      <DocParagraph>
        Each verification result includes a trust score that reflects the confidence of the
        verification. The trust score is based on the WebAuthn ceremony outcome, user
        verification status, authenticator counter checks, and device fingerprint signals.
      </DocParagraph>

      <DocHeading level={3} id="outcomes">Verification outcomes</DocHeading>

      <div className="mt-5 space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">P</span>
            <h4 className="text-sm font-semibold text-ink-900">Pass</h4>
          </div>
          <p className="mt-2 text-sm text-ink-600">
            Valid authentication, user verification, counter checks, and no active fingerprint
            flag. The user is verified with a high trust score.
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">F</span>
            <h4 className="text-sm font-semibold text-ink-900">Flag</h4>
          </div>
          <p className="mt-2 text-sm text-ink-600">
            Verification succeeds, but the device fingerprint meets the configured cross-tenant
            abuse threshold. The user is verified, but the result includes a flag signal.
          </p>
        </div>

        <div className="rounded-xl border border-error-200 bg-error-500/5 p-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-error-500 text-xs font-bold text-white">X</span>
            <h4 className="text-sm font-semibold text-ink-900">Fail</h4>
          </div>
          <p className="mt-2 text-sm text-ink-600">
            Verification fails. Examples include:
          </p>
          <ul className="mt-2 space-y-1 pl-4 text-sm text-ink-600">
            <li>Invalid authentication</li>
            <li>Missing user verification</li>
            <li>Expired challenge</li>
            <li>Replay attempt</li>
            <li>Counter failure (possible cloned authenticator)</li>
          </ul>
        </div>
      </div>

      <DocCallout variant="info" title="A flag is a signal, not proof of fraud">
        A flagged device is a security signal and does not automatically mean that a person is
        fraudulent. The flag indicates that the device fingerprint has been seen across
        multiple tenants above the configured threshold. You decide how to act on this signal
        in your application.
      </DocCallout>

      <DocHeading level={3} id="how-to-use">How to use trust signals</DocHeading>
      <DocList
        items={[
          'Use the trust score to apply risk-based decisions (e.g., require additional verification for low scores)',
          'Use the flag signal to limit access, apply rate limits, or require manual review',
          'Combine trust signals with your own abuse-detection systems for layered protection',
          'Never use a flag as the sole basis for banning a user — it is a signal, not proof',
        ]}
      />
    </DocPageWrapper>
  );
}
