import { MotionConfig } from 'motion/react';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useGlassReflection } from './hooks/useGlassReflection';
import { DocsPage } from './pages/DocsPage';
import { HomePage } from './pages/HomePage';
import { CookiesPage, PrivacyPage, TermsPage } from './pages/LegalPages';
import { PricingPage } from './pages/PricingPage';
import { SecurityPage } from './pages/SecurityPage';

function normalizePath(raw: string): string {
  const [pathname] = raw.split('#');
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export default function App() {
  useGlassReflection();

  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname || '/'),
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePath(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (target: string) => {
    const [pathPart, hashPart] = target.split('#');
    const cleanPath = normalizePath(pathPart || '/');

    if (window.location.pathname !== cleanPath) {
      window.history.pushState({}, '', target);
    }
    setCurrentPath(cleanPath);

    if (hashPart) {
      window.setTimeout(() => {
        const el = document.getElementById(hashPart);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isDocs = currentPath === '/docs' || currentPath.startsWith('/docs/');
  const docsSlug = currentPath.startsWith('/docs/') ? currentPath.slice(6) : undefined;

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#020305] text-zinc-100">
        <Navbar currentPath={currentPath} onNavigate={navigate} />

        <main className="flex-1">
          {isDocs ? (
            <DocsPage slug={docsSlug} onNavigate={navigate} />
          ) : currentPath === '/security' ? (
            <SecurityPage onNavigate={navigate} />
          ) : currentPath === '/pricing' ? (
            <PricingPage />
          ) : currentPath === '/terms' ? (
            <TermsPage />
          ) : currentPath === '/privacy' ? (
            <PrivacyPage />
          ) : currentPath === '/cookies' ? (
            <CookiesPage />
          ) : (
            <HomePage onNavigate={navigate} />
          )}
        </main>

        {!isDocs && <Footer onNavigate={navigate} />}
      </div>
    </MotionConfig>
  );
}
