"use client";

import { motion } from "framer-motion";
import { Edit2, Trash2, Eye } from "lucide-react";
import type { BlogData } from "./admin-blogs-client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface BlogsTableProps {
  blogs: BlogData[];
  onEdit: (blog: BlogData) => void;
  onDelete: (blogId: string) => void;
}

const statusVariants = {
  DRAFT: "secondary",
  PUBLISHED: "default",
  ARCHIVED: "outline",
} as const;

export default function BlogsTable({ blogs, onEdit, onDelete }: BlogsTableProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
        <p className="text-slate-600 dark:text-slate-400">No blogs found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                Views
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Published
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <motion.tr
                key={blog.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <p className="font-medium text-slate-900 dark:text-white line-clamp-1 max-w-xs">
                    {blog.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {blog.slug}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.category?.name || "-"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={statusVariants[blog.status]}>
                    {blog.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  {blog.featured ? (
                    <Badge variant="outline">Featured</Badge>
                  ) : (
                    <span className="text-slate-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.views || 0}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "-"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/blogs/${blog.slug}`} target="_blank">
                      <Button variant="ghost" size="sm" title="View">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(blog)}
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(blog.id)}
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
