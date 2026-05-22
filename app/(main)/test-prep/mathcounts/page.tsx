import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "MATHCOUNTS Prep | MLS Classes",
  description:
    "Personalized MATHCOUNTS competition coaching for grades 6–8. Master Sprint, Target, and Countdown rounds with expert tutors.",
};

export default function MathcountsPage() {
  return <ProgramPage data={PROGRAMS["mathcounts"]} />;
}
