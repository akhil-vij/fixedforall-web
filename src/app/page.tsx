import { About } from '@/components/sections/About';
import { ContactBand } from '@/components/sections/ContactBand';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { HowIWork } from '@/components/sections/HowIWork';
import { Proof } from '@/components/sections/Proof';
import { Report } from '@/components/sections/Report';
import { Services } from '@/components/sections/Services';
import { WhyNow } from '@/components/sections/WhyNow';
import { Work } from '@/components/sections/Work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <WhyNow />
      <HowItWorks />
      <Services />
      <Report />
      <Work />
      <HowIWork />
      <About />
      <Faq />
      <ContactBand />
    </>
  );
}
