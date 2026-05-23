"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Plus,
  Search,
  Edit2,
  Trash2,
  Play,
  FileText,
  ClipboardList,
  TrendingUp,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { MockFormModal } from "@/components/admin/mock-form-modal"
import { cn } from "@/lib/utils"

interface MockRow {
  id: string
  title: string
  description: string | null
  price: number
  actualPrice: number | null
  duration: number | null
  difficulty: string
  status: string
  tags: string[]
  questionCount: number
  attemptCount: number
  createdAt: string
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  HARD: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  DRAFT: "bg-muted text-muted-foreground",
  ARCHIVED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

export default function AdminMocksClient() {
  const router = useRouter()
  const [mocks, setMocks] = useState<MockRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMock, setEditingMock] = useState<MockRow | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchMocks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/mocks")
      const data = await res.json()
      setMocks(data.mocks ?? [])
    } catch {
      toast.error("Failed to load mocks")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMocks()
  }, [fetchMocks])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/mocks/${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Mock deleted")
      setDeleteId(null)
      fetchMocks()
    } catch {
      toast.error("Failed to delete mock")
    } finally {
      setDeleting(false)
    }
  }

  const columns: ColumnDef<MockRow>[] = [
    {
      id: "sno",
      header: "#",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.index + 1}</span>
      ),
      size: 40,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-[200px]">
          <p className="font-medium text-sm truncate">{row.original.title}</p>
          {row.original.description && (
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {row.original.description}
            </p>
          )}
        </div>
      ),
    },
    {
      accessorKey: "questionCount",
      header: "Questions",
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">{row.original.questionCount}</span>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="tabular-nums">
          {row.original.price === 0 ? (
            <Badge variant="secondary">Free</Badge>
          ) : (
            <div className="flex items-center gap-1">
              <span className="font-medium">₹{row.original.price}</span>
              {row.original.actualPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  ₹{row.original.actualPrice}
                </span>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">
          {row.original.duration ? `${row.original.duration}m` : "—"}
        </span>
      ),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            DIFFICULTY_COLORS[row.original.difficulty]
          )}
        >
          {row.original.difficulty}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            STATUS_COLORS[row.original.status]
          )}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "attemptCount",
      header: "Attempts",
      cell: ({ row }) => (
        <span className="tabular-nums text-sm">{row.original.attemptCount}</span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            title="Play Quiz (admin preview)"
            onClick={() => router.push(`/mocks/${row.original.id}/start`)}
          >
            <Play className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            title="Edit Mock"
            onClick={() => {
              setEditingMock(row.original)
              setModalOpen(true)
            }}
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-primary"
            title="Manage Questions"
            onClick={() => router.push(`/admin/mocks/${row.original.id}`)}
          >
            <FileText className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            title="Delete Mock"
            onClick={() => setDeleteId(row.original.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: mocks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
    initialState: { pagination: { pageSize: 10 } },
  })

  // Stats
  const total = mocks.length
  const published = mocks.filter((m) => m.status === "PUBLISHED").length
  const avgQuestions =
    mocks.length > 0
      ? Math.round(mocks.reduce((s, m) => s + m.questionCount, 0) / mocks.length)
      : 0
  const totalAttempts = mocks.reduce((s, m) => s + m.attemptCount, 0)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Mocks", value: total, icon: ClipboardList },
          { label: "Published", value: published, icon: TrendingUp },
          { label: "Avg Questions", value: avgQuestions, icon: BookOpen },
          { label: "Total Attempts", value: totalAttempts, icon: Play },
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

      {/* Table Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-base">All Mock Tests</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search mocks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 w-60 text-sm"
              />
            </div>
            <Button
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => {
                setEditingMock(null)
                setModalOpen(true)
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              New Mock
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((hg) => (
                    <TableRow key={hg.id}>
                      {hg.headers.map((h) => (
                        <TableHead key={h.id} className="text-xs font-semibold uppercase tracking-wide">
                          {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                        No mocks found. Create your first mock test.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} className="hover:bg-muted/40">
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-2.5">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()} ({mocks.length} total)
                </p>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Mock Form Modal */}
      <MockFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingMock(null)
        }}
        onSuccess={fetchMocks}
        initialData={editingMock}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mock Test</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the mock test and all its attempts. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
