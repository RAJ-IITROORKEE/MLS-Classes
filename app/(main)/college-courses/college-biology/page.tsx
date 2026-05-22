import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "College Biology Tutoring | MLS Classes",
  description:
    "Expert 1-on-1 college biology tutoring covering cell biology, genetics, ecology, and more. Flexible scheduling and affordable rates.",
};

export default function CollegeBiologyPage() {
  return <ProgramPage data={PROGRAMS["college-biology"]} />;
}
