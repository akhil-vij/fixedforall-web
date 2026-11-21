import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { PendingSection } from '@/components/sections/PendingSection';
import { Proof } from '@/components/sections/Proof';
import { Report } from '@/components/sections/Report';
import { Services } from '@/components/sections/Services';
import { WhyNow } from '@/components/sections/WhyNow';
import { contact, howIWork, work } from '@/content/home';
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
      <PendingSection id={anchors.work} heading={work.heading} />
      <PendingSection heading={howIWork.heading} />
      <About />
      <Faq />
      <PendingSection id={anchors.contact} heading={contact.heading} />
    </>
  );
}
