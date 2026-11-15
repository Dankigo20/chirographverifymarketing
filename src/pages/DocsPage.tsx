import { ArrowLeft, ArrowRight, Menu, Search, X } from 'lucide-react';
import { useMemo, useState, type ComponentType } from 'react';
import { DocApiKeys } from '@/components/docs/content/DocApiKeys';
import {
  DocApiCeremonyComplete,
  DocApiCeremonyOptions,
  DocApiChallenge,
  DocApiVerify,
  DocApiWidgetFlows,
  DocApiWidgetRedeem,
} from '@/components/docs/content/DocApiReference';
import { DocAuthentication } from '@/components/docs/content/DocAuthentication';
import { DocChangelog } from '@/components/docs/content/DocChangelog';
import { DocDeviceTrust } from '@/components/docs/content/DocDeviceTrust';
import { DocEnvironmentVariables } from '@/components/docs/content/DocEnvironmentVariables';
import { DocErrors } from '@/components/docs/content/DocErrors';
import { DocFaq } from '@/components/docs/content/DocFaq';
import { DocHostedCeremony } from '@/components/docs/content/DocHostedCeremony';
import { DocIntroduction } from '@/components/docs/content/DocIntroduction';
import { DocNodeSdk } from '@/components/docs/content/DocNodeSdk';
import { DocQuickStart } from '@/components/docs/content/DocQuickStart';
import { DocRedeemingResult } from '@/components/docs/content/DocRedeemingResult';
import { DocReplayProtection } from '@/components/docs/content/DocReplayProtection';
import { DocSecurityModel } from '@/components/docs/content/DocSecurityModel';
import { DocVerificationFlow } from '@/components/docs/content/DocVerificationFlow';
import { DocWebhookSecurity } from '@/components/docs/content/DocWebhookSecurity';
import { DocWebhooks } from '@/components/docs/content/DocWebhooks';
import { DocWidgetSdk } from '@/components/docs/content/DocWidgetSdk';

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
      { slug: 'api-widget-flows', title: 'POST /v1/widget/flows' },
      { slug: 'api-ceremony-options', title: 'POST /v1/widget/ceremony/options' },
      { slug: 'api-ceremony-complete', title: 'POST /v1/widget/ceremony/complete' },
      { slug: 'api-widget-redeem', title: 'POST /v1/widget/redeem' },
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

const DOC_COMPONENTS: Record<string, ComponentType> = {
  introduction: DocIntroduction,
  'quick-start': DocQuickStart,
  authentication: DocAuthentication,
  'environment-variables': DocEnvironmentVariables,
  'verification-flow': DocVerificationFlow,
  'hosted-ceremony': DocHostedCeremony,
  'redeeming-the-result': DocRedeemingResult,
  webhooks: DocWebhooks,
  'api-challenge': DocApiChallenge,
  'api-verify': DocApiVerify,
  'api-widget-flows': DocApiWidgetFlows,
  'api-ceremony-options': DocApiCeremonyOptions,
  'api-ceremony-complete': DocApiCeremonyComplete,
  'api-widget-redeem': DocApiWidgetRedeem,
  'node-sdk': DocNodeSdk,
  'widget-sdk': DocWidgetSdk,
  'security-model': DocSecurityModel,
  'api-keys': DocApiKeys,
  'replay-protection': DocReplayProtection,
  'device-trust': DocDeviceTrust,
  'webhook-security': DocWebhookSecurity,
  errors: DocErrors,
  faq: DocFaq,
  changelog: DocChangelog,
};

function DocArticleContent({ slug, onNavigate }: { slug: string; onNavigate: (path: string) => void }) {
  const Content = DOC_COMPONENTS[slug];

  if (!Content) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Documentation
        </h1>
        <p className="text-sm leading-relaxed text-zinc-400">
          Chirograph Verify uses W3C WebAuthn passkeys and server-side challenge state. Challenges
          are single-use, tenant-isolated, and resolved strictly by your backend via{' '}
          <code className="font-mono text-emerald-300">POST /v1/widget/redeem</code> or
          HMAC-signed webhooks.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/docs/introduction')}
          className="glass-panel-soft inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-zinc-200 hover:text-white cursor-pointer"
        >
          Read the introduction
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return <Content />;
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
