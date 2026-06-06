"use client";

import { useState, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Loader2, Pencil, Trash2, Plus, ToggleLeft, ToggleRight,
  Search, ChevronUp, ChevronDown, ChevronsUpDown, Star,
  ChevronLeft, ChevronRight,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { CloudinaryUpload, type UploadedFile } from "@/components/shared/cloudinary-upload";
import {
  createTestimonial, updateTestimonial, deleteTestimonial, toggleTestimonialStatus,
} from "@/lib/actions/testimonials";
import type { Testimonial } from "@prisma/client";

// ── Schema ────────────────────────────────────────────────────────────────────
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role is required"),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  text: z.string().min(10, "Testimonial must be at least 10 characters"),
  program: z.string().optional(),
  country: z.string().optional(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.coerce.number().int().min(0).default(0),
});
type FormValues = z.infer<typeof formSchema>;

// ── Helpers ───────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(/[\s']+/).filter(Boolean).slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "").join("");
}

type SortKey = "name" | "role" | "rating" | "order" | "createdAt";
type SortDir = "asc" | "desc";

const PAGE_SIZE = 10;

function SortIcon({
  col,
  sortKey,
  sortDir,
}: {
  col: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
}) {
  if (sortKey !== col) return <ChevronsUpDown className="h-3.5 w-3.5 ml-1 inline opacity-40" />;
  return sortDir === "asc"
    ? <ChevronUp className="h-3.5 w-3.5 ml-1 inline" />
    : <ChevronDown className="h-3.5 w-3.5 ml-1 inline" />;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function TestimonialsTable({ initialData }: { initialData: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("order");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [page, setPage] = useState(1);

  // Uploaded image state for the dialog
  const [uploadedImage, setUploadedImage] = useState<UploadedFile | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: { name: "", role: "", rating: 5, text: "", program: "", country: "", imageUrl: "", imagePublicId: "", isActive: true, order: 0 },
  });

  // ── Filter + sort + paginate ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.role.toLowerCase().includes(q) ||
        (t.program ?? "").toLowerCase().includes(q) ||
        (t.country ?? "").toLowerCase().includes(q)
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
    if (sortKey === key) { setSortDir((d) => (d === "asc" ? "desc" : "asc")); }
    else { setSortKey(key); setSortDir("asc"); }
    setPage(1);
  }

  // ── Dialog helpers ───────────────────────────────────────────────────────────
  function openCreate() {
    setEditing(null);
    setUploadedImage(null);
    form.reset({ name: "", role: "", rating: 5, text: "", program: "", country: "", imageUrl: "", imagePublicId: "", isActive: true, order: items.length });
    setDialogOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditing(t);
    setUploadedImage(t.imageUrl ? { url: t.imageUrl, publicId: t.imagePublicId ?? "" } : null);
    form.reset({
      name: t.name, role: t.role, rating: t.rating, text: t.text,
      program: t.program ?? "", country: t.country ?? "",
      imageUrl: t.imageUrl ?? "", imagePublicId: t.imagePublicId ?? "",
      isActive: t.isActive, order: t.order,
    });
    setDialogOpen(true);
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    const payload = {
      ...values,
      imageUrl: uploadedImage?.url ?? values.imageUrl ?? "",
      imagePublicId: uploadedImage?.publicId ?? values.imagePublicId ?? "",
    };
    try {
      const result = editing
        ? await updateTestimonial(editing.id, payload, editing.imagePublicId)
        : await createTestimonial(payload);
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
    const result = await deleteTestimonial(id, publicId);
    if (result.success) {
      toast.success(result.message);
      setItems((prev) => prev.filter((t) => t.id !== id));
    } else {
      toast.error(result.message);
    }
  }

  async function handleToggle(id: string, current: boolean) {
    const result = await toggleTestimonialStatus(id, !current);
    if (result.success) {
      toast.success(result.message);
      setItems((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: !current } : t)));
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
            placeholder="Search by name, role, program…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="pl-9"
          />
        </div>
        <Button onClick={openCreate} size="sm" className="gap-1.5 shrink-0">
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        {search ? ` for "${search}"` : ""}
      </p>

      {/* Table */}
      {paginated.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground text-sm">
            {search ? "No testimonials match your search." : "No testimonials yet."}
          </p>
          {!search && (
            <Button onClick={openCreate} variant="outline" className="mt-4" size="sm">
              <Plus className="h-4 w-4 mr-1.5" /> Add First Testimonial
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground w-12"></th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none" onClick={() => toggleSort("name")}>
                    Name <SortIcon col="name" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none hidden sm:table-cell" onClick={() => toggleSort("role")}>
                    Role <SortIcon col="role" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none hidden md:table-cell" onClick={() => toggleSort("rating")}>
                    Rating <SortIcon col="rating" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden lg:table-cell">Program</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer select-none hidden md:table-cell" onClick={() => toggleSort("order")}>
                    Order <SortIcon col="order" sortKey={sortKey} sortDir={sortDir} />
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginated.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                    {/* Avatar */}
                    <td className="px-4 py-3">
                      <div className="relative h-9 w-9 rounded-full overflow-hidden border border-border shrink-0">
                        {t.imageUrl ? (
                          <Image src={t.imageUrl} alt={t.name} fill sizes="36px" className="object-cover" />
                        ) : (
                          <Avatar className="h-9 w-9 rounded-full">
                            <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-semibold">
                              {getInitials(t.name)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium max-w-[160px] truncate">{t.name}</p>
                      <p className="text-xs text-muted-foreground max-w-[160px] truncate sm:hidden">{t.role}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{t.role}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-muted-foreground text-xs">
                      {t.program ?? "—"}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge variant={t.isActive ? "default" : "secondary"} className="text-xs">
                        {t.isActive ? "Published" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell text-muted-foreground text-center">{t.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleToggle(t.id, t.isActive)} title={t.isActive ? "Hide" : "Publish"}>
                          {t.isActive
                            ? <ToggleRight className="h-4 w-4 text-green-500" />
                            : <ToggleLeft className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(t)}>
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
                              <AlertDialogTitle>Delete testimonial?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove <strong>{t.name}</strong>&apos;s testimonial and their photo from Cloudinary. This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(t.id, t.imagePublicId)} className="bg-destructive hover:bg-destructive/90">
                                Delete
                              </AlertDialogAction>
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
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages}
          </p>
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

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Image upload */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Profile Photo</p>
                <div className="w-24">
                  <CloudinaryUpload
                    value={uploadedImage}
                    onChange={setUploadedImage}
                    folder="testimonials"
                    resourceType="image"
                    shape="circle"
                    label="Upload"
                    hint=""
                    accept="image/*"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Optional. If not uploaded, initials avatar will be shown.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name *</FormLabel>
                    <FormControl><Input placeholder="e.g. Anchal's Parents" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role *</FormLabel>
                    <FormControl><Input placeholder="e.g. Parent / Student" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="program" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program</FormLabel>
                    <FormControl><Input placeholder="e.g. Digital SAT Prep" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl><Input placeholder="e.g. USA" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="text" render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial Text *</FormLabel>
                  <FormControl><Textarea placeholder="Write the testimonial…" rows={4} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-3 gap-4">
                <FormField control={form.control} name="rating" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating *</FormLabel>
                    <Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={String(field.value)}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {[5, 4, 3, 2, 1].map((r) => (
                          <SelectItem key={r} value={String(r)}>
                            {"★".repeat(r)} ({r})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
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
                          ? <><ToggleRight className="h-5 w-5 text-green-500" /><span>Published</span></>
                          : <><ToggleLeft className="h-5 w-5 text-muted-foreground" /><span className="text-muted-foreground">Hidden</span></>}
                      </button>
                    </div>
                  </FormItem>
                )} />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={submitting}>
                  {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editing ? "Save Changes" : "Create Testimonial"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
