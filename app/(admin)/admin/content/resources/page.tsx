import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Resources | MLS Classes Admin" };

export default function AdminResourcesPage() {
  return (
    <ComingSoonPage
      title="Resources"
      description="Upload and manage downloadable study materials and resources."
      icon="folderOpen"
    />
  );
}
