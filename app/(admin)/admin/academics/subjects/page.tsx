import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Subjects | MLS Classes Admin" };

export default async function AdminSubjectsPage() {
  await requireAdminPathAccess("/admin/academics/subjects");

  return (
    <ComingSoonPage
      title="Subjects"
      description="Configure subject offerings, grade levels, and tutor assignments."
      icon="bookOpen"
    />
  );
}
