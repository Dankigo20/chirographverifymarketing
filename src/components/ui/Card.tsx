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
        'rounded-2xl border',
        dark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-ink-200',
        hover ? 'transition-all duration-300 ease-out-expo hover:shadow-card-hover hover:-translate-y-0.5 hover:border-ink-300' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
