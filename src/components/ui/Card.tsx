import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  dark?: boolean;
}

export function Card({ children, className, hover = false, dark = false }: CardProps) {
  return (
    <div
      className={[
        'rounded-panel border',
        dark ? 'bg-ink-950/[0.03] border-white/10' : 'bg-ink-950 border-ink-800',
        hover ? 'transition-colors duration-150  hover:border-ink-700' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
