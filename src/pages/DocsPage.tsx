import { useState, useEffect } from 'react';
import { Menu, Fingerprint } from 'lucide-react';
import { DocsSidebar } from '@/components/docs/DocsSidebar';
import { DocNav } from '@/components/docs/DocNav';
import { useSeo } from '@/hooks/useSeo';
import { docSections, allDocPages, docsLandingSlug } from '@/config/docs';

import { DocIntroduction } from '@/components/docs/content/DocIntroduction';
import { DocQuickStart } from '@/components/docs/content/DocQuickStart';
import { DocAuthentication } from '@/components/docs/content/DocAuthentication';
import { DocEnvironmentVariables } from '@/components/docs/content/DocEnvironmentVariables';
import { DocVerificationFlow } from '@/components/docs/content/DocVerificationFlow';
import { DocHostedCeremony } from '@/components/docs/content/DocHostedCeremony';
import { DocRedeemingResult } from '@/components/docs/content/DocRedeemingResult';
import { DocWebhooks } from '@/components/docs/content/DocWebhooks';
import {
  DocApiChallenge,
  DocApiVerify,
  DocApiWidgetFlows,
  DocApiCeremonyOptions,
  DocApiCeremonyComplete,
  DocApiWidgetRedeem,
} from '@/components/docs/content/DocApiReference';
import { DocNodeSdk } from '@/components/docs/content/DocNodeSdk';
import { DocWidgetSdk } from '@/components/docs/content/DocWidgetSdk';
import { DocSecurityModel } from '@/components/docs/content/DocSecurityModel';
import { DocApiKeys } from '@/components/docs/content/DocApiKeys';
import { DocReplayProtection } from '@/components/docs/content/DocReplayProtection';
import { DocDeviceTrust } from '@/components/docs/content/DocDeviceTrust';
import { DocWebhookSecurity } from '@/components/docs/content/DocWebhookSecurity';
import { DocErrors } from '@/components/docs/content/DocErrors';
import { DocFaq } from '@/components/docs/content/DocFaq';
import { DocChangelog } from '@/components/docs/content/DocChangelog';

import type { ReactNode } from 'react';

const contentMap: Record<string, ReactNode> = {
  introduction: <DocIntroduction />,
  'quick-start': <DocQuickStart />,
  authentication: <DocAuthentication />,
  'environment-variables': <DocEnvironmentVariables />,
  'verification-flow': <DocVerificationFlow />,
  'hosted-ceremony': <DocHostedCeremony />,
  'redeeming-the-result': <DocRedeemingResult />,
  webhooks: <DocWebhooks />,
  'api-challenge': <DocApiChallenge />,
  'api-verify': <DocApiVerify />,
  'api-widget-flows': <DocApiWidgetFlows />,
  'api-ceremony-options': <DocApiCeremonyOptions />,
  'api-ceremony-complete': <DocApiCeremonyComplete />,
  'api-widget-redeem': <DocApiWidgetRedeem />,
  'node-sdk': <DocNodeSdk />,
  'widget-sdk': <DocWidgetSdk />,
  'security-model': <DocSecurityModel />,
  'api-keys': <DocApiKeys />,
  'replay-protection': <DocReplayProtection />,
  'device-trust': <DocDeviceTrust />,
  'webhook-security': <DocWebhookSecurity />,
  errors: <DocErrors />,
  faq: <DocFaq />,
  changelog: <DocChangelog />,
};

const titleMap: Record<string, string> = Object.fromEntries(
  allDocPages.map((p) => [p.slug, p.title])
);

interface DocsPageProps {
  slug?: string;
  navigate: (to: string) => void;
}

export function DocsPage({ slug, navigate }: DocsPageProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const currentSlug = slug ?? docsLandingSlug;
  const pageTitle = titleMap[currentSlug] ?? 'Documentation';

  useSeo({
    title: `${pageTitle} — Chirograph Verify Docs`,
    description: 'Developer documentation for Chirograph Verify — the device-biometric bot-prevention API built on WebAuthn.',
    path: `/docs/${currentSlug}`,
  });

  // Close mobile sidebar on slug change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [currentSlug]);

  const content = contentMap[currentSlug];

  return (
    <div className="flex min-h-screen">
      <DocsSidebar
        currentSlug={currentSlug}
        navigate={navigate}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        {/* Mobile docs header */}
        <div className="sticky top-16 z-30 flex items-center justify-between border-b border-ink-200 bg-white/90 px-5 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-50"
            aria-label="Open documentation navigation"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary-600 to-accent-600">
              <Fingerprint className="h-4 w-4 text-white" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-semibold text-ink-900">Docs</span>
          </div>
        </div>

        {/* Doc content */}
        <div className="container-page mx-auto max-w-4xl px-5 py-12 lg:px-10 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-ink-400">
            <button
              onClick={() => navigate('/docs')}
              className="hover:text-ink-700"
            >
              Docs
            </button>
            <span>/</span>
            <span className="text-ink-600">{pageTitle}</span>
          </div>

          {content ?? (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-ink-900">Page not found</p>
              <p className="mt-2 text-sm text-ink-500">
                The documentation page you're looking for doesn't exist.
              </p>
            </div>
          )}

          <DocNav slug={currentSlug} navigate={navigate} />
        </div>
      </div>
    </div>
  );
}

export { docSections };
