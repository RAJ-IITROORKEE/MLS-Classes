'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  imageUrl?: string;
  category: { name: string; color?: string };
  author?: string;
  publishedAt?: Date | string;
  readingTime?: number;
  views?: number;
  featured?: boolean;
  className?: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  imageUrl,
  category,
  author,
  publishedAt,
  readingTime,
  views,
  featured,
  className,
}: BlogCardProps) {
  const formattedDate = publishedAt
    ? format(new Date(publishedAt), 'MMM dd, yyyy')
    : '';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn('group h-full', className)}
    >
      <Link href={`/blogs/${slug}`}>
        <div className="h-full flex flex-col rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-950 hover:shadow-lg transition-shadow duration-300">
          {/* Image */}
          {imageUrl && (
            <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4 sm:p-5 flex flex-col">
            {/* Category Badge */}
            <div className="mb-3">
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  backgroundColor: category.color || '#1f2937',
                }}
              >
                {category.name}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
              {excerpt}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <span>{author || 'MLS Classes'}</span>
              {formattedDate && <span>•</span>}
              {formattedDate && <span>{formattedDate}</span>}
              {readingTime && (
                <>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </>
              )}
              {views !== undefined && views > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{views}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
