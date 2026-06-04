"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedCarouselProps {
  blogs: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl?: string | null;
    readingTime?: number | null;
    publishedAt?: string | Date | null;
    createdAt?: string | Date;
    category: { name: string; slug: string };
  }>;
}

export default function FeaturedCarousel({ blogs }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  if (blogs.length === 0) return null;

  const currentBlog = blogs[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prev) => (prev + newDirection + blogs.length) % blogs.length
    );
  };

  const publishDate = new Date(currentBlog.publishedAt || currentBlog.createdAt || new Date()).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="relative rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-950 h-96 md:h-[500px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            {currentBlog.imageUrl && (
              <Image
                src={currentBlog.imageUrl}
                alt={currentBlog.title}
                fill
                sizes="100vw"
                className="object-cover brightness-50 dark:brightness-40"
              />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
              <Link href={`/blogs/${currentBlog.slug}`} className="group">
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="inline-block">
                    <span
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-semibold",
                        "bg-slate-800/85 text-white backdrop-blur-sm"
                      )}
                    >
                      {currentBlog.category.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-slate-200 transition-colors max-w-2xl">
                    {currentBlog.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-200 text-base md:text-lg max-w-xl line-clamp-2">
                    {currentBlog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-slate-300 pt-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      <span>{publishDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{currentBlog.readingTime || 1} min read</span>
                    </div>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <span className="inline-flex items-center text-slate-200 group-hover:text-white transition-colors font-semibold">
                      Read Article
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {blogs.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className={cn(
              "absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-6",
              "z-20 p-2 md:p-3 rounded-full",
              "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "transition-all duration-200",
              "shadow-lg"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={() => paginate(1)}
            className={cn(
              "absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-6",
              "z-20 p-2 md:p-3 rounded-full",
              "bg-white dark:bg-slate-900 text-slate-900 dark:text-white",
              "hover:bg-slate-100 dark:hover:bg-slate-800",
              "transition-all duration-200",
              "shadow-lg"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {blogs.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {blogs.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white dark:bg-white w-8 h-2"
                  : "bg-white/50 dark:bg-slate-400 w-2 h-2 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
