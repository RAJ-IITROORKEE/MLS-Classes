import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "AU Curriculum Tutoring | MLS Classes",
  description: PROGRAMS["au-curriculum"].heroSubtitle,
};

export default function AUCurriculumPage() {
  return <ProgramPage data={PROGRAMS["au-curriculum"]} />;
}
