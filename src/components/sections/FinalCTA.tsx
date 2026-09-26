import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { appLinks } from '@/config/site';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-ink-200 py-32 lg:py-40">
      <div className="bg-streak absolute inset-0" aria-hidden="true" />

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-normal leading-[1.08] tracking-tight text-ink-900 sm:text-5xl lg:text-[3.5rem]">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-500 sm:text-lg">
              Add cryptographic human verification to your platform in an afternoon.
              No CAPTCHA, no SMS, no passwords — just verified users.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href={appLinks.getStarted} size="lg" external>
                Get started
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
