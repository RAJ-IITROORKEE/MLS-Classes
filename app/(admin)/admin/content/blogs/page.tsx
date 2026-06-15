import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Blog Posts | MLS Classes Admin" };

export default async function AdminBlogsPage() {
  await requireAdminPathAccess("/admin/content/blogs");

  return (
    <ComingSoonPage
      title="Blog Posts"
      description="Create and manage blog articles, study tips, and educational content."
      icon="fileText"
    />
  );
}
