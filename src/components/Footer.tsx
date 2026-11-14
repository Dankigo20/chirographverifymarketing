import { APP_URLS, SITE_EMAILS } from '../data/chirographContent';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#020305] py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-white"
            >
              <BrandLogo className="h-7 w-7 shrink-0" />
              <span>Chirograph Verify</span>
            </a>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              Device-biometric bot-prevention infrastructure for developers. Verify real users with WebAuthn — no passwords, no SMS, no CAPTCHA.
            </p>
            <div className="mt-5 space-y-1.5 font-mono text-xs text-zinc-400">
              <div>
                <a href={`mailto:${SITE_EMAILS.hello}`} className="hover:text-white transition-colors">
                  {SITE_EMAILS.hello}
                </a>
              </div>
              <div>
                <a href={`mailto:${SITE_EMAILS.support}`} className="hover:text-white transition-colors">
                  {SITE_EMAILS.support}
                </a>
              </div>
              <div>
                <a href={`mailto:${SITE_EMAILS.admin}`} className="hover:text-white transition-colors">
                  {SITE_EMAILS.admin}
                </a>
              </div>
              <div className="pt-1 flex items-center gap-3 text-zinc-500">
                <span>chirographverify.com</span>
                <span aria-hidden="true">·</span>
                <a
                  href={APP_URLS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @chirograph_V
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-white">Product</div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="/#capabilities" onClick={(e) => handleLink(e, '/#capabilities')} className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/pricing" onClick={(e) => handleLink(e, '/pricing')} className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/docs" onClick={(e) => handleLink(e, '/docs')} className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/#faq" onClick={(e) => handleLink(e, '/#faq')} className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-xs font-semibold text-white">Security &amp; Legal</div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>
                <a href="/security" onClick={(e) => handleLink(e, '/security')} className="hover:text-white transition-colors">
                  Security Architecture
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleLink(e, '/terms')} className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleLink(e, '/privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/cookies" onClick={(e) => handleLink(e, '/cookies')} className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-semibold text-white">Application</div>
            <ul className="mt-4 space-y-2.5 text-sm text-zinc-400">
              <li>
                <a
                  href={APP_URLS.signIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href={APP_URLS.dashboard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href={APP_URLS.getStarted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Get started
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <span>© 2026 Chirograph Verify. All rights reserved.</span>
          <span>Based in Egypt. Built for developers, platforms, and communities fighting automated abuse.</span>
        </div>
      </div>
    </footer>
  );
}
