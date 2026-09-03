import { useAuth } from '@/hooks/useAuth';
import { useSeo } from '@/hooks/useSeo';
import { StatCard, DashboardCard, EmptyState, ProgressBar, Badge } from '@/components/dashboard/DashboardUI';
import { Activity, KeyRound, Webhook, CreditCard, TrendingUp, ArrowRight } from 'lucide-react';
import { pricingTiers } from '@/config/pricing';
import type { NavigateFn } from './types';

export function OverviewPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Overview — Dashboard', description: 'Your Chirograph Verify dashboard overview.', path: '/dashboard' });
  const { user } = useAuth();

  const planName = 'Free';
  const planVerifications = 1000;
  const usedVerifications = 0;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-semibold text-ink-900">
          Welcome{user?.email ? `, ${user.email.split('@')[0]}` : ''}
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          Here is an overview of your Chirograph Verify account.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Current plan"
          value={planName}
          sublabel={`${planVerifications.toLocaleString()} verifications / month`}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          label="Verifications used"
          value={usedVerifications.toLocaleString()}
          sublabel={`of ${planVerifications.toLocaleString()} this month`}
          icon={<Activity className="h-4 w-4" />}
        />
        <StatCard
          label="API keys"
          value="0"
          sublabel="No keys created yet"
          icon={<KeyRound className="h-4 w-4" />}
        />
        <StatCard
          label="Webhook status"
          value="Not configured"
          sublabel="No webhook endpoint set"
          icon={<Webhook className="h-4 w-4" />}
        />
      </div>

      {/* Usage bar */}
      <DashboardCard title="Monthly usage" description="Verification usage for the current billing period.">
        <ProgressBar value={usedVerifications} max={planVerifications} label="Verifications" />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink-500">
            {(planVerifications - usedVerifications).toLocaleString()} remaining
          </span>
          <button
            onClick={() => navigate('/dashboard/usage')}
            className="flex items-center gap-1 font-medium text-primary-600 hover:underline"
          >
            View details
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </DashboardCard>

      {/* Quick actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        <DashboardCard title="Get started" description="Set up your first verification flow.">
          <ul className="space-y-3">
            <QuickAction
              icon={<KeyRound className="h-4 w-4" />}
              title="Create an API key"
              description="Generate a secret key to start integrating."
              onClick={() => navigate('/dashboard/api-keys')}
            />
            <QuickAction
              icon={<Webhook className="h-4 w-4" />}
              title="Configure webhooks"
              description="Receive real-time verification events."
              onClick={() => navigate('/dashboard/webhooks')}
            />
            <QuickAction
              icon={<TrendingUp className="h-4 w-4" />}
              title="Read the documentation"
              description="Learn how to integrate the verification API."
              onClick={() => navigate('/docs')}
            />
          </ul>
        </DashboardCard>

        <DashboardCard title="Recent activity" description="Your latest verification events.">
          <EmptyState
            title="No activity yet"
            description="Once you start verifying users, recent activity will appear here."
            action={
              <button
                onClick={() => navigate('/docs/quick-start')}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
              >
                Read the quick start
                <ArrowRight className="h-4 w-4" />
              </button>
            }
          />
        </DashboardCard>
      </div>

      {/* Plan info */}
      <DashboardCard title="Your plan" description="You are currently on the Free plan.">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-600">
              <span className="font-semibold text-ink-900">Free</span> — 1,000 verifications per month.
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Need more? Upgrade to a paid plan for higher limits and additional features.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/billing')}
            className="rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            View plans
          </button>
        </div>
      </DashboardCard>
    </div>
  );
}

function QuickAction({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-ink-200 p-3 text-left transition-colors hover:border-primary-200 hover:bg-primary-50/30"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-sm font-medium text-ink-900">{title}</p>
        <p className="text-xs text-ink-500">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-ink-400" />
    </button>
  );
}
