"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Eye,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Mail,
  Calendar,
  User,
  Tag,
  MessageSquare,
  RefreshCw,
  CheckCircle,
  Search,
} from "lucide-react";
import { toast } from "sonner";

type ContactUs = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "PENDING" | "RESOLVED" | "DELETED";
  threadId: string | null;
  parentId: string | null;
  conversationType: "NEW_INQUIRY" | "ADMIN_REPLY" | "USER_REPLY";
  createdAt: string;
  updatedAt: string;
};

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<ContactUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<ContactUs | null>(null);
  const [statusUpdateOpen, setStatusUpdateOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"PENDING" | "RESOLVED" | "DELETED">("PENDING");
  const [refreshing, setRefreshing] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const res = await fetch("/api/contact-us");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle refresh
  const handleRefresh = async () => {
    await fetchContacts();
    toast.success("Contacts refreshed successfully");
  };

  // Update status
  const handleStatusUpdate = async () => {
    if (!selected) return;

    try {
      const res = await fetch(`/api/contact-us/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (res.ok) {
        toast.success(`Status updated to ${selectedStatus}`);
        setStatusUpdateOpen(false);
        await fetchContacts();
        setSelected(null);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to update status");
    }
  };

  // Delete contact
  const handleDelete = async () => {
    if (!selected) return;

    try {
      const res = await fetch(`/api/contact-us/${selected.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Contact deleted successfully");
        setDeleteOpen(false);
        await fetchContacts();
        setSelected(null);
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to delete contact");
    }
  };

  const columns: ColumnDef<ContactUs>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a
            href={`mailto:${row.getValue("email")}`}
            className="text-primary hover:underline"
          >
            {row.getValue("email")}
          </a>
        </div>
      ),
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <div className="max-w-xs truncate text-sm">{row.getValue("subject")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const statusColors = {
          PENDING: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
          RESOLVED: "bg-green-500/10 text-green-700 dark:text-green-400",
          DELETED: "bg-red-500/10 text-red-700 dark:text-red-400",
        };
        return (
          <Badge className={statusColors[status as keyof typeof statusColors]}>
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelected(row.original);
              setViewOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelected(row.original);
              setDeleteOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: contacts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: (row, id, value) => {
      const rowValue = row.getValue(id);
      return String(rowValue).toLowerCase().includes(String(value).toLowerCase());
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-lg font-semibold">{error}</p>
          <Button onClick={handleRefresh}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries and messages</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or subject..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading contacts...</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        setSelected(row.original);
                        setViewOpen(true);
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No contacts found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Details
            </DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Name</label>
                  <p className="text-foreground mt-1">{selected.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Email</label>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-primary hover:underline mt-1 block"
                  >
                    {selected.email}
                  </a>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Status</label>
                  <p className="text-foreground mt-1">
                    <Badge>{selected.status}</Badge>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground">Date</label>
                  <p className="text-foreground mt-1">
                    {new Date(selected.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Subject</label>
                <p className="text-foreground mt-2 bg-muted/50 rounded p-3">
                  {selected.subject}
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-semibold text-muted-foreground">Message</label>
                <p className="text-foreground mt-2 bg-muted/50 rounded p-3 whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-border pt-4">
                <Button
                  onClick={() => {
                    setViewOpen(false);
                    setStatusUpdateOpen(true);
                    setSelectedStatus(selected.status);
                  }}
                  className="flex-1"
                  variant="outline"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Update Status
                </Button>
                <Button
                  onClick={() => {
                    setViewOpen(false);
                    setDeleteOpen(true);
                  }}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog open={statusUpdateOpen} onOpenChange={setStatusUpdateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Change the status of this contact message
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="RESOLVED">Resolved</SelectItem>
                <SelectItem value="DELETED">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusUpdateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStatusUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Delete Contact
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
