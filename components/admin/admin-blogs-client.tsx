'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import BlogsTable from './blogs-table';
import DeleteBlogDialog from './blog-delete-dialog';

export interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  contentHtml?: string;
  author?: string;
  category: { id: string; name: string; slug: string };
  categoryId: string;
  imageUrl?: string;
  imagePublicId?: string;
  featured: boolean;
  readingTime?: number;
  views: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminBlogsClient() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/admin/blogs');
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      // API returns { blogs, pagination }, extract blogs array
      setBlogs(data.blogs || data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchBlogs();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchBlogs]);

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete blog');
      setBlogs(blogs.filter((b) => b.id !== id));
      setDeletingBlogId(null);
      toast.success('Blog deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog';
      setError(message);
      toast.error(message);
    } finally {
      setActionLoading(false);
    }
  };

  // Handle edit - navigate to edit page
  const handleEditBlog = (blog: BlogData) => {
    router.push(`/admin/blogs/${blog.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground mt-2">
            Create, edit, and manage blog posts
          </p>
        </div>
        <Button
          onClick={() => router.push('/admin/blogs/create')}
          disabled={actionLoading}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Blog
        </Button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Blogs Table */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No blogs yet</p>
          <Button onClick={() => router.push('/admin/blogs/create')}>
            Create First Blog
          </Button>
        </div>
      ) : (
        <BlogsTable
          blogs={blogs}
          onEdit={handleEditBlog}
          onDelete={(id) => setDeletingBlogId(id)}
        />
      )}

      {/* Delete Dialog */}
      {deletingBlogId && (
        <DeleteBlogDialog
          onConfirm={() => handleDelete(deletingBlogId)}
          onCancel={() => setDeletingBlogId(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
}
