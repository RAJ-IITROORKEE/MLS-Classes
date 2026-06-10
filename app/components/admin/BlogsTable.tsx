'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import type { BlogData } from './AdminBlogsClient';

interface BlogsTableProps {
  blogs: BlogData[];
  onEdit: (blog: BlogData) => void;
  onDelete: (id: string) => void;
}

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  PUBLISHED: 'default',
  DRAFT: 'secondary',
  ARCHIVED: 'destructive',
};

export default function BlogsTable({ blogs, onEdit, onDelete }: BlogsTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Views</TableHead>
            <TableHead className="text-right">Reading Time</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell className="font-medium max-w-xs truncate">
                {blog.title}
              </TableCell>
              <TableCell>{blog.category?.name || '-'}</TableCell>
              <TableCell>
                <Badge variant={statusVariants[blog.status]}>
                  {blog.status}
                </Badge>
              </TableCell>
              <TableCell>
                {blog.featured ? (
                  <Badge variant="outline">Featured</Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">{blog.views || 0}</TableCell>
              <TableCell className="text-right">{blog.readingTime || '-'} min</TableCell>
              <TableCell>
                {blog.publishedAt
                  ? format(new Date(blog.publishedAt), 'MMM dd, yyyy')
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
