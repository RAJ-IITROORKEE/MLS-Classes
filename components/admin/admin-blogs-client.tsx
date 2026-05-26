"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import BlogsTable from "./blogs-table";
import BlogFormModal from "./blog-form-modal";
import { BlogPost } from "@/lib/blog-data";

interface AdminBlogsClientProps {
  initialBlogs: BlogPost[];
}

export default function AdminBlogsClient({ initialBlogs }: AdminBlogsClientProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED">(
    "ALL"
  );

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || blog.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleSaveBlog = (blog: BlogPost) => {
    if (selectedBlog) {
      // Update existing
      setBlogs(blogs.map((b) => (b.id === blog.id ? blog : b)));
    } else {
      // Create new
      setBlogs([...blogs, { ...blog, id: String(Date.now()) }]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteBlog = (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      setBlogs(blogs.filter((b) => b.id !== blogId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="flex-1 md:flex-none relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as "ALL" | "DRAFT" | "PUBLISHED" | "ARCHIVED"
              )
            }
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Create Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateBlog}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap"
        >
          <Plus className="w-5 h-5" />
          Create Blog
        </motion.button>
      </div>

      {/* Table */}
      <BlogsTable
        blogs={filteredBlogs}
        onEdit={handleEditBlog}
        onDelete={handleDeleteBlog}
      />

      {/* Form Modal */}
      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        blog={selectedBlog}
        onSave={handleSaveBlog}
      />
    </div>
  );
}
