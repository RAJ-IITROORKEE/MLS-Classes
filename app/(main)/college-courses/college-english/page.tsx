import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "College English Tutoring | MLS Classes",
  description:
    "Expert 1-on-1 college English tutoring covering academic writing, critical reading, grammar, and literary analysis. Flexible and affordable.",
};

export default function CollegeEnglishPage() {
  return <ProgramPage data={PROGRAMS["college-english"]} />;
}
