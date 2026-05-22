import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "IGCSE / GCSE Tutoring | MLS Classes",
  description:
    "Complete IGCSE and GCSE tutoring for Cambridge and Edexcel. Expert 1-on-1 coaching across 70+ subjects for students aged 14–16.",
};

export default function IGCSEPage() {
  return <ProgramPage data={PROGRAMS["igcse-curriculum"]} />;
}
