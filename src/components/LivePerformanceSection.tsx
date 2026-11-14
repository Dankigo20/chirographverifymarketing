import { Activity, Cpu, Gauge, Info, RotateCw, ShieldCheck, Zap } from 'lucide-react';
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { GlassCard } from './GlassCard';
import { ScrollReveal } from './ScrollReveal';

type PerfMode = 'ceremony' | 'endpoints' | 'comparison';

interface PipelineBar {
  id: string;
  label: string;
  sublabel: string;
  actor: 'server' | 'client' | 'legacy';
  offsetPct: number;
  widthPct: number;
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
}

const MODE_TABS: { id: PerfMode; label: string }[] = [
  { id: 'ceremony', label: 'Ceremony Waterfall' },
  { id: 'endpoints', label: 'Server Endpoints' },
  { id: 'comparison', label: 'vs. CAPTCHA / SMS' },
];

const PIPELINE_DATA: Record<
  PerfMode,
  {
    caption: string;
    totalLabel: string;
    totalNumeric: number;
    totalSuffix: string;
    bars: PipelineBar[];
  }
> = {
  ceremony: {
    caption: 'End-to-end single-use passkey verification sequence',
    totalLabel: 'Total ceremony',
    totalNumeric: 167,
    totalSuffix: ' ms',
    bars: [
      {
        id: 'challenge',
        label: 'POST /v1/challenge',
        sublabel: 'Single-use challenge created in Redis',
        actor: 'server',
        offsetPct: 0,
        widthPct: 10,
        numericValue: 14,
        suffix: ' ms',
      },
      {
        id: 'webauthn',
        label: 'WebAuthn Assertion',
        sublabel: 'Platform passkey or biometric signature',
        actor: 'client',
        offsetPct: 10,
        widthPct: 79,
        numericValue: 138,
        suffix: ' ms',
      },
      {
        id: 'verify',
        label: 'Server Signature Check',
        sublabel: 'Origin, RP ID & public key verified',
        actor: 'server',
        offsetPct: 89,
        widthPct: 7.5,
        numericValue: 11,
        suffix: ' ms',
      },
      {
        id: 'redeem',
        label: 'POST /widget/redeem',
        sublabel: 'Opaque result redeemed once server-side',
        actor: 'client',
        offsetPct: 96.5,
        widthPct: 3.5,
        numericValue: 4,
        suffix: ' ms',
      },
    ],
  },
  endpoints: {
    caption: 'Server-side API & single-use token operations',
    totalLabel: 'Server compute',
    totalNumeric: 29,
    totalSuffix: ' ms',
    bars: [
      {
        id: 'ep-challenge',
        label: 'POST /v1/challenge',
        sublabel: 'Challenge entropy + flow TTL provisioning',
        actor: 'server',
        offsetPct: 0,
        widthPct: 48,
        numericValue: 14,
        suffix: ' ms',
      },
      {
        id: 'ep-ceremony',
        label: 'GET /widget/ceremony',
        sublabel: 'Hosted WebAuthn options retrieval',
        actor: 'client',
        offsetPct: 0,
        widthPct: 31,
        numericValue: 9,
        suffix: ' ms',
      },
      {
        id: 'ep-verify',
        label: 'POST /v1/verify',
        sublabel: 'ECDSA / EdDSA assertion validation',
        actor: 'server',
        offsetPct: 0,
        widthPct: 38,
        numericValue: 11,
        suffix: ' ms',
      },
      {
        id: 'ep-redeem',
        label: 'POST /widget/redeem',
        sublabel: 'Atomic single-use token consumption',
        actor: 'client',
        offsetPct: 0,
        widthPct: 16,
        numericValue: 4,
        suffix: ' ms',
      },
      {
        id: 'ep-webhook',
        label: 'X-Chirograph-Signature',
        sublabel: 'Async HMAC-SHA256 webhook dispatch',
        actor: 'server',
        offsetPct: 0,
        widthPct: 22,
        numericValue: 6,
        suffix: ' ms',
      },
    ],
  },
  comparison: {
    caption: 'Typical user verification completion time by method',
    totalLabel: 'Speedup',
    totalNumeric: 100,
    totalSuffix: 'x+ faster',
    bars: [
      {
        id: 'cmp-chirograph',
        label: 'Chirograph Passkey',
        sublabel: 'Single biometric / device tap — zero puzzles',
        actor: 'client',
        offsetPct: 0,
        widthPct: 4,
        numericValue: 0.17,
        decimals: 2,
        suffix: ' s',
      },
      {
        id: 'cmp-sms',
        label: 'SMS One-Time Code',
        sublabel: 'Carrier routing delay + manual OTP entry',
        actor: 'legacy',
        offsetPct: 0,
        widthPct: 75,
        numericValue: 18.0,
        decimals: 1,
        prefix: '~',
        suffix: ' s',
      },
      {
        id: 'cmp-captcha',
        label: 'Image Grid CAPTCHA',
        sublabel: 'Multi-round visual challenge friction',
        actor: 'legacy',
        offsetPct: 0,
        widthPct: 100,
        numericValue: 24.0,
        decimals: 1,
        prefix: '~',
        suffix: ' s',
      },
    ],
  },
};

