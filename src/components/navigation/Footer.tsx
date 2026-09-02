import { Fingerprint, Mail, Globe } from 'lucide-react';
import { siteConfig, appLinks } from '@/config/site';

interface FooterProps {
  navigate: (to: string) => void;
}

export function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <div className="container-page py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-accent-600">
                <Fingerprint className="h-5 w-5 text-white" strokeWidth={2.2} />
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-ink-900">
                Chirograph<span className="text-primary-600"> Verify</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              Device-biometric bot-prevention infrastructure for developers. Verify real
              users with WebAuthn — no passwords, no SMS, no CAPTCHA.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <ContactLink
                href={`mailto:${siteConfig.emails.hello}`}
                icon={<Mail className="h-3.5 w-3.5" />}
                label={siteConfig.emails.hello}
              />
              <ContactLink
                href={`mailto:${siteConfig.emails.support}`}
                icon={<Mail className="h-3.5 w-3.5" />}
                label={siteConfig.emails.support}
              />
              <ContactLink
                href={`mailto:${siteConfig.emails.admin}`}
                icon={<Mail className="h-3.5 w-3.5" />}
                label={siteConfig.emails.admin}
              />
              <ContactLink
                href={`https://${siteConfig.domain}`}
                icon={<Globe className="h-3.5 w-3.5" />}
                label={siteConfig.domain}
              />
            </div>

            {/* Social */}
            <div className="mt-5">
              <SocialLink href={siteConfig.social.x.url} label={`X / Twitter: ${siteConfig.social.x.handle}`}>
                <XIcon />
              </SocialLink>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <FooterCol title="Product">
              <FooterLink onClick={() => navigate('/#product')}>Features</FooterLink>
              <FooterLink onClick={() => navigate('/pricing')}>Pricing</FooterLink>
              <FooterLink onClick={() => navigate('/docs')}>Documentation</FooterLink>
              <FooterLink onClick={() => navigate('/#faq')}>FAQ</FooterLink>
            </FooterCol>

            <FooterCol title="Company">
              <FooterLink onClick={() => navigate('/#product')}>About</FooterLink>
              <FooterLink href={`mailto:${siteConfig.emails.hello}`}>Contact</FooterLink>
            </FooterCol>

            <FooterCol title="Legal">
              <FooterLink onClick={() => navigate('/terms')}>Terms of Use</FooterLink>
              <FooterLink onClick={() => navigate('/privacy')}>Privacy Policy</FooterLink>
              <FooterLink onClick={() => navigate('/cookies')}>Cookie Policy</FooterLink>
            </FooterCol>

            <FooterCol title="Application">
              <FooterLink href={appLinks.signIn} external>Sign in</FooterLink>
              <FooterLink href={appLinks.dashboard} external>Dashboard</FooterLink>
              <FooterLink href={appLinks.getStarted} external>Get started</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-200 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-ink-500">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-400">
            Based in {siteConfig.country}. Built for developers, platforms, and communities fighting automated abuse.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-400">{title}</h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  children,
  onClick,
  href,
  external,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}) {
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-sm text-ink-500 transition-colors hover:text-ink-900"
        >
          {children}
        </a>
      </li>
    );
  }
  return (
    <li>
      <button
        onClick={onClick}
        className="text-left text-sm text-ink-500 transition-colors hover:text-ink-900"
      >
        {children}
      </button>
    </li>
  );
}

function ContactLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-ink-900"
    >
      <span className="text-ink-400">{icon}</span>
      {label}
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-900"
    >
      {children}
    </a>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
