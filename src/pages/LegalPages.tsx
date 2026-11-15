import { GlassCard } from '../components/GlassCard';
import { SITE_EMAILS } from '../data/chirographContent';

// ── Terms of Use ──────────────────────────────────────────────────────────────

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Terms of Use
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          {[
            { title: '1. Overview', body: 'These Terms of Use govern your access to and use of the Chirograph Verify service, including the API, widget SDK, hosted verification flows, and associated developer tools (the "Service"). The Service is operated by Chirograph Verify, a product based in Egypt. By using the Service, you agree to these Terms.' },
          ].map(() => null)}

          <section className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              These Terms of Use govern your access to and use of the Chirograph Verify service, including the API, widget SDK, hosted verification flows, and associated developer tools (the &quot;Service&quot;). The Service is operated by Chirograph Verify, a product based in Egypt. By using the Service, you agree to these Terms.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. The Service</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify is a device-biometric bot-prevention API. It uses WebAuthn-based verification with platform authenticators (such as Face ID, Touch ID, and compatible security keys) to provide a cryptographic signal that a valid passkey assertion from an enrolled device. Verification is a technical signal; it does not prove identity, uniqueness, or liveness.
            </p>
            <p className="mt-3 text-zinc-400">
              Verification is a technical security signal. It does not prove a person&apos;s legal identity, and Chirograph Verify is not a complete identity-verification service. Biometric authentication is performed locally by the user&apos;s device or platform authenticator. Chirograph Verify receives the cryptographic WebAuthn information required for verification — it does not receive or store raw biometric data such as facial images or fingerprint images.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. API Usage and API Keys</h2>
            <p className="mt-2 text-zinc-400">
              Access to the Service is authenticated via API keys. You are responsible for safeguarding your secret API keys and for any activity conducted using your keys. Secret API keys must not be exposed in client-side or browser code. Publishable widget keys are designed for browser use and are separate from secret API credentials.
            </p>
            <p className="mt-3 text-zinc-400">
              You must not share, transfer, or expose secret API keys to untrusted parties. If you believe a key has been compromised, you should rotate it immediately through the dashboard.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">4. Customer Responsibilities</h2>
            <p className="mt-2 text-zinc-400">As a customer (tenant) integrating Chirograph Verify, you are responsible for:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Integrating the API and widget SDK according to the documentation</li>
              <li>Configuring allowed widget origins for your tenant</li>
              <li>Redeeming verification results on your backend before trusting them</li>
              <li>Verifying webhook signatures before processing event payloads</li>
              <li>Your own legal and privacy obligations concerning data you submit and your end users</li>
              <li>Ensuring your use of the Service complies with applicable laws and regulations</li>
            </ul>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">5. Acceptable Use</h2>
            <p className="mt-2 text-zinc-400">You agree not to use the Service to:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Violate any applicable law or regulation</li>
              <li>Infringe the rights of any third party</li>
              <li>Attempt to reverse-engineer, decompile, or circumvent security measures of the Service</li>
              <li>Abuse, overload, or interfere with the Service or its infrastructure</li>
              <li>Use the Service for any illegal, fraudulent, or abusive purpose</li>
              <li>Resell or sublicense access to the Service without authorization</li>
            </ul>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">6. Verification Results and Trust Scores</h2>
            <p className="mt-2 text-zinc-400">
              Verification results and trust/device scores are provided as technical signals to assist you in making risk-based decisions. They are not guarantees of any individual&apos;s identity, intent, or legitimacy. You are responsible for how you interpret and act upon verification results and trust scores in your own systems.
            </p>
            <p className="mt-3 text-zinc-400">
              Device-fingerprint and abuse-detection signals may be used to identify unusual patterns, such as repeated use across multiple tenants. A flagged device is a security signal and does not automatically mean that a person is fraudulent.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">7. Rate Limits</h2>
            <p className="mt-2 text-zinc-400">
              The Service enforces rate limits to protect infrastructure and ensure fair usage. Rate limits apply at the request and flow level. Limits vary by plan and may change. Exceeding rate limits may result in temporary throttling or rejection of requests.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">8. Webhooks</h2>
            <p className="mt-2 text-zinc-400">
              The Service may deliver signed webhook events to your configured endpoint. You are responsible for verifying webhook signatures and for the security of your webhook endpoint. Chirograph Verify is not liable for events delivered to an insecure or misconfigured endpoint.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">9. Intellectual Property</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify retains all rights, title, and interest in the Service, including software, documentation, branding, and associated materials. You retain all rights to your own data, integrations, and applications. No intellectual property rights are transferred under these Terms except as expressly stated.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">10. Service Availability</h2>
            <p className="mt-2 text-zinc-400">
              While Chirograph Verify strives to maintain reliable service, the Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not guarantee uninterrupted or error-free operation. Scheduled maintenance and unforeseen outages may occur.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">11. Suspension and Termination</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify may suspend or terminate access to the Service if you violate these Terms, engage in abusive behavior, or for any reason upon reasonable notice. You may terminate your use of the Service at any time by discontinuing use and rotating your API keys.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">12. Disclaimers</h2>
            <p className="mt-2 text-zinc-400">
              The Service is provided &quot;as is&quot; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. Chirograph Verify does not warrant that verification results will be accurate, complete, or error-free.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">13. Limitation of Liability</h2>
            <p className="mt-2 text-zinc-400">
              To the maximum extent permitted by applicable law, Chirograph Verify shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, data, or business, arising from your use of the Service.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">14. Indemnification</h2>
            <p className="mt-2 text-zinc-400">
              You agree to indemnify and hold harmless Chirograph Verify from any claims, damages, or expenses arising from your use of the Service, your violation of these Terms, or your violation of any third-party rights.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">15. Privacy</h2>
            <p className="mt-2 text-zinc-400">
              Your use of the Service is also governed by our Privacy Policy, which describes how we handle data associated with the Service. By using the Service, you also agree to the Privacy Policy.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">16. Refunds and Billing</h2>
            <p className="mt-2 text-zinc-400">
              Billing is handled through the existing Chirograph Verify application. A finalized refund policy will be published when billing terms are fully established. For billing inquiries, contact{' '}
              <a href={`mailto:${SITE_EMAILS.support}`} className="text-emerald-400 underline underline-offset-4">
                {SITE_EMAILS.support}
              </a>
              .
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">17. Changes to These Terms</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify may update these Terms from time to time. Material changes will be communicated through the website or by other reasonable means. Continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">18. Business Status</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify is a brand and product based in Egypt. The business legal structure is currently being finalized. Where a legal entity name or registered address is required, the brand name &quot;Chirograph Verify&quot; and the contact email below should be used.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">19. Contact</h2>
            <p className="mt-2 text-zinc-400">For questions about these Terms, please contact us:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>General: {SITE_EMAILS.hello}</li>
              <li>Support: {SITE_EMAILS.support}</li>
              <li>Administrative: {SITE_EMAILS.admin}</li>
            </ul>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Privacy Policy ────────────────────────────────────────────────────────────

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <section className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              This Privacy Policy describes how Chirograph Verify (&quot;we&quot;) handles data associated with the Chirograph Verify service (the &quot;Service&quot;). The Service is a device-biometric bot-prevention API operated by the Chirograph Verify brand, based in Egypt.
            </p>
            <p className="mt-3 text-zinc-400">
              Chirograph Verify is designed to verify a valid passkey assertion from an enrolled device. Verification is a technical signal; it does not prove identity, uniqueness, or liveness. It is not a facial-recognition system, does not receive or store raw biometric data, and does not identify a person&apos;s real-world identity from biometrics.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. Account and Tenant Information</h2>
            <p className="mt-2 text-zinc-400">
              When you create a Chirograph Verify account (tenant), we may process the following types of account and configuration information:
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Tenant ID and tenant name</li>
              <li>Billing tier and usage information</li>
              <li>Webhook configuration (endpoint URL)</li>
              <li>Widget allowed-origin configuration</li>
              <li>Branding configuration</li>
              <li>Authentication information managed through the dashboard identity system</li>
            </ul>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. API Credentials</h2>
            <p className="mt-2 text-zinc-400">
              Secret API keys are intended to be kept confidential and used only on your backend. The backend stores a cryptographic hash of your secret API key rather than the plaintext key. Publishable widget keys are designed for browser-side use and are separate from secret API credentials. You are responsible for protecting your secret keys.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">4. Verification Information</h2>
            <p className="mt-2 text-zinc-400">During the verification process, the system may process the following:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Challenge IDs and flow IDs</li>
              <li>Tenant IDs</li>
              <li>User references supplied by you (the customer)</li>
              <li>Challenge status and creation/expiration timestamps</li>
              <li>Verification status and verification timestamps</li>
              <li>Technical WebAuthn authentication information necessary to verify the ceremony</li>
            </ul>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">5. WebAuthn Information</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify processes WebAuthn authentication information necessary to verify the authentication ceremony. This includes cryptographic assertions, authenticator data, and related protocol fields defined by the WebAuthn standard. This information is used to verify that a device successfully completed the ceremony.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">6. Biometrics — What We Do Not Receive</h2>
            <p className="mt-2 font-medium text-zinc-200">
              Chirograph Verify does not need to receive or store raw biometric information.
            </p>
            <p className="mt-2 text-zinc-400">Specifically, we do not receive or store:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Facial images or facial scan data</li>
              <li>Fingerprint images or fingerprint templates</li>
              <li>Raw biometric sensor data</li>
              <li>Raw biometric templates of any kind</li>
            </ul>
            <p className="mt-3 text-zinc-400">
              Face ID, Touch ID, or another platform authenticator performs the local authentication process on the user&apos;s device. Chirograph Verify receives only the cryptographic WebAuthn result necessary for verification. Biometric data stays on the device and is managed by the device&apos;s secure enclave or equivalent platform security features.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">7. Device Fingerprints</h2>
            <p className="mt-2 text-zinc-400">
              The backend can generate a cryptographic device fingerprint from supported WebAuthn-related identifiers. The resulting hash is stored for security and abuse-detection purposes. We do not store raw biometric data, and the device fingerprint cannot be used to identify the person behind a device.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">8. Abuse Detection</h2>
            <p className="mt-2 text-zinc-400">
              Device-related security signals may be used to detect unusual patterns, such as repeated use of the same device across multiple customer tenants. A flagged device is a security signal and does not automatically mean that a person is fraudulent. These signals help protect the integrity of the Service and all tenants.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">9. Data Retention</h2>
            <p className="mt-2 text-zinc-400">
              Verification challenges and temporary ceremony state are short-lived and backed by Redis for ephemeral storage. Durable records, such as tenant configuration and verification logs, are stored in PostgreSQL. Retention periods for verification records may vary based on your plan and configuration.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">10. Security</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify employs security measures including API-key authentication, rate limiting, single-use challenges, origin validation, webhook signature verification, and tenant isolation. We do not publish implementation details that could compromise security. No system is perfectly secure, and we continuously work to improve our security posture.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">11. Customer Responsibility</h2>
            <p className="mt-2 text-zinc-400">
              Customers integrating Chirograph Verify are responsible for their own legal and privacy obligations concerning data they submit to the API and their end users. This includes any disclosures, consent mechanisms, or regulatory requirements applicable to the customer&apos;s use case and jurisdiction.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">12. No Compliance Certifications Claimed</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify does not currently hold GDPR, SOC 2, ISO 27001, HIPAA, PCI DSS, or other compliance certifications. We do not claim certifications that do not exist. If certifications are obtained in the future, this policy will be updated accordingly.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">13. Cookies</h2>
            <p className="mt-2 text-zinc-400">
              For information about cookies and similar technologies used by this website, please see our{' '}
              <a href="/cookies" className="text-emerald-400 underline underline-offset-4">
                Cookie Policy
              </a>
              .
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">14. Changes to This Policy</h2>
            <p className="mt-2 text-zinc-400">
              We may update this Privacy Policy from time to time. Material changes will be communicated through the website or by other reasonable means. Continued use of the Service after changes take effect constitutes acknowledgment of the updated policy.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">15. Contact</h2>
            <p className="mt-2 text-zinc-400">For privacy questions or requests, please contact us:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>General: {SITE_EMAILS.hello}</li>
              <li>Support: {SITE_EMAILS.support}</li>
              <li>Administrative: {SITE_EMAILS.admin}</li>
            </ul>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}

