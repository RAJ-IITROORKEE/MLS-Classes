import type { Metadata } from "next";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Analytics | MLS Classes Admin" };

export default async function AdminAnalyticsPage() {
  await requireAdminPathAccess("/admin/analytics");

  return (
    <ComingSoonPage
      title="Analytics"
      description="View booking trends, traffic sources, and conversion metrics."
      icon="barChart3"
    />
  );
}
