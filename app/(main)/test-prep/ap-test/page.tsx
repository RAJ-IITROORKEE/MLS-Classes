import type { Metadata } from "next";
import { PROGRAMS } from "@/lib/program-data";
import { ProgramPage } from "@/components/programs/program-page";

export const metadata: Metadata = {
  title: "AP Test Prep | MLS Classes",
  description:
    "Expert 1-on-1 AP tutoring for all subjects. Achieve top scores with personalized coaching, 100+ practice tests, and proven study strategies.",
};

export default function APTestPage() {
  return <ProgramPage data={PROGRAMS["ap-test"]} />;
}
