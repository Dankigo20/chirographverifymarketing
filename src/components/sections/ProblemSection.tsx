import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Ban, MessageSquareOff, KeyRound, UserX, Bot, ShieldOff } from 'lucide-react';

const problems = [
  {
    icon: Bot,
    title: 'Automated account creation',
    desc: 'Bots sign up at scale, flooding your platform with fake users and synthetic activity.',
  },
  {
    icon: Ban,
    title: 'CAPTCHA friction',
    desc: 'Image puzzles annoy real users, are increasingly solvable by bots, and kill conversion.',
  },
  {
    icon: MessageSquareOff,
    title: 'SMS verification abuse',
    desc: 'Phone-based OTPs are expensive, interceptable, and trivially bypassed with disposable numbers.',
  },
  {
    icon: KeyRound,
    title: 'Password-based identity',
    desc: 'Passwords are reused, phished, and leaked. They prove possession of a secret, not personhood.',
  },
  {
    icon: UserX,
    title: 'Disposable accounts',
    desc: 'Throwaway identities let bad actors evade bans, rate limits, and community moderation.',
  },
  {
    icon: ShieldOff,
    title: 'Community raids',
    desc: 'Coordinated automated attacks overwhelm Discord servers, marketplaces, and launches.',
  },
];

export function ProblemSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="The problem"
            title="Traditional verification is broken"
            description="Every common method for telling humans from bots either adds friction for real users, fails to stop determined attackers, or both."
          />
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={i} delay={i * 80}>
                <div className="group h-full rounded-2xl border border-ink-200 bg-white p-7 transition-all duration-300 hover:border-ink-300 hover:shadow-card-hover hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-error-500/10 text-error-500">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-ink-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Transition */}
        <Reveal>
          <div className="mt-20 flex flex-col items-center text-center">
            <p className="max-w-xl text-lg leading-relaxed text-ink-500">
              Chirograph takes a different approach — one built on cryptography, not puzzles.
            </p>
            <div className="mt-4 text-primary-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
