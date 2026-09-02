import { useSeo } from '@/hooks/useSeo';
import { DashboardCard, EmptyState } from '@/components/dashboard/DashboardUI';
import { BarChart3 } from 'lucide-react';
import type { NavigateFn } from './types';

export function AnalyticsPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Analytics — Dashboard', description: 'Verification analytics and trends.', path: '/dashboard/analytics' });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-900">Analytics</h2>
        <p className="mt-1 text-sm text-ink-500">Visualize your verification trends and device trust signals.</p>
      </div>

      <DashboardCard title="Verification trends" description="Daily verification volume over the last 30 days.">
        <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-ink-300 bg-ink-50/50">
          <div className="text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-ink-300" />
            <p className="mt-3 text-sm font-medium text-ink-500">No analytics data yet</p>
            <p className="mt-1 text-xs text-ink-400">
              Analytics charts will populate once verification data is available from the backend.
            </p>
          </div>
        </div>
      </DashboardCard>

      <DashboardCard title="Device trust distribution" description="Breakdown of Pass, Flag, and Fail outcomes.">
        <EmptyState
          title="No trust data yet"
          description="Device trust distribution will appear here once verifications are processed."
          action={
            <button
              onClick={() => navigate('/docs/device-trust')}
              className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              Learn about trust scores
            </button>
          }
        />
      </DashboardCard>

      <DashboardCard title="Top origins" description="Verification requests by widget origin.">
        <EmptyState
          title="No origin data yet"
          description="Your top widget origins will appear here once you start receiving verifications."
        />
      </DashboardCard>
    </div>
  );
}
