import { Check, RotateCw, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const CEREMONY_STEPS = [
  { label: 'WebAuthn challenge issued', time: '14ms' },
  { label: 'Device signed assertion', time: '138ms' },
  { label: 'Server-side verification', time: '11ms' },
  { label: 'Result token issued', time: '4ms' },
];

export function HeroVerificationTerminal() {
  const [activeStep, setActiveStep] = useState(4);
  const [replaying, setReplaying] = useState(false);

  const runSequence = () => {
    setReplaying(true);
    setActiveStep(0);
    const timers: number[] = [];
    [1, 2, 3, 4].forEach((step, idx) => {
      timers.push(
        window.setTimeout(() => {
          setActiveStep(step);
          if (step === 4) setReplaying(false);
        }, (idx + 1) * 420),
      );
    });
    return timers;
  };

  useEffect(() => {
    const timers = runSequence();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex flex-col justify-between rounded-2xl border border-white/[0.14] bg-[#080b12]/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_28px_70px_rgba(0,0,0,0.85)] overflow-hidden will-change-transform"
    >
      {/* Subtle internal glass refraction sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-500/12 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-[#3B5BFF]/16 blur-3xl"
      />

      {/* Glass Chrome Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.09] bg-white/[0.03] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="font-mono text-xs text-zinc-300">verification-flow</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-emerald-400">HTTP 200</span>
          <button
            type="button"
            onClick={runSequence}
            disabled={replaying}
            aria-label="Replay verification flow"
            className="morph-socket inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-mono text-[11px] text-zinc-200 transition-colors hover:text-white disabled:opacity-50 cursor-pointer"
          >
            <RotateCw className={`h-3 w-3 ${replaying ? 'animate-spin' : ''}`} />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* Request & Recessed Neumorphic Response Well */}
      <div className="relative z-10 p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed">
        <div className="text-zinc-400">
          <span className="text-[#7e95ff]">$</span> curl -X POST{' '}
          <span className="text-zinc-100">https://app.chirographverify.com/v1/challenge</span> \
          <br />
          <span className="pl-4 text-zinc-400">-H</span>{' '}
          <span className="text-emerald-300">&apos;X-API-Key: sk_live_…&apos;</span> \
          <br />
          <span className="pl-4 text-zinc-400">-d</span>{' '}
          <span className="text-zinc-200">{`'{ "tenant": "acme" }'`}</span>
        </div>

        <motion.div
          animate={{
            opacity: activeStep >= 1 ? 1 : 0.35,
            y: [-1.5, 1.5, -1.5],
          }}
          transition={{
            opacity: { duration: 0.25 },
            y: { duration: 5.0, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
          }}
          className="glass-well mt-4 rounded-xl p-4 text-zinc-300 will-change-transform"
        >
          <span className="text-zinc-500">{'{'}</span>
          <div className="pl-4">
            <span className="text-[#7e95ff]">&quot;flow_id&quot;</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;flw_8f2a91c4&quot;</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[#7e95ff]">&quot;expires_in&quot;</span>
            <span className="text-zinc-500">: </span>
            <span className="text-zinc-100 tabular-nums">120</span>
            <span className="text-zinc-500">,</span>
          </div>
          <div className="pl-4">
            <span className="text-[#7e95ff]">&quot;redirect_url&quot;</span>
            <span className="text-zinc-500">: </span>
            <span className="text-emerald-400">&quot;https://verify.chirographverify.com/…&quot;</span>
          </div>
          <span className="text-zinc-500">{'}'}</span>
        </motion.div>

        {/* Live Ceremony Checklist */}
        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <div className="mb-3 flex items-center justify-between text-[11px] text-zinc-400">
            <span>Ceremony</span>
            <span>Single-use · Redis-backed</span>
          </div>

          <div className="space-y-2">
            {CEREMONY_STEPS.map((item, idx) => {
              const completed = activeStep > idx;
              const current = activeStep === idx;
              return (
                <motion.div
                  key={item.label}
                  animate={{ y: [0, -1.5, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.35,
                  }}
                  className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 transition-colors duration-200 will-change-transform ${
                    completed
                      ? 'border-emerald-500/30 bg-emerald-500/[0.08] text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
                      : current
                      ? 'border-[#3B5BFF]/45 bg-[#3B5BFF]/[0.12] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]'
                      : 'border-white/[0.06] bg-black/35 text-zinc-500'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-semibold ${
                        completed
                          ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.45)]'
                          : current
                          ? 'bg-[#3B5BFF] text-white shadow-[0_0_12px_rgba(59,91,255,0.5)]'
                          : 'bg-white/[0.06] text-zinc-500'
                      }`}
                    >
                      {completed ? <Check className="h-3 w-3 stroke-[2.5]" /> : idx + 1}
                    </span>
                    <span className="text-xs">{item.label}</span>
                  </div>

                  <span className="text-[11px] tabular-nums text-zinc-400">
                    {completed ? item.time : current ? 'running' : 'queued'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Protocol Guarantee Bar */}
      <div className="relative z-10 flex items-center justify-between border-t border-white/[0.08] bg-white/[0.025] px-5 py-3 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>Browser never decides verification</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-400">WebAuthn W3C</span>
      </div>
    </motion.div>
  );
}
