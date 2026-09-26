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
        dark ? 'bg-surface/[0.03] border-white/10' : 'bg-ink-100 border-ink-200',
        hover ? 'transition-colors duration-150  hover:border-line-strong' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
