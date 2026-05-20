import type { Metadata } from "next";
import { AboutHero } from "./_components/about-hero";
import { AboutMission } from "./_components/about-mission";
import { AboutStats } from "./_components/about-stats";
import { AboutFeatures } from "./_components/about-features";
import { AboutSubjects } from "./_components/about-subjects";
import { AboutGlobalReach } from "./_components/about-global-reach";
import { AboutCTA } from "./_components/about-cta";

export const metadata: Metadata = {
  title: "About Us | MLS Classes",
  description:
    "MLS Classes offers live 1-on-1 personalized online tutoring for grades K-12. Learn about our mission, approach, and the dedicated team behind 15k+ student success stories.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutFeatures />
      <AboutSubjects />
      <AboutGlobalReach />
      <AboutCTA />
    </>
  );
}
