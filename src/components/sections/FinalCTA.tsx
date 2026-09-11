import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { appLinks } from '@/config/site';
import { ArrowRight, BookOpen } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36">
      <div className="dark-surface absolute inset-0 bg-ink-900" />
      <div className="absolute inset-0 bg-grid-dark opacity-30" />
      <div className="absolute left-1/2 top-1/2 -z-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/12 blur-3xl" />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02] lg:tracking-tighter">
              Stop fighting bots
              <br />
              <span className="text-gradient-light">with more friction.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-300">
              Add cryptographic human verification to your platform in an afternoon.
              No CAPTCHA, no SMS, no passwords — just verified users.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">              <ButtonLink href={appLinks.getStarted} size="lg" external>
                Start building
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href="/docs"
                variant="secondary"
                size="lg"
                className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                Read the documentation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
