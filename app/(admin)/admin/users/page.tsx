import type { Metadata } from "next";
import { Users } from "lucide-react";
import { ComingSoonPage } from "@/components/admin/coming-soon-page";

export const metadata: Metadata = { title: "Users | MLS Classes Admin" };

export default function AdminUsersPage() {
  return (
    <ComingSoonPage
      title="Users"
      description="Manage admin users and their access permissions."
      icon={Users}
    />
  );
}
