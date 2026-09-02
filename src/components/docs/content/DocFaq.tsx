import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { DocPageWrapper, DocHeading } from '@/components/docs/DocBlocks';

const faqs = [
  {
    q: 'What is Chirograph Verify?',
    a: 'Chirograph Verify is a device-biometric bot-prevention API that uses WebAuthn to help applications distinguish legitimate human interactions from automated or abusive activity. It uses platform authenticators like Face ID, Touch ID, and security keys to produce a cryptographic signal that a real human authenticated through an enrolled device.',
  },
  {
    q: 'Does Chirograph Verify store fingerprints or Face ID images?',
    a: 'No. Chirograph Verify is designed around WebAuthn and does not require receiving or storing raw biometric sensor data. Face ID, Touch ID, or another platform authenticator performs the local authentication process on the user\'s device. Chirograph Verify receives only the cryptographic WebAuthn information required for verification.',
  },
  {
    q: 'Is the browser trusted?',
    a: 'No. Verification is server-authoritative. The browser only facilitates the device ceremony. The actual verification decision is made server-side by Chirograph, and your backend confirms it by redeeming the result token.',
  },
  {
    q: 'What happens if a challenge expires?',
    a: 'The verification must fail and the customer must create a new flow. Expired challenges cannot be used. The short validity period is a security feature that limits the window for replay attacks.',
  },
  {
    q: 'Can I expose my publishable key?',
    a: 'Yes. The publishable key (pk_live_...) is designed for browser use with the widget SDK. It cannot be used to create challenges, redeem results, or access tenant configuration.',
  },
  {
    q: 'Can I expose my secret key?',
    a: 'No. The secret key (sk_live_...) must never be exposed in browser code, frontend JavaScript, or committed to Git. It is used only for server-side API calls.',
  },
  {
    q: 'Does Chirograph Verify identify the user?',
    a: 'No. Verification is a technical security signal that confirms a real human authenticated through an enrolled device. It is not equivalent to legal identity verification. Chirograph Verify does not identify the person behind a device.',
  },
  {
    q: 'What happens when a device is flagged?',
    a: 'A flag is an abuse or security signal and does not automatically establish fraud. It indicates that the device fingerprint has been seen across multiple tenants above the configured threshold. You decide how to act on this signal in your application.',
  },
];

export function DocFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <DocPageWrapper>
      <DocHeading level={2}>FAQ</DocHeading>

      <div className="mt-6 space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-ink-200 bg-white">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-50"
              aria-expanded={open === i}
            >
              <span className="text-sm font-semibold text-ink-900">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300 ${
                  open === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-out-expo ${
                open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-600">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DocPageWrapper>
  );
}