// ── Cookies Policy ────────────────────────────────────────────────────────────

export function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Cookie Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <section className="border-t border-white/[0.08] pt-6 first:border-t-0 first:pt-0">
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              This Cookie Policy explains how the Chirograph Verify website at chirographverify.com uses cookies and similar technologies. The website is operated by the Chirograph Verify brand, based in Egypt.
            </p>
            <p className="mt-3 text-zinc-400">
              The website does not currently use Google Analytics, Plausible, PostHog, Mixpanel, Hotjar, or any other analytics or tracking provider. If analytics are introduced in the future, this policy will be updated to describe them.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. What Are Cookies</h2>
            <p className="mt-2 text-zinc-400">
              Cookies are small text files stored on your device by your browser when you visit a website. They allow the website to remember your actions and preferences over time. Not all cookies are tracking-related — many are essential for the website to function.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. Strictly Necessary Cookies</h2>
            <p className="mt-2 text-zinc-400">
              These cookies are required for the website to function. They enable core functionality such as navigation and access to secure areas. The website cannot function properly without these cookies. They do not track you for advertising or analytics purposes.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">4. Authentication and Session Cookies</h2>
            <p className="mt-2 text-zinc-400">
              If you access the Chirograph Verify application dashboard (hosted at a separate domain), authentication and session cookies may be set by that application to maintain your signed-in state. These cookies are managed by the existing Chirograph Verify application and are not controlled by this marketing website.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">5. Functional Cookies</h2>
            <p className="mt-2 text-zinc-400">
              Functional cookies, if used, allow the website to remember choices you make (such as interface preferences) to provide a more personalized experience. The current marketing website does not set functional cookies beyond what is strictly necessary for operation.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">6. Analytics Cookies</h2>
            <p className="mt-2 text-zinc-400">
              The website does not currently set analytics cookies. No analytics or tracking provider is configured. If analytics are introduced in the future, this section will be updated to describe the provider, the data collected, and how to opt out.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">7. Security Technologies</h2>
            <p className="mt-2 text-zinc-400">
              The website and the Chirograph Verify service use security technologies that may include CSRF tokens, rate-limiting identifiers, and similar protective measures. These are not tracking cookies — they exist to protect the integrity and security of the Service.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">8. Managing Cookies</h2>
            <p className="mt-2 text-zinc-400">
              You can control and delete cookies through your browser settings. Most browsers allow you to refuse cookies or alert you when cookies are being sent. Disabling strictly necessary cookies may affect the functionality of the website.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">9. Changes to This Policy</h2>
            <p className="mt-2 text-zinc-400">
              We may update this Cookie Policy if our use of cookies changes. Material changes will be communicated through the website.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">10. Contact</h2>
            <p className="mt-2 text-zinc-400">For questions about this Cookie Policy, please contact us:</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>General: {SITE_EMAILS.hello}</li>
              <li>Support: {SITE_EMAILS.support}</li>
            </ul>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}
