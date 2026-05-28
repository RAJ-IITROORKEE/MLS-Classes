"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
  order?: number;
}

interface CategorySidebarProps {
  categories: BlogCategory[];
  selectedCategory: string | null;
  onCategoryChange: (categorySlug: string | null) => void;
  blogCounts: Array<{ slug: string; count: number }>;
}

export default function CategorySidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  blogCounts,
}: CategorySidebarProps) {
  const getCategoryCount = (categorySlug: string) => {
    return blogCounts.find((c) => c.slug === categorySlug)?.count || 0;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 flex-wrap">
      {/* All Categories Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onCategoryChange(null)}
        className={cn(
          "px-6 py-3 rounded-lg font-medium transition-all duration-200",
          "flex items-center gap-2",
          selectedCategory === null
            ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
            : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
        )}
      >
        <span>All Categories</span>
        <span className="text-sm opacity-75">
          ({categories.reduce((sum, cat) => sum + getCategoryCount(cat.slug), 0)})
        </span>
      </motion.button>

      {/* Category Buttons */}
      {categories.map((category) => (
        <motion.button
          key={category.slug}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(category.slug)}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all duration-200",
            "flex items-center gap-2",
            selectedCategory === category.slug
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg"
              : "bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          )}
        >
          <span>{category.name}</span>
          <span className="text-sm opacity-75">
            ({getCategoryCount(category.slug)})
          </span>
        </motion.button>
      ))}
    </div>
  );
}
