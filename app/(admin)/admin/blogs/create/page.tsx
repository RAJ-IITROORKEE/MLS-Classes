import { prisma } from '@/lib/prisma';
import BlogEditor from '../../../../components/admin/blog-editor-form';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Create Blog | Admin',
};

export default async function CreateBlogPage() {
  // Auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/sign-in");
  }

  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BlogEditor
        categories={categories}
      />
    </div>
  );
}
