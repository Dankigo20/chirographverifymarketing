import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CodeTabs } from '@/components/ui/CodeBlock';
import { ButtonLink } from '@/components/ui/Button';
import { appLinks } from '@/config/site';
import { Terminal, ArrowRight } from 'lucide-react';

const challengeCode = `// 1. Create a verification challenge (server-side)
const res = await fetch('https://app.chirographverify.com/v1/challenge', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tenant: 'acme',
    redirect_url: 'https://yourapp.com/verified',
  }),
});

const { flow_id, redirect_url } = await res.json();
// flow_id is single-use. Redirect the user to redirect_url.`;

const widgetCode = `<!-- 2. Trigger the widget from your frontend -->
<script src="https://cdn.chirographverify.com/widget.js"></script>
<button onclick="startVerification()">Verify you're human</button>

<script>
  function startVerification() {
    Chirograph.verify({
      publishableKey: 'pk_live_...',
      flowId: flowIdFromYourBackend,
      // user is redirected to the hosted
      // WebAuthn ceremony, then back here
    });
  }
</script>`;

const redeemCode = `// 3. Redeem the result on your backend (server-side)
const res = await fetch('https://app.chirographverify.com/widget/redeem', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    flow_id: flowId,
    result_token: resultTokenFromRedirect,
  }),
});

const { verified, trust_score, device } = await res.json();
// verified === true  → the user is a real person
// trust_score        → risk-based confidence signal`;

const webhookCode = `// 4. Receive signed webhook events
import crypto from 'crypto';

export async function POST(req) {
  const signature = req.headers.get('X-Chirograph-Signature');
  const body = await req.text();

  // Verify the webhook signature
  const expected = crypto
    .createHmac('sha256', process.env.CHIROGRAPH_WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (!crypto.timingSafeEqual(
    Buffer.from(signature), Buffer.from(expected)
  )) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);
  if (event.type === 'verification.succeeded') {
    // Mark user as verified in your database
    await markVerified(event.data.flow_id);
  }
}`;

export function DeveloperSection() {
  return (
    <section id="developers-preview" className="relative scroll-mt-20 border-t border-ink-100 bg-ink-50/60 py-24 lg:py-32">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <div className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-600">
                For developers
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                Integrate in three calls
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
                Create a challenge, redirect to the hosted ceremony, and redeem the
                result on your backend. The browser never decides verification —
                your server always does.
              </p>

              <ul className="mt-7 space-y-3.5">
                <DevFeature>Server-side challenge creation with single-use flows</DevFeature>
                <DevFeature>Redirect-based widget SDK — no iframe, no React dependency</DevFeature>
                <DevFeature>Backend redemption of opaque verification results</DevFeature>
                <DevFeature>Signed webhooks for real-time verification events</DevFeature>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/docs" variant="primary" size="lg">
                  Read the docs
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={appLinks.getStarted} variant="secondary" size="lg" external>
                  Get API keys
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-ink-500">
                <Terminal className="h-4 w-4" />
                Quick start
              </div>
              <CodeTabs
                tabs={[
                  { label: 'Challenge', code: challengeCode, language: 'ts', filename: 'challenge.ts' },
                  { label: 'Widget', code: widgetCode, language: 'ts', filename: 'widget.html' },
                  { label: 'Redeem', code: redeemCode, language: 'ts', filename: 'redeem.ts' },
                  { label: 'Webhook', code: webhookCode, language: 'ts', filename: 'webhook.ts' },
                ]}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DevFeature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-ink-600">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
        <path d="M3 8L6.5 11.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-500" />
      </svg>
      {children}
    </li>
  );
}
