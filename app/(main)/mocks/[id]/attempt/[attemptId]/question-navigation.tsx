"use client";

import * as React from "react";
import { Bookmark, CheckCircle2, Circle, Flag, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { QuestionState, QuestionType } from "./types";

type QuestionNavigationProps = {
  states: Record<string, QuestionState>;
  questionIds: string[];
  questions: Record<string, QuestionType>;
  activeId: string;
  onNavigate: (questionId: string) => void;
  onSubmit: () => void;
  calculator?: React.ReactNode;
};

const FILTERS = [
  { key: "ALL", label: "All" },
  { key: "MCQ", label: "MCQ" },
  { key: "MSQ", label: "MSQ" },
  { key: "NAT", label: "NAT" },
  { key: "DESCRIPTIVE", label: "Descriptive" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

export function QuestionNavigation({
  states,
  questionIds,
  questions,
  activeId,
  onNavigate,
  onSubmit,
  calculator,
}: QuestionNavigationProps) {
  const [filter, setFilter] = React.useState<FilterKey>("ALL");

  const filteredIds = questionIds.filter((id) => {
    if (filter === "ALL") return true;
    return questions[id] === filter;
  });

  const visibleFilters = FILTERS.filter((item) => {
    if (item.key === "ALL") return true;
    return questionIds.some((id) => questions[id] === item.key);
  });

  const visitedCount = Object.values(states).filter((state) => state.isVisited).length;
  const answeredCount = Object.values(states).filter((state) => state.isAnswered).length;
  const bookmarkedCount = Object.values(states).filter((state) => state.isBookmarked).length;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-border/60 bg-background/70 p-4">
        <div className="mb-3 text-sm font-semibold text-foreground">
          Question palette
        </div>
        <div className="flex flex-wrap gap-2">
          {visibleFilters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition",
                filter === item.key
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {filteredIds.map((id, index) => {
            const state = states[id];
            const isActive = id === activeId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-semibold transition",
                  state?.isAnswered
                    ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300"
                    : state?.isBookmarked
                    ? "border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-300"
                    : "border-border/60 text-muted-foreground",
                  isActive && "ring-2 ring-primary/40"
                )}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-muted-foreground" />
            <span>Visited</span>
            <span className="ml-auto text-foreground">{visitedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Answered</span>
            <span className="ml-auto text-foreground">{answeredCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-amber-500" />
            <span>Bookmarked</span>
            <span className="ml-auto text-foreground">{bookmarkedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <span>Unanswered</span>
            <span className="ml-auto text-foreground">
              {Math.max(0, questionIds.length - answeredCount)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {calculator ? <div className="flex-1">{calculator}</div> : null}
        <Button size="lg" className="flex-1 gap-2" onClick={onSubmit}>
          <Flag className="h-4 w-4" />
          Submit test
        </Button>
      </div>
    </div>
  );
}
