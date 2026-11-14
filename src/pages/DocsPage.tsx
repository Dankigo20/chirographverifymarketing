import { ArrowLeft, ArrowRight, Check, Copy, Menu, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { APP_URLS, FAQ_ITEMS, QUICK_START_TABS } from '../data/chirographContent';

interface DocNavGroup {
  label: string;
  pages: { slug: string; title: string }[];
}

const DOC_GROUPS: DocNavGroup[] = [
  {
    label: 'Getting Started',
    pages: [
      { slug: 'introduction', title: 'Introduction' },
      { slug: 'quick-start', title: 'Quick Start' },
      { slug: 'authentication', title: 'Authentication' },
      { slug: 'environment-variables', title: 'Environment Variables' },
    ],
  },
  {
    label: 'Verification',
    pages: [
      { slug: 'verification-flow', title: 'Verification Flow' },
      { slug: 'hosted-ceremony', title: 'Hosted Ceremony' },
      { slug: 'redeeming-the-result', title: 'Redeeming the Result' },
      { slug: 'webhooks', title: 'Webhooks' },
    ],
  },
  {
    label: 'API Reference',
    pages: [
      { slug: 'api-challenge', title: 'POST /v1/challenge' },
      { slug: 'api-verify', title: 'POST /v1/verify' },
      { slug: 'api-widget-flows', title: 'POST /widget/flow' },
      { slug: 'api-ceremony-options', title: 'POST /widget/ceremony' },
      { slug: 'api-widget-redeem', title: 'POST /widget/redeem' },
    ],
  },
  {
    label: 'SDKs',
    pages: [
      { slug: 'node-sdk', title: 'Node.js SDK' },
      { slug: 'widget-sdk', title: 'Browser Widget SDK' },
    ],
  },
  {
    label: 'Security',
    pages: [
      { slug: 'security-model', title: 'Security Model' },
      { slug: 'api-keys', title: 'API Keys' },
      { slug: 'replay-protection', title: 'Replay Protection' },
      { slug: 'device-trust', title: 'Device Trust & Abuse Detection' },
      { slug: 'webhook-security', title: 'Webhook Security' },
    ],
  },
  {
    label: 'Resources',
    pages: [
      { slug: 'errors', title: 'Errors' },
      { slug: 'faq', title: 'FAQ' },
      { slug: 'changelog', title: 'Changelog' },
    ],
  },
];

const ALL_DOC_PAGES = DOC_GROUPS.flatMap((g) => g.pages);

function CodeSnippet({ filename, code }: { filename: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <div className="glass-panel my-5 overflow-hidden rounded-2xl p-1.5">
      <div className="flex items-center justify-between px-4 py-2.5">
        <span className="font-mono text-xs text-zinc-400">{filename}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="morph-socket inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-zinc-300 hover:text-white cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="glass-well overflow-x-auto rounded-xl p-4 font-mono text-xs leading-relaxed text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function DocArticleContent({ slug, onNavigate }: { slug: string; onNavigate: (path: string) => void }) {
  switch (slug) {
    case 'introduction':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Introduction
          </h1>
          <p className="text-base leading-relaxed text-zinc-300">
            Chirograph Verify is device-biometric bot-prevention infrastructure for developers. It verifies real users through WebAuthn passkeys and platform authenticators — without passwords, SMS OTPs, or CAPTCHA puzzles.
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            Every verification flow starts on your server with a single-use challenge, redirects the user to a hosted WebAuthn ceremony, validates the cryptographic assertion on the Chirograph server, and issues an opaque result token your backend redeems.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
            <GlassCard className="p-5 cursor-pointer" onClick={() => onNavigate('/docs/quick-start')}>
              <div className="text-sm font-semibold text-white">Quick Start →</div>
              <div className="mt-1 text-xs text-zinc-400">Integrate challenge, widget, and redeem in minutes.</div>
            </GlassCard>
            <GlassCard className="p-5 cursor-pointer" onClick={() => onNavigate('/docs/api-challenge')}>
              <div className="text-sm font-semibold text-white">API Reference →</div>
              <div className="mt-1 text-xs text-zinc-400">Explore /v1/challenge, /v1/verify, and /widget endpoints.</div>
            </GlassCard>
          </div>
        </div>
      );

    case 'quick-start':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Quick Start
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Complete the full verification integration in three steps: create a challenge server-side, trigger the redirect widget in the browser, and redeem the opaque result on your backend.
          </p>
          {QUICK_START_TABS.map((tab) => (
            <div key={tab.id}>
              <h2 className="mt-6 text-lg font-medium text-white">{tab.label}</h2>
              <CodeSnippet filename={tab.filename} code={tab.code} />
            </div>
          ))}
        </div>
      );

    case 'authentication':
    case 'api-keys':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {slug === 'authentication' ? 'Authentication' : 'API Keys'}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Server-side API endpoints authenticate using your tenant secret key passed via the <code className="font-mono text-emerald-400">X-API-Key</code> header. Browser widget flows use your publishable widget key (<code className="font-mono text-[#7e95ff]">pk_live_...</code>).
          </p>
          <div className="glass-panel overflow-x-auto rounded-2xl p-1.5">
            <table className="glass-well w-full rounded-xl text-left text-sm overflow-hidden">
              <thead className="border-b border-white/[0.08] bg-white/[0.03] text-xs font-semibold text-white">
                <tr>
                  <th className="px-4 py-3">Environment</th>
                  <th className="px-4 py-3">Secret key</th>
                  <th className="px-4 py-3">Publishable key</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.07] font-mono text-xs text-zinc-300">
                <tr>
                  <td className="px-4 py-3 font-sans text-sm">Development</td>
                  <td className="px-4 py-3">sk_test_...</td>
                  <td className="px-4 py-3">pk_test_...</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-sans text-sm">Production</td>
                  <td className="px-4 py-3 text-emerald-400">sk_live_…</td>
                  <td className="px-4 py-3 text-[#7e95ff]">pk_live_…</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400">
            Never commit <code className="font-mono">.env</code> files or expose secret API keys in client-side bundles. Manage your tenant keys directly in the{' '}
            <a
              href={APP_URLS.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline underline-offset-4"
            >
              Chirograph Dashboard
            </a>.
          </p>
        </div>
      );

    case 'environment-variables':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Environment Variables
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Store your secret API key and webhook signing secret strictly in server-side environment variables.
          </p>
          <CodeSnippet
            filename=".env"
            code={`CHIROGRAPH_SECRET_KEY=sk_live_...
CHIROGRAPH_WEBHOOK_SECRET=whsec_...
VITE_CHIROGRAPH_PUBLISHABLE_KEY=pk_live_...`}
          />
        </div>
      );

    case 'api-challenge':
      return (
        <div className="space-y-6">
          <div className="font-mono text-xs text-emerald-400">POST /v1/challenge</div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create a single-use verification challenge
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Creates a single-use verification challenge. Your backend calls this endpoint before redirecting the user to the hosted ceremony.
          </p>
          <CodeSnippet filename="challenge.ts" code={QUICK_START_TABS[0].code} />
        </div>
      );

    case 'api-verify':
      return (
        <div className="space-y-6">
          <div className="font-mono text-xs text-emerald-400">POST /v1/verify</div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Verify a WebAuthn assertion
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Verifies a WebAuthn cryptographic assertion server-side against the issued single-use challenge, RP ID, and origin binding.
          </p>
          <CodeSnippet
            filename="verify.ts"
            code={`const res = await fetch('https://app.chirographverify.com/v1/verify', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.CHIROGRAPH_SECRET_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    flow_id: flowId,
    assertion,
  }),
});`}
          />
        </div>
      );

    case 'api-widget-flows':
    case 'api-ceremony-options':
    case 'widget-sdk':
      return (
        <div className="space-y-6">
          <div className="font-mono text-xs text-[#7e95ff]">Widget SDK &amp; Hosted Ceremony</div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {slug === 'api-widget-flows'
              ? 'POST /widget/flow'
              : slug === 'api-ceremony-options'
              ? 'POST /widget/ceremony'
              : 'Browser Widget SDK'}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            The Chirograph widget is a lightweight JavaScript SDK (<code className="font-mono text-zinc-200">https://app.chirographverify.com/widget.js</code>) that initiates a top-level browser redirect to the hosted ceremony (<code className="font-mono text-zinc-200">/widget/ceremony</code>) and returns the user with a single-use opaque result token.
          </p>
          <CodeSnippet filename="widget.html" code={QUICK_START_TABS[1].code} />
        </div>
      );

    case 'api-widget-redeem':
    case 'redeeming-the-result':
      return (
        <div className="space-y-6">
          <div className="font-mono text-xs text-emerald-400">POST /widget/redeem</div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Redeem an opaque verification result
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Redeems an opaque verification result token. Your backend calls this endpoint server-side — the browser never decides whether a user is verified.
          </p>
          <CodeSnippet filename="redeem.ts" code={QUICK_START_TABS[2].code} />
        </div>
      );

    case 'webhooks':
    case 'webhook-security':
      return (
        <div className="space-y-6">
          <div className="font-mono text-xs text-[#7e95ff]">HMAC-SHA256 Webhooks</div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {slug === 'webhooks' ? 'Webhooks' : 'Webhook Security'}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Every outbound webhook payload is signed with HMAC-SHA256 in the <code className="font-mono text-zinc-200">X-Chirograph-Signature</code> header. Verify the signature against the raw request body using timing-safe comparison.
          </p>
          <CodeSnippet filename="webhook.ts" code={QUICK_START_TABS[3].code} />
        </div>
      );

    case 'faq':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item) => (
              <GlassCard key={item.question} className="p-5">
                <h2 className="text-base font-medium text-white">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.answer}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      );

    case 'changelog':
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Changelog
          </h1>
          <GlassCard className="p-6">
            <div className="text-xs font-mono text-emerald-400">Initial Documentation Release</div>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc pl-5">
              <li>Initial release of /v1/challenge, /v1/verify, /widget/flow, /widget/ceremony, and /widget/redeem APIs</li>
              <li>Browser redirect widget SDK at https://app.chirographverify.com/widget.js</li>
              <li>Security model documentation including replay protection, device trust, and webhook security</li>
            </ul>
          </GlassCard>
        </div>
      );

    default:
      return (
        <div className="space-y-6">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {ALL_DOC_PAGES.find((p) => p.slug === slug)?.title ?? 'Documentation'}
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            Chirograph Verify uses W3C WebAuthn passkeys and server-side challenge state backed by Redis and PostgreSQL. Challenges are single-use, tenant-isolated, and resolved strictly by your backend via <code className="font-mono text-emerald-400">POST /widget/redeem</code> or HMAC-signed webhooks.
          </p>
          <CodeSnippet filename="challenge.ts" code={QUICK_START_TABS[0].code} />
        </div>
      );
  }
}

