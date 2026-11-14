import { ArrowUpRight, Check } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  APP_URLS,
  SECURITY_DEEP_DIVE,
  SECURITY_LAYERS,
} from '../data/chirographContent';

const WEBHOOK_CODE = `import crypto from 'crypto';

function verifyWebhook(rawBody: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  const a = Buffer.from(signature, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

// In your webhook handler:
// const signature = req.headers['x-chirograph-signature'];`;

export function SecurityPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <div className="bg-[#020305]">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/[0.08] pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/4 h-80 w-[440px] animate-morph-a bg-[#3B5BFF]/18 blur-[125px]" />
        <div aria-hidden="true" className="pointer-events-none absolute top-10 right-1/4 h-72 w-96 animate-morph-b bg-emerald-500/14 blur-[125px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-mono text-emerald-400">Security architecture</p>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl [text-wrap:balance]">
                Verified by cryptography, not by trust.
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                No party — not the browser, not the user, not a man-in-the-middle — can forge a verification result. Here&apos;s how the security model works.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {SECURITY_LAYERS.map((layer, idx) => (
              <ScrollReveal key={layer.layer} delay={idx * 0.04} className="h-full">
                <GlassCard className="h-full p-5">
                  <div className="font-mono text-xs text-emerald-400">{layer.layer}</div>
                  <div className="mt-2 text-base font-semibold text-white">{layer.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-zinc-400">{layer.subtitle}</div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Deep-Dive Security Cards */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-20 lg:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-10 right-[10%] h-96 w-[440px] animate-morph-b bg-[#3B5BFF]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {SECURITY_DEEP_DIVE.map((card, idx) => (
              <ScrollReveal key={card.title} delay={(idx % 2) * 0.06} className="h-full">
                <GlassCard className="h-full p-7">
                  <h2 className="text-xl font-semibold text-white">{card.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-5">
                    {card.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Webhook Verification Implementation */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <ScrollReveal className="lg:col-span-5">
              <p className="text-xs font-mono text-[#7e95ff]">Implementation</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Verify webhooks on your backend
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                Every webhook event is HMAC-signed. Always verify the signature using the raw request body before trusting the event payload.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="/docs/webhook-security"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/docs/webhook-security');
                  }}
                  className="glass-panel-soft inline-flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:border-white/25"
                >
                  Read Webhook Security Docs
                </a>
                <a
                  href={APP_URLS.getStarted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400"
                >
                  <span>Get started</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="lg:col-span-7">
              <div className="glass-panel overflow-hidden rounded-2xl p-2">
                <div className="px-4 py-2.5 font-mono text-xs text-zinc-400">
                  verify-webhook.ts
                </div>
                <pre className="glass-well overflow-x-auto rounded-xl p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-200">
                  <code>{WEBHOOK_CODE}</code>
                </pre>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
