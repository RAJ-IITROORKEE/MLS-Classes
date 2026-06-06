import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "PSAT Prep | MLS Classes",
  description: PROGRAMS.psat.heroSubtitle,
};

export default function PSATPage() {
  return <ProgramPage data={PROGRAMS.psat} />;
}
