'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  category: Category;
  categoryId: string;
  author?: string;
  publishedAt?: Date | string;
  readingTime?: number;
  views: number;
  featured: boolean;
}

interface BlogsListingClientProps {
  initialBlogs: Blog[];
  featuredBlogs?: Blog[];
  categories: Category[];
}

const FEATURED_CAROUSEL_ANIMATION = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function BlogsListingClient({
  initialBlogs,
  featuredBlogs = [],
  categories,
}: BlogsListingClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    let filtered = initialBlogs;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(query) ||
          blog.excerpt.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((blog) => blog.categoryId === selectedCategory);
    }

    return filtered;
  }, [initialBlogs, searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBlogs, page]);

  // Reset page when filters change
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  return (
    <div className="w-full">
      {/* Featured Carousel */}
      {featuredBlogs.length > 0 && (
        <section className="mb-16 md:mb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Featured Articles
            </h2>
            <motion.div
              variants={FEATURED_CAROUSEL_ANIMATION.container}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {featuredBlogs.slice(0, 3).map((blog) => (
                <motion.div
                  key={blog.id}
                  variants={FEATURED_CAROUSEL_ANIMATION.item}
                >
                  <BlogCard {...blog} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-10 h-11"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(null)}
              className="rounded-full"
            >
              All Articles
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category.id)}
                className="rounded-full"
                style={
                  selectedCategory === category.id
                    ? { backgroundColor: category.color || '#1f2937' }
                    : {}
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="mb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {paginatedBlogs.length > 0 ? (
            <>
              <motion.div
                variants={FEATURED_CAROUSEL_ANIMATION.container}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginatedBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    variants={FEATURED_CAROUSEL_ANIMATION.item}
                  >
                    <BlogCard {...blog} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-full"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <Button
                          key={pageNum}
                          variant={page === pageNum ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setPage(pageNum)}
                          className={cn(
                            'w-10 h-10 rounded-full',
                            page === pageNum &&
                              'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          )}
                        >
                          {pageNum}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-full"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-500 dark:text-slate-400">
                No articles found.
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  onClick={handleClearSearch}
                  className="mt-4"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
