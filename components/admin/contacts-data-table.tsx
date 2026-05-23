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
} from "lucide-react";
import { toast } from "sonner";
import { updateContactStatus } from "@/lib/actions/contacts";

export type ContactRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  program: string;
  grade: string;
  timezone: string;
  availability: string;
  message: string | null;
  status: string;
  createdAt: Date;
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  CONTACTED: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
  SCHEDULED: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  COMPLETED: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const STATUS_OPTIONS = ["PENDING", "CONTACTED", "SCHEDULED", "COMPLETED", "CANCELLED"];

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
  const [tableData, setTableData] = useState<ContactRow[]>(data);

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

  const columns: ColumnDef<ContactRow>[] = [
    {
      id: "name",
      header: ({ column }) => <SortableHeader column={column} label="Name" />,
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      cell: ({ row }) => (
        <div>
          <p className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
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

      {/* Detail Dialog */}
      <Dialog open={!!detailRow} onOpenChange={() => setDetailRow(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact Details</DialogTitle>
          </DialogHeader>
          {detailRow && (
            <div className="space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Name", `${detailRow.firstName} ${detailRow.lastName}`],
                  ["Email", detailRow.email],
                  ["Phone", detailRow.phone],
                  ["Student Name", detailRow.studentName],
                  ["Program", detailRow.program],
                  ["Grade", detailRow.grade],
                  ["Timezone", detailRow.timezone],
                  ["Availability", detailRow.availability],
                  ["Status", detailRow.status],
                  ["Submitted", new Date(detailRow.createdAt).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                    <p className="font-medium break-words">{value}</p>
                  </div>
                ))}
              </div>
              {detailRow.message && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <p className="bg-muted rounded-lg p-3 text-sm break-words whitespace-pre-wrap">
                    {detailRow.message}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
