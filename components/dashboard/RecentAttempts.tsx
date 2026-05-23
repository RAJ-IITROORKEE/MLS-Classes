"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, ArrowRight, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface RecentAttemptsProps {
  attempts: Array<{
    id: string
    mockTestId: string
    mockTitle: string
    score: number
    totalQuestions: number
    percentage: number
    correctCount: number
    incorrectCount: number
    unansweredCount: number
    submittedAt: string | null
    timeTaken: number | null
  }>
}

function getPerformanceColor(percentage: number): string {
  if (percentage >= 70) return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
  if (percentage >= 40) return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800"
  return "text-red-600 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
}

function getPerformanceBadge(percentage: number): string {
  if (percentage >= 70) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  if (percentage >= 40) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
  return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
}

function formatTime(seconds: number | null): string {
  if (!seconds) return "—"
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "—"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function RecentAttempts({ attempts }: RecentAttemptsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-4 w-4" />
          Recent Attempts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {attempts.map((attempt, idx) => {
            const colorClass = getPerformanceColor(attempt.percentage)
            const badgeClass = getPerformanceBadge(attempt.percentage)

            return (
              <div
                key={attempt.id}
                className={cn(
                  "rounded-lg border p-3 transition-colors hover:bg-muted/30",
                  colorClass
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Attempt #{idx + 1}
                      </span>
                      <Badge variant="secondary" className={cn("text-xs", badgeClass)}>
                        {attempt.percentage >= 70 ? "Excellent" : attempt.percentage >= 40 ? "Good" : "Needs Work"}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm truncate">{attempt.mockTitle}</h4>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {attempt.correctCount} correct
                      </span>
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" />
                        {attempt.incorrectCount} incorrect
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(attempt.timeTaken)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold">{attempt.percentage}%</p>
                    <p className="text-xs text-muted-foreground">
                      {attempt.score}/{attempt.totalQuestions}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(attempt.submittedAt)}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 text-xs gap-1"
                    asChild
                  >
                    <Link href={`/mocks/${attempt.mockTestId}/attempts`}>
                      View Details
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
