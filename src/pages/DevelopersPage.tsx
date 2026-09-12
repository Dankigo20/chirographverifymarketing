import { useSeo } from '@/hooks/useSeo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CodeBlock, CodeTabs } from '@/components/ui/CodeBlock';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { appLinks } from '@/config/site';
import {
  Terminal,
  ArrowRight,
  Webhook,
  Workflow,
  Code2,
  ShieldCheck,
  KeyRound,
  Zap,
} from 'lucide-react';

const quickStart = `# 1. Install the widget SDK (or use the CDN script)
npm install @chirograph/verify-widget

# 2. Set your API keys
# Secret key (server-side only — never expose)
export CHIROGRAPH_SECRET_KEY="sk_live_..."

# Publishable key (safe for the browser)
export CHIROGRAPH_PUBLISHABLE_KEY="pk_live_..."`;

const challengeCode = `// Server-side: create a verification challenge
import { Chirograph } from '@chirograph/verify';

const chiro = new Chirograph(process.env.CHIROGRAPH_SECRET_KEY);

const flow = await chiro.challenges.create({
  tenant: 'acme',
  redirect_url: 'https://yourapp.com/verified',
});

// Send flow.flow_id and flow.redirect_url to the client
// flow_id is single-use and expires after a short window`;

const widgetCode = `<!-- Client-side: trigger the widget -->
<script src="https://cdn.chirographverify.com/widget.js"></script>
<script>
  function startVerification(flowId) {
    Chirograph.verify({
      publishableKey: 'pk_live_...',
      flowId: flowId,
      // The SDK redirects the browser to the hosted
      // WebAuthn ceremony, then back to redirect_url
    });
  }
</script>

<button onclick="startVerification(flowId)">
  Verify you're human
</button>`;

const redeemCode = `// Server-side: redeem the verification result
const result = await chiro.flows.redeem({
  flow_id: flowId,
  result_token: resultToken, // from the redirect
});

if (result.verified) {
  // The user is a real person
  await db.users.markVerified(userId, {
    trust_score: result.trust_score,
    device: result.device,
    verified_at: new Date(),
  });
}`;

const webhookCode = `// Server-side: handle signed webhook events
import crypto from 'crypto';

export async function POST(req) {
  const signature = req.headers.get('X-Chirograph-Signature');
  const rawBody = await req.text();

  const expected = crypto
    .createHmac('sha256', process.env.CHIROGRAPH_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');

  if (!crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  )) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody);
  switch (event.type) {
    case 'verification.succeeded':
      await markUserVerified(event.data.flow_id);
      break;
    case 'verification.failed':
      await logFailedAttempt(event.data.flow_id);
      break;
  }

  return new Response('ok', { status: 200 });
}`;

const endpoints = [
  { method: 'POST', path: '/v1/challenge', desc: 'Create a single-use verification challenge' },
  { method: 'POST', path: '/v1/verify', desc: 'Verify a WebAuthn assertion' },
  { method: 'POST', path: '/widget/flow', desc: 'Create a widget verification flow' },
  { method: 'POST', path: '/widget/ceremony', desc: 'Run the hosted WebAuthn ceremony' },
  { method: 'POST', path: '/widget/redeem', desc: 'Redeem an opaque verification result' },
];

