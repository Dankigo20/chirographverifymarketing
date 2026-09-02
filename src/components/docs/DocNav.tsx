import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAdjacentPages } from '@/config/docs';

interface DocNavProps {
  slug: string;
  navigate: (to: string) => void;
}

export function DocNav({ slug, navigate }: DocNavProps) {
  const { prev, next } = getAdjacentPages(slug);

  if (!prev && !next) return null;

  return (
    <nav className="mt-12 flex items-stretch gap-4 border-t border-ink-200 pt-8">
      {prev ? (
        <button
          onClick={() => navigate(`/docs/${prev.slug}`)}
          className="group flex flex-1 items-center gap-3 rounded-xl border border-ink-200 bg-white p-4 text-left transition-colors hover:border-primary-200 hover:shadow-soft"
        >
          <ChevronLeft className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:-translate-x-0.5" />
          <div>
            <div className="text-xs text-ink-400">Previous</div>
            <div className="text-sm font-medium text-ink-900">{prev.title}</div>
          </div>
        </button>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <button
          onClick={() => navigate(`/docs/${next.slug}`)}
          className="group flex flex-1 items-center gap-3 rounded-xl border border-ink-200 bg-white p-4 text-right transition-colors hover:border-primary-200 hover:shadow-soft"
        >
          <div className="flex-1">
            <div className="text-xs text-ink-400">Next</div>
            <div className="text-sm font-medium text-ink-900">{next.title}</div>
          </div>
          <ChevronRight className="h-5 w-5 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
        </button>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  );
}
