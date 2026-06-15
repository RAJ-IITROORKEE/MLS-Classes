import { requireAdminPanelAccess } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminIndexPage() {
  await requireAdminPanelAccess();
  redirect("/admin/dashboard");
}
