import { ChevronRight, BookOpen } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { HeroVisual } from '@/components/diagrams/HeroVisual';
import { appLinks } from '@/config/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Dark surface — matches HowItWorks / SecuritySection / FinalCTA */}
      <div className="dark-surface absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-grid-dark opacity-40" />
      <div className="absolute left-1/2 top-0 -z-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary-500/20 via-accent-500/10 to-transparent blur-3xl" />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="animate-fade-up">
            <Badge variant="dark" className="mb-5">
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse-soft" />
              WebAuthn-powered verification
            </Badge>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02] lg:tracking-tighter">
              Prove you're human.
              <br />
              <span className="text-gradient-light">Without passwords.</span>
              <br />
              <span className="text-ink-400">Without SMS.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300">
              Chirograph Verify is a device-biometric bot-prevention API for developers.
              Verify real users with WebAuthn and platform authenticators like Face ID and
              Touch ID — with server-side cryptographic verification. No CAPTCHA, no friction.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={appLinks.getStarted} size="lg" external>
                Start building
                <ChevronRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/docs"
                variant="secondary"
                size="lg"
                className="!border-white/15 !bg-white/5 !text-white hover:!bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                Documentation
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-300">
              <Feature>No CAPTCHA</Feature>
              <Feature>No SMS codes</Feature>
              <Feature>No passwords</Feature>
              <Feature>Server-side verified</Feature>
            </div>
          </div>

          {/* Visual */}
          <div className="animate-scale-in lg:pl-8">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2 7L5.5 10.5L12 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-500"
        />
      </svg>
      {children}
    </span>
  );
}
