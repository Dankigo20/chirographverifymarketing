import { useSeo } from '@/hooks/useSeo';
import { DashboardCard, Badge, StatCard } from '@/components/dashboard/DashboardUI';
import { CreditCard, Check, ArrowRight } from 'lucide-react';
import { pricingTiers } from '@/config/pricing';
import type { NavigateFn } from './types';

export function BillingPage({ navigate }: { navigate: NavigateFn }) {
  useSeo({ title: 'Billing — Dashboard', description: 'Manage your subscription and billing.', path: '/dashboard/billing' });

  const currentPlan = 'Free';
  const monthlyVerifications = 1000;
  const usedVerifications = 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink-900">Billing</h2>
        <p className="mt-1 text-sm text-ink-500">Manage your subscription and payment method.</p>
      </div>

      {/* Current plan */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Current plan"
          value={currentPlan}
          sublabel="$0 / month"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          label="Monthly limit"
          value={monthlyVerifications.toLocaleString()}
          sublabel="verifications / month"
        />
        <StatCard
          label="Used this cycle"
          value={usedVerifications.toLocaleString()}
          sublabel={`of ${monthlyVerifications.toLocaleString()}`}
        />
      </div>

      {/* Plans */}
      <DashboardCard title="Available plans" description="Upgrade or change your plan at any time.">
        <div className="grid gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {pricingTiers.map((tier) => {
            const isCurrent = tier.name === currentPlan;
            return (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-5 ${
                  tier.featured
                    ? 'border-primary-400 ring-1 ring-primary-400'
                    : 'border-ink-200'
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  </div>
                )}
                <h3 className="text-sm font-semibold text-ink-900">{tier.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-bold tracking-tight text-ink-900">{tier.price}</span>
                  <span className="text-sm text-ink-400">{tier.unit}</span>
                </div>
                <p className="mt-1 text-xs text-ink-500">{tier.verifications}</p>

                <div className="mt-4">
                  {isCurrent ? (
                    <div className="flex items-center justify-center gap-1.5 rounded-lg bg-ink-100 py-2.5 text-sm font-medium text-ink-600">
                      <Check className="h-4 w-4" />
                      Current plan
                    </div>
                  ) : (
                    <button
                      className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                        tier.name === 'Enterprise'
                          ? 'border border-ink-200 text-ink-700 hover:bg-ink-50'
                          : 'bg-primary-600 text-white hover:bg-primary-700'
                      }`}
                    >
                      {tier.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>

      {/* Payment method */}
      <DashboardCard title="Payment method" description="Your payment is processed securely via Flutterwave.">
        <div className="flex items-center justify-between rounded-xl border border-ink-200 bg-ink-50 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-100">
              <CreditCard className="h-5 w-5 text-ink-400" />
            </span>
            <div>
              <p className="text-sm font-medium text-ink-900">No payment method on file</p>
              <p className="text-xs text-ink-500">Add a payment method when you upgrade to a paid plan.</p>
            </div>
          </div>
          <Badge variant="neutral">Free plan</Badge>
        </div>
      </DashboardCard>

      {/* Billing history */}
      <DashboardCard title="Billing history" description="Your past invoices and payment history.">
        <div className="py-8 text-center">
          <p className="text-sm text-ink-500">No billing history yet. Invoices will appear here once you upgrade to a paid plan.</p>
        </div>
      </DashboardCard>
    </div>
  );
}
