'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import type { BlogData } from './AdminBlogsClient';

interface EditBlogModalProps {
  blog: BlogData;
  onSave: (updates: Partial<BlogData>) => Promise<void>;
  onClose: () => void;
  loading: boolean;
}

export default function EditBlogModal({
  blog,
  onSave,
  onClose,
  loading,
}: EditBlogModalProps) {
  const [status, setStatus] = useState<string>(blog.status);
  const [featured, setFeatured] = useState(blog.featured);

  const handleSave = async () => {
    await onSave({
      status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      featured,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Update blog status and settings
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <p className="text-sm text-muted-foreground mt-1">{blog.title}</p>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked as boolean)}
            />
            <Label
              htmlFor="featured"
              className="text-sm font-medium cursor-pointer"
            >
              Mark as Featured
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
