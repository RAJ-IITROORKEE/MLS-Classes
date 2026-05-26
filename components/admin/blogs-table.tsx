"use client";

import { motion } from "framer-motion";
import { Edit2, Trash2, Eye, Lock, CheckCircle } from "lucide-react";
import { BlogPost, blogCategories } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

interface BlogsTableProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (blogId: string) => void;
}

export default function BlogsTable({ blogs, onEdit, onDelete }: BlogsTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
      case "DRAFT":
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300";
      case "ARCHIVED":
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <CheckCircle className="w-4 h-4" />;
      case "DRAFT":
        return <Lock className="w-4 h-4" />;
      case "ARCHIVED":
        return <Eye className="w-4 h-4" />;
      default:
        return null;
    }
  };

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
                Views
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Date
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
                  <p className="font-medium text-slate-900 dark:text-white line-clamp-1">
                    {blog.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {blog.slug}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.category.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium",
                      getStatusBadgeColor(blog.status)
                    )}
                  >
                    {getStatusIcon(blog.status)}
                    {blog.status}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {blog.views}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onEdit(blog)}
                      className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onDelete(blog.id)}
                      className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
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
