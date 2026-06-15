import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Programs | MLS Classes Admin" };

export default async function AdminProgramsPage() {
  await requireAdminPathAccess("/admin/academics/programs");

  return (
    <ComingSoonPage
      title="Programs"
      description="Manage academic programs, course offerings, and curriculum details."
      icon="graduationCap"
    />
  );
}
