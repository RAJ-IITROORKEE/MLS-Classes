"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  CalendarClock,
  CheckCircle2,
  Clock,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { updateContactStatus, deleteContact } from "@/lib/actions/contacts";

export type ContactRow = {
  id: string;
  email: string;
  phone: string;
  studentName: string;
  program: string;
  grade: string;
  timezone: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONTACTED: "bg-primary/10 text-primary dark:bg-primary/20",
  SCHEDULED: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_OPTIONS = ["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"];

function getWhatsAppHref(phone: string, name: string) {
  const digits = phone.replace(/\D/g, "");
  const normalizedPhone = digits.startsWith("00") ? digits.slice(2) : digits;

  if (!normalizedPhone) return null;

  const message = encodeURIComponent(
    `Hi ${name}, this is MLS Classes regarding your trial request.`
  );

  return `https://wa.me/${normalizedPhone}?text=${message}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.33 4.95L2.05 22l5.25-1.38a9.88 9.88 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91a9.86 9.86 0 0 0-2.91-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.38c0-4.55 3.7-8.25 8.25-8.25a8.2 8.2 0 0 1 5.83 2.42 8.19 8.19 0 0 1 2.41 5.83c-.01 4.53-3.72 8.23-8.26 8.23Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.16 1.73 2.64 4.2 3.7.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

function SortableHeader({
  column,
  label,
}: {
  column: { getIsSorted: () => string | false; toggleSorting: (desc: boolean) => void };
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1 hover:text-foreground transition-colors"
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      {label}
      {sorted === "asc" ? (
        <ChevronUp className="h-3.5 w-3.5" />
      ) : sorted === "desc" ? (
        <ChevronDown className="h-3.5 w-3.5" />
      ) : (
        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
      )}
    </button>
  );
}

export function ContactsDataTable({ data }: { data: ContactRow[] }) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [detailRow, setDetailRow] = useState<ContactRow | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [tableData, setTableData] = useState<ContactRow[]>(data);
  const detailWhatsAppHref = detailRow
    ? getWhatsAppHref(detailRow.phone, detailRow.studentName || "there")
    : null;

  async function handleStatusChange(id: string, newStatus: string) {
    const result = await updateContactStatus(id, newStatus);
    if (result.success) {
      toast.success(result.message);
      setTableData((prev) =>
        prev.map((row) => (row.id === id ? { ...row, status: newStatus } : row))
      );
    } else {
      toast.error(result.message);
    }
  }

  async function handleDelete(id: string) {
    try {
      const result = await deleteContact(id);
      if (result.success) {
        toast.success(result.message);
        setTableData((prev) => prev.filter((row) => row.id !== id));
        setDeleteConfirm(null);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Failed to delete contact");
    }
  }

  const columns: ColumnDef<ContactRow>[] = [
    {
      id: "contact",
      header: ({ column }) => <SortableHeader column={column} label="Contact" />,
      accessorFn: (row) => `${row.email} ${row.phone}`,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.email}</p>
          <p className="text-xs text-muted-foreground">{row.original.phone}</p>
        </div>
      ),
    },
    {
      accessorKey: "studentName",
      header: "Student",
      cell: ({ row }) => (
        <div>
          <p>{row.original.studentName}</p>
          <p className="text-xs text-muted-foreground">{row.original.grade}</p>
        </div>
      ),
    },
    {
      accessorKey: "program",
      header: "Program",
      cell: ({ getValue }) => (
        <Badge variant="outline" className="text-xs">
          {getValue() as string}
        </Badge>
      ),
    },
    {
      accessorKey: "timezone",
      header: "Timezone",
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">{getValue() as string}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Select
          defaultValue={row.original.status}
          onValueChange={(val) => handleStatusChange(row.original.id, val)}
        >
          <SelectTrigger className="h-7 text-xs w-36">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[row.original.status] ?? ""}`}
            >
              {row.original.status}
            </span>
          </SelectTrigger>
          <SelectContent position="popper">
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="text-xs">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => <SortableHeader column={column} label="Date" />,
      cell: ({ getValue }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(getValue() as Date).toLocaleDateString()}
        </span>
      ),
    },
     {
       id: "actions",
       cell: ({ row }) => (
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon" className="h-7 w-7">
               <MoreHorizontal className="h-4 w-4" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end">
             <DropdownMenuLabel>Actions</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={() => setDetailRow(row.original)}>
               <Eye className="h-4 w-4 mr-2" />
               View Details
             </DropdownMenuItem>
             <DropdownMenuItem
               onClick={() => navigator.clipboard.writeText(row.original.email)}
             >
               Copy Email
             </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem
               onClick={() => setDeleteConfirm(row.original.id)}
               className="text-red-600 dark:text-red-400"
             >
               <Trash2 className="h-4 w-4 mr-2" />
               Delete
             </DropdownMenuItem>
           </DropdownMenuContent>
         </DropdownMenu>
       ),
     },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contacts..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          onValueChange={(val) =>
            setColumnFilters(
              val === "ALL"
                ? []
                : [{ id: "status", value: val }]
            )
          }
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Statuses</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-medium">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-12 text-muted-foreground">
                  No contacts found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {table.getState().pagination.pageIndex * 10 + 1}–
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * 10,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-xs">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

       {/* Delete Confirmation Dialog */}
       <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
         <DialogContent>
           <DialogHeader>
             <DialogTitle>Delete Trial Request</DialogTitle>
           </DialogHeader>
           <div className="space-y-4">
             <p className="text-sm text-muted-foreground">
               Are you sure you want to delete this trial request? This action cannot be undone.
             </p>
             <div className="flex gap-3 justify-end">
               <Button
                 variant="outline"
                 onClick={() => setDeleteConfirm(null)}
               >
                 Cancel
               </Button>
               <Button
                 variant="destructive"
                 onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
               >
                 Delete
               </Button>
             </div>
           </div>
         </DialogContent>
       </Dialog>

       {/* Detail Dialog */}
       <Dialog open={!!detailRow} onOpenChange={() => setDetailRow(null)}>
         <DialogContent className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] flex-col overflow-hidden p-0 sm:max-w-4xl lg:max-w-5xl">
           {detailRow && (
             <>
               <DialogHeader className="border-b bg-muted/30 px-5 py-4 sm:px-6">
                 <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                   <div className="min-w-0 space-y-2">
                     <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
                       <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                         <CalendarClock className="h-5 w-5" />
                       </span>
                       <span className="min-w-0 truncate">Trial Request Details</span>
                     </DialogTitle>
                      <DialogDescription>
                        Trial request for {detailRow.studentName} from {detailRow.email}
                      </DialogDescription>
                   </div>
                   <Badge className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[detailRow.status] ?? ""}`}>
                     {detailRow.status}
                   </Badge>
                 </div>
               </DialogHeader>

               <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                 <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
                   <div className="space-y-5">
                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <UserRound className="h-4 w-4" />
                          </span>
                          <div>
                            <h3 className="text-sm font-semibold">Contact Information</h3>
                            <p className="text-xs text-muted-foreground">Primary contact for this enquiry</p>
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-xl border bg-muted/20 p-3">
                            <p className="text-xs font-medium text-muted-foreground">Email</p>
                            <a href={`mailto:${detailRow.email}`} className="mt-1 block break-all text-sm font-semibold text-primary hover:underline">
                              {detailRow.email}
                            </a>
                          </div>
                          <div className="rounded-xl border bg-muted/20 p-3">
                            <p className="text-xs font-medium text-muted-foreground">WhatsApp Number</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              {detailWhatsAppHref ? (
                                <a
                                  href={detailWhatsAppHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-700 transition hover:border-emerald-500/50 hover:bg-emerald-500/15 dark:text-emerald-300"
                                  title="Open this number in WhatsApp"
                                >
                                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                                  <span className="break-all">{detailRow.phone}</span>
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-2 break-all text-sm font-semibold text-foreground">
                                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                                  {detailRow.phone}
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-xs text-muted-foreground">
                              Opens WhatsApp if this number is registered there.
                            </p>
                          </div>
                        </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                           <GraduationCap className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Student & Program</h3>
                           <p className="text-xs text-muted-foreground">Class request details</p>
                         </div>
                       </div>
                       <div className="grid gap-3 sm:grid-cols-3">
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Student</p>
                           <p className="mt-1 break-words text-sm font-semibold">{detailRow.studentName}</p>
                         </div>
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Program</p>
                           <p className="mt-1 break-words text-sm font-semibold">{detailRow.program}</p>
                         </div>
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Grade</p>
                           <p className="mt-1 break-words text-sm font-semibold">{detailRow.grade}</p>
                         </div>
                       </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                           <MessageSquare className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Message</h3>
                           <p className="text-xs text-muted-foreground">Notes shared by the requester</p>
                         </div>
                       </div>
                       <div className="rounded-2xl border bg-muted/30 p-4 text-sm leading-relaxed">
                         {detailRow.message ? (
                           <p className="break-words whitespace-pre-wrap">{detailRow.message}</p>
                         ) : (
                           <p className="text-muted-foreground">No additional message was provided.</p>
                         )}
                       </div>
                     </section>
                   </div>

                   <aside className="space-y-5 lg:sticky lg:top-0 lg:self-start">
                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                        <div className="mb-4 flex items-center gap-3">
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                            <Clock className="h-4 w-4" />
                          </span>
                          <div>
                            <h3 className="text-sm font-semibold">Schedule</h3>
                            <p className="text-xs text-muted-foreground">Preferred timing</p>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="rounded-xl border bg-muted/20 p-3">
                            <p className="text-xs font-medium text-muted-foreground">Timezone</p>
                           <p className="mt-1 inline-flex items-center gap-2 break-words text-sm font-semibold">
                             <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                             {detailRow.timezone}
                           </p>
                         </div>
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Submitted</p>
                           <p className="mt-1 break-words text-sm font-semibold">{new Date(detailRow.createdAt).toLocaleString()}</p>
                         </div>
                       </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                           <CheckCircle2 className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Status</h3>
                           <p className="text-xs text-muted-foreground">Update from the table row</p>
                         </div>
                       </div>
                       <Badge className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[detailRow.status] ?? ""}`}>
                         {detailRow.status}
                       </Badge>
                     </section>
                   </aside>
                 </div>
               </div>

               <DialogFooter className="mx-0 mb-0 gap-2 rounded-none border-t bg-background/95 px-5 py-4 sm:px-6">
                 <Button type="button" variant="outline" onClick={() => setDetailRow(null)}>
                   Close
                 </Button>
                 <Button asChild>
                   <a href={`mailto:${detailRow.email}`}>
                     <Mail className="h-4 w-4" />
                      Email Contact
                   </a>
                 </Button>
               </DialogFooter>
             </>
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
