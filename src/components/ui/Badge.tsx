import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'outline' | 'dark';
  className?: string;
  icon?: ReactNode;
}

const variants = {
  default: 'bg-ink-100 text-ink-700 border-ink-200',
  primary: 'bg-ink-100 text-ink-900 border-ink-300',
  accent: 'bg-accent-500/10 text-accent-400 border-accent-500/40',
  success: 'bg-accent-500/10 text-accent-400 border-accent-500/40',
  outline: 'bg-transparent text-ink-600 border-ink-200',
  dark: 'bg-ink-100 text-ink-900 border-ink-200 backdrop-blur',
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
