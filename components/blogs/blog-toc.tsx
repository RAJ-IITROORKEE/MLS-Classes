"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface BlogTOCProps {
  headings: Heading[];
  activeHeading?: string;
}

export default function BlogTOC({ headings, activeHeading }: BlogTOCProps) {
  const [visibleHeadings, setVisibleHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // For now, just show all headings
    // Later we can add scroll detection
    setVisibleHeadings(headings.filter((h) => h.level <= 3));
  }, [headings]);

  if (visibleHeadings.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "sticky top-20 p-4 rounded-lg",
        "bg-slate-50 dark:bg-slate-900",
        "border border-slate-200 dark:border-slate-700"
      )}
    >
      <h3 className="font-semibold text-slate-900 dark:text-white mb-4 text-sm">
        Table of Contents
      </h3>

      <nav className="space-y-2 text-sm">
        {visibleHeadings.map((heading) => (
          <div
            key={heading.id}
            style={{
              marginLeft: `${(heading.level - 2) * 1}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              className={cn(
                "block py-1 px-2 rounded transition-colors",
                "text-slate-600 dark:text-slate-400",
                "hover:bg-slate-200 dark:hover:bg-slate-800",
                "hover:text-slate-900 dark:hover:text-white",
                activeHeading === heading.id
                  ? "bg-primary/10 dark:bg-primary/20 text-primary font-medium"
                  : ""
              )}
            >
              {heading.text}
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
}
