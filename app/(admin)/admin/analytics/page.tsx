import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Analytics | MLS Classes Admin" };

export default function AdminAnalyticsPage() {
  return (
    <ComingSoonPage
      title="Analytics"
      description="View booking trends, traffic sources, and conversion metrics."
      icon={BarChart3}
    />
  );
}
