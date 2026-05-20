import type { Metadata } from "next";
import { GraduationCap } from "lucide-react";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Programs | MLS Classes Admin" };

export default function AdminProgramsPage() {
  return (
    <ComingSoonPage
      title="Programs"
      description="Manage academic programs, course offerings, and curriculum details."
      icon={GraduationCap}
    />
  );
}
