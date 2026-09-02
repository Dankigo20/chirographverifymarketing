import { useState, useMemo } from 'react';
import { ChevronRight, Search, X } from 'lucide-react';
import { docSections } from '@/config/docs';

interface DocsSidebarProps {
  currentSlug: string;
  navigate: (to: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function DocsSidebar({ currentSlug, navigate, isMobileOpen, onMobileClose }: DocsSidebarProps) {
  const [query, setQuery] = useState('');

  const filteredSections = useMemo(() => {
    if (!query.trim()) return docSections;
    const q = query.toLowerCase();
    return docSections
      .map((section) => ({
        ...section,
        pages: section.pages.filter((p) => p.title.toLowerCase().includes(q)),
      }))
      .filter((s) => s.pages.length > 0);
  }, [query]);

  const go = (slug: string) => {
    navigate(`/docs/${slug}`);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 overflow-y-auto border-r border-ink-200 bg-white transition-transform duration-300 ease-out-expo lg:sticky lg:top-[72px] lg:z-0 lg:h-[calc(100vh-72px)] lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs..."
              className="w-full rounded-lg border border-ink-200 bg-ink-50 py-2 pl-9 pr-3 text-sm text-ink-700 placeholder:text-ink-400 focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary-400"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-0.5 text-ink-400 hover:text-ink-600"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Close button (mobile) */}
          <button
            onClick={onMobileClose}
            className="mb-3 flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 lg:hidden"
          >
            <X className="h-4 w-4" />
            Close
          </button>

          {/* Navigation */}
          <nav className="space-y-6">
            {filteredSections.map((section) => (
              <div key={section.label}>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
                  {section.label}
                </h3>
                <ul className="space-y-0.5">
                  {section.pages.map((page) => {
                    const active = page.slug === currentSlug;
                    return (
                      <li key={page.slug}>
                        <button
                          onClick={() => go(page.slug)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            active
                              ? 'bg-primary-50 font-medium text-primary-700'
                              : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {page.title}
                            {page.comingSoon && (
                              <span className="rounded bg-accent-100 px-1.5 py-0.5 text-2xs font-medium text-accent-700">
                                soon
                              </span>
                            )}
                          </span>
                          {active && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            {filteredSections.length === 0 && (
              <p className="text-sm text-ink-400">No pages found.</p>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
