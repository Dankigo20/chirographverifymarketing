import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'} ${className ?? ''}`.trim()}
    >
      {eyebrow && (
        <div
          className={`micro-label mb-3 flex items-center gap-2 ${dark ? 'text-accent-300' : 'text-secondary'}`}
        >
          <span className={`h-px w-4 ${dark ? 'bg-accent-400' : 'bg-ink-300'}`} />
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-2xl font-semibold tracking-tight sm:text-3xl ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed ${dark ? 'text-primary' : 'text-ink-500'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
