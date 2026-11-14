import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  CodeXml,
  Copy,
  ExternalLink,
  Fingerprint,
  Gauge,
  RefreshCw,
  ServerCog,
  Webhook,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { HeroAmbientCanvas } from '../components/HeroAmbientCanvas';
import { HeroNetworkParticles } from '../components/HeroNetworkParticles';
import { HeroVerificationTerminal } from '../components/HeroVerificationTerminal';
import { LivePerformanceSection } from '../components/LivePerformanceSection';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  APP_URLS,
  APPROACH_STEPS,
  FAQ_ITEMS,
  HOW_IT_WORKS_STEPS,
  KEY_FEATURES,
  PRICING_TIERS,
  PROBLEM_CARDS,
  QUICK_START_TABS,
  QuickStartTab,
  SECURITY_LAYERS,
  SECURITY_PRINCIPLES,
  USE_CASES,
} from '../data/chirographContent';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const FEATURE_ICONS: Record<string, typeof Fingerprint> = {
  webauthn: Fingerprint,
  'single-use': RefreshCw,
  'server-side': ServerCog,
  'tenant-isolation': Building2,
  'trust-score': Gauge,
  webhooks: Webhook,
  api: CodeXml,
  widget: ExternalLink,
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeTabId, setActiveTabId] = useState<QuickStartTab['id']>('challenge');
  const [activeFlowIdx, setActiveFlowIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeTab = QUICK_START_TABS.find((t) => t.id === activeTabId) ?? QUICK_START_TABS[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTab.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures
    }
  };

  return (
    <div className="bg-[#020305]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/[0.08] bg-[#020305]">
        <HeroAmbientCanvas />
        <HeroNetworkParticles />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-[#020305]"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-10 lg:pt-24 lg:pb-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-emerald-400">Introducing</span>
                <span aria-hidden="true">·</span>
                <span>WebAuthn</span>
                <span aria-hidden="true">·</span>
                <span>Single-use flow</span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] [text-wrap:balance]">
                Passkey checks for the flows bots abuse.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
                Issue a single-use challenge, redirect the user to a hosted WebAuthn ceremony, and redeem an opaque result server-side. The browser never decides whether a user is verified.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href={APP_URLS.getStarted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.18)] transition-all duration-150 hover:bg-emerald-400 hover:shadow-[0_0_32px_rgba(16,185,129,0.4)] whitespace-nowrap"
                >
                  <span>Get started</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <a
                  href="/docs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/docs');
                  }}
                  className="glass-panel-soft inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all duration-150 hover:border-white/25 whitespace-nowrap"
                >
                  <span>Read the docs</span>
                </a>
              </div>

              {/* Subtle Perpetually Floating Hero Glass Cards */}
              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="will-change-transform"
                >
                  <GlassCard className="p-3.5 sm:p-4">
                    <div className="font-mono text-[11px] text-[#7e95ff]">Protocol</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-white">WebAuthn</div>
                  </GlassCard>
                </motion.div>

                <motion.div
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 5.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="will-change-transform"
                >
                  <GlassCard className="p-3.5 sm:p-4">
                    <div className="font-mono text-[11px] text-emerald-400">Flow</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-white">Single-use</div>
                  </GlassCard>
                </motion.div>

                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 6.0, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="will-change-transform"
                >
                  <GlassCard className="p-3.5 sm:p-4">
                    <div className="font-mono text-[11px] text-[#7e95ff]">Authority</div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-white">Server-side</div>
                  </GlassCard>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <HeroVerificationTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM */}
      <section id="product" className="relative overflow-hidden scroll-mt-20 border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 right-[10%] h-80 w-96 animate-morph-b bg-[#3B5BFF]/12 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-[#7e95ff]">The Problem</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                  Traditional verification is broken
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-zinc-400">
                Every common method for telling humans from bots either adds friction for real users, fails to stop determined attackers, or both.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_CARDS.map((card, idx) => (
              <ScrollReveal key={card.title} delay={(idx % 3) * 0.06} className="h-full">
                <GlassCard className="h-full p-7">
                  <div className="morph-socket inline-flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs text-zinc-300 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-white">{card.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {card.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <p className="mt-10 text-sm text-zinc-300">
              Chirograph takes a different approach — one built on cryptography, not puzzles.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. THE APPROACH */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute top-10 left-[8%] h-80 w-96 animate-morph-a bg-emerald-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-emerald-400">The Approach</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Device → WebAuthn → Chirograph → Verified
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Instead of asking users to prove they&apos;re human by solving puzzles, Chirograph asks their device to prove it cryptographically.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {APPROACH_STEPS.map((item, idx) => (
              <ScrollReveal key={item.step} delay={idx * 0.06} className="h-full">
                <GlassCard className="h-full p-6" featured={idx === 3}>
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="morph-socket inline-flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs text-emerald-400">
                          0{item.step}
                        </span>
                        {idx < APPROACH_STEPS.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-zinc-500 hidden lg:block" />
                        )}
                      </div>
                      <h3 className="mt-5 text-lg font-medium text-white">{item.title}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[15%] h-96 w-[440px] animate-morph-b bg-[#3B5BFF]/12 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-[#7e95ff]">How It Works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                A verification flow in five steps
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Client and server work together. The browser never decides whether a user is verified — only the Chirograph server does.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-5">
              {HOW_IT_WORKS_STEPS.map((step, idx) => {
                const isServer = step.actor === 'server';
                const isActive = idx === activeFlowIdx;
                return (
                  <button
                    key={step.step}
                    type="button"
                    onClick={() => setActiveFlowIdx(idx)}
                    className="relative flex flex-col justify-between rounded-2xl p-5 text-left transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer glass-panel"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="how-it-works-glass"
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                        className={`pointer-events-none absolute inset-0 rounded-2xl border ${
                          isServer
                            ? 'border-[#3B5BFF]/55 bg-[#3B5BFF]/[0.1]'
                            : 'border-emerald-500/55 bg-emerald-500/[0.1]'
                        }`}
                      />
                    )}
                    <div className="relative z-10 w-full">
                      <div className="flex items-center justify-between gap-2 font-mono text-xs">
                        <span className={isServer ? 'text-[#7e95ff]' : 'text-emerald-400'}>
                          Step 0{step.step}
                        </span>
                        <span className="text-zinc-400">
                          {isServer ? 'Server-side' : 'Client / browser'}
                        </span>
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-white">{step.title}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                        {step.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono">
              <span>
                <span className="text-emerald-400">■</span> Client / browser
              </span>
              <span>
                <span className="text-[#7e95ff]">■</span> Server-side
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LIVE PERFORMANCE */}
      <LivePerformanceSection />

      {/* 5. KEY FEATURES */}
      <section id="capabilities" className="relative overflow-hidden scroll-mt-20 border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/3 left-[25%] h-80 w-[460px] animate-morph-a bg-emerald-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-emerald-400">Key Features</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                  Everything needed to verify passkey assertions server-side
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-zinc-400">
                Complete verification infrastructure — browser SDK through server-side redemption, with no CAPTCHA and no shared secrets.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_FEATURES.map((feat, idx) => {
              const Icon = FEATURE_ICONS[feat.id] ?? Fingerprint;
              return (
                <ScrollReveal key={feat.id} delay={(idx % 4) * 0.05} className="h-full">
                  <GlassCard className="h-full p-6">
                    <div className="morph-socket inline-flex h-10 w-10 items-center justify-center rounded-xl text-emerald-400">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-white">{feat.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                      {feat.description}
                    </p>
                  </GlassCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FOR DEVELOPERS QUICK START */}
      <section id="developers-preview" className="relative overflow-hidden scroll-mt-20 border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute top-16 right-[12%] h-96 w-96 animate-morph-b bg-[#3B5BFF]/14 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
            <ScrollReveal className="lg:col-span-5">
              <p className="text-xs font-mono text-[#7e95ff]">For Developers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Integrate in three calls
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Create a challenge, redirect to the hosted ceremony, and redeem the result on your backend. The browser never decides verification — your server always does.
              </p>

              <ul className="mt-8 space-y-3.5 border-t border-white/[0.08] pt-7 text-sm text-zinc-300">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Server-side challenge creation with single-use flows</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Redirect-based widget SDK — no iframe, no React dependency</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Backend redemption of opaque verification results</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Signed webhooks for real-time verification events</span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/docs"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/docs');
                  }}
                  className="glass-panel-soft inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white hover:border-white/25 whitespace-nowrap"
                >
                  <span>Read the docs</span>
                </a>
                <a
                  href={APP_URLS.getStarted}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.16)] hover:bg-emerald-400 whitespace-nowrap"
                >
                  <span>Get API keys</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08} className="lg:col-span-7">
              <div className="glass-panel overflow-hidden rounded-2xl p-2">
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5">
                  <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.07] bg-black/40 p-1">
                    {QUICK_START_TABS.map((tab) => {
                      const active = tab.id === activeTabId;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTabId(tab.id)}
                          className={`relative rounded-lg px-3.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                            active ? 'text-black' : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="quickstart-active-tab"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              className="absolute inset-0 rounded-lg bg-white shadow-[0_2px_12px_rgba(255,255,255,0.25)]"
                            />
                          )}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="morph-socket inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-200 hover:text-white cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="glass-well rounded-xl p-5">
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-zinc-500">
                    <span>{activeTab.filename}</span>
                    <span>{activeTab.language}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeTab.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16 }}
                      className="overflow-x-auto font-mono text-xs sm:text-[13px] leading-relaxed text-zinc-200"
                    >
                      <code>{activeTab.code}</code>
                    </motion.pre>
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 7. USE CASES */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 left-[18%] h-80 w-96 animate-morph-a bg-emerald-500/12 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-emerald-400">Use Cases</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Built for platforms that bots abuse
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400">
                Wherever bots create accounts or abuse systems, Chirograph adds a passkey-based layer that raises the cost of automated abuse.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((uc, idx) => (
              <ScrollReveal key={uc.id} delay={(idx % 3) * 0.06} className="h-full">
                <GlassCard className="h-full p-6">
                  <h3 className="text-lg font-medium text-white">{uc.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {uc.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SECURITY OVERVIEW */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute top-10 right-[15%] h-80 w-[440px] animate-morph-b bg-[#3B5BFF]/12 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-[#7e95ff]">Security</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                  Verified by cryptography, not by trust
                </h2>
              </div>
              <a
                href="/security"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/security');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 whitespace-nowrap"
              >
                <span>Explore full security architecture</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
            {SECURITY_LAYERS.map((layer, idx) => (
              <ScrollReveal key={layer.layer} delay={idx * 0.04} className="h-full">
                <GlassCard className="h-full p-4">
                  <div className="font-mono text-[11px] text-emerald-400">{layer.layer}</div>
                  <div className="mt-2 text-sm font-semibold text-white">{layer.title}</div>
                  <div className="mt-1 text-xs text-zinc-400">{layer.subtitle}</div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY_PRINCIPLES.map((item, idx) => (
              <ScrollReveal key={item.title} delay={(idx % 3) * 0.06} className="h-full">
                <GlassCard className="h-full p-6">
                  <h3 className="text-base font-medium text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PRICING PREVIEW */}
      <section className="relative overflow-hidden border-b border-white/[0.08] py-24 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[540px] animate-morph-a bg-emerald-500/12 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-mono text-emerald-400">Pricing</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                  Simple, usage-based pricing
                </h2>
                <p className="mt-3 text-base text-zinc-400">
                  Start free and scale as you verify more users. No hidden fees, no per-seat costs.
                </p>
              </div>
              <a
                href="/pricing"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/pricing');
                }}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-emerald-400 whitespace-nowrap"
              >
                <span>See full pricing</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
            {PRICING_TIERS.map((tier, idx) => (
              <ScrollReveal key={tier.id} delay={idx * 0.05} className="h-full">
                <GlassCard featured={Boolean(tier.popular)} className="h-full p-6">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-white">{tier.name}</h3>
                        {tier.popular && (
                          <span className="font-mono text-[11px] text-emerald-400">Most popular</span>
                        )}
                      </div>
                      <div className="mt-5 flex items-baseline gap-1.5">
                        <span className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-xs text-zinc-400">{tier.period}</span>
                        )}
                      </div>
                      <p className="mt-1.5 font-mono text-xs text-emerald-400 tabular-nums">
                        {tier.volume}
                      </p>
                      <p className="mt-4 text-xs leading-relaxed text-zinc-300">
                        {tier.description}
                      </p>
                    </div>

                    <a
                      href={tier.href}
                      target={tier.href.startsWith('http') ? '_blank' : undefined}
                      rel={tier.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                        tier.popular
                          ? 'bg-emerald-500 text-black shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:bg-emerald-400'
                          : 'morph-socket text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      <span>{tier.cta}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="scroll-mt-20 border-b border-white/[0.08] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <ScrollReveal>
            <div>
              <p className="text-xs font-mono text-[#7e95ff]">FAQ</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Common questions
              </h2>
              <p className="mt-3 text-base text-zinc-400">
                Everything you need to understand how Chirograph works and how to integrate it.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <ScrollReveal key={item.question} delay={Math.min(idx * 0.03, 0.18)}>
                  <div className="glass-panel-soft rounded-2xl overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:text-emerald-300 cursor-pointer"
                    >
                      <span className="text-base font-medium text-white">{item.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-emerald-400' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] px-6 py-4 text-sm leading-relaxed text-zinc-400">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ScrollReveal>
            <GlassCard featured className="p-8 sm:p-12">
              <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="max-w-xl">
                  <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl [text-wrap:balance]">
                    Ready to get started?
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    Add passkey-based bot prevention to your platform. No CAPTCHA, no SMS, no passwords — just verified users.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 shrink-0">
                  <a
                    href={APP_URLS.getStarted}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_0_26px_rgba(255,255,255,0.2)] transition-all hover:bg-emerald-400 whitespace-nowrap"
                  >
                    <span>Get started</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
