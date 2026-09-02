import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'outline' | 'dark';
  className?: string;
  icon?: ReactNode;
}

const variants = {
  default: 'bg-ink-100 text-ink-700 border-ink-200',
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  accent: 'bg-accent-50 text-accent-700 border-accent-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  outline: 'bg-transparent text-ink-600 border-ink-200',
  dark: 'bg-white/5 text-primary-200 border-white/10 backdrop-blur',
};

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${variants[variant]} ${className ?? ''}`.trim()}
    >
      {icon}
      {children}
    </span>
  );
}
