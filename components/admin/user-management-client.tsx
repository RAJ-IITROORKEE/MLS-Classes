"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import {
  ArrowUpDown,
  Loader2,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { ADMIN_ACCESS_KEYS, USER_ROLES } from "@/lib/admin-permissions"
import { cn } from "@/lib/utils"

type ManagedUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  adminAccess: string[]
  accessLabels: string[]
  createdAt: string
}

type AccessSection = {
  key: string
  label: string
}

type SortKey = "name" | "email" | "role" | "createdAt"
type SortOrder = "asc" | "desc"
type UserFormState = {
  id?: string
  name: string
  email: string
  role: string
  adminAccess: string[]
}

const PAGE_SIZE = 10
const DEFAULT_ACCESS_SECTIONS: AccessSection[] = [
  { key: ADMIN_ACCESS_KEYS.BLOGS, label: "Blogs" },
  { key: ADMIN_ACCESS_KEYS.MOCKS, label: "Mocks" },
  { key: ADMIN_ACCESS_KEYS.TRIAL_REQUESTS, label: "Trial Requests" },
  { key: ADMIN_ACCESS_KEYS.TESTIMONIALS, label: "Testimonials" },
  { key: ADMIN_ACCESS_KEYS.STUDENT_CORNER, label: "Student Corner" },
  { key: ADMIN_ACCESS_KEYS.FAQ, label: "FAQ" },
]
const EMPTY_FORM: UserFormState = {
  name: "",
  email: "",
  role: USER_ROLES.STUDENT,
  adminAccess: [],
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value))
}

function roleBadgeClass(role: string) {
  if (role === USER_ROLES.ADMIN) return "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
  if (role === USER_ROLES.CONTENT) return "border-sky-500/40 bg-sky-500/10 text-sky-300"
  return "border-muted-foreground/30 bg-muted/40 text-muted-foreground"
}

function SortHeaderButton({
  label,
  value,
  active,
  onSort,
}: {
  label: string
  value: SortKey
  active: boolean
  onSort: (value: SortKey) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSort(value)}
      className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition hover:text-foreground"
    >
      {label}
      <ArrowUpDown className={cn("h-3 w-3", active && "text-primary")} />
    </button>
  )
}

