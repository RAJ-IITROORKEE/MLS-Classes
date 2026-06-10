"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart2,
  ClipboardList,
  Loader2,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface AttemptRow {
  id: string
  user: { id: string; name: string | null; email: string; image: string | null }
  mock: { id: string; title: string; difficulty: string }
  score: number | null
  percentage: number
  correctCount: number
  incorrectCount: number
  totalQuestions: number
  submittedAt: string | null
  startedAt: string | null
}

interface UserStat {
  user: { id: string; name: string | null; email: string; image: string | null }
  totalAttempts: number
  avgPercentage: number
  mocksAttempted: number
}

interface MockStat {
  mock: { id: string; title: string; difficulty: string }
  totalAttempts: number
  avgPercentage: number
  uniqueUsers: number
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  HARD: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

function formatPercentage(percentage: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(percentage)
}

function getInitials(name?: string | null) {
  if (!name) return "U"
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function formatDuration(start?: string | null, end?: string | null) {
  if (!start || !end) return "—"
  const startMs = new Date(start).getTime()
  const endMs = new Date(end).getTime()
  if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs < startMs) return "—"
  const minutes = Math.round((endMs - startMs) / 60000)
  if (minutes <= 0) return "<1m"
  return `${minutes}m`
}

export default function AdminMockStatsClient() {
  const [loading, setLoading] = useState(true)
  const [attempts, setAttempts] = useState<AttemptRow[]>([])
  const [userStats, setUserStats] = useState<UserStat[]>([])
  const [mockStats, setMockStats] = useState<MockStat[]>([])
  const [userSearch, setUserSearch] = useState("")
  const [mockSearch, setMockSearch] = useState("")
  const [attemptSearch, setAttemptSearch] = useState("")

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/mock-stats")
        const data = await res.json()
        setAttempts(data.attempts ?? [])
        setUserStats(data.userStats ?? [])
        setMockStats(data.mockStats ?? [])
      } catch {
        toast.error("Failed to load mock stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const totalAttempts = attempts.length
  const uniqueUsers = userStats.length
  const avgPercentage =
    totalAttempts > 0
      ? attempts.reduce((sum, a) => sum + (a.percentage ?? 0), 0) / totalAttempts
      : 0
  const totalMocks = mockStats.length

  const filteredUsers = useMemo(() => {
    const q = userSearch.toLowerCase()
    return userStats.filter((u) =>
      [u.user.name ?? "", u.user.email].some((text) => text.toLowerCase().includes(q))
    )
  }, [userStats, userSearch])

  const filteredMocks = useMemo(() => {
    const q = mockSearch.toLowerCase()
    return mockStats.filter((m) => m.mock.title.toLowerCase().includes(q))
  }, [mockStats, mockSearch])

  const filteredAttempts = useMemo(() => {
    const q = attemptSearch.toLowerCase()
    return attempts.filter((a) =>
      [
        a.user.name ?? "",
        a.user.email,
        a.mock.title,
        a.mock.difficulty,
      ].some((text) => text.toLowerCase().includes(q))
    )
  }, [attempts, attemptSearch])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Attempts", value: totalAttempts, icon: ClipboardList },
          { label: "Unique Students", value: uniqueUsers, icon: Users },
          { label: "Avg Score", value: totalAttempts ? `${formatPercentage(avgPercentage)}%` : "—", icon: TrendingUp },
          { label: "Active Mocks", value: totalMocks, icon: BarChart2 },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">User Performance</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="pl-8 h-8 w-60 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Student</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Attempts</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Avg Score</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Mocks Attempted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No user stats yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((stat) => (
                    <TableRow key={stat.user.id} className="hover:bg-muted/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={stat.user.image ?? undefined} />
                            <AvatarFallback>{getInitials(stat.user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{stat.user.name ?? "Student"}</p>
                            <p className="text-xs text-muted-foreground">{stat.user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{stat.totalAttempts}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{formatPercentage(stat.avgPercentage)}%</Badge>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{stat.mocksAttempted}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">Mock Performance</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search mocks..."
              value={mockSearch}
              onChange={(e) => setMockSearch(e.target.value)}
              className="pl-8 h-8 w-60 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Mock</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Attempts</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Avg Score</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Unique Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMocks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                      No mock stats yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMocks.map((stat) => (
                    <TableRow key={stat.mock.id} className="hover:bg-muted/40">
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{stat.mock.title}</p>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                              DIFFICULTY_COLORS[stat.mock.difficulty] ??
                                "bg-muted text-muted-foreground"
                            )}
                          >
                            {stat.mock.difficulty}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{stat.totalAttempts}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{formatPercentage(stat.avgPercentage)}%</Badge>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{stat.uniqueUsers}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">Recent Attempts</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search attempts..."
              value={attemptSearch}
              onChange={(e) => setAttemptSearch(e.target.value)}
              className="pl-8 h-8 w-60 text-sm"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Student</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Mock</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Score</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Time</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Submitted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttempts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      No attempts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAttempts.slice(0, 50).map((attempt) => (
                    <TableRow key={attempt.id} className="hover:bg-muted/40">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={attempt.user.image ?? undefined} />
                            <AvatarFallback>{getInitials(attempt.user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {attempt.user.name ?? "Student"}
                            </p>
                            <p className="text-xs text-muted-foreground">{attempt.user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{attempt.mock.title}</p>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                              DIFFICULTY_COLORS[attempt.mock.difficulty] ??
                                "bg-muted text-muted-foreground"
                            )}
                          >
                            {attempt.mock.difficulty}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm tabular-nums">
                          {attempt.score ?? 0}/{attempt.totalQuestions}
                          <Badge variant="secondary" className="ml-2">
                            {formatPercentage(attempt.percentage ?? 0)}%
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">
                        {formatDuration(attempt.startedAt, attempt.submittedAt)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {attempt.submittedAt ? new Date(attempt.submittedAt).toLocaleString() : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
