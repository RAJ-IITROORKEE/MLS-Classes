"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Edit2,
  Loader2,
  Package,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  TrendingUp,
} from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  MockBundleFormModal,
  MockBundleFormData,
  MockOption,
} from "@/components/admin/mock-bundle-form-modal"

interface BundleRow extends MockBundleFormData {
  mocks?: { id: string; title: string; price: number; difficulty: string }[]
}

interface ApiMockRow {
  id: string
  title: string
  price: number
  difficulty: string
}

const STATUS_COLORS: Record<string, string> = {
  PUBLISHED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  DRAFT: "bg-muted text-muted-foreground",
  ARCHIVED: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
}

export default function AdminMockBundlesClient() {
  const [bundles, setBundles] = useState<BundleRow[]>([])
  const [mocks, setMocks] = useState<MockOption[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingBundle, setEditingBundle] = useState<BundleRow | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState("")

  const fetchBundles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/mock-bundles")
      const data = await res.json()
      setBundles(data.bundles ?? [])
    } catch {
      toast.error("Failed to load bundles")
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchMocks = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/mocks")
      const data = await res.json()
      const list: MockOption[] = (data.mocks as ApiMockRow[] | undefined)?.map((m) => ({
        id: m.id,
        title: m.title,
        price: m.price,
        difficulty: m.difficulty,
      })) ?? []
      setMocks(list)
    } catch {
      toast.error("Failed to load mocks list")
    }
  }, [])

  useEffect(() => {
    fetchBundles()
    fetchMocks()
  }, [fetchBundles, fetchMocks])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return bundles.filter((b) =>
      [b.title, b.description ?? ""].some((text) => text.toLowerCase().includes(q))
    )
  }, [bundles, search])

  const total = bundles.length
  const published = bundles.filter((b) => b.status === "PUBLISHED").length
  const totalMocks = bundles.reduce((sum, b) => sum + (b.mockIds?.length ?? 0), 0)
  const avgPrice =
    bundles.length > 0
      ? Math.round(
          bundles.reduce((sum, b) => sum + (b.discountedPrice ?? b.basePrice), 0) /
            bundles.length
        )
      : 0

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/mock-bundles?id=${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      toast.success("Bundle deleted")
      setDeleteId(null)
      fetchBundles()
    } catch {
      toast.error("Failed to delete bundle")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bundles", value: total, icon: Package },
          { label: "Published", value: published, icon: TrendingUp },
          { label: "Mocks Included", value: totalMocks, icon: ShoppingBag },
          { label: "Avg Bundle Price", value: avgPrice ? `₹${avgPrice}` : "—", icon: Package },
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
          <CardTitle className="text-base">All Mock Bundles</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search bundles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 w-60 text-sm"
              />
            </div>
            <Button
              size="sm"
              className="h-8 gap-1.5"
              onClick={() => {
                setEditingBundle(null)
                setModalOpen(true)
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              New Bundle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">#</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Bundle</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Mocks</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Pricing</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Status</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide">Order</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wide text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No bundles found. Create your first bundle.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((bundle, idx) => (
                    <TableRow key={bundle.id} className="hover:bg-muted/40">
                      <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                      <TableCell className="max-w-[240px]">
                        <p className="text-sm font-medium truncate">{bundle.title}</p>
                        {bundle.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {bundle.description}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <span className="font-medium tabular-nums">
                            {bundle.mockIds?.length ?? 0}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">mocks</span>
                          {bundle.mocks && bundle.mocks.length > 0 && (
                            <div className="text-xs text-muted-foreground mt-0.5 truncate">
                              {bundle.mocks.slice(0, 2).map((m) => m.title).join(" · ")}
                              {bundle.mocks.length > 2 ? " ..." : ""}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="tabular-nums">
                          <span className="font-medium">₹{bundle.basePrice}</span>
                          {bundle.discountedPrice !== null && (
                            <span className="text-xs text-muted-foreground ml-2">
                              → ₹{bundle.discountedPrice}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            STATUS_COLORS[bundle.status]
                          )}
                        >
                          {bundle.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">{bundle.order}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-primary"
                            title="Edit Bundle"
                            onClick={() => {
                              setEditingBundle(bundle)
                              setModalOpen(true)
                            }}
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            title="Delete Bundle"
                            onClick={() => setDeleteId(bundle.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <MockBundleFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingBundle(null)
        }}
        onSuccess={fetchBundles}
        initialData={editingBundle}
        mocks={mocks}
      />

      <AlertDialog open={!!deleteId} onOpenChange={(v) => !v && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Mock Bundle</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the bundle. This action cannot be undone.
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
