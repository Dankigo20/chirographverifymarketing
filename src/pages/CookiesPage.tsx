import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { siteConfig } from '@/config/site';
import { Cookie } from 'lucide-react';

export function CookiesPage() {
  useSeo({
    title: 'Cookie Policy — Chirograph Verify',
    description:
      'How the Chirograph Verify website uses cookies and similar technologies, including strictly necessary, functional, and security cookies.',
    path: '/cookies',
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
                <Cookie className="h-3.5 w-3.5" />
                Legal
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl">
                Cookie Policy
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
                  This Cookie Policy explains how the Chirograph Verify website at{' '}
                  {siteConfig.domain} uses cookies and similar technologies. The website is
                  operated by the Chirograph Verify brand, based in {siteConfig.country}.
                </p>
                <p>
                  The website does not currently use Google Analytics, Plausible, PostHog,
                  Mixpanel, Hotjar, or any other analytics or tracking provider. If analytics
                  are introduced in the future, this policy will be updated to describe them.
                </p>
              </LegalBlock>

              <LegalBlock title="2. What Are Cookies">
                <p>
                  Cookies are small text files stored on your device by your browser when you
                  visit a website. They allow the website to remember your actions and
                  preferences over time. Not all cookies are tracking-related — many are
                  essential for the website to function.
                </p>
              </LegalBlock>

              <LegalBlock title="3. Strictly Necessary Cookies">
                <p>
                  These cookies are required for the website to function. They enable core
                  functionality such as navigation and access to secure areas. The website cannot
                  function properly without these cookies. They do not track you for
                  advertising or analytics purposes.
                </p>
              </LegalBlock>

              <LegalBlock title="4. Authentication and Session Cookies">
                <p>
                  If you access the Chirograph Verify application dashboard (hosted at a separate
                  domain), authentication and session cookies may be set by that application to
                  maintain your signed-in state. These cookies are managed by the existing
                  Chirograph Verify application and are not controlled by this marketing website.
                </p>
              </LegalBlock>

              <LegalBlock title="5. Functional Cookies">
                <p>
                  Functional cookies, if used, allow the website to remember choices you make
                  (such as interface preferences) to provide a more personalized experience.
                  The current marketing website does not set functional cookies beyond what is
                  strictly necessary for operation.
                </p>
              </LegalBlock>

              <LegalBlock title="6. Analytics Cookies">
                <p>
                  The website does not currently set analytics cookies. No analytics or
                  tracking provider is configured. If analytics are introduced in the future,
                  this section will be updated to describe the provider, the data collected, and
                  how to opt out.
                </p>
              </LegalBlock>

              <LegalBlock title="7. Security Technologies">
                <p>
                  The website and the Chirograph Verify service use security technologies that
                  may include CSRF tokens, rate-limiting identifiers, and similar protective
                  measures. These are not tracking cookies — they exist to protect the integrity
                  and security of the Service.
                </p>
              </LegalBlock>

              <LegalBlock title="8. Managing Cookies">
                <p>
                  You can control and delete cookies through your browser settings. Most
                  browsers allow you to refuse cookies or alert you when cookies are being sent.
                  Disabling strictly necessary cookies may affect the functionality of the
                  website.
                </p>
              </LegalBlock>

              <LegalBlock title="9. Changes to This Policy">
                <p>
                  We may update this Cookie Policy if our use of cookies changes. Material
                  changes will be communicated through the website.
                </p>
              </LegalBlock>

              <LegalBlock title="10. Contact">
                <p>For questions about this Cookie Policy, please contact us:</p>
                <List
                  items={[
                    `General: ${siteConfig.emails.hello}`,
                    `Support: ${siteConfig.emails.support}`,
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
