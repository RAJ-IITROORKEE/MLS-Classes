"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Clock3, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type AttemptRecord = {
  id: string;
  score: number | null;
  correctCount: number | null;
  incorrectCount: number | null;
  unansweredCount: number | null;
  totalQuestions: number | null;
  percentage: number | null;
  startedAt: Date | string;
  submittedAt: Date | string | null;
  mockTest: {
    id: string;
    title: string;
  };
};

type MockAttemptsClientProps = {
  attempts: AttemptRecord[];
};

function formatDate(value: Date | string | null | undefined) {
  if (!value) return "-";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTimeTaken(startedAt: Date | string, submittedAt: Date | string | null) {
  if (!submittedAt) return "-";
  const start = typeof startedAt === "string" ? new Date(startedAt) : startedAt;
  const end = typeof submittedAt === "string" ? new Date(submittedAt) : submittedAt;
  const seconds = Math.max(0, Math.floor((end.getTime() - start.getTime()) / 1000));
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

function scoreLabel(percentage: number | null | undefined) {
  if (percentage === null || percentage === undefined) return "Pending";
  if (percentage >= 80) return "Excellent";
  if (percentage >= 60) return "Good";
  if (percentage >= 40) return "Average";
  return "Needs work";
}

function formatPercentage(percentage: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(percentage);
}

export function MockAttemptsClient({ attempts }: MockAttemptsClientProps) {
  const mockTitle = attempts[0]?.mockTest?.title ?? "Mock attempts";
  const mockId = attempts[0]?.mockTest?.id ?? "";

  const summary = useMemo(() => {
    const totalAttempts = attempts.length;
    const bestScore = Math.max(
      ...attempts.map((attempt) => attempt.percentage ?? 0),
      0
    );
    const avgScore =
      attempts.reduce((sum, attempt) => sum + (attempt.percentage ?? 0), 0) /
      Math.max(totalAttempts, 1);
    return { totalAttempts, bestScore, avgScore };
  }, [attempts]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/mocks">
            <ArrowLeft className="h-4 w-4" />
            Back to all mocks
          </Link>
        </Button>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Attempt history
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {mockTitle}
          </h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/60 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Attempts
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {summary.totalAttempts}
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Best Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatPercentage(summary.bestScore)}%
          </CardContent>
        </Card>
        <Card className="border-border/60 bg-background/80">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {formatPercentage(summary.avgScore)}%
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {attempts.map((attempt, index) => {
          const percentage = attempt.percentage ?? 0;
          return (
            <Card
              key={attempt.id}
              className="border-border/60 bg-background/80 shadow-sm"
            >
              <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Attempt {index + 1}</Badge>
                    <Badge
                      className={cn(
                        "text-xs",
                        percentage >= 80
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                          : percentage >= 60
                            ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
                            : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                      )}
                    >
                      {scoreLabel(percentage)}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold">
                    Score: {attempt.correctCount ?? 0} / {attempt.totalQuestions ?? 0}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ListChecks className="h-4 w-4" /> {formatPercentage(percentage)}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-4 w-4" />
                      {formatTimeTaken(attempt.startedAt, attempt.submittedAt)}
                    </span>
                    <span>{formatDate(attempt.submittedAt)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/mocks/${mockId}/result/${attempt.id}`}>View result</Link>
                  </Button>
                  <Button asChild>
                    <Link href={`/mocks/${mockId}/result/${attempt.id}?q=1`}>
                      Review answers
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