const SUMMARY_METRICS = [
  {
    icon: Zap,
    label: 'Server verification',
    numericValue: 25,
    suffix: ' ms',
    detail: 'Challenge + assertion check',
    accent: 'text-[#7e95ff]',
    tooltipTitle: 'Server-side authority',
    tooltipBody:
      'Validating challenge entropy, origin, RP ID, and the ECDSA/EdDSA signature strictly server-side prevents browser tampering or forged client states.',
  },
  {
    icon: Cpu,
    label: 'Device WebAuthn sign',
    numericValue: 138,
    suffix: ' ms',
    detail: 'Native hardware assertion',
    accent: 'text-emerald-400',
    tooltipTitle: 'Hardware-bound cryptography',
    tooltipBody:
      'Platform passkeys sign challenges inside local device enclaves bound to the domain, forcing bots onto real hardware instead of farmable puzzles or disposable SMS.',
  },
  {
    icon: Gauge,
    label: 'Token redemption',
    numericValue: 4,
    suffix: ' ms',
    detail: 'Atomic Redis single-use read',
    accent: 'text-emerald-400',
    tooltipTitle: 'Replay-proof single use',
    tooltipBody:
      'Consuming the opaque verification token atomically in Redis guarantees each flow succeeds at most once, blocking token replay and concurrent race attacks.',
  },
];

const LATENCY_SAMPLES = [
  { label: 'Challenge', ms: 14, y: 58 },
  { label: 'Options', ms: 9, y: 66 },
  { label: 'Assert', ms: 138, y: 18 },
  { label: 'Verify', ms: 11, y: 62 },
  { label: 'Redeem', ms: 4, y: 74 },
  { label: 'Webhook', ms: 6, y: 70 },
];

const BURST_PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2 + (i % 2 === 0 ? 0.12 : -0.08);
  const distance = 20 + (i % 3) * 12;
  const size = i % 3 === 0 ? 5 : i % 2 === 0 ? 4 : 3;
  const color =
    i % 4 === 0
      ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]'
      : i % 3 === 0
      ? 'bg-[#7e95ff] shadow-[0_0_10px_rgba(59,91,255,0.85)]'
      : 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.9)]';

  return {
    id: i,
    tx: Math.round(Math.cos(angle) * distance),
    ty: Math.round(Math.sin(angle) * distance),
    size,
    color,
    delay: (i % 4) * 0.02,
  };
});

