import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { Lock } from 'lucide-react';

export function PrivacyPage() {
  useSeo({
    title: 'Privacy Policy — Chirograph Verify',
    description:
      'How Chirograph Verify handles account information, API credentials, verification data, WebAuthn information, device fingerprints, and abuse-detection signals.',
    path: '/privacy',
  });

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-16">
        <div className="absolute inset-0 bg-grid mask-fade-b" />
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-100/40 to-transparent blur-3xl" />
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <Badge variant="primary" className="mb-5">
                <Lock className="h-3.5 w-3.5" />
                Legal
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-sm text-ink-400">
                Last updated: September 2, 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <Reveal delay={100}>
            <div className="mx-auto max-w-3xl space-y-8">
              <LegalBlock title="1. Overview">
                <p>
                  This Privacy Policy describes how Chirograph Verify ("we") handles data
                  associated with the Chirograph Verify service (the "Service"). The Service is
                  a device-biometric bot-prevention API operated by the Chirograph Verify
                  brand, based in {siteConfig.country}.
                </p>
                <p>
                  Chirograph Verify is designed to verify that a real human successfully
                  authenticated through an enrolled device using WebAuthn. It is not a
                  facial-recognition system, does not receive or store raw biometric data, and
                  does not identify a person's real-world identity from biometrics.
                </p>
              </LegalBlock>

              <LegalBlock title="2. Account and Tenant Information">
                <p>
                  When you create a Chirograph Verify account (tenant), we may process the
                  following types of account and configuration information:
                </p>
                <List
                  items={[
                    'Tenant ID and tenant name',
                    'Billing tier and usage information',
                    'Webhook configuration (endpoint URL)',
                    'Widget allowed-origin configuration',
                    'Branding configuration',
                    'Authentication information managed through WorkOS AuthKit',
                  ]}
                />
              </LegalBlock>

              <LegalBlock title="3. API Credentials">
                <p>
                  Secret API keys are intended to be kept confidential and used only on your
                  backend. The backend stores a cryptographic hash of your secret API key
                  rather than the plaintext key. Publishable widget keys are designed for
                  browser-side use and are separate from secret API credentials. You are
                  responsible for protecting your secret keys.
                </p>
              </LegalBlock>

              <LegalBlock title="4. Verification Information">
                <p>
                  During the verification process, the system may process the following:
                </p>
                <List
                  items={[
                    'Challenge IDs and flow IDs',
                    'Tenant IDs',
                    'User references supplied by you (the customer)',
                    'Challenge status and creation/expiration timestamps',
                    'Verification status and verification timestamps',
                    'Technical WebAuthn authentication information necessary to verify the ceremony',
                  ]}
                />
              </LegalBlock>

              <LegalBlock title="5. WebAuthn Information">
                <p>
                  Chirograph Verify processes WebAuthn authentication information necessary to
                  verify the authentication ceremony. This includes cryptographic assertions,
                  authenticator data, and related protocol fields defined by the WebAuthn
                  standard. This information is used to verify that a device successfully
                  completed the ceremony.
                </p>
              </LegalBlock>

              <LegalBlock title="6. Biometrics — What We Do Not Receive">
                <p className="font-medium text-ink-800">
                  Chirograph Verify does not need to receive or store raw biometric information.
                </p>
                <p>
                  Specifically, we do not receive or store:
                </p>
                <List
                  items={[
                    'Facial images or facial scan data',
                    'Fingerprint images or fingerprint templates',
                    'Raw biometric sensor data',
                    'Raw biometric templates of any kind',
                  ]}
                />
                <p>
                  Face ID, Touch ID, or another platform authenticator performs the local
                  authentication process on the user's device. Chirograph Verify receives only
                  the cryptographic WebAuthn result necessary for verification. Biometric data
                  stays on the device and is managed by the device's secure enclave or
                  equivalent platform security features.
                </p>
              </LegalBlock>

              <LegalBlock title="7. Device Fingerprints">
                <p>
                  The backend can generate a cryptographic device fingerprint from supported
                  WebAuthn-related identifiers. The resulting hash is stored for security and
                  abuse-detection purposes. We do not store raw biometric data, and the device
                  fingerprint cannot be used to identify the person behind a device.
                </p>
              </LegalBlock>

              <LegalBlock title="8. Abuse Detection">
                <p>
                  Device-related security signals may be used to detect unusual patterns, such
                  as repeated use of the same device across multiple customer tenants. A
                  flagged device is a security signal and does not automatically mean that a
                  person is fraudulent. These signals help protect the integrity of the Service
                  and all tenants.
                </p>
              </LegalBlock>

              <LegalBlock title="9. Data Retention">
                <p>
                  Verification challenges and temporary ceremony state are short-lived and
                  backed by Redis for ephemeral storage. Durable records, such as tenant
                  configuration and verification logs, are stored in PostgreSQL. Retention
                  periods for verification records may vary based on your plan and
                  configuration.
                </p>
              </LegalBlock>

              <LegalBlock title="10. Security">
                <p>
                  Chirograph Verify employs security measures including API-key authentication,
                  rate limiting, single-use challenges, origin validation, webhook signature
                  verification, and tenant isolation. We do not publish implementation details
                  that could compromise security. No system is perfectly secure, and we
                  continuously work to improve our security posture.
                </p>
              </LegalBlock>

              <LegalBlock title="11. Customer Responsibility">
                <p>
                  Customers integrating Chirograph Verify are responsible for their own legal
                  and privacy obligations concerning data they submit to the API and their end
                  users. This includes any disclosures, consent mechanisms, or regulatory
                  requirements applicable to the customer's use case and jurisdiction.
                </p>
              </LegalBlock>

              <LegalBlock title="12. No Compliance Certifications Claimed">
                <p>
                  Chirograph Verify does not currently hold GDPR, SOC 2, ISO 27001, HIPAA, PCI
                  DSS, or other compliance certifications. We do not claim certifications that
                  do not exist. If certifications are obtained in the future, this policy will be
                  updated accordingly.
                </p>
              </LegalBlock>

              <LegalBlock title="13. Cookies">
                <p>
                  For information about cookies and similar technologies used by this website,
                  please see our{' '}
                  <a href="/#/cookies" className="text-primary-600 hover:underline">
                    Cookie Policy
                  </a>
                  .
                </p>
              </LegalBlock>

              <LegalBlock title="14. Changes to This Policy">
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be
                  communicated through the website or by other reasonable means. Continued use
                  of the Service after changes take effect constitutes acknowledgment of the
                  updated policy.
                </p>
              </LegalBlock>

              <LegalBlock title="15. Contact">
                <p>For privacy questions or requests, please contact us:</p>
                <List
                  items={[
                    `General: ${siteConfig.emails.hello}`,
                    `Support: ${siteConfig.emails.support}`,
                    `Administrative: ${siteConfig.emails.admin}`,
                  ]}
                />
              </LegalBlock>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-200 bg-white p-7 lg:p-8">
      <h2 className="text-lg font-semibold text-ink-900">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-600 [&_a]:text-primary-600 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
