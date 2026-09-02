import { useEffect, useState, useCallback } from 'react';

/**
 * Minimal hash-based router for a static marketing site.
 * Supports paths like "/", "/security", "/developers", "/pricing"
 * and in-page anchors like "/#product".
 */
export function useHashRoute() {
  const [path, setPath] = useState(() => normalize(window.location.hash));

  useEffect(() => {
    const onChange = () => {
      setPath(normalize(window.location.hash));
      // Scroll to top on route change unless there's an anchor
      const hash = window.location.hash;
      const anchor = hash.includes('#') ? hash.slice(hash.indexOf('#') + 1) : '';
      if (anchor && path !== '/') {
        // page anchor — handled by browser
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, [path]);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('/') && window.location.pathname === '/' && !window.location.hash) {
      // first load with no hash
    }
    window.location.hash = to;
  }, []);

  return { path, navigate };
}

function normalize(hash: string): string {
  if (!hash || hash === '' || hash === '#') return '/';
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  // Extract page path before any in-page anchor
  const anchorIdx = raw.indexOf('#');
  const pagePath = anchorIdx >= 0 ? raw.slice(0, anchorIdx) : raw;
  return pagePath === '' ? '/' : pagePath;
}
