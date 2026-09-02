import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'What is Chirograph Verify?',
    a: 'Chirograph Verify is human verification infrastructure for developers. It helps platforms confirm that a user is a real person using WebAuthn-based device authentication and server-side cryptographic verification — without passwords, SMS, or CAPTCHA.',
  },
  {
    q: 'Does Chirograph use CAPTCHA?',
    a: 'No. Chirograph does not use image puzzles, traffic lights, or any traditional CAPTCHA interaction. Verification is based on cryptographic device authentication instead of visual challenges.',
  },
  {
    q: 'Does Chirograph use passwords?',
    a: 'No. Verification relies on WebAuthn/passkey-capable device authentication. The user proves possession of a device authenticator using biometrics or a device PIN — never a shared password.',
  },
  {
    q: 'What is WebAuthn?',
    a: 'WebAuthn (Web Authentication) is a W3C standard for public-key-based authentication. It lets a device create a cryptographic assertion signed by a private key that never leaves the device. Chirograph verifies that assertion server-side.',
  },
  {
    q: 'How does verification work?',
    a: 'Your backend creates a single-use challenge via the Chirograph API. The user is redirected to a hosted WebAuthn ceremony where their device signs the challenge. Chirograph verifies the assertion server-side and issues an opaque result your backend redeems.',
  },
  {
    q: 'What is the widget?',
    a: 'The Chirograph widget is a lightweight JavaScript SDK. It triggers a top-level browser redirect to the hosted verification ceremony, then returns the user to your application with the verification result.',
  },
  {
    q: 'Does the widget use an iframe?',
    a: 'No. The current widget performs a top-level browser redirect to a hosted verification flow. It is not an iframe, modal, or inline React component.',
  },
  {
    q: 'Where does verification happen?',
    a: 'The WebAuthn ceremony happens on the user\'s device. The cryptographic verification of that ceremony happens on the Chirograph server. Your backend then redeems the opaque result. The browser never decides whether a user is verified.',
  },
  {
    q: 'Does the browser decide whether a user is verified?',
    a: 'No. The browser only facilitates the device ceremony. The actual verification decision is made server-side by Chirograph, and your backend confirms it by redeeming the result token.',
  },
  {
    q: 'How does a developer integrate Chirograph?',
    a: 'Create a challenge from your backend, redirect the user to the hosted ceremony using the widget SDK, then redeem the returned result token server-side. You can also receive signed webhook events for verification outcomes.',
  },
  {
    q: 'What happens after verification?',
    a: 'Your backend receives an opaque, single-use verification result that it redeems via the API. The result includes a verification status and a trust/device score. You can also subscribe to signed webhook events for real-time updates.',
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-20 py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            description="Everything you need to understand how Chirograph works and how to integrate it."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={(i % 4) * 50}>
              <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-50"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-semibold text-ink-900 sm:text-base">{faq.q}</span>
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
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
