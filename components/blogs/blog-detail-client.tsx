"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  CalendarDays,
  User,
  Share2,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { BlogPost } from "@/lib/blog-data";
import BlogTOC from "./blog-toc";
import RelatedBlogs from "./related-blogs";
import { cn } from "@/lib/utils";

interface BlogDetailClientProps {
  blog: BlogPost;
  relatedBlogs: BlogPost[];
}

export default function BlogDetailClient({
  blog,
  relatedBlogs,
}: BlogDetailClientProps) {
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [showTOC, setShowTOC] = useState(true);

  const publishDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Extract headings from content
  const extractHeadings = (html: string) => {
    const headings: Array<{ id: string; level: number; text: string }> = [];
    const regex = /#+ (.+)/g;
    let match;
    let count = 0;

    while ((match = regex.exec(html)) !== null) {
      const level = match[0].match(/#/g)?.length || 1;
      const text = match[1].trim();
      const id = `heading-${count}`;
      headings.push({ id, level, text });
      count++;
    }

    return headings;
  };

  const headings = extractHeadings(blog.content);

  // Convert markdown to HTML (simple version)
  const renderContent = (content: string) => {
    return content
      .split("\n")
      .map((line, idx) => {
        if (line.startsWith("# ")) {
          return (
            <h2
              key={idx}
              className="text-3xl font-bold text-slate-900 dark:text-white mt-8 mb-4"
            >
              {line.replace("# ", "")}
            </h2>
          );
        } else if (line.startsWith("## ")) {
          return (
            <h3
              key={idx}
              className="text-2xl font-bold text-slate-900 dark:text-white mt-6 mb-3"
            >
              {line.replace("## ", "")}
            </h3>
          );
        } else if (line.startsWith("### ")) {
          return (
            <h4
              key={idx}
              className="text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2"
            >
              {line.replace("### ", "")}
            </h4>
          );
        } else if (line.startsWith("- ")) {
          return (
            <li
              key={idx}
              className="text-slate-700 dark:text-slate-300 ml-4 list-disc"
            >
              {line.replace("- ", "")}
            </li>
          );
        } else if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <strong key={idx} className="font-bold text-slate-900 dark:text-white">
              {line.replace(/\*\*/g, "")}
            </strong>
          );
        } else if (line.trim() === "") {
          return <div key={idx} className="h-4" />;
        } else {
          return (
            <p
              key={idx}
              className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4"
            >
              {line}
            </p>
          );
        }
      });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-950 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blogs"
            className={cn(
              "inline-flex items-center gap-2 text-slate-600 dark:text-slate-400",
              "hover:text-slate-900 dark:hover:text-white transition-colors"
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium">
              {blog.category.name}
            </span>
            <span className="text-slate-600 dark:text-slate-400">•</span>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {publishDate}
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Excerpt */}
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-3xl">
            {blog.excerpt}
          </p>

          {/* Author & Reading Time */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {blog.author?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {blog.author}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Author
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{blog.readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <span className="text-sm">{publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {blog.imageUrl && (
        <div className="relative h-96 md:h-[500px] bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-950 py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Sidebar - TOC + Related Articles (stacked) */}
            <div className="hidden lg:flex lg:col-span-1 flex-col gap-8">
              {/* TOC */}
              {headings.length > 0 && (
                <div>
                  <BlogTOC headings={headings} activeHeading={activeHeading} />
                </div>
              )}

              {/* Related Blogs */}
              {relatedBlogs.length > 0 && (
                <div>
                  <RelatedBlogs blogs={relatedBlogs} />
                </div>
              )}
            </div>

            {/* Main Content - Larger space */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <article className="prose dark:prose-invert prose-slate max-w-none">
                <div className="space-y-6">{renderContent(blog.content)}</div>
              </article>

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <p className="font-semibold text-slate-900 dark:text-white mb-4">
                  Share this article
                </p>
                <div className="flex gap-4">
                  {["Facebook", "Twitter", "LinkedIn"].map((social) => (
                    <button
                      key={social}
                      className={cn(
                        "px-4 py-2 rounded-lg border transition-colors",
                        "border-slate-300 dark:border-slate-600",
                        "text-slate-700 dark:text-slate-300",
                        "hover:bg-slate-100 dark:hover:bg-slate-900"
                      )}
                    >
                      <Share2 className="w-4 h-4 inline mr-2" />
                      {social}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/blogs" className="block p-4 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                    <p className="text-sm text-slate-600 dark:text-slate-400">← Previous</p>
                    <p className="font-semibold text-slate-900 dark:text-white truncate">Back to Blogs</p>
                  </Link>
                  <Link href="/blogs" className="block p-4 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-right">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Next →</p>
                    <p className="font-semibold text-slate-900 dark:text-white truncate">More Articles</p>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Blogs Section (Mobile) */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 lg:hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/${blog.slug}`}
                  className="group p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-1">
                    {blog.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-slate-900 dark:bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to apply these strategies?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Start practicing with our comprehensive mock tests and track your progress with detailed analytics.
          </p>
          <Link
            href="/mocks"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-100 transition-colors"
          >
            Start Practicing
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
