import { useSeo } from '@/hooks/useSeo';
import { seo } from '@/config/seo';
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
  useSeo(seo.home);

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
