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
          className={`mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] ${dark ? 'text-accent-300' : 'text-accent-600'}`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${dark ? 'text-ink-300' : 'text-ink-500'}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
