import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "US Curriculum Tutoring | MLS Classes",
  description: PROGRAMS["us-curriculum"].heroSubtitle,
};

export default function USCurriculumPage() {
  return <ProgramPage data={PROGRAMS["us-curriculum"]} />;
}
