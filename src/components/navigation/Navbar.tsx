import { useEffect, useState } from 'react';
import { Menu, X, Fingerprint, ChevronRight } from 'lucide-react';
import { siteConfig, appLinks } from '@/config/site';
import { ButtonLink } from '@/components/ui/Button';

interface NavbarProps {
  currentPath: string;
  navigate: (to: string) => void;
}

export function Navbar({ currentPath, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Unified light developer-platform header: the hairline border is always
  // present so the nav reads as a fixed console bar rather than a hero overlay.
  const go = (href: string) => {
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/85 backdrop-blur-xl transition-shadow duration-200 ease-out-expo ${
        scrolled ? 'border-ink-200' : 'border-ink-200/60'
      }`}
    >
      <nav className="container-page flex h-14 items-center justify-between lg:h-16">
        {/* Logo */}
        <button
          onClick={() => go('/')}
          className="flex items-center gap-2.5 rounded-control focus-visible:ring-2 focus-visible:ring-primary-500/35"
          aria-label="Chirograph Verify home"
        >
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight text-ink-900">
            Chirograph
            <span className="text-primary-600"> Verify</span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={isActive(currentPath, item.href)}
              onClick={() => go(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href={appLinks.signIn} variant="ghost" size="sm" external>
            Sign in
          </ButtonLink>
          <ButtonLink href={appLinks.getStarted} variant="primary" size="sm" external>
            Get started
            <ChevronRight className="h-4 w-4" />
          </ButtonLink>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-control text-ink-600 hover:bg-ink-50 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 top-14 z-40 bg-white/95 backdrop-blur-xl">
          <div className="container-page flex h-full flex-col gap-1 overflow-y-auto pt-6 pb-32">
            {siteConfig.nav.map((item) => (
              <button
                key={item.href}
                onClick={() => go(item.href)}
                className={`flex items-center justify-between rounded-control px-4 py-3 text-left text-[15px] font-medium transition-colors ${
                  isActive(currentPath, item.href)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink-700 hover:bg-ink-50'
                }`}
              >
                {item.label}
                <ChevronRight className="h-4 w-4 text-ink-400" />
              </button>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <ButtonLink href={appLinks.signIn} variant="secondary" size="lg" external>
                Sign in
              </ButtonLink>
              <ButtonLink href={appLinks.getStarted} variant="primary" size="lg" external>
                Get started
                <ChevronRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-control px-3 py-1.5 text-sm font-medium transition-colors ${
        active ? 'text-ink-900' : 'text-ink-500 hover:text-ink-900'
      }`}
    >
      {children}
      {active && <span className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-primary-600" />}
    </button>
  );
}

function isActive(current: string, href: string): boolean {
  if (href === '/') return current === '/';
  if (href.startsWith('/#')) return current === '/';
  if (href === '/docs') return current === '/docs' || current.startsWith('/docs/');
  return current === href || current.startsWith(href);
}

function Logo() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-control border border-primary-200 bg-primary-50 text-primary-600">
      <Fingerprint className="h-4 w-4" strokeWidth={2.1} />
    </span>
  );
}
