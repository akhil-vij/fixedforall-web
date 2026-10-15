import { PendingSection } from '@/components/sections/PendingSection';
import {
  about,
  contact,
  faq,
  hero,
  howItWorks,
  howIWork,
  report,
  services,
  whyNow,
  work,
} from '@/content/home';
import { anchors } from '@/lib/anchors';

export default function HomePage() {
  return (
    <>
      <h1>{hero.headline}</h1>
      <p>{hero.subheadline}</p>
      <PendingSection heading={whyNow.heading} />
      <PendingSection id={anchors.how} heading={howItWorks.heading} />
      <PendingSection id={anchors.services} heading={services.heading} />
      <PendingSection id={anchors.report} heading={report.heading} />
      <PendingSection id={anchors.work} heading={work.heading} />
      <PendingSection heading={howIWork.heading} />
      <PendingSection id={anchors.about} heading={about.heading} />
      <PendingSection id={anchors.faq} heading={faq.heading} />
      <PendingSection id={anchors.contact} heading={contact.heading} />
    </>
  );
}
