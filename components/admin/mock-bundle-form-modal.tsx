"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const bundleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  discountedPrice: z.number().min(0).optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
})

type BundleFormValues = z.infer<typeof bundleSchema>

export interface MockOption {
  id: string
  title: string
  price: number
  difficulty: string
}

export interface MockBundleFormData {
  id: string
  title: string
  description: string | null
  mockIds: string[]
  basePrice: number
  discountedPrice: number | null
  status: string
  order: number
}

interface MockBundleFormModalProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  mocks: MockOption[]
  initialData?: MockBundleFormData | null
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  MEDIUM: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  HARD: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function MockBundleFormModal({
  open,
  onClose,
  onSuccess,
  mocks,
  initialData,
}: MockBundleFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedMockIds, setSelectedMockIds] = useState<string[]>([])
  const isEditing = !!initialData

  const form = useForm<BundleFormValues>({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      title: "",
      description: "",
      discountedPrice: undefined,
      status: "DRAFT",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        description: initialData.description ?? "",
        discountedPrice: initialData.discountedPrice ?? undefined,
        status: initialData.status as BundleFormValues["status"],
      })
      setSelectedMockIds(initialData.mockIds ?? [])
    } else {
      form.reset({
        title: "",
        description: "",
        discountedPrice: undefined,
        status: "DRAFT",
      })
      setSelectedMockIds([])
    }
  }, [initialData, form, open])

  const selectedMocks = useMemo(
    () => mocks.filter((m) => selectedMockIds.includes(m.id)),
    [mocks, selectedMockIds]
  )

  const basePrice = useMemo(
    () => selectedMocks.reduce((sum, m) => sum + m.price, 0),
    [selectedMocks]
  )

  const discountedPrice = form.watch("discountedPrice")
  const savings =
    discountedPrice !== undefined && discountedPrice !== null && discountedPrice < basePrice
      ? basePrice - discountedPrice
      : 0
  const savingsPercent = basePrice > 0 && savings > 0 ? Math.round((savings / basePrice) * 100) : 0

  const toggleMock = (id: string) => {
    setSelectedMockIds((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  const onSubmit = async (values: BundleFormValues) => {
    if (selectedMockIds.length === 0) {
      toast.error("Select at least one mock")
      return
    }
    setLoading(true)
    try {
      const payload = {
        title: values.title,
        description: values.description?.trim() ? values.description.trim() : null,
        mockIds: selectedMockIds,
        discountedPrice: values.discountedPrice === undefined ? null : values.discountedPrice,
        status: values.status,
      }

      const res = await fetch("/api/admin/mock-bundles", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isEditing ? { id: initialData!.id, ...payload } : payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "Failed to save bundle")
      }

      toast.success(isEditing ? "Bundle updated successfully" : "Bundle created successfully")
      onSuccess()
      onClose()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Mock Bundle" : "Create Mock Bundle"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Digital SAT Full Pack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Brief summary of this bundle..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="discountedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        placeholder="e.g. 1499"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Selected Mocks</FormLabel>
              {selectedMocks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No mocks selected.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedMocks.map((mock) => (
                    <Badge key={mock.id} variant="secondary" className="gap-1 pr-1">
                      {mock.title}
                      <button
                        type="button"
                        onClick={() => toggleMock(mock.id)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-muted/30 p-3">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Base Price</p>
                  <p className="font-semibold">₹{basePrice}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Discounted Price</p>
                  <p className="font-semibold">
                    {discountedPrice !== undefined && discountedPrice !== null
                      ? `₹${discountedPrice}`
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">You Save</p>
                  <p className="font-semibold">
                    {savings > 0 ? `₹${savings} (${savingsPercent}%)` : "—"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel>Select Mocks *</FormLabel>
              {mocks.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  No mocks available. Create a mock test first.
                </div>
              ) : (
                <ScrollArea className="h-[260px] rounded-lg border">
                  <div className="grid gap-3 p-3 sm:grid-cols-2">
                    {mocks.map((mock) => {
                      const isSelected = selectedMockIds.includes(mock.id)
                      return (
                        <button
                          key={mock.id}
                          type="button"
                          onClick={() => toggleMock(mock.id)}
                          className={cn(
                            "flex flex-col gap-2 rounded-lg border p-3 text-left transition-all",
                            isSelected
                              ? "border-primary/60 bg-primary/5"
                              : "hover:border-muted-foreground/30"
                          )}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-tight line-clamp-2">
                              {mock.title}
                            </p>
                            {isSelected && <Check className="h-4 w-4 text-primary" />}
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-semibold">
                              {mock.price === 0 ? "Free" : `₹${mock.price}`}
                            </span>
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                                DIFFICULTY_COLORS[mock.difficulty] ??
                                  "bg-muted text-muted-foreground"
                              )}
                            >
                              {mock.difficulty}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {isEditing ? "Update Bundle" : "Create Bundle"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
