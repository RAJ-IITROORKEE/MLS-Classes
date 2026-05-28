"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  readingTime?: number | null;
}

interface RelatedBlogsProps {
  blogs: BlogPost[];
}

export default function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "p-4 rounded-lg",
        "bg-slate-50 dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-700"
      )}
    >
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
        Related Articles
      </h3>

      <div className="space-y-3">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className={cn(
              "group block p-3 rounded-lg",
              "bg-white dark:bg-slate-800",
              "border border-slate-200 dark:border-slate-700",
              "hover:border-slate-500 dark:hover:border-slate-400",
              "hover:shadow-md transition-all"
            )}
          >
            <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors line-clamp-2">
              {blog.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {blog.readingTime || 1} min read
            </p>
          </Link>
        ))}
      </div>

      <Link
        href="/blogs"
        className={cn(
          "flex items-center gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700",
          "text-sm font-medium text-slate-700 dark:text-slate-300",
          "hover:gap-3 transition-all"
        )}
      >
        View all articles
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
