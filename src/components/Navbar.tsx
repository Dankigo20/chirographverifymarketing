import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { APP_URLS } from '../data/chirographContent';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Product', path: '/#product' },
    { label: 'Security', path: '/security' },
    { label: 'Docs', path: '/docs' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const isActive = (itemPath: string) => {
    if (itemPath.startsWith('/#')) return currentPath === '/';
    if (itemPath === '/docs') return currentPath === '/docs' || currentPath.startsWith('/docs/');
    return currentPath === itemPath;
  };

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.1] bg-[#030508]/75 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-10">
        {/* Zone 1: Exact Chirograph Verify Brand Mark */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, '/')}
          className="flex items-center gap-2.5 whitespace-nowrap shrink-0 text-[15px] font-semibold tracking-tight text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
        >
          <BrandLogo className="h-7 w-7 shrink-0" />
          <span>Chirograph Verify</span>
        </a>

        {/* Zone 2: Glass-framed morphing navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className={`relative px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors duration-150 ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-active-glass"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg border border-white/[0.14] bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}

          <a
            href={APP_URLS.signIn}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg whitespace-nowrap shrink-0 text-zinc-400 transition-colors duration-150 hover:text-white"
          >
            Sign in
          </a>
        </nav>

        {/* Zone 3: Single Primary Production CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={APP_URLS.getStarted}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black whitespace-nowrap shrink-0 shadow-[0_0_24px_rgba(255,255,255,0.16)] transition-all duration-150 hover:bg-emerald-400 hover:shadow-[0_0_26px_rgba(16,185,129,0.35)]"
          >
            <span>Get started</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04] text-zinc-300 hover:text-white cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#04060a]/95 backdrop-blur-2xl px-6 py-4">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNavClick(e, item.path)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white"
              >
                {item.label}
              </a>
            ))}
            <a
              href={APP_URLS.signIn}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.05] hover:text-white"
            >
              Sign in
            </a>
            <a
              href={APP_URLS.getStarted}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              <span>Get started</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
