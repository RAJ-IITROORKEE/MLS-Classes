'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BlogCard from './blog-card';
import { cn } from '@/lib/utils';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
}

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  contentHtml?: string | null;
  author?: string | null;
  category: BlogCategory;
  imageUrl?: string | null;
  featured: boolean;
  readingTime?: number | null;
  views: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface BlogDetailClientProps {
  blog: BlogPostData;
  relatedBlogs?: BlogPostData[];
}

function tipTapToHtml(content: unknown): string {
  if (!content || typeof content !== 'object' || !('content' in content)) {
    return '';
  }

  const rootContent = (content as { content?: unknown[] }).content;
  if (!Array.isArray(rootContent)) {
    return '';
  }

  const renderNode = (node: unknown): string => {
    if (!node || typeof node !== 'object') {
      return '';
    }

    const typedNode = node as {
      type?: string;
      text?: string;
      attrs?: Record<string, unknown>;
      marks?: Array<{ type?: string; attrs?: Record<string, unknown> }>;
      content?: unknown[];
    };

    const children = Array.isArray(typedNode.content)
      ? typedNode.content.map(renderNode).join('')
      : '';

    switch (typedNode.type) {
      case 'paragraph':
        return `<p>${children}</p>`;
      case 'heading': {
        const level = Number(typedNode.attrs?.level || 2);
        const safeLevel = Math.min(6, Math.max(1, level));
        return `<h${safeLevel}>${children}</h${safeLevel}>`;
      }
      case 'bulletList':
        return `<ul>${children}</ul>`;
      case 'orderedList':
        return `<ol>${children}</ol>`;
      case 'listItem':
        return `<li>${children}</li>`;
      case 'blockquote':
        return `<blockquote>${children}</blockquote>`;
      case 'codeBlock':
        return `<pre><code>${children}</code></pre>`;
      case 'table':
        return `<table>${children}</table>`;
      case 'tableRow':
        return `<tr>${children}</tr>`;
      case 'tableHeader':
        return `<th>${children}</th>`;
      case 'tableCell':
        return `<td>${children}</td>`;
      case 'image': {
        const src = String(typedNode.attrs?.src || '');
        const alt = String(typedNode.attrs?.alt || '');
        return src ? `<img src="${src}" alt="${alt}" />` : '';
      }
      case 'text': {
        let text = typedNode.text || '';
        for (const mark of typedNode.marks || []) {
          if (mark.type === 'bold') text = `<strong>${text}</strong>`;
          if (mark.type === 'italic') text = `<em>${text}</em>`;
          if (mark.type === 'underline') text = `<u>${text}</u>`;
          if (mark.type === 'strike') text = `<s>${text}</s>`;
          if (mark.type === 'code') text = `<code>${text}</code>`;
          if (mark.type === 'highlight') {
            const color = String(mark.attrs?.color || '#fef08a');
            text = `<mark style="background-color:${color}">${text}</mark>`;
          }
          if (mark.type === 'textStyle' && mark.attrs?.color) {
            text = `<span style="color:${String(mark.attrs.color)}">${text}</span>`;
          }
          if (mark.type === 'link') {
            const href = String(mark.attrs?.href || '#');
            text = `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
          }
        }
        return text;
      }
      default:
        return children;
    }
  };

  return rootContent.map(renderNode).join('');
}

export default function BlogDetailClient({ blog, relatedBlogs = [] }: BlogDetailClientProps) {
  const [activeHeading] = useState<string | null>(null);

  const htmlContent = useMemo(
    () => blog.contentHtml || tipTapToHtml(blog.content),
    [blog.content, blog.contentHtml]
  );

  const formattedDate = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

  return (
    <div className="w-full bg-white dark:bg-slate-950">
      <section className="relative overflow-hidden border-b border-slate-200 pb-10 pt-16 dark:border-slate-800 md:pb-14 md:pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-100 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/blogs" className="hover:text-slate-900 dark:hover:text-white">Blogs</Link>
            <span>/</span>
            <span>{blog.category.name}</span>
          </div>

          <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            {blog.title}
          </motion.h1>

          <p className="mt-5 max-w-3xl text-lg text-slate-600 dark:text-slate-300">{blog.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <span>{blog.author || 'MLS Classes'}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />{formattedDate}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{blog.readingTime || 1} min read</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1"><Eye className="h-4 w-4" />{blog.views} views</span>
          </div>
        </div>
      </section>

      {blog.imageUrl && (
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="relative h-80 w-full md:h-[480px]">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'prose prose-slate mx-auto max-w-4xl dark:prose-invert',
              'prose-headings:font-semibold prose-h2:text-3xl prose-h3:text-2xl',
              'prose-p:leading-8 prose-a:text-slate-900 dark:prose-a:text-slate-100',
              'prose-table:my-8 prose-table:w-full prose-table:border-collapse',
              'prose-th:border prose-th:border-slate-300 prose-th:bg-slate-100 prose-th:px-3 prose-th:py-2 prose-th:text-left dark:prose-th:border-slate-700 dark:prose-th:bg-slate-900',
              'prose-td:border prose-td:border-slate-200 prose-td:px-3 prose-td:py-2 dark:prose-td:border-slate-800',
              'prose-img:rounded-xl prose-img:shadow-md prose-pre:rounded-xl',
              activeHeading ? 'scroll-smooth' : ''
            )}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>

      {relatedBlogs.length > 0 && (
        <section className="border-t border-slate-200 py-12 dark:border-slate-800 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">Related Articles</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((relatedBlog) => (
                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-slate-200 py-10 dark:border-slate-800">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <Button variant="outline" asChild>
            <Link href="/blogs" className="gap-2"><ChevronLeft className="h-4 w-4" />Back to Blogs</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blogs" className="gap-2">More Articles<ChevronRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
