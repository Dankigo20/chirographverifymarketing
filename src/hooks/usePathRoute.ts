import { useCallback, useEffect, useState } from 'react';

/**
 * History API path router for the static marketing site.
 *
 * Unlike the previous hash router, each public page now has its own crawlable
 * path URL. The implementation intentionally mirrors the small surface area of
 * `useHashRoute` so existing page components and navigation keep working.
 */
function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '') return '/';
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized.length > 1 && normalized.endsWith('/')
    ? normalized.slice(0, -1)
    : normalized;
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';

  // Preserve backward compatibility for old hash URLs such as
  // https://chirographverify.com/#/security by moving the visitor to the
  // equivalent path URL before React renders.
  const hash = window.location.hash;
  if (hash.startsWith('#/')) {
    const hashPath = hash.slice(1).split('#')[0] || '/';
    const target = normalizePathname(hashPath);
    window.history.replaceState({}, '', target + window.location.search);
    return target;
  }

  return normalizePathname(window.location.pathname);
}

export function usePathRoute() {
  const [path, setPath] = useState(getInitialPath);

  useEffect(() => {
    const onChange = () => {
      setPath(normalizePathname(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('popstate', onChange);
    return () => window.removeEventListener('popstate', onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    if (!to.startsWith('/')) return;
    if (to === window.location.pathname) return;
    window.history.pushState({}, '', to);
    setPath(normalizePathname(to));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return { path, navigate };
}
