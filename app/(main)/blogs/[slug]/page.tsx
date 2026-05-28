import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BlogDetailClient from "@/components/blogs/blog-detail-client";

export async function generateStaticParams() {
  // Generate static params for published blogs
  const blogs = await prisma.blog.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true },
  });

  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (!blog || blog.status !== 'PUBLISHED') {
      return {
        title: "Blog Not Found | MLS Classes",
      };
    }

    return {
      title: `${blog.title} | MLS Classes`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        images: [
          {
            url: blog.imageUrl || "/og_image.png",
            width: 1200,
            height: 600,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Blog | MLS Classes",
    };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!blog || blog.status !== 'PUBLISHED') {
    notFound();
  }

  const relatedBlogs = await prisma.blog.findMany({
    where: {
      categoryId: blog.categoryId,
      id: { not: blog.id },
      status: 'PUBLISHED',
    },
    take: 3,
    include: { category: true },
  });

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}
