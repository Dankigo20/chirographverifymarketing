import { GlassCard } from '../components/GlassCard';
import { SITE_EMAILS } from '../data/chirographContent';

export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Terms of Use
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              These Terms of Use govern your access to and use of the Chirograph Verify service, including the API, widget SDK, hosted verification flows, and associated developer tools (the &quot;Service&quot;). The Service is operated by Chirograph Verify, a product based in Egypt. By using the Service, you agree to these Terms.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. The Service</h2>
            <p className="mt-2 text-zinc-400">
              Chirograph Verify is a device-biometric bot-prevention API. It uses WebAuthn-based verification with platform authenticators (such as Face ID, Touch ID, and compatible security keys) to provide a cryptographic signal of a valid passkey assertion from an enrolled device. Verification is a technical signal; it does not prove identity, uniqueness, or liveness.
            </p>
            <p className="mt-3 text-zinc-400">
              Biometric authentication is performed locally by the user&apos;s device or platform authenticator. Chirograph Verify receives only the cryptographic WebAuthn information required for verification — it does not receive or store raw biometric data such as facial images or fingerprint images.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. API Usage and API Keys</h2>
            <p className="mt-2 text-zinc-400">
              Access to the Service is authenticated via API keys. You are responsible for safeguarding your secret API keys (<code className="font-mono text-zinc-200">sk_live_...</code>) and keeping them strictly on your backend infrastructure. For questions, contact{' '}
              <a href={`mailto:${SITE_EMAILS.support}`} className="text-emerald-400 underline underline-offset-4">
                {SITE_EMAILS.support}
              </a>.
            </p>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              This Privacy Policy describes how Chirograph Verify (&quot;we&quot;) handles data associated with the Chirograph Verify service (the &quot;Service&quot;). The Service is a device-biometric bot-prevention API operated by the Chirograph Verify brand, based in Egypt.
            </p>
            <p className="mt-3 text-zinc-400">
              Chirograph Verify is designed to verify a valid passkey assertion from an enrolled device. It is not a facial-recognition system, does not receive or store raw biometric data, and does not identify a person&apos;s real-world identity from biometrics.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. Account and Tenant Information</h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-zinc-400">
              <li>Tenant ID and tenant name</li>
              <li>Billing tier and usage information</li>
              <li>Webhook configuration (endpoint URL)</li>
              <li>Widget allowed-origin configuration</li>
              <li>Branding configuration</li>
              <li>Authentication information managed through WorkOS AuthKit</li>
            </ul>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. API Credentials</h2>
            <p className="mt-2 text-zinc-400">
              Secret API keys are intended to be kept confidential and used only on your backend. The backend stores a cryptographic hash of your secret API key rather than the plaintext key. Publishable widget keys are designed for browser-side use and scoped to your allowed origins.
            </p>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}

export function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <p className="text-xs font-mono text-emerald-400">Legal</p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-white">
        Cookie Policy
      </h1>
      <p className="mt-3 text-sm text-zinc-500">Last updated: September 2, 2026</p>

      <GlassCard className="mt-10 p-7 sm:p-9">
        <div className="space-y-8 text-sm leading-relaxed text-zinc-300">
          <section>
            <h2 className="text-lg font-semibold text-white">1. Overview</h2>
            <p className="mt-2 text-zinc-400">
              This Cookie Policy explains how the Chirograph Verify website at chirographverify.com uses cookies and similar technologies. The website is operated by the Chirograph Verify brand, based in Egypt.
            </p>
            <p className="mt-3 text-zinc-400">
              The website does not currently use Google Analytics, Plausible, PostHog, Mixpanel, Hotjar, or any other analytics or tracking provider.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">2. Strictly Necessary Cookies</h2>
            <p className="mt-2 text-zinc-400">
              These cookies are required for the website to function. They enable core functionality such as navigation and access to secure areas and do not track you for advertising or analytics purposes.
            </p>
          </section>

          <section className="border-t border-white/[0.08] pt-6">
            <h2 className="text-lg font-semibold text-white">3. Authentication and Session Cookies</h2>
            <p className="mt-2 text-zinc-400">
              If you access the Chirograph Verify application dashboard (hosted at app.chirographverify.com), authentication and session cookies may be set by that application to maintain your signed-in state.
            </p>
          </section>
        </div>
      </GlassCard>
    </div>
  );
}
