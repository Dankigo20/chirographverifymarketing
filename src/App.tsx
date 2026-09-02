import { useHashRoute } from '@/hooks/useHashRoute';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { HomePage } from '@/pages/HomePage';
import { SecurityPage } from '@/pages/SecurityPage';
import { DevelopersPage } from '@/pages/DevelopersPage';
import { PricingPage } from '@/pages/PricingPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { CookiesPage } from '@/pages/CookiesPage';
import { DocsPage } from '@/pages/DocsPage';

function App() {
  const { path, navigate } = useHashRoute();

  // Check if this is a docs route
  const isDocsRoute = path === '/docs' || path.startsWith('/docs/');
  const docsSlug = path.startsWith('/docs/')
    ? path.slice('/docs/'.length)
    : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar currentPath={path} navigate={navigate} />
      <main className="flex-1">
        {isDocsRoute ? (
          <DocsPage slug={docsSlug} navigate={navigate} />
        ) : (
          <>
            {path === '/' && <HomePage />}
            {path === '/security' && <SecurityPage />}
            {path === '/developers' && <DevelopersPage />}
            {path === '/pricing' && <PricingPage />}
            {path === '/terms' && <TermsPage />}
            {path === '/privacy' && <PrivacyPage />}
            {path === '/cookies' && <CookiesPage />}
          </>
        )}
      </main>
      {!isDocsRoute && <Footer navigate={navigate} />}
    </div>
  );
}

export default App;
