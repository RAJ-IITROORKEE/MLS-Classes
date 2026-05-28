'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Loader2, Upload, X } from 'lucide-react';
import RichTextEditor from './rich-text-editor';
import { toast } from 'sonner';

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.any(),
  categoryId: z.string().min(1, 'Please select a category'),
  imageUrl: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).default('DRAFT'),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

interface BlogInitialData {
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  categoryId: string;
  imageUrl?: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

interface BlogEditorProps {
  blogId?: string;
  blog?: BlogInitialData;
  categories: Array<{ id: string; name: string }>;
}

export default function BlogEditor({
  blogId,
  blog,
  categories,
}: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: blog?.title || '',
      slug: blog?.slug || '',
      excerpt: blog?.excerpt || '',
      content: blog?.content || null,
      categoryId: blog?.categoryId || '',
      imageUrl: blog?.imageUrl || '',
      featured: blog?.featured || false,
      status: blog?.status || 'DRAFT',
    },
  });

  const title = useWatch({ control, name: 'title' });
  const slug = useWatch({ control, name: 'slug' });
  const imageUrl = useWatch({ control, name: 'imageUrl' });

  useEffect(() => {
    const initialSlug = blog?.slug || '';
    if (!slug || slug === generateSlug(initialSlug)) {
      const newSlug = generateSlug(title);
      if (newSlug) {
        setValue('slug', newSlug);
      }
    }
  }, [title, slug, setValue, blog?.slug]);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'blogs');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || 'Image upload failed');
        }

        const data = await response.json();

        setValue('imageUrl', data.url || '');
        toast.success('Image uploaded successfully');
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to upload image');
        console.error('Image upload error:', err);
      } finally {
        setUploadingImage(false);
        e.target.value = '';
      }
    },
    [setValue]
  );

  const onSubmit = async (data: BlogFormData) => {
    try {
      setLoading(true);
      setError(null);

      if (!data.content) {
        setError('Blog content is required');
        return;
      }

      const payload = {
        ...data,
        publishedAt: data.status === 'PUBLISHED' && !blog ? new Date().toISOString() : undefined,
      };

      const url = blogId ? `/api/admin/blogs/${blogId}` : '/api/admin/blogs';
      const method = blogId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save blog');
      }

      toast.success(blogId ? 'Blog updated successfully' : 'Blog created successfully');
      router.push('/admin/blogs');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save blog';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          {blogId ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <p className="text-muted-foreground mt-2">
          {blogId
            ? 'Update your blog post and publish when ready'
            : 'Write a new blog post for your audience'}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="flex gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          placeholder="e.g., 10 Tips for JEE Preparation"
          {...register('title')}
          className={errors.title ? 'border-destructive' : ''}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug *</Label>
        <Input
          id="slug"
          placeholder="auto-generated-from-title"
          {...register('slug')}
          className={errors.slug ? 'border-destructive' : ''}
        />
        <p className="text-xs text-muted-foreground">
          Auto-generated from title, edit if needed
        </p>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt *</Label>
        <Textarea
          id="excerpt"
          placeholder="A brief summary of your blog post"
          rows={3}
          {...register('excerpt')}
          className={errors.excerpt ? 'border-destructive' : ''}
        />
        {errors.excerpt && (
          <p className="text-sm text-destructive">{errors.excerpt.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger
                id="category"
                className={errors.categoryId ? 'border-destructive' : ''}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Featured Image */}
      <div className="space-y-2">
        <Label>Featured Image</Label>
        <div className="border-2 border-dashed rounded-lg p-6">
          {imageUrl ? (
            <div className="relative inline-block">
              <Image
                src={imageUrl}
                alt="Featured"
                width={320}
                height={128}
                className="h-32 w-auto rounded-lg"
              />
              <button
                type="button"
                onClick={() => setValue('imageUrl', '')}
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Click to upload featured image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label>Content *</Label>
        <div className="border rounded-lg overflow-hidden">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Start writing your blog post..."
              />
            )}
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center space-x-2">
        <Controller
          name="featured"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="featured"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Mark as Featured
        </Label>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="outline"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>
    </form>
  );
}
