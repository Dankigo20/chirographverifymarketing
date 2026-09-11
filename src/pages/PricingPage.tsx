import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { appLinks } from '@/config/site';
import { pricingTiers, comparisonRows, type PricingTier } from '@/config/pricing';
import { Check, Minus, ArrowRight } from 'lucide-react';

export function PricingPage() {
  useSeo({
    title: 'Pricing — Chirograph Verify',
    description:
      'Simple, usage-based pricing for human verification infrastructure. Start free and scale as you verify more users.',
    path: '/pricing',
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="absolute inset-0 bg-grid mask-fade-b" />
        <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-100/50 to-transparent blur-3xl" />
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="primary" className="mb-5">
                Pricing
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:text-6xl lg:leading-[1.02] lg:tracking-tighter">
                Pricing that scales
                <br />
                <span className="text-gradient">with your usage.</span>
              </h1>
              <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-500">
                Start free and pay only as you verify more users. No per-seat costs,
                no hidden fees, no contracts required.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pricingTiers.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 80}>
                <PricingCard tier={tier} />
              </Reveal>
            ))}
          </div>

          {/* Note */}
          <Reveal delay={300}>
            <p className="mt-8 text-center text-sm text-ink-400">
              All plans include WebAuthn verification, server-side verification, single-use challenges, and tenant isolation.
              Billing is handled via Flutterwave.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Compare"
              title="Feature comparison"
              description="Everything you get at each tier."
            />
          </Reveal>

          <Reveal delay={100}>
            <div className="mx-auto mt-14 max-w-5xl overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-ink-200">
                    <th className="sticky left-0 z-10 w-1/3 bg-white px-4 py-4 text-left text-sm font-semibold text-ink-900">
                      Feature
                    </th>
                    {pricingTiers.map((t) => (
                      <th
                        key={t.name}
                        className={`px-3 py-4 text-center text-sm font-semibold lg:px-4 ${
                          t.featured ? 'text-primary-700' : 'text-ink-900'
                        }`}
                      >
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.label} className={`border-b border-ink-100 ${i % 2 === 0 ? 'bg-ink-50/50' : ''}`}>
                      <td className="sticky left-0 z-10 bg-inherit px-4 py-3.5 text-left text-sm text-ink-700">
                        {row.label}
                      </td>
                      {row.values.map((val, j) => (
                        <td key={j} className="px-3 py-3.5 text-center lg:px-4">
                          <Cell val={val} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-ink-200 bg-gradient-to-br from-ink-50 to-primary-50/40 p-12 text-center lg:p-16">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Need something custom?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink-500">
                Higher volumes, custom SLAs, or custom security requirements — let's talk.
              </p>
              <div className="mt-6">
                <ButtonLink href={appLinks.getStarted} size="lg" external>
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 ${
        tier.featured
          ? 'border-primary-300 bg-white shadow-glow lg:-translate-y-2'
          : 'border-ink-200 bg-white hover:border-ink-300 hover:shadow-card-hover hover:-translate-y-0.5'
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

      <ButtonLink
        href={appLinks.getStarted}
        variant={tier.featured ? 'primary' : 'secondary'}
        size="md"
        external
        className="mt-5 w-full"
      >
        {tier.cta}
      </ButtonLink>

      <ul className="mt-6 flex-1 space-y-2.5">
        {tier.features.map((f, i) => (
          <FeatureItem key={i} feature={f} isFirst={i === 0 && f.endsWith(':')} />
        ))}
      </ul>
    </div>
  );
}

function FeatureItem({ feature, isFirst }: { feature: string; isFirst: boolean }) {
  if (isFirst) {
    return (
      <li className="pt-1 text-xs font-semibold uppercase tracking-wider text-ink-700">
        {feature}
      </li>
    );
  }
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink-600">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" strokeWidth={2.5} />
      {feature}
    </li>
  );
}

function Cell({ val }: { val: string | boolean }) {
  if (typeof val === 'boolean') {
    return val ? (
      <Check className="mx-auto h-5 w-5 text-primary-500" strokeWidth={2.5} />
    ) : (
      <Minus className="mx-auto h-5 w-5 text-ink-300" />
    );
  }
  return <span className="text-sm text-ink-600">{val}</span>;
}
