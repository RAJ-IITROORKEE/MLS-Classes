"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, CalendarDays, Eye } from "lucide-react";
import { BlogPost } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const publishDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <Link href={`/blogs/${blog.slug}`}>
        <div
          className={cn(
            "h-full rounded-lg overflow-hidden",
            "border border-slate-200 dark:border-slate-700",
            "bg-white dark:bg-slate-900",
            "shadow-sm hover:shadow-lg",
            "transition-all duration-300",
            "flex flex-col"
          )}
        >
          {/* Image Container */}
          <div className="relative h-48 md:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
            {blog.imageUrl ? (
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white/50 text-center px-4">
                  {blog.category.name}
                </span>
              </div>
            )}

            {/* Category Badge */}
            <div
              className={cn(
                "absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold",
                "text-white bg-slate-900/80 dark:bg-slate-950/80",
                "backdrop-blur-sm"
              )}
            >
              {blog.category.name}
            </div>

            {/* Views Badge */}
            <div
              className={cn(
                "absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium",
                "text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-900/80",
                "backdrop-blur-sm flex items-center gap-1"
              )}
            >
              <Eye className="w-3 h-3" />
              {blog.views}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {blog.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base mb-4 flex-1 line-clamp-2">
              {blog.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs md:text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readingTime} min read</span>
              </div>
            </div>

            {/* Author */}
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-3">
              By {blog.author}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