function VerifiedParticleBurst({ burstKey }: { burstKey: number }) {
  if (burstKey === 0) return null;

  return (
    <div
      key={burstKey}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
    >
      <motion.span
        initial={{ scale: 0.35, opacity: 0.75 }}
        animate={{ scale: 2.3, opacity: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="absolute h-10 w-10 rounded-full border border-emerald-400/70 shadow-[0_0_24px_rgba(16,185,129,0.5)] will-change-transform"
      />
      <motion.span
        initial={{ scale: 0.25, opacity: 0.55 }}
        animate={{ scale: 1.85, opacity: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="absolute h-8 w-8 rounded-full border border-[#7e95ff]/60 will-change-transform"
      />
      {BURST_PARTICLES.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
          animate={{
            x: particle.tx,
            y: particle.ty,
            scale: [0.4, 1.15, 0],
            opacity: [1, 0.95, 0],
          }}
          transition={{
            duration: 0.68,
            delay: particle.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ width: particle.size, height: particle.size }}
          className={`absolute rounded-full will-change-transform ${particle.color}`}
        />
      ))}
    </div>
  );
}

function AnimatedCounter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  delay = 0,
  duration = 0.65,
  resetKey = 0,
  active = true,
  fromZero = false,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
  duration?: number;
  resetKey?: number;
  active?: boolean;
  fromZero?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const motionVal = useMotionValue(fromZero ? 0 : value);
  const prevResetRef = useRef(resetKey);
  const formatted = useTransform(motionVal, (latest) => {
    const num = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString();
    return `${prefix}${num}${suffix}`;
  });

  useEffect(() => {
    if (!active) return;

    if (prefersReducedMotion) {
      motionVal.set(value);
      prevResetRef.current = resetKey;
      return;
    }

    const didReset = prevResetRef.current !== resetKey;
    prevResetRef.current = resetKey;

    if (fromZero || didReset) {
      motionVal.set(0);
    }

    const controls = animate(motionVal, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [active, delay, duration, fromZero, motionVal, prefersReducedMotion, resetKey, value]);

  return <motion.span className={className}>{formatted}</motion.span>;
}

export function LivePerformanceSection() {
  const [mode, setMode] = useState<PerfMode>('ceremony');
  const [runCount, setRunCount] = useState(0);
  const [activeSample, setActiveSample] = useState<number>(3);
  const [hoveredMetric, setHoveredMetric] = useState<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const currentData = PIPELINE_DATA[mode];
  const currentSample = LATENCY_SAMPLES[activeSample];
  const isSecureVerified =
    currentSample.ms < 50 || mode === 'endpoints';
  const prevBelowThresholdRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isInView) return;
    setRunCount((prev) => (prev === 0 ? 1 : prev));
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;
    const isNowSub50 = currentSample.ms < 50;
    if (isNowSub50 && !prevBelowThresholdRef.current) {
      setBurstKey((prev) => prev + 1);
    }
    prevBelowThresholdRef.current = isNowSub50;
  }, [activeSample, currentSample.ms, isInView]);

  const handleModeChange = (nextMode: PerfMode) => {
    setMode(nextMode);
    if (nextMode === 'endpoints') {
      setBurstKey((prev) => prev + 1);
    }
  };

  const handleSampleSelect = (idx: number) => {
    setActiveSample(idx);
    if (LATENCY_SAMPLES[idx].ms < 50 && idx === activeSample) {
      setBurstKey((prev) => prev + 1);
    }
  };

  const handleReplay = () => {
    setRunCount((prev) => prev + 1);
    if (isSecureVerified) {
      setBurstKey((prev) => prev + 1);
    }
  };

  return (
    <section
      id="live-performance"
      ref={sectionRef}
      className="relative overflow-hidden scroll-mt-20 border-b border-white/[0.08] py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-[12%] h-80 w-[440px] animate-morph-a bg-[#3B5BFF]/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-[10%] h-80 w-96 animate-morph-b bg-emerald-500/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-mono text-emerald-400">Live Performance</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl [text-wrap:balance]">
                Built for millisecond verification
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400">
              Single-use Redis flows and native device passkeys replace multi-second CAPTCHA puzzles and SMS queues with sub-second cryptographic checks.
            </p>
          </div>
        </ScrollReveal>

        {/* Top Summary Glass Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {SUMMARY_METRICS.map((metric, idx) => {
            const Icon = metric.icon;
            const isHovered = hoveredMetric === idx;
            const tooltipId = `metric-tooltip-${idx}`;
            return (
              <ScrollReveal
                key={metric.label}
                delay={idx * 0.06}
                className={`relative ${isHovered ? 'z-30' : 'z-10'}`}
              >
                <div
                  tabIndex={0}
                  aria-describedby={isHovered ? tooltipId : undefined}
                  onMouseEnter={() => setHoveredMetric(idx)}
                  onMouseLeave={() => setHoveredMetric((prev) => (prev === idx ? null : prev))}
                  onFocus={() => setHoveredMetric(idx)}
                  onBlur={() => setHoveredMetric((prev) => (prev === idx ? null : prev))}
                  className="relative rounded-2xl outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/60"
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        id={tooltipId}
                        role="tooltip"
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="pointer-events-none absolute bottom-full left-0 right-0 z-40 mb-3"
                      >
                        <div className="glass-panel relative rounded-xl bg-[#06090f]/95 p-4 shadow-[0_20px_48px_rgba(0,0,0,0.85)]">
                          <div className={`font-mono text-[11px] font-medium ${metric.accent}`}>
                            {metric.tooltipTitle}
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-zinc-300">
                            {metric.tooltipBody}
                          </p>
                          <div
                            aria-hidden="true"
                            className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-r border-b border-white/[0.12] bg-[#06090f]"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <GlassCard className="p-6" featured={idx === 1}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="font-mono text-xs text-zinc-400">{metric.label}</div>
                        <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-white tabular-nums">
                          <AnimatedCounter
                            value={metric.numericValue}
                            suffix={metric.suffix}
                            delay={idx * 0.08}
                            duration={0.75}
                            resetKey={runCount}
                            active={isInView}
                            fromZero
                          />
                        </div>
                        <p className="mt-1.5 text-xs text-zinc-400">{metric.detail}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 transition-colors group-hover:text-zinc-300">
                          <Info className={`h-3 w-3 ${isHovered ? metric.accent : ''}`} />
                          <span>Why it matters</span>
                        </div>
                      </div>
                      <div className={`morph-socket inline-flex h-10 w-10 items-center justify-center rounded-xl ${metric.accent}`}>
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Main Glassmorphism Visualizer Card */}
        <ScrollReveal delay={0.1} className="mt-6">
          <div className="glass-panel relative overflow-hidden rounded-2xl p-5 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 right-12 h-56 w-56 rounded-full bg-[#3B5BFF]/14 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 left-12 h-56 w-56 rounded-full bg-emerald-500/12 blur-3xl"
            />

            {/* Visualizer Header & Controls */}
            <div className="relative z-10 flex flex-col gap-4 border-b border-white/[0.08] pb-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="morph-socket inline-flex h-9 w-9 items-center justify-center rounded-xl text-emerald-400">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Verification Latency Breakdown
                  </div>
                  <div className="font-mono text-xs text-zinc-400">
                    {currentData.caption}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex flex-wrap items-center gap-1 rounded-xl border border-white/[0.08] bg-black/45 p-1">
                  {MODE_TABS.map((tab) => {
                    const active = mode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleModeChange(tab.id)}
                        className={`relative rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                          active ? 'text-black' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="perf-mode-tab"
                            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                            className="absolute inset-0 rounded-lg bg-white shadow-[0_2px_12px_rgba(255,255,255,0.22)]"
                          />
                        )}
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleReplay}
                  className="morph-socket inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 font-mono text-xs text-zinc-200 transition-colors hover:text-white cursor-pointer"
                >
                  <RotateCw className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Replay trace</span>
                </button>
              </div>
            </div>

            {/* Body Grid: Animated Waterfall + Curve Profile */}
            <div className="relative z-10 mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Waterfall Stage Bars */}
              <div className="glass-well rounded-2xl p-5 sm:p-6 lg:col-span-8">
                <div className="mb-5 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-400">Execution timeline</span>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500">{currentData.totalLabel}:</span>
                    <span className="font-semibold text-emerald-400 tabular-nums">
                      <AnimatedCounter
                        value={currentData.totalNumeric}
                        suffix={currentData.totalSuffix}
                        duration={0.6}
                        resetKey={runCount}
                        active={isInView}
                      />
                    </span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${mode}-${runCount}`}
                    initial={{ opacity: 0.55 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {currentData.bars.map((bar, idx) => {
                      const barGradient =
                        bar.actor === 'server'
                          ? 'from-[#3B5BFF] to-[#7e95ff] shadow-[0_0_18px_rgba(59,91,255,0.45)]'
                          : bar.actor === 'client'
                          ? 'from-emerald-500 to-emerald-300 shadow-[0_0_18px_rgba(16,185,129,0.45)]'
                          : 'from-zinc-500 to-zinc-400';

                      const badgeColor =
                        bar.actor === 'server'
                          ? 'text-[#7e95ff]'
                          : bar.actor === 'client'
                          ? 'text-emerald-400'
                          : 'text-zinc-400';

                      return (
                        <div key={bar.id} className="space-y-2">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2.5">
                              <span className="font-mono text-xs font-medium text-white">
                                {bar.label}
                              </span>
                              <span className="text-xs text-zinc-500">{bar.sublabel}</span>
                            </div>
                            <span className={`font-mono text-xs font-semibold tabular-nums ${badgeColor}`}>
                              <AnimatedCounter
                                value={bar.numericValue}
                                decimals={bar.decimals ?? 0}
                                prefix={bar.prefix ?? ''}
                                suffix={bar.suffix}
                                delay={idx * 0.09}
                                duration={0.62}
                                resetKey={runCount}
                                active={isInView}
                                fromZero
                              />
                            </span>
                          </div>

                          {/* Recessed Track */}
                          <div className="relative h-3 w-full overflow-hidden rounded-lg border border-white/[0.06] bg-black/70">
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                              transition={{
                                duration: 0.65,
                                delay: idx * 0.11,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                left: `${bar.offsetPct}%`,
                                width: `${Math.max(bar.widthPct, 2.5)}%`,
                                transformOrigin: 'left center',
                              }}
                              className={`absolute inset-y-0 rounded-md bg-gradient-to-r ${barGradient}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-4 font-mono text-[11px] text-zinc-400">
                  <div className="flex flex-wrap items-center gap-5">
                    <span>
                      <span className="text-[#7e95ff]">■</span> Server-side check
                    </span>
                    <span>
                      <span className="text-emerald-400">■</span> WebAuthn / Token
                    </span>
                    {mode === 'comparison' && (
                      <span>
                        <span className="text-zinc-400">■</span> Legacy challenge
                      </span>
                    )}
                  </div>
                  <span className="text-zinc-500">Single-use · Redis-backed</span>
                </div>
              </div>

              {/* Right Column: Interactive Stage Latency Curve */}
              <div className="glass-well flex flex-col justify-between rounded-2xl p-5 sm:p-6 lg:col-span-4">
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-xs">
                    <span className="text-zinc-300">Stage Latency Profile</span>
                    <div className="relative flex items-center gap-2">
                      <VerifiedParticleBurst burstKey={burstKey} />
                      <motion.span
                        key={currentSample.label}
                        initial={{ scale: 0.92 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.22 }}
                        className={`relative z-10 inline-flex items-center gap-1.5 rounded-lg border px-2 py-0.5 tabular-nums ${
                          currentSample.ms < 50
                            ? 'border-emerald-500/40 bg-emerald-500/[0.12] text-emerald-400'
                            : 'border-[#3B5BFF]/40 bg-[#3B5BFF]/[0.12] text-[#7e95ff]'
                        }`}
                      >
                        {currentSample.ms < 50 && (
                          <ShieldCheck className="h-3 w-3 shrink-0" />
                        )}
                        <AnimatedCounter
                          value={currentSample.ms}
                          suffix=" ms"
                          duration={0.45}
                          resetKey={runCount}
                          active={isInView}
                        />
                      </motion.span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <p className="text-xs text-zinc-500">
                      Inspect verification hops (&lt; 50ms target)
                    </p>
                    <span
                      className={`font-mono text-[10px] ${
                        currentSample.ms < 50 ? 'text-emerald-400' : 'text-[#7e95ff]'
                      }`}
                    >
                      {currentSample.ms < 50 ? 'Secure verified' : 'Hardware sign'}
                    </span>
                  </div>

                  {/* SVG Framer Motion Animated Curve */}
                  <div className="relative mt-5 h-28 w-full">
                    <svg
                      viewBox="0 0 260 90"
                      className="h-full w-full overflow-visible"
                      role="img"
                      aria-label="Verification stage latency profile"
                    >
                      <defs>
                        <linearGradient id="perfCurveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B5BFF" />
                          <stop offset="50%" stopColor="#10B981" />
                          <stop offset="100%" stopColor="#3B5BFF" />
                        </linearGradient>
                        <linearGradient id="perfCurveFill" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                          <stop offset="100%" stopColor="#3B5BFF" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      <line x1="0" y1="22" x2="260" y2="22" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="0" y1="50" x2="260" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                      <line x1="0" y1="78" x2="260" y2="78" stroke="rgba(255,255,255,0.06)" />

                      <motion.path
                        key={`fill-${runCount}`}
                        d="M 10 58 C 35 58, 42 66, 60 66 C 80 66, 90 18, 110 18 C 130 18, 140 62, 160 62 C 180 62, 190 74, 210 74 C 228 74, 238 70, 250 70 L 250 82 L 10 82 Z"
                        fill="url(#perfCurveFill)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.7, delay: 0.25 }}
                      />

                      <motion.path
                        key={`stroke-${runCount}`}
                        d="M 10 58 C 35 58, 42 66, 60 66 C 80 66, 90 18, 110 18 C 130 18, 140 62, 160 62 C 180 62, 190 74, 210 74 C 228 74, 238 70, 250 70"
                        fill="none"
                        stroke="url(#perfCurveStroke)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0.3 }}
                        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.3 }}
                        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                      />

                      {LATENCY_SAMPLES.map((sample, idx) => {
                        const cx = 10 + idx * 48;
                        const selected = activeSample === idx;
                        return (
                          <g
                            key={sample.label}
                            onMouseEnter={() => handleSampleSelect(idx)}
                            onClick={() => handleSampleSelect(idx)}
                            className="cursor-pointer"
                          >
                            <circle
                              cx={cx}
                              cy={sample.y}
                              r={selected ? 9 : 6}
                              fill={selected ? 'rgba(16,185,129,0.2)' : 'transparent'}
                            />
                            <circle
                              cx={cx}
                              cy={sample.y}
                              r={selected ? 4 : 2.8}
                              fill={selected ? '#10B981' : '#7e95ff'}
                              stroke="#030509"
                              strokeWidth="1.5"
                            />
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Interactive Hop Selector */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {LATENCY_SAMPLES.map((sample, idx) => {
                      const selected = activeSample === idx;
                      return (
                        <button
                          key={sample.label}
                          type="button"
                          onClick={() => handleSampleSelect(idx)}
                          className={`rounded-lg border px-2.5 py-2 text-left transition-colors cursor-pointer ${
                            selected
                              ? 'border-emerald-500/45 bg-emerald-500/[0.1] text-white'
                              : 'border-white/[0.06] bg-black/40 text-zinc-400 hover:border-white/15 hover:text-zinc-200'
                          }`}
                        >
                          <div className="font-mono text-[10px] truncate">{sample.label}</div>
                          <div
                            className={`mt-0.5 font-mono text-xs font-semibold tabular-nums ${
                              sample.ms < 50 ? 'text-emerald-400' : 'text-[#7e95ff]'
                            }`}
                          >
                            {sample.ms} ms
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2.5 border-t border-white/[0.06] pt-4 text-xs text-zinc-400">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span>Zero third-party puzzle round-trips</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
