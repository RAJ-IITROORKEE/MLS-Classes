import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Resources | MLS Classes Admin" };

export default async function AdminResourcesPage() {
  await requireAdminPathAccess("/admin/content/resources");

  return (
    <ComingSoonPage
      title="Resources"
      description="Upload and manage downloadable study materials and resources."
      icon="folderOpen"
    />
  );
}
