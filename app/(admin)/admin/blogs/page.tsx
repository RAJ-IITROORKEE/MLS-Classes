import { requireAdminPathAccess } from "@/lib/admin-auth";
import AdminBlogsClient from "@/components/admin/admin-blogs-client";

export const metadata = {
  title: "Manage Blogs | Admin Panel",
};

export default async function AdminBlogsPage() {
  await requireAdminPathAccess("/admin/blogs");

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminBlogsClient />
    </div>
  );
}
