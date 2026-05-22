import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "AMC Competition Prep | MLS Classes",
  description:
    "Expert AMC 8, AMC 10, and AMC 12 competition coaching. Build problem-solving skills and advance to AIME with personalized tutoring.",
};

export default function AMC8Page() {
  return <ProgramPage data={PROGRAMS["amc-8"]} />;
}
