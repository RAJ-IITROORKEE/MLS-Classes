'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RichTextEditor } from './RichTextEditor';
import { useState } from 'react';
import { toast } from 'sonner';

const blogFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.any(),
  categoryId: z.string().min(1, 'Please select a category'),
  imageUrl: z.string().optional().or(z.literal('')).nullable(),
  bannerUrl: z.string().optional().or(z.literal('')).nullable(),
  featured: z.boolean(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogEditorProps {
  blog?: any;
  categories: any[];
  onSubmit: (data: BlogFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function BlogEditor({
  blog,
  categories,
  onSubmit,
  isLoading = false,
}: BlogEditorProps) {
  const [contentPreview, setContentPreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (
    file: File,
    onUrlSet: (url: string) => void
  ) => {
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      onUrlSet(data.secure_url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog?.title || '',
      slug: blog?.slug || '',
      excerpt: blog?.excerpt || '',
      content: blog?.content || null,
      categoryId: blog?.categoryId || '',
      imageUrl: blog?.imageUrl || '',
      featured: blog?.featured ?? false,
      status: blog?.status || 'DRAFT',
      bannerUrl: blog?.bannerUrl || '',
    },
  });

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      await onSubmit(data);
      toast.success(blog ? 'Blog updated!' : 'Blog created!');
    } catch (error) {
      toast.error('Failed to save blog');
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    form.setValue('title', title);
    if (!blog) {
      form.setValue('slug', generateSlug(title));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog title..."
                  {...field}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input placeholder="url-slug" {...field} />
              </FormControl>
              <FormDescription>
                This will be used in the blog URL
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image URL */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                    value={field.value || ''}
                    className="flex-1"
                  />
                  <label className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingImage}
                      className="whitespace-nowrap"
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload'}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, field.onChange);
                      }}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </FormControl>
              <FormDescription>
                Thumbnail image for blog listings (optional)
              </FormDescription>
              {field.value && (
                <div className="relative h-32 w-48 rounded-lg overflow-hidden border mt-2">
                  <img
                    src={field.value}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banner Image */}
        <FormField
          control={form.control}
          name="bannerUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image (Optional)</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/banner.jpg"
                    {...field}
                    value={field.value || ''}
                    className="flex-1"
                  />
                  <label className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingImage}
                      className="whitespace-nowrap"
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload'}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file, field.onChange);
                      }}
                      disabled={uploadingImage}
                    />
                  </label>
                </div>
              </FormControl>
              <FormDescription>
                Large banner image for blog header (optional, recommended: 1920x500px)
              </FormDescription>
              {field.value && (
                <div className="relative h-48 w-full rounded-lg overflow-hidden border mt-2">
                  <img
                    src={field.value}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Excerpt */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of the blog post..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This appears in blog listings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content Editor */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blog Content</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Use the toolbar above to format your content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status & Featured */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 pt-6">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                </FormControl>
                <FormLabel className="mb-0 cursor-pointer">
                  Featured Blog
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Blog'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
