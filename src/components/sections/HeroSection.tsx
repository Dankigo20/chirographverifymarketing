import { ArrowRight, BookOpen } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { HeroVisual } from '@/components/diagrams/HeroVisual';
import { appLinks } from '@/config/site';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-ink-200 bg-ink-50 pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* The reference hero sits on a soft diagonal white light-streak. */}
      <div className="bg-streak absolute inset-0" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Bracketed mono eyebrow, as on the reference. */}
          <div className="eyebrow animate-fade-in mb-8">[ INTRODUCING ]</div>

          <h1 className="animate-fade-up text-5xl font-normal leading-[1.04] tracking-tight text-ink-900 sm:text-6xl lg:text-[5rem]">
            Cryptographic proof
            <br className="hidden sm:block" /> of humanity.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg">
            Issue a single-use challenge, redirect the user to a hosted WebAuthn
            ceremony, and redeem an opaque result server-side. The browser never
            decides whether a user is verified.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={appLinks.getStarted} size="lg" external>
              Get started
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/docs" variant="secondary" size="lg">
              <BookOpen className="h-4 w-4" />
              Read the docs
            </ButtonLink>
          </div>
        </div>

        {/* Console vocabulary strip */}
        <dl className="mx-auto mt-24 grid max-w-3xl grid-cols-2 border-l border-t border-ink-200 sm:grid-cols-4">
          <Stat term="Protocol" value="WebAuthn" />
          <Stat term="Latency" value="12ms" />
          <Stat term="Uptime" value="99.99%" />
          <Stat term="Flow" value="Single-use" />
        </dl>

        <div className="animate-scale-in mx-auto mt-20 max-w-5xl">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Stat({ term, value }: { term: string; value: string }) {
  return (
    <div className="border-b border-r border-ink-200 px-4 py-4">
      <dt className="eyebrow">{term}</dt>
      <dd className="mt-1.5 font-mono text-sm tabular-nums text-ink-900">{value}</dd>
    </div>
  );
}
