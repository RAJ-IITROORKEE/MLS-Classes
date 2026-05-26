import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs, sampleBlogs } from "@/lib/blog-data";
import BlogDetailClient from "@/components/blogs/blog-detail-client";

export async function generateStaticParams() {
  return sampleBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
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
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.id, 3);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <BlogDetailClient blog={blog} relatedBlogs={relatedBlogs} />
    </main>
  );
}
