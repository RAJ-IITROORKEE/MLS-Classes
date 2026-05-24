"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2, Plus, ToggleLeft, ToggleRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createFAQ, updateFAQ, deleteFAQ, toggleFAQStatus } from "@/lib/actions/faq";
import type { FAQ } from "@prisma/client";

const faqFormSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().min(10, "Answer must be at least 10 characters"),
  order: z.coerce.number().int().min(0),
  isActive: z.boolean(),
});

type FAQFormValues = z.infer<typeof faqFormSchema>;

interface FAQTableProps {
  initialFaqs: FAQ[];
}

export function FAQTable({ initialFaqs }: FAQTableProps) {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FAQFormValues>({
    resolver: zodResolver(faqFormSchema) as Resolver<FAQFormValues>,
    defaultValues: { question: "", answer: "", order: 0, isActive: true },
  });

  function openCreate() {
    setEditingFaq(null);
    form.reset({ question: "", answer: "", order: faqs.length, isActive: true });
    setDialogOpen(true);
  }

  function openEdit(faq: FAQ) {
    setEditingFaq(faq);
    form.reset({
      question: faq.question,
      answer: faq.answer,
      order: faq.order,
      isActive: faq.isActive,
    });
    setDialogOpen(true);
  }

  async function onSubmit(values: FAQFormValues) {
    setIsSubmitting(true);
    try {
      const result = editingFaq
        ? await updateFAQ(editingFaq.id, values)
        : await createFAQ(values);

      if (result.success) {
        toast.success(result.message);
        setDialogOpen(false);
        // Refresh list by reloading
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    const result = await deleteFAQ(id);
    if (result.success) {
      toast.success(result.message);
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    } else {
      toast.error(result.message);
    }
  }

  async function handleToggle(id: string, current: boolean) {
    const result = await toggleFAQStatus(id, !current);
    if (result.success) {
      toast.success(result.message);
      setFaqs((prev) =>
        prev.map((f) => (f.id === id ? { ...f, isActive: !current } : f))
      );
    } else {
      toast.error(result.message);
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {faqs.length} FAQ{faqs.length !== 1 ? "s" : ""} total
        </p>
        <Button onClick={openCreate} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          Add FAQ
        </Button>
      </div>

      {/* Table */}
      {faqs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-muted-foreground text-sm">No FAQs yet.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4" size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            Add First FAQ
          </Button>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground w-8">#</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Question</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden md:table-cell">Answer Preview</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground hidden sm:table-cell">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {faqs
                .sort((a, b) => a.order - b.order)
                .map((faq) => (
                  <tr key={faq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-muted-foreground">{faq.order}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium max-w-xs truncate">{faq.question}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-muted-foreground max-w-sm truncate">
                        {faq.answer}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <Badge
                        variant={faq.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {faq.isActive ? "Published" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggle(faq.id, faq.isActive)}
                          title={faq.isActive ? "Hide FAQ" : "Publish FAQ"}
                          className="h-8 w-8"
                        >
                          {faq.isActive ? (
                            <ToggleRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(faq)}
                          className="h-8 w-8"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this FAQ from the website. This
                                action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(faq.id)}
                                className="bg-destructive hover:bg-destructive/90"
                              >
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
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the question..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the answer..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Status</FormLabel>
                      <div className="flex items-center gap-2 h-9">
                        <button
                          type="button"
                          onClick={() => field.onChange(!field.value)}
                          className="flex items-center gap-2 text-sm"
                        >
                          {field.value ? (
                            <>
                              <ToggleRight className="h-5 w-5 text-green-500" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="h-5 w-5 text-muted-foreground" />
                              <span className="text-muted-foreground">Hidden</span>
                            </>
                          )}
                        </button>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingFaq ? "Save Changes" : "Create FAQ"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
