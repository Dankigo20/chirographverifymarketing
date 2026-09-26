import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  /** Optional aside rendered on the right when the heading is left-aligned,
   *  mirroring the reference layout where a paragraph sits opposite the title. */
  aside?: ReactNode;
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  aside,
  className,
  dark = false,
}: SectionHeadingProps) {
  const heading = (
    <div
      className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'} ${className ?? ''}`.trim()}
    >
      {eyebrow && (
        /* The reference renders eyebrows as mono, widely tracked and
           bracket-wrapped: `[ INTRODUCING ]`, `[ KEY FEATURES ]`. */
        <div className="eyebrow mb-5">
          [ {eyebrow.toUpperCase()} ]
        </div>
      )}
      <h2
        className={`text-3xl font-normal leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem] ${dark ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed ${dark ? 'text-ink-500' : 'text-ink-500'}`}
        >
          {description}
        </p>
      )}
    </div>
  );

  // With an aside the title and the supporting paragraph sit on one row,
  // which is how the "Benefits of Pay-Per-Use" block is composed.
  if (aside && align === 'left') {
    return (
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        {heading}
        <div className="max-w-md text-base leading-relaxed text-ink-500 lg:pt-14">
          {aside}
        </div>
      </div>
    );
  }

  return heading;
}
