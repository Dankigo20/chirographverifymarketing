import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Coins, MessagesSquare, LayoutGrid, Store, Users, ShieldBan } from 'lucide-react';

const useCases = [
  {
    icon: Coins,
    title: 'Web3 applications',
    desc: 'Gate token claims, presale access, and airdrops behind real-person verification. Stop sybil farming without KYC friction.',
  },
  {
    icon: MessagesSquare,
    title: 'Discord & communities',
    desc: 'Prevent raid attacks and bot infiltration. Verify members before they join or post, using device-level proof.',
  },
  {
    icon: LayoutGrid,
    title: 'SaaS platforms',
    desc: 'Block automated signups and trial abuse. Let real users in instantly with passkeys instead of email loops.',
  },
  {
    icon: Store,
    title: 'Marketplaces',
    desc: 'Verify buyers and sellers at onboarding. Reduce fake listings, review manipulation, and fraudulent accounts.',
  },
  {
    icon: Users,
    title: 'Online communities',
    desc: 'Protect forums and social platforms from mass account creation and coordinated inauthentic behavior.',
  },
  {
    icon: ShieldBan,
    title: 'Anti-abuse systems',
    desc: 'Layer Chirograph into your existing abuse pipeline as a strong, low-friction signal for human verification.',
  },
];

export function UseCases() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Use cases"
            title="Built for platforms that need real users"
            description="Wherever bots create accounts, raid communities, or abuse systems, Chirograph adds a cryptographic layer of human verification."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <Reveal key={i} delay={(i % 3) * 80}>
                <div className="group h-full rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:border-ink-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-50 text-ink-700 transition-all duration-300 group-hover:bg-primary-50 group-hover:text-primary-600 group-hover:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </div>
                    <h3 className="text-base font-semibold text-ink-900">{uc.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{uc.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
