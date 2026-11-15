import type { ReactNode } from 'react';
import { GlassCard } from '@/components/GlassCard';

/**
 * Shared building blocks for documentation pages.
 *
 * These keep every doc page consistent while matching the redesigned
 * marketing site's obsidian / glassmorphism visual system.
 */

export function DocHeading({
  id,
  level = 2,
  children,
}: {
  id?: string;
  level?: 1 | 2 | 3;
  children: ReactNode;
}) {
  if (level === 1) {
    return (
      <h1
        id={id}
        className="scroll-mt-24 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl"
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        id={id}
        className="mt-10 scroll-mt-24 text-lg font-medium tracking-tight text-white first:mt-0"
      >
        {children}
      </h2>
    );
  }

  return (
    <h3
      id={id}
      className="mt-8 scroll-mt-24 text-base font-medium tracking-tight text-zinc-100"
    >
      {children}
    </h3>
  );
}

export function DocParagraph({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm leading-relaxed text-zinc-400">{children}</p>;
}

export function DocList({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="mt-4 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-400">
          {ordered ? (
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-semibold text-emerald-300">
              {i + 1}
            </span>
          ) : (
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/70" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

export function DocCode({
  code,
  language = 'bash',
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  return (
    <div className="glass-panel my-5 overflow-hidden rounded-2xl p-1.5">
      {filename && (
        <div className="px-4 py-2.5 font-mono text-xs text-zinc-400">{filename}</div>
      )}
      <pre className="glass-well overflow-x-auto rounded-xl p-4 font-mono text-xs leading-relaxed text-zinc-200">
        <code data-language={language}>{code}</code>
      </pre>
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
    info: 'border-white/[0.08] bg-white/[0.03]',
    warning: 'border-amber-500/30 bg-amber-500/10',
    danger: 'border-red-500/25 bg-red-500/10',
  };
  const labelColor = {
    info: 'text-zinc-100',
    warning: 'text-amber-300',
    danger: 'text-red-400',
  };
  return (
    <div className={`mt-5 rounded-xl border p-4 ${styles[variant]}`}>
      {title && (
        <div className={`mb-1 text-sm font-semibold ${labelColor[variant]}`}>{title}</div>
      )}
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

export function ComingSoonBadge() {
  return (
    <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
      Coming soon
    </span>
  );
}

export function EndpointBadge({ method, path }: { method: string; path: string }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/20">
      <span className="inline-flex rounded-md border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300">
        {method}
      </span>
      <code className="font-mono text-sm text-zinc-200">{path}</code>
    </div>
  );
}

export function DocTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="glass-panel my-5 overflow-x-auto rounded-2xl p-1.5">
      <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-xl text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.03]">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-xs font-semibold text-white">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.07] text-zinc-300">
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top text-zinc-400">
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
  return <div className="space-y-1">{children}</div>;
}

/** Inline code token used across doc pages. */
export function DocInlineCode({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.8rem] text-emerald-300">{children}</code>;
}

/** Highlighted card used for emphasis inside doc pages. */
export function DocNote({ children }: { children: ReactNode }) {
  return <GlassCard className="mt-5 p-4">{children}</GlassCard>;
}
