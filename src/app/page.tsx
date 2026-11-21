import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { HowIWork } from '@/components/sections/HowIWork';
import { PendingSection } from '@/components/sections/PendingSection';
import { Proof } from '@/components/sections/Proof';
import { Report } from '@/components/sections/Report';
import { Services } from '@/components/sections/Services';
import { WhyNow } from '@/components/sections/WhyNow';
import { Work } from '@/components/sections/Work';
import { contact } from '@/content/home';
import { anchors } from '@/lib/anchors';

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
      <PendingSection id={anchors.contact} heading={contact.heading} />
    </>
  );
}
