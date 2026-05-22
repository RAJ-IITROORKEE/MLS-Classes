import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "Digital SAT Prep | MLS Classes",
  description:
    "Top Digital SAT tutoring with adaptive mock tests, 1-on-1 coaching, and proven strategies to help you reach a 1500+ score.",
};

export default function DigitalSATPage() {
  return <ProgramPage data={PROGRAMS["digital-sat"]} />;
}
