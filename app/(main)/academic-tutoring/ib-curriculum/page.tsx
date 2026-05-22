import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "IB Curriculum Tutoring | MLS Classes",
  description:
    "Comprehensive IB tutoring for PYP, MYP, DP, and CP. Expert 1-on-1 coaching to help students excel in all International Baccalaureate programmes.",
};

export default function IBCurriculumPage() {
  return <ProgramPage data={PROGRAMS["ib-curriculum"]} />;
}
