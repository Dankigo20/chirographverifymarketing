import { useSeo } from '@/hooks/useSeo';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ProductExplanation } from '@/components/sections/ProductExplanation';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Capabilities } from '@/components/sections/Capabilities';
import { DeveloperSection } from '@/components/sections/DeveloperSection';
import { UseCases } from '@/components/sections/UseCases';
import { SecuritySection } from '@/components/sections/SecuritySection';
import { PricingPreview } from '@/components/sections/PricingPreview';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';

export function HomePage() {
  useSeo({
    title: 'Chirograph Verify — Prove you\'re human without passwords or SMS',
    description:
      'Bot-prevention API using WebAuthn passkeys. Server-verified, single-use, no CAPTCHA or SMS codes.',
    path: '/',
  });

  return (
    <>
      <HeroSection />
      <ProblemSection />
      <ProductExplanation />
      <HowItWorks />
      <Capabilities />
      <DeveloperSection />
      <UseCases />
      <SecuritySection />
      <PricingPreview />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
