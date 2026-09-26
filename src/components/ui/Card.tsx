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
        'rounded-xl border',
        dark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-ink-200',
        hover ? 'transition-colors duration-150 hover:shadow-card-hover hover:border-ink-300' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
