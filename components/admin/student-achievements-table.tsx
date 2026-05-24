"use client";

import { useState, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Loader2, Pencil, Trash2, Plus, ToggleLeft, ToggleRight,
  Search, ChevronUp, ChevronDown, ChevronsUpDown,
  ChevronLeft, ChevronRight, Image as ImageIcon,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { CloudinaryUpload, type UploadedFile } from "@/components/shared/cloudinary-upload";
import {
  createAchievement, updateAchievement, deleteAchievement, toggleAchievementStatus,
} from "@/lib/actions/student-achievements";
import type { StudentAchievement } from "@prisma/client";

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  imageUrl: z.string().url("A valid image is required"),
  imagePublicId: z.string().min(1, "Image is required"),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});
type FormValues = z.infer<typeof formSchema>;

type SortKey = "title" | "order" | "createdAt";
type SortDir = "asc" | "desc";
const PAGE_SIZE = 10;

export function StudentAchievementsTable({ initialData }: { initialData: StudentAchievement[] }) {
  const [items, setItems] = useState<StudentAchievement[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<StudentAchievement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Upload state
  const [uploadedImage, setUploadedImage] = useState<UploadedFile | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: { title: "", description: "", imageUrl: "", imagePublicId: "", isActive: true, order: 0 },
  });

  // ── Filter + sort + paginate ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
    );
  }, [items, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let av: string | number = a[sortKey] as string | number;
      let bv: string | number = b[sortKey] as string | number;
      if (sortKey === "createdAt") { av = new Date(av as string).getTime(); bv = new Date(bv as string).getTime(); }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 inline opacity-40" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3.5 w-3.5 ml-1 inline" />
      : <ChevronDown className="h-3.5 w-3.5 ml-1 inline" />;
  }

  // ── Dialog helpers ───────────────────────────────────────────────────────────
  function openCreate() {
    setEditing(null);
    setUploadedImage(null);
    form.reset({ title: "", description: "", imageUrl: "", imagePublicId: "", isActive: true, order: items.length });
    setDialogOpen(true);
  }

  function openEdit(a: StudentAchievement) {
    setEditing(a);
    setUploadedImage({ url: a.imageUrl, publicId: a.imagePublicId });
    form.reset({ title: a.title, description: a.description, imageUrl: a.imageUrl, imagePublicId: a.imagePublicId, isActive: a.isActive, order: a.order });
    setDialogOpen(true);
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function onSubmit(values: FormValues) {
    if (!uploadedImage) { toast.error("Please upload an image."); return; }
    setSubmitting(true);
    const payload = { ...values, imageUrl: uploadedImage.url, imagePublicId: uploadedImage.publicId };
    try {
      const result = editing
        ? await updateAchievement(editing.id, payload, editing.imagePublicId)
        : await createAchievement(payload);
      if (result.success) {
        toast.success(result.message);
        setDialogOpen(false);
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string, publicId?: string | null) {
    const result = await deleteAchievement(id, publicId);
    if (result.success) {
      toast.success(result.message);
      setItems((prev) => prev.filter((a) => a.id !== id));
    } else {
      toast.error(result.message);
    }
  }

  async function handleToggle(id: string, current: boolean) {
    const result = await toggleAchievementStatus(id, !current);
    if (result.success) {
      toast.success(result.message);
      setItems((prev) => prev.map((a) => (a.id === id ? { ...a, isActive: !current } : a)));
    } else {
      toast.error(result.message);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search achievements…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* View toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted/60"}`}
            >
              Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${viewMode === "table" ? "bg-primary text-primary-foreground" : "hover:bg-muted/60"}`}
            >
              Table
            </button>
          </div>
          <Button onClick={openCreate} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Achievement
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} achievement{filtered.length !== 1 ? "s" : ""}
        {search ? ` for "${search}"` : ""}
      </p>

      {/* Grid view */}
      {viewMode === "grid" && (
        paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground text-sm">
              {search ? "No achievements match your search." : "No achievements yet."}
            </p>
            {!search && (
              <Button onClick={openCreate} variant="outline" className="mt-4" size="sm">
                <Plus className="h-4 w-4 mr-1.5" /> Add First Achievement
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginated.map((a) => (
              <Card key={a.id} className="group overflow-hidden border-border hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image src={a.imageUrl} alt={a.title} fill sizes="300px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Overlay actions */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" className="h-7 w-7 shadow" onClick={() => openEdit(a)}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" className="h-7 w-7 shadow">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete achievement?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove <strong>{a.title}</strong> and its image from Cloudinary.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(a.id, a.imagePublicId)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-2 left-2">
                    <Badge variant={a.isActive ? "default" : "secondary"} className="text-xs shadow">
                      {a.isActive ? "Live" : "Hidden"}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 -mt-0.5" onClick={() => handleToggle(a.id, a.isActive)}>
                      {a.isActive
                        ? <ToggleRight className="h-4 w-4 text-green-500" />
                        : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}

      {/* Table view */}
      {viewMode === "table" && (
        paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-muted-foreground text-sm">No achievements found.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">Image</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none" onClick={() => toggleSort("title")}>
                      Title <SortIcon col="title" />
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Description</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none hidden md:table-cell" onClick={() => toggleSort("order")}>
                      Order <SortIcon col="order" />
                    </th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginated.map((a) => (
                    <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="relative h-10 w-16 rounded-md overflow-hidden bg-muted">
                          <Image src={a.imageUrl} alt={a.title} fill sizes="64px" className="object-cover" />
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium max-w-[160px] truncate">{a.title}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground max-w-[200px] truncate">{a.description}</td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant={a.isActive ? "default" : "secondary"} className="text-xs">
                          {a.isActive ? "Live" : "Hidden"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-center">{a.order}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggle(a.id, a.isActive)}>
                            {a.isActive ? <ToggleRight className="h-4 w-4 text-green-500" /> : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(a)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete achievement?</AlertDialogTitle>
                                <AlertDialogDescription>Permanently removes <strong>{a.title}</strong> and its Cloudinary image.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(a.id, a.imagePublicId)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">Page {page} of {totalPages}</p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Achievement" : "Add New Achievement"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Image upload */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Achievement Image <span className="text-destructive">*</span></p>
                <CloudinaryUpload
                  value={uploadedImage}
                  onChange={(file) => {
                    setUploadedImage(file);
                    if (file) {
                      form.setValue("imageUrl", file.url);
                      form.setValue("imagePublicId", file.publicId);
                    } else {
                      form.setValue("imageUrl", "");
                      form.setValue("imagePublicId", "");
                    }
                  }}
                  folder="student-achievements"
                  resourceType="image"
                  shape="rectangle"
                  label="Click to upload image"
                  hint="PNG, JPG, WEBP up to 10 MB"
                  accept="image/*"
                />
              </div>

              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl><Input placeholder="e.g. Shyam scores 1530 in Digital SAT!" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl><Textarea placeholder="Describe the achievement…" rows={3} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="order" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Order</FormLabel>
                    <FormControl><Input type="number" min={0} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="isActive" render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Status</FormLabel>
                    <div className="flex items-center gap-2 h-9">
                      <button type="button" onClick={() => field.onChange(!field.value)} className="flex items-center gap-2 text-sm">
                        {field.value
                          ? <><ToggleRight className="h-5 w-5 text-green-500" /><span>Live</span></>
                          : <><ToggleLeft className="h-5 w-5 text-muted-foreground" /><span className="text-muted-foreground">Hidden</span></>}
                      </button>
                    </div>
                  </FormItem>
                )} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting || !uploadedImage}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Create Achievement"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
