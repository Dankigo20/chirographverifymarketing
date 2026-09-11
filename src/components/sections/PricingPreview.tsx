import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { appLinks } from '@/config/site';
import { pricingTiers, type PricingTier } from '@/config/pricing';

export function PricingPreview() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
              Pricing
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Simple, usage-based pricing
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
              Start free and scale as you verify more users. No hidden fees, no per-seat costs.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 80}>
              <PreviewCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <p className="text-sm text-ink-500">
              Need higher volume or custom terms?{' '}
              <ButtonLink href="/pricing" variant="ghost" size="sm">
                See full pricing →
              </ButtonLink>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PreviewCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 ${
        tier.featured
          ? 'border-primary-300 bg-white shadow-glow lg:-translate-y-2'
          : 'border-ink-200 bg-white hover:border-ink-300 hover:shadow-card'
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary-600 px-3 py-1 text-2xs font-semibold uppercase tracking-wider text-white">
          Most popular
        </span>
      )}
      <h3 className="text-base font-semibold text-ink-900">{tier.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-ink-900">
          {tier.price}
        </span>
        {tier.unit && (
          <span className="text-sm text-ink-500">{tier.unit}</span>
        )}
      </div>
      <p className="mt-2 text-xs font-medium text-primary-600">{tier.verifications}</p>
      <p className="mt-3 text-xs leading-relaxed text-ink-500">{tier.desc}</p>

      <div className="mt-auto pt-6">
        <ButtonLink
          href={appLinks.getStarted}
          variant={tier.featured ? 'primary' : 'secondary'}
          size="md"
          external
          className="w-full"
        >
          {tier.cta}
        </ButtonLink>
      </div>
    </div>
  );
}
