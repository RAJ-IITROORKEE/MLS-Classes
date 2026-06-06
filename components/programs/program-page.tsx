import type { ProgramData } from "@/lib/program-data";
import { ProgramHero } from "./program-hero";
import { ProgramOverview } from "./program-overview";
import { ProgramSubjects } from "./program-subjects";
import { ProgramDetailedContent } from "./program-detailed-content";
import { ProgramCurriculum } from "./program-curriculum";
import { ProgramMediaShowcase } from "./program-media-showcase";
import { ProgramEnrollSteps } from "./program-enroll-steps";
import { ProgramWhyChoose } from "./program-why-choose";
import { TestimonialsSectionHome } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

interface ProgramPageProps {
  data: ProgramData;
}

export async function ProgramPage({ data }: ProgramPageProps) {
  return (
    <>
      <ProgramHero
        data={{
          heroTitle: data.heroTitle,
          heroSubtitle: data.heroSubtitle,
          category: data.category,
          categoryColor: data.categoryColor,
          stats: data.stats,
          coverage: data.coverage,
          media: data.media,
        }}
      />

      <ProgramOverview data={data.overview} />

      {data.subjects && <ProgramSubjects data={data.subjects} />}

      <ProgramDetailedContent data={data} />

      {data.modules && <ProgramCurriculum data={data.modules} />}

      {data.media && <ProgramMediaShowcase media={data.media} title={data.title} />}

      {data.enrollSteps && <ProgramEnrollSteps steps={data.enrollSteps} />}

      <ProgramWhyChoose features={data.whyChoose} />

      <TestimonialsSectionHome />

      <CTASection />
    </>
  );
}
