import type { ReactNode } from 'react';
import { Fingerprint } from 'lucide-react';

export function StatCard({
  label,
  value,
  sublabel,
  icon,
}: {
  label: string;
  value: string | number;
  sublabel?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-500">{label}</span>
        {icon && <span className="text-ink-400">{icon}</span>}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">{value}</p>
      {sublabel && <p className="mt-1 text-xs text-ink-400">{sublabel}</p>}
    </div>
  );
}

export function DashboardCard({
  title,
  description,
  children,
  action,
}: {
  title?: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-6 shadow-soft">
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-base font-semibold text-ink-900">{title}</h3>}
            {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ink-300 bg-ink-50/50 px-6 py-16 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50">
        <Fingerprint className="h-7 w-7 text-primary-400" />
      </span>
      <h3 className="text-base font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-ink-500">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-primary-500" />
        <p className="text-sm text-ink-500">{label}</p>
      </div>
    </div>
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-error-200 bg-error-500/5 px-6 py-12 text-center">
      <div>
        <p className="text-sm font-medium text-error-600">Something went wrong</p>
        <p className="mt-1 text-sm text-ink-500">{message}</p>
      </div>
    </div>
  );
}

export function Badge({ variant = 'neutral', children }: { variant?: 'neutral' | 'success' | 'warning' | 'error' | 'primary'; children: ReactNode }) {
  const styles = {
    neutral: 'bg-ink-100 text-ink-600',
    success: 'bg-success-500/10 text-success-600',
    warning: 'bg-warning-500/10 text-warning-600',
    error: 'bg-error-500/10 text-error-600',
    primary: 'bg-primary-50 text-primary-700',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  const color = pct >= 90 ? 'bg-error-500' : pct >= 70 ? 'bg-warning-500' : 'bg-primary-500';
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-ink-500">{label}</span>
          <span className="font-medium text-ink-700">{value.toLocaleString()} / {max.toLocaleString()}</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-ink-100">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
