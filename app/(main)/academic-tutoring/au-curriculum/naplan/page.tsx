import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "NAPLAN Prep | MLS Classes",
  description:
    "Expert NAPLAN preparation for Years 3, 5, 7 and 9. Australian Curriculum-aligned 1-on-1 tutoring in Reading, Writing, and Numeracy.",
};

export default function NAPLANPage() {
  return <ProgramPage data={PROGRAMS["naplan"]} />;
}
