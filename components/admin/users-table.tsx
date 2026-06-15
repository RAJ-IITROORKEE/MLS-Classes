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
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  BarChart2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Loader2,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"
import { toast } from "sonner"

interface UserRow {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  createdAt: string
  totalAttempts: number
  avgPercentage: number
}

interface MonthlyStat {
  month: string
  users: number
  attempts: number
}

type SortKey = "name" | "attempts" | "avgScore" | "joined"
type SortOrder = "asc" | "desc"

function getInitials(name?: string | null) {
  if (!name) return "U"
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function formatMonthLabel(monthStr: string) {
  const [year, month] = monthStr.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString("en-US", { month: "short" })
}

const PAGE_SIZE = 10

export default function AdminUsersClient() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserRow[]>([])
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStat[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>("joined")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [roleDialogOpen, setRoleDialogOpen] = useState(false)
  const [pendingRoleChange, setPendingRoleChange] = useState<{
    userId: string
    newRole: string
    userName: string | null
  } | null>(null)
  const [updatingRole, setUpdatingRole] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/users")
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? "Failed to load")
        setUsers(data.users ?? [])
        setMonthlyStats(data.monthlyBreakdown ?? [])
        setTotalUsers(data.totalUsers ?? 0)
        setTotalAttempts(data.totalAttempts ?? 0)
      } catch {
        toast.error("Failed to load users")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const avgAttemptsPerUser =
    totalUsers > 0 ? (totalAttempts / totalUsers).toFixed(1) : "0"

  const filteredAndSorted = useMemo(() => {
    const q = search.toLowerCase()
    let list = users.filter((u) =>
      [u.name ?? "", u.email].some((text) => text.toLowerCase().includes(q))
    )

    list = [...list].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case "name":
          cmp = (a.name ?? "").localeCompare(b.name ?? "")
          break
        case "attempts":
          cmp = a.totalAttempts - b.totalAttempts
          break
        case "avgScore":
          cmp = a.avgPercentage - b.avgPercentage
          break
        case "joined":
          cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return sortOrder === "asc" ? cmp : -cmp
    })

    return list
  }, [users, search, sortKey, sortOrder])

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE))
  const paginatedUsers = filteredAndSorted.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const chartData = useMemo(() => {
    return monthlyStats.map((s) => ({
      label: formatMonthLabel(s.month),
      users: s.users,
      attempts: s.attempts,
    }))
  }, [monthlyStats])

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortOrder("desc")
    }
  }

  function sortIcon(key: SortKey) {
    if (sortKey !== key) return <span className="ml-1 text-muted-foreground opacity-40">↕</span>
    return (
      <span className="ml-1 text-primary font-bold">
        {sortOrder === "asc" ? "↑" : "↓"}
      </span>
    )
  }

  async function confirmRoleChange() {
    if (!pendingRoleChange) return
    setUpdatingRole(true)
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: pendingRoleChange.userId,
          role: pendingRoleChange.newRole,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to update role")
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === pendingRoleChange.userId
            ? { ...u, role: pendingRoleChange.newRole }
            : u
        )
      )
      toast.success(
        `Role updated for ${pendingRoleChange.userName ?? "user"} to ${pendingRoleChange.newRole}`
      )
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role")
    } finally {
      setUpdatingRole(false)
      setRoleDialogOpen(false)
      setPendingRoleChange(null)
    }
  }

  function openRoleDialog(userId: string, newRole: string, userName: string | null) {
    setPendingRoleChange({ userId, newRole, userName })
    setRoleDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: totalUsers, icon: Users },
          { label: "Total Attempts", value: totalAttempts, icon: ClipboardList },
          { label: "Avg Attempts / User", value: avgAttemptsPerUser, icon: TrendingUp },
          {
            label: "Active This Month",
            value: monthlyStats[monthlyStats.length - 1]?.attempts ?? 0,
            icon: BarChart2,
          },
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

      {/* Monthly Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No monthly data yet.
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12 }}
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar
                    dataKey="users"
                    name="New Users"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="attempts"
                    name="Attempts"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">
            Users ({filteredAndSorted.length})
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
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
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wide cursor-pointer select-none"
                      onClick={() => handleSort("name")}
                    >
                      User{sortIcon("name")}
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wide">
                      Role
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wide cursor-pointer select-none"
                      onClick={() => handleSort("attempts")}
                    >
                      Attempts{sortIcon("attempts")}
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wide cursor-pointer select-none"
                      onClick={() => handleSort("avgScore")}
                    >
                      Avg Score{sortIcon("avgScore")}
                    </TableHead>
                    <TableHead
                      className="text-xs font-semibold uppercase tracking-wide cursor-pointer select-none"
                      onClick={() => handleSort("joined")}
                    >
                      Joined{sortIcon("joined")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-10 text-muted-foreground"
                      >
                        No users found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-muted/40">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.image ?? undefined} />
                              <AvatarFallback>
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {user.name ?? "Student"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={user.role}
                            onValueChange={(val) =>
                              openRoleDialog(user.id, val, user.name)
                            }
                            disabled={updatingRole}
                          >
                            <SelectTrigger className="h-7 w-28 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="STUDENT">STUDENT</SelectItem>
                              <SelectItem value="CONTENT">CONTENT</SelectItem>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-sm tabular-nums">
                          {user.totalAttempts}
                        </TableCell>
                        <TableCell>
                          {user.totalAttempts > 0 ? (
                            <Badge variant="secondary">
                              {user.avgPercentage}%
                            </Badge>
                          ) : (
                            <span className="text-sm text-muted-foreground">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    Page {page} of {totalPages} ({filteredAndSorted.length}{" "}
                    total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Role Change Confirmation Dialog */}
      <AlertDialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Change User Role?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to change the role of{" "}
              <span className="font-semibold text-foreground">
                {pendingRoleChange?.userName ?? "this user"}
              </span>{" "}
              to{" "}
              <Badge
                variant={
                  pendingRoleChange?.newRole === "ADMIN" ? "default" : "secondary"
                }
                className="mx-1"
              >
                {pendingRoleChange?.newRole}
              </Badge>
              .
              {pendingRoleChange?.newRole === "ADMIN" && (
                <span className="block mt-2 text-destructive">
                  This will grant full admin access to the admin panel and all
                  management features.
                </span>
              )}
              {pendingRoleChange?.newRole === "CONTENT" && (
                <span className="block mt-2 text-muted-foreground">
                  This will grant limited admin access to Dashboard, Blogs, Mocks,
                  Mock Bundles, and Mock Stats only.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setPendingRoleChange(null)
                setRoleDialogOpen(false)
              }}
              disabled={updatingRole}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                confirmRoleChange()
              }}
              disabled={updatingRole}
              className="gap-2"
            >
              {updatingRole && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Confirm Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
