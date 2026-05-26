"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import BlogCard from "./blog-card";
import FeaturedCarousel from "./featured-carousel";
import CategorySidebar from "./category-sidebar";
import { BlogPost, BlogCategory } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

interface BlogsListingClientProps {
  initialBlogs: BlogPost[];
  featuredBlogs: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogsListingClient({
  initialBlogs,
  featuredBlogs,
  categories,
}: BlogsListingClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  // Filter blogs based on search and category
  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory
        ? blog.category.slug === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Featured Section */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Featured Articles
            </h2>
            <FeaturedCarousel blogs={featuredBlogs} />
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-12 md:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className={cn(
                  "w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700",
                  "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
                  "placeholder-slate-400 dark:placeholder-slate-500",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  "transition-all duration-200"
                )}
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            blogCounts={categories.map((cat) => ({
              slug: cat.slug,
              count: initialBlogs.filter((b) => b.category.slug === cat.slug).length,
            }))}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="mb-8">
            <p className="text-slate-600 dark:text-slate-300">
              Showing {paginatedBlogs.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of{" "}
              <span className="font-semibold">{filteredBlogs.length}</span> articles
              {selectedCategory && (
                <>
                  {" "}
                  in{" "}
                  <span className="font-semibold">
                    {categories.find((c) => c.slug === selectedCategory)?.name}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Blog Grid */}
          {paginatedBlogs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {paginatedBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <BlogCard blog={blog} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No articles found. Try adjusting your search or filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-colors",
                  currentPage === 1
                    ? "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    "px-3 py-2 rounded-lg border transition-colors",
                    currentPage === page
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
                      : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                  )}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={cn(
                  "px-4 py-2 rounded-lg border transition-colors",
                  currentPage === totalPages
                    ? "border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                    : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900"
                )}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to boost your test scores?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Start practicing with our comprehensive mock tests and personalized study plans.
          </p>
          <a
            href="/mocks"
            className="inline-block px-6 py-3 bg-white dark:bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-100 transition-colors"
          >
            Start Practicing
          </a>
        </div>
      </section>
    </div>
  );
}