export function UserManagementClient() {
  const [users, setUsers] = useState<ManagedUser[]>([])
  const [accessSections, setAccessSections] = useState<AccessSection[]>(DEFAULT_ACCESS_SECTIONS)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState<SortKey>("createdAt")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null)
  const [form, setForm] = useState<UserFormState>(EMPTY_FORM)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      try {
        const res = await fetch("/api/admin/user-management")
        const data = await res.json()
        if (!res.ok) throw new Error(data.error ?? "Failed to load users")
        setUsers(data.users ?? [])
        setAccessSections(data.accessSections?.length ? data.accessSections : DEFAULT_ACCESS_SECTIONS)
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Failed to load users")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase()
    const list = users.filter((user) =>
      [user.name ?? "", user.email, user.role, user.accessLabels.join(" ")].some((value) =>
        value.toLowerCase().includes(q)
      )
    )

    return [...list].sort((a, b) => {
      const aValue = sortKey === "createdAt" ? new Date(a.createdAt).getTime() : String(a[sortKey] ?? "")
      const bValue = sortKey === "createdAt" ? new Date(b.createdAt).getTime() : String(b[sortKey] ?? "")
      const comparison = typeof aValue === "number" && typeof bValue === "number"
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue))

      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [search, sortKey, sortOrder, users])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const paginatedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const contentUserCount = users.filter((user) => user.role === USER_ROLES.CONTENT).length
  const adminUserCount = users.filter((user) => user.role === USER_ROLES.ADMIN).length

  function openCreateDialog() {
    setForm(EMPTY_FORM)
    setDialogOpen(true)
  }

  function openEditDialog(user: ManagedUser) {
    setForm({
      id: user.id,
      name: user.name ?? "",
      email: user.email,
      role: user.role,
      adminAccess: user.adminAccess,
    })
    setDialogOpen(true)
  }

  function handleSort(nextSortKey: SortKey) {
    if (sortKey === nextSortKey) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(nextSortKey)
    setSortOrder(nextSortKey === "createdAt" ? "desc" : "asc")
  }

  function updateRole(role: string) {
    setForm((current) => ({
      ...current,
      role,
      adminAccess: role === USER_ROLES.CONTENT ? current.adminAccess : [],
    }))
  }

  function toggleAccess(accessKey: string) {
    setForm((current) => ({
      ...current,
      adminAccess: current.adminAccess.includes(accessKey)
        ? current.adminAccess.filter((key) => key !== accessKey)
        : [...current.adminAccess, accessKey],
    }))
  }

  async function saveUser() {
    setSaving(true)
    try {
      const payload = form.id ? { ...form, userId: form.id } : form
      const res = await fetch("/api/admin/user-management", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to save user")

      setUsers((current) =>
        form.id
          ? current.map((user) => (user.id === data.user.id ? data.user : user))
          : [data.user, ...current]
      )
      toast.success(form.id ? "User access updated" : "User added successfully")
      setDialogOpen(false)
      setForm(EMPTY_FORM)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save user")
    } finally {
      setSaving(false)
    }
  }

  async function deleteUser() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      const res = await fetch("/api/admin/user-management", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: deleteTarget.id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to delete user")

      setUsers((current) => current.filter((user) => user.id !== deleteTarget.id))
      toast.success("User deleted successfully")
      setDeleteTarget(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete user")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Total Users", value: users.length, icon: UserCog },
          { label: "Admins", value: adminUserCount, icon: ShieldCheck },
          { label: "Content Users", value: contentUserCount, icon: Pencil },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
          >
            <Card className="border-white/10 bg-card/80">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tracking-tight">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="overflow-hidden border-white/10 bg-card/80">
        <CardHeader className="gap-4 border-b border-border/60 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-lg font-black">Managed Users</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Add users and control which admin sections each content user can access.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value)
                  setPage(1)
                }}
                placeholder="Search users, role, access..."
                className="h-9 w-full pl-9 sm:w-72"
              />
            </div>
            <Button onClick={openCreateDialog} className="gap-2">
              <Plus className="h-4 w-4" />
              Add User
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
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/20">
                      <TableHead><SortHeaderButton label="Name" value="name" active={sortKey === "name"} onSort={handleSort} /></TableHead>
                      <TableHead><SortHeaderButton label="Email" value="email" active={sortKey === "email"} onSort={handleSort} /></TableHead>
                      <TableHead><SortHeaderButton label="Role" value="role" active={sortKey === "role"} onSort={handleSort} /></TableHead>
                      <TableHead>Access</TableHead>
                      <TableHead><SortHeaderButton label="Created" value="createdAt" active={sortKey === "createdAt"} onSort={handleSort} /></TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9 border border-border/70">
                                <AvatarImage src={user.image ?? undefined} />
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">{user.name ?? "Unnamed User"}</p>
                                <p className="text-xs text-muted-foreground">ID: {user.id.slice(0, 8)}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("font-bold", roleBadgeClass(user.role))}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex max-w-md flex-wrap gap-1.5">
                              {user.accessLabels.length > 0 ? (
                                user.accessLabels.map((label) => (
                                  <Badge key={label} variant="secondary" className="rounded-full text-[11px] font-semibold">
                                    {label}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">No admin access</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{formatDate(user.createdAt)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditDialog(user)}>
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                              </Button>
                              <Button variant="destructive" size="sm" onClick={() => setDeleteTarget(user)}>
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing {paginatedUsers.length} of {filteredUsers.length} users. Page {page} of {totalPages}.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => current - 1)}>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)}>
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit User Access" : "Add User"}</DialogTitle>
            <DialogDescription>
              Add the required user details and choose admin section access for content users.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="managed-user-name">Full Name</Label>
                <Input
                  id="managed-user-name"
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managed-user-email">Email</Label>
                <Input
                  id="managed-user-email"
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={updateRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={USER_ROLES.STUDENT}>STUDENT</SelectItem>
                  <SelectItem value={USER_ROLES.CONTENT}>CONTENT</SelectItem>
                  <SelectItem value={USER_ROLES.ADMIN}>ADMIN</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Students do not receive admin access. Admin users receive full access.
              </p>
            </div>

            {form.role === USER_ROLES.CONTENT && (
              <div className="rounded-2xl border border-border/70 bg-muted/20 p-4">
                <div className="mb-4">
                  <h3 className="text-sm font-black text-foreground">Content Access</h3>
                  <p className="text-xs text-muted-foreground">
                    Dashboard is included by default. Select the additional admin sections this user can open.
                  </p>
                </div>
                <div className="mb-3 flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/10 p-3">
                  <Checkbox checked disabled />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Dashboard</p>
                    <p className="text-xs text-muted-foreground">Default access for every content user.</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {accessSections.map((section) => (
                    <label
                      key={section.key}
                      className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-background/40 p-3 transition hover:border-primary/40 hover:bg-primary/5"
                    >
                      <Checkbox
                        checked={form.adminAccess.includes(section.key)}
                        onCheckedChange={() => toggleAccess(section.key)}
                      />
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{section.label}</span>
                        <span className="block text-xs text-muted-foreground">Allow this admin sidebar section.</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {form.role === USER_ROLES.ADMIN && (
              <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-200">
                This user will receive the <span className="font-black">All Access</span> badge and can manage every admin section.
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={saveUser} disabled={saving} className="gap-2">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {form.id ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deleteTarget?.name ?? deleteTarget?.email ?? "this user"} and related auth data. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(event) => { event.preventDefault(); deleteUser() }} disabled={deleting} className="gap-2">
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
