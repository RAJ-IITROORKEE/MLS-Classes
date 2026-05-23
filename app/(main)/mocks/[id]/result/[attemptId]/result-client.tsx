"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  Clock3,
  ListChecks,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { MockQuestion } from "@/types/mock";

type AttemptAnswerMap = Record<string, string>;

type AttemptResult = {
  id: string;
  answers: unknown;
  score?: number | null;
  correctCount?: number | null;
  incorrectCount?: number | null;
  unansweredCount?: number | null;
  totalQuestions?: number | null;
  percentage?: number | null;
  startedAt: string | Date;
  submittedAt?: string | Date | null;
  mockTest: {
    id: string;
    title: string;
    questions: unknown;
    price: number;
  };
};

type ResultClientProps = {
  attempt: AttemptResult;
  attemptCount: number;
  initialQuestion?: number;
};

function normalizeAnswer(question: MockQuestion): string[] {
  if (!question.answer) return [];
  const clean = question.answer.replace(/["']/g, "").trim();
  if (question.type === "MSQ") {
    return clean
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        if (item.length === 1 && /[A-Z]/i.test(item)) {
          const idx = item.toUpperCase().charCodeAt(0) - 65;
          return question.options?.[idx] ?? item;
        }
        return item;
      });
  }
  if (question.type === "MCQ") {
    if (clean.length === 1 && /[A-Z]/i.test(clean)) {
      const idx = clean.toUpperCase().charCodeAt(0) - 65;
      return [question.options?.[idx] ?? clean];
    }
    return [clean];
  }
  return [clean];
}

