'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { BlogData } from './admin-blogs-client';

interface EditBlogModalProps {
  blog: BlogData;
  onSave: (updates: Partial<BlogData>) => Promise<void>;
  onClose: () => void;
  loading?: boolean;
}

export default function EditBlogModal({
  blog,
  onSave,
  onClose,
  loading = false,
}: EditBlogModalProps) {
  const [status, setStatus] = useState(blog.status);
  const [featured, setFeatured] = useState(blog.featured);

  const handleSave = async () => {
    await onSave({
      status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
      featured,
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Update blog status and featured flag. To edit the full content, use the full editor.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title (read-only) */}
          <div>
            <Label className="text-sm font-medium">Title</Label>
            <div className="mt-1 p-2 bg-muted rounded">
              <p className="text-sm">{blog.title}</p>
            </div>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" className="text-sm font-medium">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status" className="mt-1">
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
          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked as boolean)}
            />
            <Label htmlFor="featured" className="font-medium cursor-pointer">
              Mark as Featured
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
