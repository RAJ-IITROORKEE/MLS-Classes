import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "UK Curriculum Tutoring | MLS Classes",
  description: PROGRAMS["uk-curriculum"].heroSubtitle,
};

export default function UKCurriculumPage() {
  return <ProgramPage data={PROGRAMS["uk-curriculum"]} />;
}
