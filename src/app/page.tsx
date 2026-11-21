import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { Hero } from '@/components/sections/Hero';
import { PendingSection } from '@/components/sections/PendingSection';
import { Proof } from '@/components/sections/Proof';
import { WhyNow } from '@/components/sections/WhyNow';
import { contact, howItWorks, howIWork, report, services, work } from '@/content/home';
import { anchors } from '@/lib/anchors';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <WhyNow />
      <PendingSection id={anchors.how} heading={howItWorks.heading} />
      <PendingSection id={anchors.services} heading={services.heading} />
      <PendingSection id={anchors.report} heading={report.heading} />
      <PendingSection id={anchors.work} heading={work.heading} />
      <PendingSection heading={howIWork.heading} />
      <About />
      <Faq />
      <PendingSection id={anchors.contact} heading={contact.heading} />
    </>
  );
}
