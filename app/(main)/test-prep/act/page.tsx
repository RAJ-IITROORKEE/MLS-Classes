import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "ACT Prep | MLS Classes",
  description:
    "Expert ACT tutoring covering all four sections. Personalized 1-on-1 coaching to help you reach a 35+ composite score.",
};

export default function ACTPage() {
  return <ProgramPage data={PROGRAMS["act"]} />;
}
