"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Plus,
  Trash2,
  Edit2,
  Loader2,
  ArrowLeft,
  Upload,
  FileText,
  AlertTriangle,
  CheckCircle2,
  List,
  CheckSquare,
  Type,
  AlignLeft,
  Image as ImageIcon,
  X,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import type { MockQuestion } from "@/types/mock"
import { nanoid } from "nanoid"
import { cn } from "@/lib/utils"

const optionLabels = ["A", "B", "C", "D", "E", "F"]
const MAX_QUESTION_IMAGE_SIZE = 1024 * 1024

const questionSchema = z.object({
  question: z.string().min(1, "Question text is required"),
  type: z.enum(["MCQ", "MSQ", "NAT", "DESCRIPTIVE"]),
  options: z.array(z.string()).default([]),
  answer: z.string().min(1, "Correct answer is required"),
  msqAnswers: z.array(z.string()).default([]),
  explanation: z.string().optional(),
  imageUrl: z.string().optional(),
  marks: z.coerce.number().min(0).default(1),
})

type QuestionFormValues = z.infer<typeof questionSchema>

interface QuestionEditorProps {
  mockId: string
}

const typeConfig = {
  MCQ: {
    label: "MCQ",
    desc: "Single Correct",
    color: "bg-primary/10 text-primary dark:bg-primary/20",
    icon: List,
  },
  MSQ: {
    label: "MSQ",
    desc: "Multi Correct",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: CheckSquare,
  },
  NAT: {
    label: "NAT",
    desc: "Numerical",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: Type,
  },
  DESCRIPTIVE: {
    label: "DESC",
    desc: "Descriptive",
    color: "bg-primary/10 text-primary dark:bg-primary/20",
    icon: AlignLeft,
  },
}

// ─── CSV Parser ────────────────────────────────────────────────────────────────
function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let current = ""
  let inQuotes = false
  const row: string[] = []

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (char === '"' && inQuotes && next === '"') {
      current += '"'
      i++
    } else if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim())
      current = ""
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i++
      row.push(current.trim())
      rows.push([...row])
      row.length = 0
      current = ""
    } else {
      current += char
    }
  }
  if (current || row.length > 0) {
    row.push(current.trim())
    rows.push([...row])
  }
  return rows
}

