import { useSeo } from '@/hooks/useSeo';
import { useFetch } from '@/hooks/useFetch';
import { api } from '@/lib/api';
import { DashboardCard, ProgressBar, StatCard, EmptyState, LoadingState, ErrorState } from '@/components/dashboard/DashboardUI';
import { Activity, CheckCircle2, XCircle, Flag } from 'lucide-react';
import type { NavigateFn } from './types';

export function UsagePage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Usage — Dashboard', description: 'Your verification usage.', path: '/dashboard/usage' });
  const { data, loading, error } = useFetch(() => api.getUsage());

  if (loading) return <LoadingState label="Loading usage..." />;
  if (error) return <ErrorState message={error} />;

  const monthlyLimit = data?.monthly_limit ?? 1000;
  const used = data?.used ?? 0;
  const passed = data?.passed ?? 0;
  const flagged = data?.flagged ?? 0;
  const failed = data?.failed ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-900">Usage</h2>
        <p className="mt-1 text-sm text-ink-500">Track your verification usage for the current billing period.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total verifications"
          value={used.toLocaleString()}
          sublabel={`of ${monthlyLimit.toLocaleString()} / month`}
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard
          label="Passed"
          value={passed.toLocaleString()}
          sublabel="Successful verifications"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatCard
          label="Flagged"
          value={flagged.toLocaleString()}
          sublabel="Abuse signals detected"
          icon={<Flag className="h-4 w-4" />}
        />
        <StatCard
          label="Failed"
          value={failed.toLocaleString()}
          sublabel="Verification failures"
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      <DashboardCard title="Monthly verification usage" description="Your usage resets at the start of each billing cycle.">
        <ProgressBar value={used} max={monthlyLimit} label="Verifications used" />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink-500">
            {(monthlyLimit - used).toLocaleString()} verifications remaining
          </span>
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="font-medium text-primary-600 hover:underline"
          >
            Upgrade for more
          </button>
        </div>
      </DashboardCard>

      <DashboardCard title="Recent verifications" description="Your latest verification events.">
        {used === 0 ? (
          <EmptyState
            title="No verifications yet"
            description="Once you start verifying users, your recent verification history will appear here."
            action={
              <button
                onClick={() => navigate('/docs/quick-start')}
                className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Read the quick start
              </button>
            }
          />
        ) : (
          <p className="text-sm text-ink-500">Recent verification events will appear here.</p>
        )}
      </DashboardCard>
    </div>
  );
}
