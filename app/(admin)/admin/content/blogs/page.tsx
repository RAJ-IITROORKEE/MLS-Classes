import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Blog Posts | MLS Classes Admin" };

export default function AdminBlogsPage() {
  return (
    <ComingSoonPage
      title="Blog Posts"
      description="Create and manage blog articles, study tips, and educational content."
      icon="fileText"
    />
  );
}
