"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Clock3,
  Flag,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { CalculatorDialog } from "./calculator-dialog";
import { QuestionNavigation } from "./question-navigation";
import { QuestionRenderer } from "./question-renderer";
import type {
  AttemptAnswerMap,
  AttemptQuestion,
  QuestionState,
} from "./types";

type AttemptClientProps = {
  attemptId: string;
  startedAt: string;
  mock: {
    id: string;
    title: string;
    description: string | null;
    duration: number | null;
    questionCount: number;
    questions: AttemptQuestion[];
  };
  access: {
    attemptsRemaining: number;
    attemptsLimit: number;
  } | null;
};

const typeLabel: Record<AttemptQuestion["type"], string> = {
  MCQ: "MCQ",
  MSQ: "MSQ",
  NAT: "NAT",
  DESCRIPTIVE: "Descriptive",
};

function formatTime(totalSeconds: number) {
  const clamped = Math.max(0, totalSeconds);
  const hours = Math.floor(clamped / 3600);
  const minutes = Math.floor((clamped % 3600) / 60);
  const seconds = clamped % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function AttemptClient({ attemptId, startedAt, mock, access }: AttemptClientProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<AttemptAnswerMap>({});
  const [states, setStates] = useState<Record<string, QuestionState>>(() => {
    return Object.fromEntries(
      mock.questions.map((question) => [
        question.id,
        { isVisited: false, isAnswered: false, isBookmarked: false },
      ])
    );
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const autoSubmittedRef = useRef(false);
  const previousThemeRef = useRef<string | undefined>(undefined);
  const { theme, setTheme } = useTheme();

  const activeQuestion = mock.questions[activeIndex];
  const questionIds = useMemo(
    () => mock.questions.map((question) => question.id),
    [mock.questions]
  );
  const questionTypeMap = useMemo(() => {
    return Object.fromEntries(
      mock.questions.map((question) => [question.id, question.type])
    );
  }, [mock.questions]);

  useEffect(() => {
    if (!activeQuestion) return;
    setStates((prev) => ({
      ...prev,
      [activeQuestion.id]: {
        ...prev[activeQuestion.id],
        isVisited: true,
      },
    }));
  }, [activeQuestion]);

  useEffect(() => {
    // Capture the current theme once on mount, then force light mode.
    // Empty deps array is intentional — re-running on every theme change
    // would cause an infinite loop (setTheme → theme changes → effect fires again).
    previousThemeRef.current = theme ?? "system";
    setTheme("light");
    return () => {
      if (previousThemeRef.current) {
        setTheme(previousThemeRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — run only on mount/unmount

  useEffect(() => {
    if (!mock.duration) {
      setTimeLeft(null);
      return;
    }
    const start = new Date(startedAt).getTime();
    const endTime = start + mock.duration * 60 * 1000;

    function tick() {
      const remaining = Math.ceil((endTime - Date.now()) / 1000);
      setTimeLeft(remaining);
      if (remaining <= 0 && !autoSubmittedRef.current) {
        autoSubmittedRef.current = true;
        submitAttempt();
      }
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [mock.duration, startedAt]);

  const attemptedCount = Object.values(states).filter((state) => state.isAnswered).length;
  const bookmarkedCount = Object.values(states).filter((state) => state.isBookmarked).length;
  const visitedCount = Object.values(states).filter((state) => state.isVisited).length;

  function updateAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isAnswered: value.trim().length > 0,
      },
    }));
  }

  function clearAnswer(questionId: string) {
    updateAnswer(questionId, "");
  }

  function toggleBookmark(questionId: string) {
    setStates((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        isBookmarked: !prev[questionId]?.isBookmarked,
      },
    }));
  }

  function handleNavigate(questionId: string) {
    const nextIndex = questionIds.findIndex((id) => id === questionId);
    if (nextIndex >= 0) {
      setActiveIndex(nextIndex);
    }
  }

  async function submitAttempt() {
    setIsSubmitting(true);
    setError(null);
    try {
      const timeSpent = mock.duration
        ? Math.max(0, mock.duration * 60 - (timeLeft ?? mock.duration * 60))
        : null;
      const response = await fetch(`/api/mock/${mock.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          answers,
          timeSpent,
          totalQuestions: mock.questionCount,
        }),
      });

      if (response.status === 409) {
        // Already submitted — redirect to result
        router.push(`/mocks/${mock.id}/result/${attemptId}`);
        return;
      }

      if (!response.ok) {
        setError("Failed to submit attempt. Please try again.");
        setIsSubmitting(false);
        return;
      }

      router.push(`/mocks/${mock.id}/result/${attemptId}`);
    } catch {
      setError("Failed to submit attempt. Please try again.");
      setIsSubmitting(false);
    }
  }

  function handleSubmit() {
    if (isSubmitting) return;
    setSubmitOpen(true);
  }

  function toggleActiveBookmark() {
    if (!activeQuestion) return;
    toggleBookmark(activeQuestion.id);
  }

  if (!activeQuestion) {
    return null;
  }

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-8">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Live Mock Attempt
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {mock.title}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <StatusPill label="Attempted" value={`${attemptedCount}/${mock.questionCount}`} />
              <StatusPill label="Visited" value={`${visitedCount}/${mock.questionCount}`} />
              <StatusPill label="Bookmarked" value={String(bookmarkedCount)} />
              <StatusPill
                label="Time Left"
                value={mock.duration ? formatTime(timeLeft ?? 0) : "Untimed"}
                highlight={timeLeft !== null && timeLeft <= 300}
                icon={<Clock3 className="h-4 w-4" />}
              />
            </div>
          </header>

          <div className="rounded-xl border border-border/60 bg-background/70 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <AlertCircle className="h-4 w-4" />
                <span>Stay focused. Attempt all questions before time ends.</span>
              </div>
              <Button
                type="button"
                size="sm"
                variant={states[activeQuestion.id]?.isBookmarked ? "default" : "outline"}
                onClick={toggleActiveBookmark}
                className="gap-2"
              >
                <Bookmark className="h-4 w-4" />
                {states[activeQuestion.id]?.isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-foreground"
                style={{
                  width: `${Math.min(100, (attemptedCount / Math.max(mock.questionCount, 1)) * 100)}%`,
                }}
              />
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <Card className="border-border/60 bg-background/80 shadow-sm">
                <CardHeader className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-muted-foreground">
                      Question {activeIndex + 1} of {mock.questionCount}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{typeLabel[activeQuestion.type]}</Badge>
                      {states[activeQuestion.id]?.isBookmarked && (
                        <Badge className="bg-amber-500/10 text-amber-600">Bookmarked</Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-base text-foreground">
                    {activeQuestion.question}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <QuestionRenderer
                    question={activeQuestion}
                    answerMap={answers}
                    onAnswerChange={updateAnswer}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => clearAnswer(activeQuestion.id)}
                      >
                        Clear response
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={activeIndex === 0}
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          setActiveIndex((prev) => Math.min(prev + 1, mock.questionCount - 1))
                        }
                        disabled={activeIndex === mock.questionCount - 1}
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {error && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <Card className="border-border/60 bg-background/80 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Attempt summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Attempted</span>
                    <span className="font-semibold text-foreground">
                      {attemptedCount} / {mock.questionCount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bookmarks</span>
                    <span className="font-semibold text-foreground">{bookmarkedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Attempts remaining</span>
                    <span className={cn("font-semibold", access?.attemptsRemaining === 0 && "text-destructive")}>
                      {access?.attemptsLimit ? access.attemptsRemaining : "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-foreground/60" />
                    {access?.attemptsLimit
                      ? `Attempt limit: ${access.attemptsLimit}`
                      : "Attempt limits apply based on mock access."}
                  </div>
                </CardContent>
              </Card>

              <QuestionNavigation
                states={states}
                questionIds={questionIds}
                questions={questionTypeMap}
                activeId={activeQuestion.id}
                onNavigate={handleNavigate}
                onSubmit={handleSubmit}
                calculator={<CalculatorDialog />}
              />

              <Button variant="outline" className="w-full" asChild>
                <Link href="/mocks">Exit attempt</Link>
              </Button>
            </aside>
          </div>
        </div>
      </div>

      <AlertDialog open={submitOpen} onOpenChange={setSubmitOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your mock?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {attemptedCount} of {mock.questionCount} questions.
              You can still review your answers before submitting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review again</AlertDialogCancel>
            <AlertDialogAction
              onClick={submitAttempt}
              className="gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Flag className="h-4 w-4" />}
              Submit now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

function StatusPill({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        highlight
          ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
          : "border-border/60 bg-background/70 text-foreground"
      )}
    >
      {icon ? <span className="text-foreground/70">{icon}</span> : null}
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