export function DocsPage({ slug, onNavigate }: { slug?: string; onNavigate: (path: string) => void }) {
  const currentSlug = slug || 'introduction';
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DOC_GROUPS;
    return DOC_GROUPS.map((g) => ({
      ...g,
      pages: g.pages.filter((p) => p.title.toLowerCase().includes(q)),
    })).filter((g) => g.pages.length > 0);
  }, [search]);

  const currentIdx = ALL_DOC_PAGES.findIndex((p) => p.slug === currentSlug);
  const currentTitle = ALL_DOC_PAGES[currentIdx]?.title ?? 'Documentation';
  const prevPage = currentIdx > 0 ? ALL_DOC_PAGES[currentIdx - 1] : null;
  const nextPage = currentIdx >= 0 && currentIdx < ALL_DOC_PAGES.length - 1 ? ALL_DOC_PAGES[currentIdx + 1] : null;

  const selectDoc = (s: string) => {
    setMobileMenuOpen(false);
    onNavigate(`/docs/${s}`);
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl bg-[#020305]">
      {/* Desktop Frosted Glass Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-white/[0.08] bg-white/[0.02] backdrop-blur-xl px-5 py-8">
        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter docs..."
            aria-label="Filter documentation pages"
            className="glass-well w-full rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-zinc-500 focus:border-emerald-400 focus:outline-none"
          />
        </div>

        <nav className="space-y-6">
          {filteredGroups.map((group) => (
            <div key={group.label}>
              <div className="px-2 text-xs font-semibold text-zinc-400">{group.label}</div>
              <ul className="mt-2 space-y-1">
                {group.pages.map((page) => {
                  const active = page.slug === currentSlug;
                  return (
                    <li key={page.slug}>
                      <button
                        type="button"
                        onClick={() => selectDoc(page.slug)}
                        className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs transition-all cursor-pointer ${
                          active
                            ? 'border border-emerald-500/30 bg-emerald-500/15 font-medium text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                            : 'text-zinc-400 hover:bg-white/[0.05] hover:text-white'
                        }`}
                      >
                        {page.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile Docs Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 h-full w-72 overflow-y-auto border-r border-white/10 bg-[#05070b]/95 backdrop-blur-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Documentation</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="space-y-5">
              {DOC_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="text-xs font-semibold text-zinc-400">{group.label}</div>
                  <ul className="mt-1.5 space-y-1">
                    {group.pages.map((page) => (
                      <li key={page.slug}>
                        <button
                          type="button"
                          onClick={() => selectDoc(page.slug)}
                          className={`w-full rounded-lg px-2.5 py-1.5 text-left text-xs ${
                            page.slug === currentSlug
                              ? 'bg-emerald-500/15 font-medium text-emerald-300'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {page.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-w-0 flex-1 px-6 py-10 lg:px-12 lg:py-14">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="glass-panel-soft inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-200"
          >
            <Menu className="h-4 w-4" />
            <span>Docs Menu</span>
          </button>
        </div>

        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-zinc-500">
          <button
            type="button"
            onClick={() => onNavigate('/docs')}
            className="hover:text-white cursor-pointer"
          >
            Docs
          </button>
          <span>/</span>
          <span className="text-zinc-300">{currentTitle}</span>
        </div>

        <div className="max-w-3xl">
          <DocArticleContent slug={currentSlug} onNavigate={onNavigate} />

          <div className="mt-14 flex items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
            {prevPage ? (
              <button
                type="button"
                onClick={() => selectDoc(prevPage.slug)}
                className="glass-panel-soft inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{prevPage.title}</span>
              </button>
            ) : (
              <span />
            )}

            {nextPage && (
              <button
                type="button"
                onClick={() => selectDoc(nextPage.slug)}
                className="glass-panel-soft inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 cursor-pointer"
              >
                <span>{nextPage.title}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
