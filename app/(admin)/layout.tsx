import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminPanelAccess } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdminPanelAccess();

  return <AdminShell user={user}>{children}</AdminShell>;
}