export default function QuestionEditor({ mockId }: QuestionEditorProps) {
  const [questions, setQuestions] = useState<MockQuestion[]>([])
  const [mockTitle, setMockTitle] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [csvModalOpen, setCsvModalOpen] = useState(false)

  // CSV state
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvUploading, setCsvUploading] = useState(false)
  const [csvErrors, setCsvErrors] = useState<string[]>([])
  const [csvSuccess, setCsvSuccess] = useState<number | null>(null)
  const [questionImageUploading, setQuestionImageUploading] = useState(false)

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      answer: "",
      msqAnswers: [],
      explanation: "",
      imageUrl: "",
      marks: 1,
    },
  })

  const questionType = useWatch({ control: form.control, name: "type" })
  const options = useWatch({ control: form.control, name: "options" })
  const msqAnswers = useWatch({ control: form.control, name: "msqAnswers" })

  const fetchMock = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/mocks/${mockId}`)
      const data = await res.json()
      if (data.mock) {
        setMockTitle(data.mock.title)
        setQuestions((data.mock.questions as MockQuestion[]) ?? [])
      }
    } catch {
      toast.error("Failed to load mock")
    } finally {
      setLoading(false)
    }
  }, [mockId])

  useEffect(() => {
    queueMicrotask(() => {
      void fetchMock()
    })
  }, [fetchMock])

  const saveQuestions = async (newQuestions: MockQuestion[]) => {
    setSaving(true)
    try {
      const res = await fetch("/api/admin/mocks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: mockId, questions: newQuestions }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error ?? "Failed to save")
      }
      setQuestions(newQuestions)
      toast.success("Questions saved")
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to save questions")
    } finally {
      setSaving(false)
    }
  }

  const openCreateModal = () => {
    form.reset({
      question: "",
      type: "MCQ",
      options: ["", "", "", ""],
      answer: "",
      msqAnswers: [],
      explanation: "",
      imageUrl: "",
      marks: 1,
    })
    setEditingIndex(null)
    setModalOpen(true)
  }

  const openEditModal = (idx: number) => {
    const q = questions[idx]
    // Parse msqAnswers from semicolons in stored answer
    const msqParsed =
      q.type === "MSQ" && typeof q.answer === "string"
        ? q.answer.split(";").map((s) => s.trim()).filter(Boolean)
        : []

    form.reset({
      question: q.question,
      type: q.type,
      options: q.options?.length ? q.options : ["", "", "", ""],
      answer: q.type === "MSQ" ? "" : q.answer,
      msqAnswers: msqParsed,
      explanation: q.explanation ?? "",
      imageUrl: q.imageUrl ?? "",
      marks: q.marks ?? 1,
    })
    setEditingIndex(idx)
    setModalOpen(true)
  }

  const handleTypeChange = (newType: string) => {
    const currentOptions = form.getValues("options")
    if (newType === "NAT" || newType === "DESCRIPTIVE") {
      form.setValue("options", [])
    } else if (currentOptions.length < 2) {
      form.setValue("options", ["", "", "", ""])
    }
    form.setValue("answer", "")
    form.setValue("msqAnswers", [])
    form.setValue("type", newType as QuestionFormValues["type"])
  }

  const onSubmit = (values: QuestionFormValues) => {
    // Build final answer
    let finalAnswer = values.answer
    if (values.type === "MSQ") {
      if (values.msqAnswers.length === 0) {
        toast.error("Select at least one correct answer for MSQ")
        return
      }
      finalAnswer = values.msqAnswers.join(";")
    }

    const question: MockQuestion = {
      id: editingIndex !== null ? questions[editingIndex].id : nanoid(),
      question: values.question,
      type: values.type,
      options: ["MCQ", "MSQ"].includes(values.type)
        ? values.options.filter((o) => o.trim() !== "")
        : [],
      answer: finalAnswer,
      explanation: values.explanation || undefined,
      imageUrl: values.imageUrl?.trim() || undefined,
      marks: values.marks,
    }

    const updated = [...questions]
    if (editingIndex !== null) {
      updated[editingIndex] = question
    } else {
      updated.push(question)
    }

    saveQuestions(updated)
    setModalOpen(false)
  }

  const handleDelete = async () => {
    if (deleteIndex === null) return
    const updated = questions.filter((_, i) => i !== deleteIndex)
    await saveQuestions(updated)
    setDeleteIndex(null)
  }

  const handleClearAll = async () => {
    await saveQuestions([])
    setClearDialogOpen(false)
  }

  // ─── MSQ toggle ──────────────────────────────────────────────────────────────
  const toggleMsqAnswer = (optionText: string) => {
    const current = form.getValues("msqAnswers")
    if (current.includes(optionText)) {
      form.setValue("msqAnswers", current.filter((a) => a !== optionText))
    } else {
      form.setValue("msqAnswers", [...current, optionText])
    }
  }

  const handleQuestionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""

    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file")
      return
    }

    if (file.size > MAX_QUESTION_IMAGE_SIZE) {
      toast.error("Question image must be 1 MB or smaller")
      return
    }

    setQuestionImageUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "mock-questions")
      formData.append("resourceType", "image")
      formData.append("maxSizeMb", "1")

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Failed to upload image")
      }

      form.setValue("imageUrl", data.url, { shouldDirty: true, shouldValidate: true })
      toast.success("Question image uploaded")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setQuestionImageUploading(false)
    }
  }

  // ─── CSV Upload ───────────────────────────────────────────────────────────────
  const handleCsvFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCsvFile(file)
    setCsvErrors([])
    setCsvSuccess(null)
    e.target.value = ""
  }

  const handleCsvUpload = async () => {
    if (!csvFile) return
    setCsvUploading(true)
    setCsvErrors([])
    setCsvSuccess(null)

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string
        const rows = parseCSV(text)
        if (rows.length < 2) {
          setCsvErrors(["CSV file appears empty or has only headers."])
          setCsvUploading(false)
          return
        }

        const headers = rows[0].map((h) => h.toLowerCase().trim())
        const qIdx = headers.indexOf("question")
        const tIdx = headers.indexOf("type")
        const aIdx = headers.indexOf("answer")
        const optIdx = headers.indexOf("options")
        const expIdx = headers.indexOf("explanation")
        const marksIdx = headers.indexOf("marks")

        const errs: string[] = []
        if (qIdx === -1) errs.push("Missing required column: 'question'")
        if (tIdx === -1) errs.push("Missing required column: 'type'")
        if (aIdx === -1) errs.push("Missing required column: 'answer'")
        if (errs.length > 0) {
          setCsvErrors(errs)
          setCsvUploading(false)
          return
        }

        const newQuestions: MockQuestion[] = []
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i]
          if (row.every((c) => !c)) continue

          const questionText = row[qIdx] ?? ""
          const typeRaw = (row[tIdx] ?? "MCQ").toUpperCase().trim()
          const answer = row[aIdx] ?? ""
          const optionsRaw = optIdx !== -1 ? (row[optIdx] ?? "") : ""
          const explanation = expIdx !== -1 ? (row[expIdx] ?? "") : ""
          const marks = marksIdx !== -1 ? parseInt(row[marksIdx] ?? "1") || 1 : 1

          if (!questionText) continue

          const validTypes = ["MCQ", "MSQ", "NAT", "DESCRIPTIVE"]
          if (!validTypes.includes(typeRaw)) {
            errs.push(`Row ${i + 1}: Invalid type '${typeRaw}'. Use MCQ/MSQ/NAT/DESCRIPTIVE.`)
            continue
          }

          const parsedOptions = optionsRaw
            ? optionsRaw.split(";").map((o) => o.trim()).filter(Boolean)
            : []

          if ((typeRaw === "MCQ" || typeRaw === "MSQ") && parsedOptions.length < 2) {
            errs.push(`Row ${i + 1}: MCQ/MSQ requires at least 2 options separated by semicolons.`)
            continue
          }

          if (typeRaw === "NAT" && isNaN(parseFloat(answer))) {
            errs.push(`Row ${i + 1}: NAT answer must be a number.`)
            continue
          }

          newQuestions.push({
            id: nanoid(),
            question: questionText,
            type: typeRaw as MockQuestion["type"],
            options: parsedOptions,
            answer,
            explanation: explanation || undefined,
            marks,
          })
        }

        if (errs.length > 0) {
          setCsvErrors(errs)
          setCsvUploading(false)
          return
        }

        await saveQuestions([...questions, ...newQuestions])
        setCsvSuccess(newQuestions.length)
        setCsvFile(null)
        toast.success(`Imported ${newQuestions.length} questions`)
      } catch {
        setCsvErrors(["Failed to parse CSV. Check the file format."])
      } finally {
        setCsvUploading(false)
      }
    }
    reader.readAsText(csvFile)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/admin/mocks">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">{mockTitle}</h1>
              <p className="text-sm text-muted-foreground">
                {questions.length} question{questions.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {questions.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10"
                onClick={() => setClearDialogOpen(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => { setCsvModalOpen(true); setCsvErrors([]); setCsvSuccess(null); setCsvFile(null) }}
            >
              <Upload className="h-3.5 w-3.5" />
              Import CSV
            </Button>
            <Button size="sm" className="gap-1.5" onClick={openCreateModal}>
              <Plus className="h-3.5 w-3.5" />
              Add Question
            </Button>
          </div>
        </div>

        {/* Questions Table */}
        <Card>
          <CardContent className="p-0">
            {questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="font-medium text-muted-foreground">No questions yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add questions manually or import from CSV.
                </p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                    onClick={() => { setCsvModalOpen(true); setCsvErrors([]); setCsvSuccess(null); setCsvFile(null) }}
                  >
                    <Upload className="h-4 w-4" />
                    Import CSV
                  </Button>
                  <Button className="gap-1.5" onClick={openCreateModal}>
                    <Plus className="h-4 w-4" />
                    Add First Question
                  </Button>
                </div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 text-xs">#</TableHead>
                    <TableHead className="text-xs">Question</TableHead>
                    <TableHead className="text-xs w-32">Options</TableHead>
                    <TableHead className="text-xs w-20">Type</TableHead>
                    <TableHead className="text-xs w-28">Answer</TableHead>
                    <TableHead className="text-xs w-16 text-center">Marks</TableHead>
                    <TableHead className="text-xs w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {questions.map((q, idx) => {
                      const cfg = typeConfig[q.type]
                      const TypeIcon = cfg?.icon
                      return (
                        <motion.tr
                          key={q.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="border-b hover:bg-muted/30 transition-colors"
                        >
                          <TableCell className="text-xs text-muted-foreground">{idx + 1}</TableCell>
                          <TableCell className="max-w-[280px]">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-sm font-medium line-clamp-2 cursor-default">{q.question}</p>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">{q.question}</TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            {q.options && q.options.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {q.options.slice(0, 4).map((opt, oi) => (
                                  <Tooltip key={oi}>
                                    <TooltipTrigger asChild>
                                      <span className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono cursor-default truncate max-w-[60px]">
                                        {optionLabels[oi]}.
                                      </span>
                                    </TooltipTrigger>
                                    <TooltipContent>{opt}</TooltipContent>
                                  </Tooltip>
                                ))}
                                {q.options.length > 4 && (
                                  <span className="text-xs text-muted-foreground">+{q.options.length - 4}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground italic">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", cfg?.color)}>
                              {TypeIcon && <TypeIcon className="h-3 w-3" />}
                              {cfg?.label}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded truncate block max-w-[110px] cursor-default">
                                  {q.answer}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>{q.answer}</TooltipContent>
                            </Tooltip>
                          </TableCell>
                          <TableCell className="text-center text-sm tabular-nums">{q.marks ?? 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => openEditModal(idx)}
                                  >
                                    <Edit2 className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:text-destructive"
                                    onClick={() => setDeleteIndex(idx)}
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete</TooltipContent>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* ─── Question Form Modal ─────────────────────────────────────────────── */}
        <Dialog open={modalOpen} onOpenChange={(v) => !v && setModalOpen(false)}>
          <DialogContent className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] flex-col overflow-hidden p-0 sm:max-w-5xl lg:max-w-6xl">
            <DialogHeader className="border-b bg-muted/30 px-5 py-4 sm:px-6">
              <DialogTitle className="text-xl font-semibold">
                {editingIndex !== null ? "Edit Question" : "Add New Question"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details below. Fields marked with * are required.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                    <div className="space-y-5">
                      <Card className="border-border/70 shadow-sm">
                        <CardContent className="space-y-5 p-4 sm:p-5">
                          <div>
                            <h3 className="text-sm font-semibold">Question Details</h3>
                            <p className="text-xs text-muted-foreground">Write the question text and attach an optional image.</p>
                          </div>

                          <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">Question Text *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Enter the question text here..."
                                    rows={7}
                                    className="min-h-36 resize-y text-base leading-relaxed"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold">
                                  <ImageIcon className="h-4 w-4" />
                                  Question Image
                                  <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                                </FormLabel>
                                <div className="space-y-3">
                                  {field.value ? (
                                    <div className="rounded-2xl border bg-muted/20 p-3">
                                      <div className="flex items-start justify-between gap-3">
                                        <div>
                                          <p className="text-sm font-medium">Uploaded image</p>
                                          <p className="break-all text-xs text-muted-foreground">{field.value}</p>
                                        </div>
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 shrink-0 hover:text-destructive"
                                          onClick={() => field.onChange("")}
                                        >
                                          <X className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      <div className="relative mt-3 inline-block rounded-xl border bg-background p-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                          src={field.value}
                                          alt="Question preview"
                                          className="max-h-48 rounded-lg object-contain shadow-sm"
                                          onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <FormControl>
                                      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-muted/20 p-6 text-center transition-colors hover:border-muted-foreground/40 hover:bg-muted/40">
                                        <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
                                          {questionImageUploading ? (
                                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                          ) : (
                                            <Upload className="h-6 w-6 text-muted-foreground" />
                                          )}
                                        </span>
                                        <span className="block text-sm font-semibold">
                                          {questionImageUploading ? "Uploading image..." : "Click to upload question image"}
                                        </span>
                                        <span className="mt-1 block text-xs text-muted-foreground">
                                          PNG, JPG, or WEBP. Maximum size 1 MB.
                                        </span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          disabled={questionImageUploading}
                                          onChange={handleQuestionImageUpload}
                                        />
                                      </label>
                                    </FormControl>
                                  )}
                                </div>
                                <FormDescription>Images are uploaded to Cloudinary and saved with the question.</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      {(questionType === "MCQ" || questionType === "MSQ") && (
                        <Card className="border-border/70 shadow-sm">
                          <CardContent className="space-y-4 p-4 sm:p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <FormLabel className="text-base font-semibold">Answer Options *</FormLabel>
                                <p className="text-xs text-muted-foreground">Add two to six options. For MSQ, select every correct option.</p>
                              </div>
                              {options.length < 6 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="h-9 gap-1.5"
                                  onClick={() => form.setValue("options", [...options, ""])}
                                >
                                  <Plus className="h-4 w-4" />
                                  Add Option
                                </Button>
                              )}
                            </div>

                            {questionType === "MSQ" && (
                              <div className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                                <CheckSquare className="h-4 w-4" />
                                Check boxes next to all correct answers.
                              </div>
                            )}

                            <div className="grid gap-3 md:grid-cols-2">
                              {options.map((_, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl border bg-background p-3">
                                  {questionType === "MSQ" ? (
                                    <Checkbox
                                      checked={msqAnswers.includes(options[idx]?.trim())}
                                      onCheckedChange={() => {
                                        const opt = options[idx]?.trim()
                                        if (opt) toggleMsqAnswer(opt)
                                      }}
                                      disabled={!options[idx]?.trim()}
                                      className="h-5 w-5"
                                    />
                                  ) : null}
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                                    {optionLabels[idx]}
                                  </span>
                                  <FormField
                                    control={form.control}
                                    name={`options.${idx}`}
                                    render={({ field }) => (
                                      <FormItem className="m-0 flex-1">
                                        <FormControl>
                                          <Input
                                            placeholder={`Option ${optionLabels[idx]}`}
                                            {...field}
                                            className={cn(
                                              "h-10 text-base",
                                              questionType === "MSQ" && msqAnswers.includes(field.value?.trim())
                                                ? "border-purple-400 bg-purple-50 dark:bg-purple-900/20"
                                                : ""
                                            )}
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  {options.length > 2 && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-10 w-10 shrink-0 hover:text-destructive"
                                      onClick={() => {
                                        const newOpts = options.filter((_, i) => i !== idx)
                                        form.setValue("options", newOpts)
                                        if (questionType === "MSQ") {
                                          form.setValue(
                                            "msqAnswers",
                                            msqAnswers.filter((a) => a !== options[idx]?.trim())
                                          )
                                        }
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                            </div>

                            {questionType === "MSQ" && msqAnswers.length > 0 && (
                              <div className="flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="font-medium">Selected: </span>
                                <span className="font-mono">{msqAnswers.join("; ")}</span>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}

                      <Card className="border-border/70 shadow-sm">
                        <CardContent className="space-y-5 p-4 sm:p-5">
                          <div>
                            <h3 className="text-sm font-semibold">Answer & Explanation</h3>
                            <p className="text-xs text-muted-foreground">Set the correct answer and optional explanation shown after submission.</p>
                          </div>

                          {questionType === "MCQ" && (
                            <FormField
                              control={form.control}
                              name="answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-semibold">Correct Answer *</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-10">
                                        <SelectValue placeholder="Select the correct option..." />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {options.map((opt, idx) =>
                                        opt.trim() ? (
                                          <SelectItem key={idx} value={opt.trim()}>
                                            {optionLabels[idx]}. {opt.trim()}
                                          </SelectItem>
                                        ) : null
                                      )}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {questionType === "MSQ" && (
                            <FormField
                              control={form.control}
                              name="answer"
                              render={() => (
                                <FormItem>
                                  <FormLabel className="text-base font-semibold">Correct Answers</FormLabel>
                                  <div className="rounded-lg border bg-muted/50 px-4 py-3 text-base">
                                    {msqAnswers.length > 0 ? (
                                      <span className="font-mono text-purple-700 dark:text-purple-300">
                                        {msqAnswers.join("; ")}
                                      </span>
                                    ) : (
                                      <span className="text-muted-foreground italic">Check boxes above to select correct answers</span>
                                    )}
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {questionType === "NAT" && (
                            <FormField
                              control={form.control}
                              name="answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-semibold">Correct Answer (Numerical) *</FormLabel>
                                  <FormControl>
                                    <Input type="number" step="any" placeholder="e.g. 42 or 3.14" className="h-10 max-w-xs text-base" {...field} />
                                  </FormControl>
                                  <FormDescription>Decimal values accepted.</FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          {questionType === "DESCRIPTIVE" && (
                            <FormField
                              control={form.control}
                              name="answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-base font-semibold">Model Answer / Key Points *</FormLabel>
                                  <FormControl>
                                    <Textarea
                                      placeholder="Enter the expected answer or key points..."
                                      rows={4}
                                      className="resize-y text-base"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          <Separator />

                          <FormField
                            control={form.control}
                            name="explanation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">
                                  Explanation
                                  <span className="ml-1 text-xs font-normal text-muted-foreground">(shown after submission)</span>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Explain why this is the correct answer..."
                                    rows={4}
                                    className="resize-y text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </div>

                    <aside className="space-y-5 lg:sticky lg:top-0 lg:self-start">
                      <Card className="border-border/70 shadow-sm">
                        <CardContent className="space-y-5 p-4 sm:p-5">
                          <div>
                            <h3 className="text-sm font-semibold">Question Type</h3>
                            <p className="text-xs text-muted-foreground">Choose the format before entering answers.</p>
                          </div>

                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem>
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                  {(["MCQ", "MSQ", "NAT", "DESCRIPTIVE"] as const).map((t) => {
                                    const cfg = typeConfig[t]
                                    const Icon = cfg.icon
                                    return (
                                      <button
                                        key={t}
                                        type="button"
                                        onClick={() => handleTypeChange(t)}
                                        className={cn(
                                          "flex items-start gap-3 rounded-xl border p-4 text-left text-sm transition-all hover:border-foreground/30 hover:bg-muted/40",
                                          field.value === t
                                            ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                                            : "border-border"
                                        )}
                                      >
                                        <span className={cn(
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground",
                                          field.value === t ? "bg-primary text-primary-foreground" : ""
                                        )}>
                                          <Icon className="h-4 w-4" />
                                        </span>
                                        <span>
                                          <span className="block font-semibold">{cfg.label}</span>
                                          <span className="text-xs text-muted-foreground">{cfg.desc}</span>
                                        </span>
                                      </button>
                                    )
                                  })}
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>

                      <Card className="border-border/70 shadow-sm">
                        <CardContent className="space-y-4 p-4 sm:p-5">
                          <FormField
                            control={form.control}
                            name="marks"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-base font-semibold">Marks</FormLabel>
                                <FormControl>
                                  <Input type="number" min={0} step={0.5} className="h-10 text-base" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                            This score is used when calculating the mock result.
                          </div>
                        </CardContent>
                      </Card>
                    </aside>
                  </div>
                </div>

                <DialogFooter className="mx-0 mb-0 gap-2 rounded-none border-t bg-background/95 px-5 py-4 sm:px-6">
                  <Button type="button" variant="outline" onClick={() => setModalOpen(false)} className="h-10 px-6">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving} className="h-10 px-6">
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingIndex !== null ? "Update Question" : "Add Question"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* ─── CSV Import Modal ────────────────────────────────────────────────── */}
        <Dialog open={csvModalOpen} onOpenChange={(v) => { if (!v) { setCsvModalOpen(false); setCsvFile(null); setCsvErrors([]); setCsvSuccess(null) } }}>
          <DialogContent className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] flex-col overflow-hidden p-0 sm:max-w-4xl lg:max-w-5xl">
            <DialogHeader className="border-b bg-muted/30 px-5 py-4 sm:px-6">
              <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
                <Upload className="h-5 w-5" />
                Import Questions from CSV
              </DialogTitle>
              <DialogDescription>
                Upload a properly formatted CSV file to bulk-add questions to this mock test.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              {/* ── Left: Format guide ── */}
              <Card className="border-border/70 shadow-sm">
                <CardContent className="space-y-4 p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <FileText className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Required CSV Format</p>
                    <p className="text-xs text-muted-foreground">Use these column names exactly. Keep multiple options separated by semicolons.</p>
                  </div>
                </div>

                <pre className="overflow-x-auto rounded-xl border bg-muted/70 p-4 font-mono text-xs leading-relaxed">
{`question,type,answer,options,marks
"What is 2+2?",MCQ,4,"4;5;6;7",1
"Select primes",MSQ,"2;3;5","1;2;3;5",1
"Solve 2x=10",NAT,5,,1
"Describe X",DESCRIPTIVE,"Answer",,2`}
                </pre>

                <div className="grid gap-3 text-xs text-muted-foreground sm:grid-cols-2">
                  <div className="rounded-xl border bg-background p-3">
                    <p className="mb-2 font-semibold text-foreground">Required columns</p>
                    <div className="space-y-1.5">
                      <p><code className="rounded bg-muted px-1.5 py-0.5">question</code> Question text</p>
                      <p><code className="rounded bg-muted px-1.5 py-0.5">type</code> MCQ / MSQ / NAT / DESCRIPTIVE</p>
                      <p><code className="rounded bg-muted px-1.5 py-0.5">answer</code> Correct answer</p>
                    </div>
                  </div>
                  <div className="rounded-xl border bg-background p-3">
                    <p className="mb-2 font-semibold text-foreground">Optional columns</p>
                    <div className="space-y-1.5">
                      <p><code className="rounded bg-muted px-1.5 py-0.5">options</code> Semicolon-separated</p>
                      <p><code className="rounded bg-muted px-1.5 py-0.5">explanation</code> Shown after submit</p>
                      <p><code className="rounded bg-muted px-1.5 py-0.5">marks</code> Points per question</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>MSQ: separate multiple correct answers with <code className="font-mono">;</code> (e.g. <code className="font-mono">2;3;5</code>). Options also semicolon-separated.</span>
                </div>
                </CardContent>
              </Card>

              {/* ── Right: Upload + status ── */}
              <Card className="border-border/70 shadow-sm">
                <CardContent className="flex h-full flex-col space-y-4 p-4 sm:p-5">
                <div>
                  <p className="text-sm font-semibold">Select CSV File</p>
                  <p className="text-xs text-muted-foreground">Choose a `.csv` file, review validation messages, then import.</p>
                </div>

                <label className="flex-1">
                  <div className={cn(
                    "flex h-full min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
                    csvFile ? "border-primary/60 bg-primary/5" : "border-muted-foreground/20 bg-muted/20 hover:border-muted-foreground/40 hover:bg-muted/40"
                  )}>
                    <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
                      <Upload className="h-7 w-7 text-muted-foreground" />
                    </span>
                    {csvFile ? (
                      <div>
                        <p className="break-all text-sm font-semibold text-primary">{csvFile.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{(csvFile.size / 1024).toFixed(1)} KB - ready to import</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold">Click to select CSV file</p>
                        <p className="mt-1 text-xs text-muted-foreground">Only .csv files accepted</p>
                      </div>
                    )}
                    <input type="file" accept=".csv" className="hidden" onChange={handleCsvFileSelect} />
                  </div>
                </label>

                {/* Errors */}
                {csvErrors.length > 0 && (
                  <div className="space-y-1 rounded-xl border border-destructive/40 bg-destructive/5 p-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-destructive">
                      <AlertTriangle className="h-4 w-4" />
                      {csvErrors.length} error{csvErrors.length > 1 ? "s" : ""} found
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-0.5">
                      {csvErrors.map((err, i) => (
                        <p key={i} className="pl-6 text-xs text-destructive/80">• {err}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Success */}
                {csvSuccess !== null && (
                  <div className="flex items-center gap-2 rounded-xl border border-green-400/40 bg-green-50 p-3 dark:bg-green-900/20">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-300">
                      Successfully imported {csvSuccess} questions!
                    </p>
                  </div>
                )}
                </CardContent>
              </Card>
            </div>
            </div>

            <DialogFooter className="mx-0 mb-0 gap-2 rounded-none border-t bg-background/95 px-5 py-4 sm:px-6">
              <Button
                variant="outline"
                className="h-10 px-6"
                onClick={() => { setCsvModalOpen(false); setCsvFile(null); setCsvErrors([]); setCsvSuccess(null) }}
              >
                Cancel
              </Button>
              <Button onClick={handleCsvUpload} disabled={!csvFile || csvUploading} className="h-10 px-6">
                {csvUploading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                <Upload className="h-4 w-4 mr-2" />
                Import Questions
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* ─── Delete Question Confirmation ────────────────────────────────────── */}
        <AlertDialog open={deleteIndex !== null} onOpenChange={(v) => !v && setDeleteIndex(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Question</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove question #{(deleteIndex ?? 0) + 1}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ─── Clear All Confirmation ───────────────────────────────────────────── */}
        <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Questions</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all {questions.length} question{questions.length !== 1 ? "s" : ""} from this mock test. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleClearAll}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Clear All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  )
}
