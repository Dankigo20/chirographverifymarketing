import { ArrowUpRight, Check, Minus } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { PRICING_COMPARISON_ROWS, PRICING_TIERS } from '../data/chirographContent';

export function PricingPage() {
  return (
    <div className="bg-[#020305]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08] pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/3 h-80 w-[480px] animate-morph-a bg-emerald-500/14 blur-[130px]" />
        <div aria-hidden="true" className="pointer-events-none absolute top-24 right-[10%] h-72 w-80 animate-morph-b bg-[#3B5BFF]/14 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-mono text-emerald-400">Pricing</p>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl [text-wrap:balance]">
                Pricing that scales with your usage.
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Start free and pay only as you verify more users. No per-seat costs, no hidden fees, no contracts required.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {PRICING_TIERS.map((tier, idx) => (
              <ScrollReveal key={tier.id} delay={idx * 0.05} className="h-full">
                <GlassCard featured={Boolean(tier.popular)} className="h-full p-6">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-base font-semibold text-white">{tier.name}</h2>
                        {tier.popular && (
                          <span className="font-mono text-[11px] text-emerald-400">Most popular</span>
                        )}
                      </div>
                      <div className="mt-5 flex items-baseline gap-1.5">
                        <span className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-xs text-zinc-400">{tier.period}</span>
                        )}
                      </div>
                      <p className="mt-1.5 font-mono text-xs text-emerald-400 tabular-nums">
                        {tier.volume}
                      </p>
                      <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                        {tier.description}
                      </p>
                    </div>

                    <a
                      href={tier.href}
                      target={tier.href.startsWith('http') ? '_blank' : undefined}
                      rel={tier.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                        tier.popular
                          ? 'bg-emerald-500 text-black shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:bg-emerald-400'
                          : 'morph-socket text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <span>{tier.cta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.12}>
            <p className="mt-8 text-center text-sm text-zinc-400">
              All plans include WebAuthn verification, server-side verification, single-use challenges, and tenant isolation. Billing is handled via Flutterwave.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Full Feature Comparison Matrix */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-xs font-mono text-[#7e95ff]">Compare</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Feature comparison
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Everything you get at each tier.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="glass-panel mt-12 overflow-x-auto rounded-2xl p-2">
              <table className="glass-well w-full border-collapse rounded-xl text-left overflow-hidden">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.03]">
                    <th className="px-5 py-4 text-sm font-semibold text-white">Feature</th>
                    {PRICING_TIERS.map((tier) => (
                      <th
                        key={tier.id}
                        className={`px-4 py-4 text-center text-sm font-semibold ${
                          tier.popular ? 'text-emerald-400' : 'text-white'
                        }`}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07]">
                  {PRICING_COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="hover:bg-white/[0.025]">
                      <td className="px-5 py-3.5 text-sm text-zinc-300">{row.label}</td>
                      {row.values.map((val, idx) => (
                        <td key={idx} className="px-4 py-3.5 text-center text-sm tabular-nums">
                          {val === true ? (
                            <Check className="mx-auto h-4 w-4 text-emerald-400" />
                          ) : val === false ? (
                            <Minus className="mx-auto h-4 w-4 text-zinc-600" />
                          ) : (
                            <span className="font-mono text-xs text-zinc-200">{val}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
