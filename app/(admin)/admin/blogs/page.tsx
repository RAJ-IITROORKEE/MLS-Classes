import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminBlogsClient from "@/components/admin/admin-blogs-client";

export const metadata = {
  title: "Manage Blogs | Admin Panel",
};

export default async function AdminBlogsPage() {
  // Auth check - redirect to sign-in if not authenticated admin
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <AdminBlogsClient />
    </div>
  );
}
