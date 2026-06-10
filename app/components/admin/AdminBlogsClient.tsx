'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BlogsTable from './BlogsTable';
import EditBlogModal from './EditBlogModal';
import DeleteBlogDialog from './DeleteBlogDialog';

export interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // TipTap JSON
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
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null);
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
    fetchBlogs();
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle edit
  const handleEditBlog = (blog: BlogData) => {
    setEditingBlog(blog);
  };

  // Handle save edit
  const handleSaveEdit = async (updates: Partial<BlogData>) => {
    if (!editingBlog) return;
    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/blogs/${editingBlog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update blog');
      const updated = await response.json();
      setBlogs(blogs.map((b) => (b.id === updated.id ? updated : b)));
      setEditingBlog(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update blog');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle seed
  const handleSeed = async () => {
    try {
      setActionLoading(true);
      const response = await fetch('/api/blogs/seed', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to seed blogs');
      await fetchBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to seed blogs');
    } finally {
      setActionLoading(false);
    }
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
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSeed}
            disabled={actionLoading}
          >
            Seed Sample Blogs
          </Button>
          <Button
            onClick={() => router.push('/admin/blogs/create')}
            disabled={actionLoading}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Blog
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
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

      {/* Edit Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onSave={handleSaveEdit}
          onClose={() => setEditingBlog(null)}
          loading={actionLoading}
        />
      )}

      {/* Delete Dialog */}
      {deletingBlogId && (
        <DeleteBlogDialog
          blogId={deletingBlogId}
          onConfirm={() => handleDelete(deletingBlogId)}
          onCancel={() => setDeletingBlogId(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
}
