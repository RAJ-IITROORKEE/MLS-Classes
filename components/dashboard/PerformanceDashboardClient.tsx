"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import {
  Trophy,
  Clock,
  TrendingUp,
  Target,
  BarChart2,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface PerformanceDashboardClientProps {
  user: {
    id: string
    name: string
    email: string
  }
  overall: {
    totalAttempts: number
    avgPercentage: number
    totalCorrect: number
    totalIncorrect: number
    totalUnanswered: number
    totalTimeTaken: number
    estimatedRank: number
    attemptedMocks: number
    totalMocks: number
  }
  answerDistribution: Array<{ name: string; value: number; color: string }>
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
  perMockBreakdown: Array<{
    mockId: string
    mockTitle: string
    difficulty: string
    attempts: number
    bestScore: number
    bestPercentage: number
    avgTime: number
    lastAttemptDate: string | null
  }>
}

function getRemarks(percentage: number): { text: string; color: string } {
  if (percentage >= 80)
    return {
      text: "Excellent",
      color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
    }
  if (percentage >= 60)
    return {
      text: "Good",
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    }
  if (percentage >= 40)
    return {
      text: "Average",
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    }
  return {
    text: "Needs Improvement",
    color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }
}

function formatTime(seconds: number): string {
  if (!seconds) return "0s"
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "—"
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatChartDate(dateString: string | null): string {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function PerformanceDashboardClient({
  user,
  overall,
  answerDistribution,
  attempts,
  perMockBreakdown,
}: PerformanceDashboardClientProps) {
  // Prepare line chart data (progress over time)
  const progressData = attempts.map((a, idx) => ({
    attempt: idx + 1,
    percentage: a.percentage,
    score: a.score,
    time: a.timeTaken ? Math.floor(a.timeTaken / 60) : 0,
    date: formatChartDate(a.submittedAt),
  }))

  // Prepare bar chart data (best score per mock)
  const mockComparisonData = perMockBreakdown.map((m) => ({
    name: m.mockTitle.length > 20 ? m.mockTitle.slice(0, 20) + "..." : m.mockTitle,
    bestPercentage: m.bestPercentage,
    attempts: m.attempts,
  }))

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-800 bg-clip-text text-transparent drop-shadow-lg">
            Performance Analytics
          </h1>
          <p className="text-center text-muted-foreground mt-2">
            Track your progress and identify areas for improvement
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {/* Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Trophy className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Attempts</p>
                  <p className="text-2xl font-bold">{overall.totalAttempts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-2xl font-bold">{overall.avgPercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="text-2xl font-bold">{formatTime(overall.totalTimeTaken)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                  <Target className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Rank</p>
                  <p className="text-2xl font-bold">#{overall.estimatedRank}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Answer Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Answer Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={answerDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      stroke="none"
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                    >
                      {answerDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-4 w-4 mx-auto mb-1 text-green-600" />
                  <p className="text-xs text-muted-foreground">Correct</p>
                  <p className="text-lg font-bold text-green-700 dark:text-green-400">
                    {overall.totalCorrect}
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                  <XCircle className="h-4 w-4 mx-auto mb-1 text-red-600" />
                  <p className="text-xs text-muted-foreground">Incorrect</p>
                  <p className="text-lg font-bold text-red-700 dark:text-red-400">
                    {overall.totalIncorrect}
                  </p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <MinusCircle className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs text-muted-foreground">Unanswered</p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                    {overall.totalUnanswered}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Over Time Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Progress Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="percentage"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Score %"
                      dot={{ r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="time"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      name="Time (min)"
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mock Comparison Bar Chart (if multiple mocks) */}
        {mockComparisonData.length > 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Mock Test Comparison (Best Scores)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="bestPercentage" fill="#8b5cf6" name="Best Score %" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Per-Mock Breakdown Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Mock Test Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perMockBreakdown.map((mock) => {
              const remark = getRemarks(mock.bestPercentage)
              return (
                <Card key={mock.mockId} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-semibold text-sm line-clamp-2">{mock.mockTitle}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={cn("text-xs", remark.color)}>
                          {remark.text}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {mock.attempts} attempt{mock.attempts > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-muted-foreground">Best Score</p>
                        <p className="font-semibold text-lg">{mock.bestPercentage}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg Time</p>
                        <p className="font-semibold">{formatTime(mock.avgTime)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Attempt</p>
                        <p className="font-semibold">{formatDate(mock.lastAttemptDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Difficulty</p>
                        <p className="font-semibold capitalize">{mock.difficulty.toLowerCase()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs" asChild>
                        <Link href={`/mocks/${mock.mockId}/start`}>
                          Retake
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 h-8 text-xs gap-1" asChild>
                        <Link href={`/mocks/${mock.mockId}/attempts`}>
                          All Attempts
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="flex justify-center pt-4">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              ← Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

// Simple separator component
function Separator() {
  return <div className="h-px bg-border my-2" />
}
