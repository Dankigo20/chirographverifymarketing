import { ChevronRight, BookOpen } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVisual } from '@/components/diagrams/HeroVisual';
import { appLinks } from '@/config/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ink-800 bg-ink-950 pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container-page relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          {/* Copy */}
          <div className="animate-fade-up">
            <div className="micro-label mb-5 flex items-center gap-2">
              <span className="h-px w-5 bg-ink-300" />
              Developer verification platform
            </div>

            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
              Cryptographic proof of humanity.
              <span className="block text-ink-400">No passwords, no SMS, no CAPTCHA.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-500">
              Issue a single-use challenge, redirect the user to a hosted WebAuthn ceremony,
              and redeem an opaque result server-side. The browser never decides whether
              a user is verified.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <ButtonLink href={appLinks.getStarted} size="md" external>
                Start building
                <ChevronRight className="h-3.5 w-3.5" />
              </ButtonLink>
              <ButtonLink href="/docs" variant="secondary" size="md">
                <BookOpen className="h-3.5 w-3.5" />
                Read the docs
              </ButtonLink>
            </div>

            {/* Endpoint strip — the console's own vocabulary */}
            <dl className="mt-9 grid grid-cols-2 border-t border-l border-ink-800 sm:grid-cols-4">
              <Stat term="Protocol" value="WebAuthn" />
              <Stat term="Latency" value="12ms" />
              <Stat term="Uptime" value="99.99%" />
              <Stat term="Flow" value="Single-use" />
            </dl>
          </div>

          {/* Visual */}
          <div className="animate-scale-in lg:pt-1">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ term, value }: { term: string; value: string }) {
  return (
    <div className="border-b border-r border-ink-800 px-3 py-2.5">
      <dt className="micro-label">{term}</dt>
      <dd className="mt-1 font-mono text-[13px] font-medium tabular-nums text-ink-900">{value}</dd>
    </div>
  );
}