export function DevelopersPage() {
  useSeo({
    title: 'Developers — Chirograph Verify',
    description:
      'Integrate Chirograph Verify: quick start, API reference, widget SDK, webhook events, and the verification flow architecture.',
    path: '/developers',
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="dark-surface absolute inset-0 bg-ink-900" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="absolute left-1/2 top-0 -z-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="container-page relative">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="dark" className="mb-5">
                <Terminal className="h-3.5 w-3.5" />
                Developer documentation
              </Badge>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.02]">
                Integrate in
                <br />
                <span className="text-gradient-light">three calls.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
                Create a challenge, redirect to the hosted ceremony, and redeem the result
                on your backend. The browser never decides verification — your server always does.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={appLinks.getStarted} size="lg" external>
                  Get API keys
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/security" variant="secondary" size="lg" className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10">
                  Security model
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quick start */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Quick start"
              title="Get up and running"
              description="Set up your keys, install the widget, and create your first verification flow."
            />
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl">
            <Reveal delay={100}>
              <CodeBlock code={quickStart} language="bash" filename="terminal" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Verification flow */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="The flow"
              title="The verification flow"
              description="Three steps: challenge → ceremony → redeem. Each step is split between client and server."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {flowSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className="relative h-full rounded-2xl border border-ink-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-sm font-semibold text-white">
                        {i + 1}
                      </span>
                      <Icon className="h-5 w-5 text-primary-600" strokeWidth={2} />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-ink-900">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.desc}</p>
                    <div className="mt-4">
                      <span className={`inline-flex rounded-md px-2 py-1 text-2xs font-semibold uppercase tracking-wider ${step.side === 'Server' ? 'bg-primary-50 text-primary-700' : 'bg-accent-50 text-accent-700'}`}>
                        {step.side}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code examples */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Code"
              title="Integration examples"
              description="The full flow: challenge, widget, redeem, and webhook handling."
            />
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl">
            <Reveal delay={100}>
              <CodeTabs
                tabs={[
                  { label: 'Challenge', code: challengeCode, language: 'ts', filename: 'challenge.ts' },
                  { label: 'Widget', code: widgetCode, language: 'ts', filename: 'widget.html' },
                  { label: 'Redeem', code: redeemCode, language: 'ts', filename: 'redeem.ts' },
                  { label: 'Webhook', code: webhookCode, language: 'ts', filename: 'webhook.ts' },
                ]}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* API reference */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="API reference"
              title="Endpoints"
              description="The core API surface for creating challenges, running the ceremony, and redeeming results."
            />
          </Reveal>

          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-ink-200">
            {endpoints.map((ep, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className={`flex items-center gap-4 px-5 py-4 ${i > 0 ? 'border-t border-ink-200' : ''} hover:bg-ink-50 transition-colors`}>
                  <span className="inline-flex shrink-0 rounded-md bg-primary-50 px-2.5 py-1 font-mono text-2xs font-semibold text-primary-700">
                    {ep.method}
                  </span>
                  <code className="shrink-0 font-mono text-sm text-ink-800">{ep.path}</code>
                  <span className="ml-auto hidden text-sm text-ink-500 sm:block">{ep.desc}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="dark-surface absolute inset-0 bg-ink-900" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="Architecture"
              title="How the pieces fit together"
              description="Your application, the widget SDK, the Chirograph server, and your backend — each with a clear responsibility."
            />
          </Reveal>

          <Reveal delay={150}>
            <div className="mx-auto mt-14 max-w-3xl">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
                <div className="space-y-4">
                  <ArchRow icon={Code2} label="Your application" desc="Renders the verify button, calls your backend for a flow ID" side="Client" />
                  <ArchArrow />
                  <ArchRow icon={KeyRound} label="Chirograph API" desc="Creates a single-use challenge and flow" side="Server" />
                  <ArchArrow />
                  <ArchRow icon={Workflow} label="Widget SDK" desc="Redirects browser to the hosted ceremony" side="Client" />
                  <ArchArrow />
                  <ArchRow icon={ShieldCheck} label="Chirograph server" desc="Verifies the WebAuthn assertion, issues opaque result" side="Server" />
                  <ArchArrow />
                  <ArchRow icon={Webhook} label="Your backend" desc="Redeems the result, verifies webhooks, marks user verified" side="Server" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-28">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-ink-200 bg-gradient-to-br from-ink-50 to-accent-50/40 p-12 text-center lg:p-16">
              <Zap className="mx-auto h-8 w-8 text-primary-600" />
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Ready to build?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-ink-500">
                Get your API keys and ship verification to production today.
              </p>
              <div className="mt-6">
                <ButtonLink href={appLinks.getStarted} size="lg" external>
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

const flowSteps = [
  {
    icon: KeyRound,
    title: 'Create a challenge',
    desc: 'Your backend calls the Chirograph API to create a single-use verification flow and gets a flow ID.',
    side: 'Server',
  },
  {
    icon: Workflow,
    title: 'Redirect to ceremony',
    desc: 'The widget SDK redirects the browser to the hosted WebAuthn ceremony. The user verifies with their device.',
    side: 'Client',
  },
  {
    icon: ShieldCheck,
    title: 'Redeem the result',
    desc: 'Your backend redeems the opaque result token server-side and marks the user as verified.',
    side: 'Server',
  },
];

function ArchRow({
  icon: Icon,
  label,
  desc,
  side,
}: {
  icon: typeof Code2;
  label: string;
  desc: string;
  side: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 text-primary-300">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-white">{label}</h4>
          <span className={`inline-flex rounded px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wider ${side === 'Server' ? 'bg-primary-500/20 text-primary-300' : 'bg-accent-500/20 text-accent-300'}`}>
            {side}
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-ink-400">{desc}</p>
      </div>
    </div>
  );
}

function ArchArrow() {
  return (
    <div className="ml-[22px] flex h-6 w-px bg-white/15" aria-hidden="true">
      <svg className="ml-[-6px] mt-5 h-3 w-3 text-white/30" viewBox="0 0 12 12" fill="none">
        <path d="M6 1V11M6 11L2 7M6 11L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
