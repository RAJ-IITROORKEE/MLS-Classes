'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { cn } from '@/lib/utils';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // TipTap JSON
  contentHtml?: string;
  author?: string;
  category: { id: string; name: string; slug: string; color?: string };
  categoryId: string;
  imageUrl?: string;
  featured: boolean;
  readingTime?: number;
  views: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface BlogDetailClientProps {
  blog: Blog;
  relatedBlogs?: Blog[];
}

// TipTap JSON to HTML converter (simple version)
function tipTapToHtml(content: any): string {
  if (!content || !content.content) return '';

  const renderNode = (node: any): string => {
    switch (node.type) {
      case 'paragraph':
        return `<p>${(node.content || []).map(renderNode).join('')}</p>`;
      case 'heading':
        const level = node.attrs?.level || 1;
        return `<h${level}>${(node.content || []).map(renderNode).join('')}</h${level}>`;
      case 'bulletList':
        return `<ul>${(node.content || []).map((item: any) => `<li>${renderNode(item)}</li>`).join('')}</ul>`;
      case 'orderedList':
        return `<ol>${(node.content || []).map((item: any) => `<li>${renderNode(item)}</li>`).join('')}</ol>`;
      case 'listItem':
        return `${(node.content || []).map(renderNode).join('')}`;
      case 'blockquote':
        return `<blockquote>${(node.content || []).map(renderNode).join('')}</blockquote>`;
      case 'codeBlock':
        return `<pre><code>${node.content?.[0]?.text || ''}</code></pre>`;
      case 'image':
        return `<img src="${node.attrs?.src || ''}" alt="${node.attrs?.alt || ''}" />`;
      case 'text':
        let text = node.text || '';
        if (node.marks) {
          for (const mark of node.marks) {
            if (mark.type === 'bold') text = `<strong>${text}</strong>`;
            if (mark.type === 'italic') text = `<em>${text}</em>`;
            if (mark.type === 'underline') text = `<u>${text}</u>`;
            if (mark.type === 'code') text = `<code>${text}</code>`;
            if (mark.type === 'link')
              text = `<a href="${mark.attrs?.href || '#'}">${text}</a>`;
          }
        }
        return text;
      default:
        return (node.content || []).map(renderNode).join('');
    }
  };

  return content.content.map(renderNode).join('');
}

// Extract headings from TipTap content for TOC
function extractHeadings(content: any): Array<{ level: number; text: string; id: string }> {
  if (!content || !content.content) return [];

  const headings: Array<{ level: number; text: string; id: string }> = [];
  let headingCount = 0;

  const traverse = (node: any) => {
    if (node.type === 'heading') {
      const text = node.content?.[0]?.text || `Heading ${headingCount}`;
      const id = `heading-${headingCount}`;
      headings.push({ level: node.attrs?.level || 1, text, id });
      headingCount++;
    }
    if (node.content && Array.isArray(node.content)) {
      node.content.forEach(traverse);
    }
  };

  content.content.forEach(traverse);
  return headings;
}

export default function BlogDetailClient({
  blog,
  relatedBlogs = [],
}: BlogDetailClientProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);
  const headings = extractHeadings(blog.content);

  useEffect(() => {
    // Increment view count
    const incrementViews = async () => {
      try {
        await fetch(`/api/blogs/${blog.slug}/views`, {
          method: 'POST',
        });
      } catch (err) {
        console.error('Failed to increment views:', err);
      }
    };

    incrementViews();
  }, [blog.slug]);

  const htmlContent = blog.contentHtml || tipTapToHtml(blog.content);
  const formattedDate = blog.publishedAt
    ? format(new Date(blog.publishedAt), 'MMMM dd, yyyy')
    : format(new Date(blog.createdAt), 'MMMM dd, yyyy');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-8 md:pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <Link href="/blogs" className="hover:text-slate-900 dark:hover:text-white">
              Blogs
            </Link>
            <span>/</span>
            <Link
              href={`/blogs?category=${blog.categoryId}`}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              {blog.category.name}
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{blog.title}</span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm md:text-base text-slate-600 dark:text-slate-400">
            <span>{blog.author || 'MLS Classes'}</span>
            <span>•</span>
            <span>{formattedDate}</span>
            {blog.readingTime && (
              <>
                <span>•</span>
                <span>{blog.readingTime} min read</span>
              </>
            )}
            <span>•</span>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mt-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{
                backgroundColor: blog.category.color || '#1f2937',
              }}
            >
              {blog.category.name}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.imageUrl && (
        <section className="mb-12">
          <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="mb-12 md:mb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-12">
            {/* Table of Contents */}
            {headings.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                    On this page
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        onClick={() => setActiveHeading(heading.id)}
                        className={cn(
                          'block text-sm transition-colors py-1',
                          activeHeading === heading.id
                            ? 'text-primary font-semibold'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        )}
                        style={{
                          paddingLeft: `${(heading.level - 2) * 0.75}rem`,
                        }}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="prose dark:prose-invert max-w-none
                  prose-headings:text-slate-900 dark:prose-headings:text-white
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-slate-700 dark:prose-p:text-slate-300
                  prose-a:text-primary hover:prose-a:underline
                  prose-strong:text-slate-900 dark:prose-strong:text-white
                  prose-code:bg-slate-100 dark:prose-code:bg-slate-900
                  prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950
                  prose-pre:text-slate-50 prose-pre:overflow-x-auto
                  prose-blockquote:border-l-4 prose-blockquote:border-primary
                  prose-blockquote:pl-4 prose-blockquote:italic
                  prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
                  prose-img:rounded-lg prose-img:shadow-lg
                  prose-table:border-collapse
                  prose-th:border prose-th:border-slate-300 dark:prose-th:border-slate-700
                  prose-th:bg-slate-100 dark:prose-th:bg-slate-800
                  prose-th:px-4 prose-th:py-2
                  prose-td:border prose-td:border-slate-300 dark:prose-td:border-slate-700
                  prose-td:px-4 prose-td:py-2"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} {...relatedBlog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next/Previous Navigation */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Previous Article
            </Button>
            <Button variant="outline" className="gap-2">
              Next Article
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
