import { prisma } from '@/lib/prisma';
import BlogEditor from '../../../../components/admin/blog-editor-form';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: 'Edit Blog | Admin',
};

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Auth check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/sign-in");
  }

  const { id } = await params;

  // Fetch blog and categories
  const [blog, categories] = await Promise.all([
    prisma.blog.findUnique({
      where: { id },
      include: { category: true },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!blog) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BlogEditor
        blogId={id}
        blog={{
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          categoryId: blog.categoryId,
          imageUrl: blog.imageUrl || '',
          featured: blog.featured,
          status: blog.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        }}
        categories={categories}
      />
    </div>
  );
}
