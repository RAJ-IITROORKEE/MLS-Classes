import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Subjects | MLS Classes Admin" };

export default function AdminSubjectsPage() {
  return (
    <ComingSoonPage
      title="Subjects"
      description="Configure subject offerings, grade levels, and tutor assignments."
      icon={BookOpen}
    />
  );
}
