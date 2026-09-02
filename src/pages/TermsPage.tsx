import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { ShieldCheck } from 'lucide-react';

export function TermsPage() {
  useSeo({
    title: 'Terms of Use — Chirograph Verify',
    description:
      'The terms governing use of the Chirograph Verify service, API, and verification infrastructure.',
    path: '/terms',
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
                <ShieldCheck className="h-3.5 w-3.5" />
                Legal
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
                Terms of Use
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
                  These Terms of Use govern your access to and use of the Chirograph Verify
                  service, including the API, widget SDK, hosted verification flows, and
                  associated developer tools (the "Service"). The Service is operated by
                  Chirograph Verify, a product based in {siteConfig.country}. By using the
                  Service, you agree to these Terms.
                </p>
              </LegalBlock>

              <LegalBlock title="2. The Service">
                <p>
                  Chirograph Verify is a device-biometric bot-prevention API. It uses
                  WebAuthn-based verification with platform authenticators (such as Face ID,
                  Touch ID, and compatible security keys) to provide a cryptographic signal
                  that a real human successfully authenticated through an enrolled device.
                </p>
                <p>
                  Verification is a technical security signal. It does not prove a person's
                  legal identity, and Chirograph Verify is not a complete identity-verification
                  service. Biometric authentication is performed locally by the user's device
                  or platform authenticator. Chirograph Verify receives the cryptographic
                  WebAuthn information required for verification — it does not receive or
                  store raw biometric data such as facial images or fingerprint images.
                </p>
              </LegalBlock>

              <LegalBlock title="3. API Usage and API Keys">
                <p>
                  Access to the Service is authenticated via API keys. You are responsible
                  for safeguarding your secret API keys and for any activity conducted using
                  your keys. Secret API keys must not be exposed in client-side or browser
                  code. Publishable widget keys are designed for browser use and are separate
                  from secret API credentials.
                </p>
                <p>
                  You must not share, transfer, or expose secret API keys to untrusted
                  parties. If you believe a key has been compromised, you should rotate it
                  immediately through the dashboard.
                </p>
              </LegalBlock>

              <LegalBlock title="4. Customer Responsibilities">
                <p>
                  As a customer (tenant) integrating Chirograph Verify, you are responsible for:
                </p>
                <List
                  items={[
                    'Integrating the API and widget SDK according to the documentation',
                    'Configuring allowed widget origins for your tenant',
                    'Redeeming verification results on your backend before trusting them',
                    'Verifying webhook signatures before processing event payloads',
                    'Your own legal and privacy obligations concerning data you submit and your end users',
                    'Ensuring your use of the Service complies with applicable laws and regulations',
                  ]}
                />
              </LegalBlock>

              <LegalBlock title="5. Acceptable Use">
                <p>You agree not to use the Service to:</p>
                <List
                  items={[
                    'Violate any applicable law or regulation',
                    'Infringe the rights of any third party',
                    'Attempt to reverse-engineer, decompile, or circumvent security measures of the Service',
                    'Abuse, overload, or interfere with the Service or its infrastructure',
                    'Use the Service for any illegal, fraudulent, or abusive purpose',
                    'Resell or sublicense access to the Service without authorization',
                  ]}
                />
              </LegalBlock>

              <LegalBlock title="6. Verification Results and Trust Scores">
                <p>
                  Verification results and trust/device scores are provided as technical
                  signals to assist you in making risk-based decisions. They are not
                  guarantees of any individual's identity, intent, or legitimacy. You are
                  responsible for how you interpret and act upon verification results and
                  trust scores in your own systems.
                </p>
                <p>
                  Device-fingerprint and abuse-detection signals may be used to identify
                  unusual patterns, such as repeated use across multiple tenants. A flagged
                  device is a security signal and does not automatically mean that a person
                  is fraudulent.
                </p>
              </LegalBlock>

              <LegalBlock title="7. Rate Limits">
                <p>
                  The Service enforces rate limits to protect infrastructure and ensure fair
                  usage. Rate limits apply at the request and flow level. Limits vary by plan
                  and may change. Exceeding rate limits may result in temporary throttling or
                  rejection of requests.
                </p>
              </LegalBlock>

              <LegalBlock title="8. Webhooks">
                <p>
                  The Service may deliver signed webhook events to your configured endpoint.
                  You are responsible for verifying webhook signatures and for the security of
                  your webhook endpoint. Chirograph Verify is not liable for events delivered
                  to an insecure or misconfigured endpoint.
                </p>
              </LegalBlock>

              <LegalBlock title="9. Intellectual Property">
                <p>
                  Chirograph Verify retains all rights, title, and interest in the Service,
                  including software, documentation, branding, and associated materials. You
                  retain all rights to your own data, integrations, and applications. No
                  intellectual property rights are transferred under these Terms except as
                  expressly stated.
                </p>
              </LegalBlock>

              <LegalBlock title="10. Service Availability">
                <p>
                  While Chirograph Verify strives to maintain reliable service, the Service is
                  provided on an "as is" and "as available" basis. We do not guarantee
                  uninterrupted or error-free operation. Scheduled maintenance and unforeseen
                  outages may occur.
                </p>
              </LegalBlock>

              <LegalBlock title="11. Suspension and Termination">
                <p>
                  Chirograph Verify may suspend or terminate access to the Service if you
                  violate these Terms, engage in abusive behavior, or for any reason upon
                  reasonable notice. You may terminate your use of the Service at any time by
                  discontinuing use and rotating your API keys.
                </p>
              </LegalBlock>

              <LegalBlock title="12. Disclaimers">
                <p>
                  The Service is provided "as is" without warranties of any kind, express or
                  implied, including warranties of merchantability, fitness for a particular
                  purpose, or non-infringement. Chirograph Verify does not warrant that
                  verification results will be accurate, complete, or error-free.
                </p>
              </LegalBlock>

              <LegalBlock title="13. Limitation of Liability">
                <p>
                  To the maximum extent permitted by applicable law, Chirograph Verify shall
                  not be liable for any indirect, incidental, special, consequential, or
                  punitive damages, or for any loss of profits, data, or business, arising from
                  your use of the Service.
                </p>
              </LegalBlock>

              <LegalBlock title="14. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Chirograph Verify from any claims,
                  damages, or expenses arising from your use of the Service, your violation of
                  these Terms, or your violation of any third-party rights.
                </p>
              </LegalBlock>

              <LegalBlock title="15. Privacy">
                <p>
                  Your use of the Service is also governed by our Privacy Policy, which
                  describes how we handle data associated with the Service. By using the
                  Service, you also agree to the Privacy Policy.
                </p>
              </LegalBlock>

              <LegalBlock title="16. Refunds and Billing">
                <p>
                  Billing is handled through the existing Chirograph Verify application. A
                  finalized refund policy will be published when billing terms are fully
                  established. For billing inquiries, contact{' '}
                  <a href={`mailto:${siteConfig.emails.support}`} className="text-primary-600 hover:underline">
                    {siteConfig.emails.support}
                  </a>
                  .
                </p>
              </LegalBlock>

              <LegalBlock title="17. Changes to These Terms">
                <p>
                  Chirograph Verify may update these Terms from time to time. Material changes
                  will be communicated through the website or by other reasonable means.
                  Continued use of the Service after changes take effect constitutes
                  acceptance of the updated Terms.
                </p>
              </LegalBlock>

              <LegalBlock title="18. Business Status">
                <p>
                  Chirograph Verify is a brand and product based in {siteConfig.country}. The
                  business legal structure is currently being finalized. Where a legal entity
                  name or registered address is required, the brand name "Chirograph Verify"
                  and the contact email below should be used.
                </p>
              </LegalBlock>

              <LegalBlock title="19. Contact">
                <p>
                  For questions about these Terms, please contact us:
                </p>
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
