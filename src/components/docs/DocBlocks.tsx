import type { ReactNode } from 'react';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Badge } from '@/components/ui/Badge';

/**
 * Shared building blocks for documentation pages.
 * These keep every doc page consistent and reduce duplication.
 */

export function DocHeading({ id, level = 2, children }: { id?: string; level?: 2 | 3; children: ReactNode }) {
  const Tag = (level === 2 ? 'h2' : 'h3') as 'h2' | 'h3';
  return (
    <Tag
      id={id}
      className="scroll-mt-24 font-semibold tracking-tight text-ink-900 [&:not(:first-child)]:mt-10"
      style={level === 2 ? { fontSize: '1.5rem', lineHeight: '2rem' } : { fontSize: '1.125rem', lineHeight: '1.75rem' }}
    >
      {children}
    </Tag>
  );
}

export function DocParagraph({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-ink-600">{children}</p>;
}

export function DocList({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="mt-4 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-600">
          {ordered ? (
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
              {i + 1}
            </span>
          ) : (
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

export function DocCode({ code, language = 'bash', filename }: { code: string; language?: string; filename?: string }) {
  return (
    <div className="mt-5">
      <CodeBlock code={code} language={language} filename={filename} />
    </div>
  );
}

export function DocCallout({
  variant = 'info',
  title,
  children,
}: {
  variant?: 'info' | 'warning' | 'danger';
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: 'border-primary-200 bg-primary-50/50 text-ink-700',
    warning: 'border-amber-200 bg-amber-50/50 text-ink-700',
    danger: 'border-error-200 bg-error-500/5 text-ink-700',
  };
  const labelColor = {
    info: 'text-primary-700',
    warning: 'text-amber-700',
    danger: 'text-error-600',
  };
  return (
    <div className={`mt-5 rounded-xl border p-4 ${styles[variant]}`}>
      {title && (
        <div className={`mb-1 text-sm font-semibold ${labelColor[variant]}`}>{title}</div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function ComingSoonBadge() {
  return (
    <Badge variant="accent" className="mb-4">
      Coming soon
    </Badge>
  );
}

export function EndpointBadge({ method, path }: { method: string; path: string }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-ink-200 bg-ink-50 px-4 py-3">
      <span className="inline-flex rounded-md bg-primary-600 px-2.5 py-1 font-mono text-xs font-semibold text-white">
        {method}
      </span>
      <code className="font-mono text-sm text-ink-800">{path}</code>
    </div>
  );
}

export function DocTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-ink-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50">
          {headers.map((h, i) => (
            <th key={i} className="px-4 py-3 text-left font-semibold text-ink-900">
              {h}
            </th>
          ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-ink-100 ${i % 2 === 0 ? 'bg-white' : 'bg-ink-50/30'}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-ink-600">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocPageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-1">
      {children}
    </div>
  );
}
