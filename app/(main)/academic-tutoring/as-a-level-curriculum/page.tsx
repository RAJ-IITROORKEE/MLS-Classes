import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "AS / A Level Tutoring | MLS Classes",
  description:
    "Expert AS and A Level tutoring for Cambridge and Edexcel. Personalized 1-on-1 coaching across 50+ subjects for students aged 16–19.",
};

export default function ASALevelPage() {
  return <ProgramPage data={PROGRAMS["as-a-level-curriculum"]} />;
}