function isCorrect(question: MockQuestion, userAnswer?: string): boolean {
  if (!userAnswer || userAnswer.trim() === "") return false;
  const correct = normalizeAnswer(question);
  const cleanUserAnswer = userAnswer.replace(/["']/g, "").trim();

  if (question.type === "MSQ") {
    const userArr = cleanUserAnswer
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
    const correctSorted = correct.slice().sort((a, b) => a.localeCompare(b));
    return (
      userArr.length === correctSorted.length &&
      userArr.every((item) => correctSorted.includes(item))
    );
  }

  if (question.type === "NAT") {
    const correctNum = Number.parseFloat(correct[0] ?? "");
    const userNum = Number.parseFloat(cleanUserAnswer);
    return (
      !Number.isNaN(correctNum) &&
      !Number.isNaN(userNum) &&
      Math.abs(correctNum - userNum) < 0.001
    );
  }

  return correct.includes(cleanUserAnswer);
}

function parseAnswers(rawAnswers: unknown): AttemptAnswerMap {
  if (!rawAnswers) return {};
  if (typeof rawAnswers === "object") {
    if (Array.isArray(rawAnswers)) return {};
    return rawAnswers as AttemptAnswerMap;
  }
  if (typeof rawAnswers === "string") {
    try {
      return JSON.parse(rawAnswers) as AttemptAnswerMap;
    } catch {
      return {};
    }
  }
  return {};
}

export function ResultClient({
  attempt,
  attemptCount,
  initialQuestion = 0,
}: ResultClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const questions = useMemo(() => {
    if (Array.isArray(attempt.mockTest.questions)) {
      return attempt.mockTest.questions as MockQuestion[];
    }
    if (typeof attempt.mockTest.questions === "string") {
      try {
        return JSON.parse(attempt.mockTest.questions) as MockQuestion[];
      } catch {
        return [];
      }
    }
    return [];
  }, [attempt.mockTest.questions]);

  const answers = useMemo(() => parseAnswers(attempt.answers), [attempt.answers]);

  const qParam = Number.parseInt(searchParams.get("q") ?? "0", 10);
  const currentQuestionIndex = Number.isNaN(qParam)
    ? Math.max(0, Math.min(initialQuestion, questions.length - 1))
    : Math.max(0, Math.min(qParam - 1, questions.length - 1));

  const totalQuestions = attempt.totalQuestions ?? questions.length;
  const correctCount =
    attempt.correctCount ??
    questions.filter((question) => isCorrect(question, answers[question.id])).length;
  const attemptedCount = Object.keys(answers).length;
  const incorrectCount =
    attempt.incorrectCount ?? Math.max(0, attemptedCount - correctCount);
  const unansweredCount =
    attempt.unansweredCount ?? Math.max(0, totalQuestions - attemptedCount);
  const scorePercentage = attempt.percentage
    ? Math.round(attempt.percentage)
    : totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

  const startedAt = new Date(attempt.startedAt);
  const submittedAt = new Date(attempt.submittedAt ?? Date.now());
  const timeTakenSeconds = Math.max(
    0,
    Math.floor((submittedAt.getTime() - startedAt.getTime()) / 1000)
  );
  const minutes = Math.floor(timeTakenSeconds / 60);
  const seconds = timeTakenSeconds % 60;

  const currentQuestion = questions[currentQuestionIndex];
  const maxAttempts = attempt.mockTest.price > 0 ? 10 : 3;
  const attemptsRemaining = Math.max(0, maxAttempts - attemptCount);

  const goToQuestion = (index: number) => {
    router.replace(`?q=${index + 1}`);
  };

  const handleReviewIncorrect = () => {
    const firstIncorrectIndex = questions.findIndex(
      (question) => !isCorrect(question, answers[question.id])
    );
    if (firstIncorrectIndex !== -1) {
      goToQuestion(firstIncorrectIndex);
    }
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-6">
      <div className="flex-1 space-y-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.push(`/mocks/${attempt.mockTest.id}/attempts`)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all attempts
        </Button>

        <Card className="border-border/60 bg-background/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Results: {attempt.mockTest.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold">{correctCount}</span>
                  <span className="text-muted-foreground">/ {totalQuestions}</span>
                </div>
                <Progress value={scorePercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {scorePercentage}% correct
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Time taken</p>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <Clock3 className="h-5 w-5 text-primary" />
                  {minutes}m {seconds}s
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Attempted</p>
                <div className="text-lg font-medium">
                  {attemptedCount} of {totalQuestions}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((attemptedCount / Math.max(totalQuestions, 1)) * 100)}% attempted
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total attempts</p>
                <div className="flex items-center gap-2 text-lg font-medium">
                  <ListChecks className="h-5 w-5 text-primary" />
                  {attemptCount} of {maxAttempts}
                </div>
                <p className="text-xs text-muted-foreground">
                  {attempt.mockTest.price > 0 ? "Paid" : "Free"} test limit
                </p>
              </div>
            </div>

            <Separator />

            {attemptsRemaining <= 0 ? (
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-700 dark:text-rose-300">
                <div className="flex items-center gap-2 font-semibold">
                  <XCircle className="h-5 w-5" />
                  Attempts exhausted
                </div>
                <p className="mt-1">
                  You have used all {maxAttempts} attempts for this mock.
                </p>
              </div>
            ) : attemptsRemaining <= 2 ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-700 dark:text-amber-300">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock3 className="h-5 w-5" />
                  Limited attempts remaining
                </div>
                <p className="mt-1">
                  You have {attemptsRemaining} attempt{attemptsRemaining > 1 ? "s" : ""} remaining.
                </p>
              </div>
            ) : null}

            <Separator />

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="border-emerald-500/30 bg-emerald-500/10">
                <CardContent className="flex items-center gap-3 p-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                  <div>
                    <p className="text-xs text-muted-foreground">Correct</p>
                    <p className="text-lg font-semibold">
                      {correctCount} ({Math.round((correctCount / Math.max(totalQuestions, 1)) * 100)}%)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-rose-500/30 bg-rose-500/10">
                <CardContent className="flex items-center gap-3 p-4">
                  <XCircle className="h-6 w-6 text-rose-600 dark:text-rose-300" />
                  <div>
                    <p className="text-xs text-muted-foreground">Incorrect</p>
                    <p className="text-lg font-semibold">
                      {incorrectCount} ({Math.round((incorrectCount / Math.max(totalQuestions, 1)) * 100)}%)
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border/60 bg-muted/40">
                <CardContent className="flex items-center gap-3 p-4">
                  <Clock3 className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Unanswered</p>
                    <p className="text-lg font-semibold">
                      {unansweredCount} ({Math.round((unansweredCount / Math.max(totalQuestions, 1)) * 100)}%)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {currentQuestion ? (
          <Card className="overflow-hidden">
            <CardHeader
              className={cn(
                "p-4",
                !answers[currentQuestion.id]
                  ? "bg-muted/40"
                  : isCorrect(currentQuestion, answers[currentQuestion.id])
                    ? "bg-emerald-500/10"
                    : "bg-rose-500/10"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <CardTitle className="text-lg">
                  <span className="text-muted-foreground">
                    Q{currentQuestionIndex + 1}:
                  </span>{" "}
                  {currentQuestion.question}
                </CardTitle>
                <Badge
                  variant={!answers[currentQuestion.id] ? "outline" : isCorrect(currentQuestion, answers[currentQuestion.id]) ? "default" : "destructive"}
                  className={cn(
                    "px-3 py-1",
                    answers[currentQuestion.id] &&
                      isCorrect(currentQuestion, answers[currentQuestion.id]) &&
                      "bg-emerald-600 text-white"
                  )}
                >
                  {!answers[currentQuestion.id]
                    ? "Unattempted"
                    : isCorrect(currentQuestion, answers[currentQuestion.id])
                      ? "Correct"
                      : "Incorrect"}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Type: <span className="font-medium">{currentQuestion.type}</span>
              </p>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              {(currentQuestion.type === "MCQ" || currentQuestion.type === "MSQ") &&
                currentQuestion.options?.length ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Options</p>
                    <div className="grid gap-2">
                      {currentQuestion.options.map((option, index) => {
                        const correct = normalizeAnswer(currentQuestion).includes(option);
                        const userSelected = answers[currentQuestion.id]
                          ?.split(";")
                          .map((item) => item.trim())
                          .includes(option);
                        return (
                          <div
                            key={`${option}-${index}`}
                            className={cn(
                              "rounded-md border p-3 text-sm",
                              correct
                                ? "border-emerald-500/40 bg-emerald-500/10"
                                : userSelected
                                  ? "border-rose-500/40 bg-rose-500/10"
                                  : "border-border/60 bg-muted/30"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-semibold">
                                {String.fromCharCode(65 + index)}.
                              </span>
                              <span>{option}</span>
                              {correct && (
                                <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />
                              )}
                              {userSelected && !correct && (
                                <XCircle className="ml-auto h-4 w-4 text-rose-600" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

              {answers[currentQuestion.id] &&
                !isCorrect(currentQuestion, answers[currentQuestion.id]) && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Correct answer</p>
                    <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
                      {normalizeAnswer(currentQuestion).join(", ")}
                    </div>
                  </div>
                )}

              {currentQuestion.explanation && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="explanation" className="border-0">
                    <AccordionTrigger className="px-0">
                      <div className="flex items-center gap-2 text-primary">
                        <BookOpenCheck className="h-4 w-4" />
                        View explanation
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-3">
                      <div className="rounded-md bg-muted/40 p-4 text-sm text-foreground">
                        {currentQuestion.explanation}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => goToQuestion(Math.max(currentQuestionIndex - 1, 0))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    goToQuestion(Math.min(currentQuestionIndex + 1, questions.length - 1))
                  }
                  disabled={currentQuestionIndex === questions.length - 1}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      <aside className="space-y-6 lg:w-72">
        <Card className="border-border/60 bg-background/80">
          <CardHeader>
            <CardTitle className="text-lg">Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const correct = isCorrect(question, userAnswer);
                const isActive = index === currentQuestionIndex;
                return (
                  <Button
                    key={question.id}
                    size="sm"
                    variant={userAnswer ? "default" : "outline"}
                    className={cn(
                      userAnswer
                        ? correct
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-rose-500 text-white hover:bg-rose-600"
                        : "border-border/60",
                      isActive && "ring-2 ring-primary"
                    )}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </div>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle className="text-lg">Times attempted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-emerald-500">{attemptCount}</p>
          </CardContent>
          <Separator />
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button variant="outline" className="gap-2" onClick={handleReviewIncorrect}>
              <ListChecks className="h-4 w-4" />
              Review incorrect
            </Button>
            <Button className="gap-2" onClick={() => router.push(`/mocks/${attempt.mockTest.id}/start`)}>
              <RotateCcw className="h-4 w-4" />
              Retake mock
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => router.push("/mocks")}>
              <ArrowLeft className="h-4 w-4" />
              Back to all mocks
            </Button>
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}
