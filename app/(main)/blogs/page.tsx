import { prisma } from "@/lib/prisma";
import BlogsListingClient from "@/components/blogs/blogs-listing-client";

export const metadata = {
  title: "Blogs | MLS Classes - Insights & Resources",
  description:
    "Discover expert tips, study strategies, and success stories. Read our latest blog posts on exam prep, college guidance, and academics.",
};

export default async function BlogsPage() {
  // Fetch published blogs
  const [allBlogs, featuredBlogs, categories] = await Promise.all([
    prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
    }),
    prisma.blog.findMany({
      where: { status: 'PUBLISHED', featured: true },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    }),
    prisma.blogCategory.findMany({
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    }),
  ]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              Insights & Resources
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Expert tips, study strategies, and success stories to help you excel in your academic journey.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 md:py-16">
        <BlogsListingClient
          initialBlogs={allBlogs}
          featuredBlogs={featuredBlogs}
          categories={categories}
        />
      </div>
    </main>
  );
}
