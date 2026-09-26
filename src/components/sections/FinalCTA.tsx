import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { appLinks } from '@/config/site';
import { ArrowRight, BookOpen } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-ink-200 bg-ink-50/60 py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl lg:tracking-tighter">
              Stop fighting bots
              <br />
              <span className="text-primary-600">with more friction.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
              Add cryptographic human verification to your platform in an afternoon.
              No CAPTCHA, no SMS, no passwords — just verified users.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={appLinks.getStarted} size="lg" external>
                Start building
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/docs" variant="secondary" size="lg">
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
