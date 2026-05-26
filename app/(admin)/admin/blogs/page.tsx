import { getPublishedBlogs } from "@/lib/blog-data";
import AdminBlogsClient from "@/components/admin/admin-blogs-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Manage Blogs | Admin Panel",
};

export default async function AdminBlogsPage() {
  // Auth check - redirect to sign-in if not authenticated admin
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/mocks/sign-in");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const allBlogs = getPublishedBlogs();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Manage Blogs</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-1">
              Create, edit, and manage your blog posts
            </p>
          </div>
        </div>

        <AdminBlogsClient initialBlogs={allBlogs} />
      </div>
    </div>
  );
}
