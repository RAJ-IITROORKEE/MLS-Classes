"use client";

import React, { useEffect, useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  MoreHorizontal,
  Clock,
  FileText,
  Reply,
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
         <DropdownMenu>
           <DropdownMenuTrigger asChild>
             <Button variant="ghost" size="icon" className="h-8 w-8">
               <MoreHorizontal className="h-4 w-4" />
             </Button>
           </DropdownMenuTrigger>
           <DropdownMenuContent align="end">
             <DropdownMenuLabel>Actions</DropdownMenuLabel>
             <DropdownMenuSeparator />
             <DropdownMenuItem
               onClick={() => {
                 setSelected(row.original);
                 setViewOpen(true);
               }}
             >
               <Eye className="h-4 w-4 mr-2" />
               View Details
             </DropdownMenuItem>
             <DropdownMenuItem disabled title="Coming soon">
               <Reply className="h-4 w-4 mr-2" />
               Reply (Coming Soon)
             </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem
               onClick={() => {
                 setSelected(row.original);
                 setDeleteOpen(true);
               }}
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
         <DialogContent className="flex max-h-[92vh] w-[calc(100vw-1.5rem)] flex-col overflow-hidden p-0 sm:max-w-4xl lg:max-w-5xl">
           {selected && (
             <>
               <DialogHeader className="border-b bg-muted/30 px-5 py-4 sm:px-6">
                 <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                   <div className="min-w-0 space-y-2">
                     <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
                       <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                         <MessageSquare className="h-5 w-5" />
                       </span>
                       <span className="min-w-0 truncate">Contact Message Details</span>
                     </DialogTitle>
                     <DialogDescription>
                       Message ID <span className="rounded-md bg-background px-2 py-1 font-mono text-xs text-foreground">{selected.id.slice(0, 12)}</span>
                     </DialogDescription>
                   </div>
                   <Badge
                     className={
                       selected.status === "RESOLVED"
                         ? "w-fit rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400"
                         : selected.status === "DELETED"
                           ? "w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-700 dark:text-red-400"
                           : "w-fit rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-yellow-700 dark:text-yellow-400"
                     }
                   >
                     {selected.status}
                   </Badge>
                 </div>
               </DialogHeader>

               <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                 <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                   <aside className="space-y-5 lg:sticky lg:top-0 lg:self-start">
                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                           <User className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Sender</h3>
                           <p className="text-xs text-muted-foreground">Contact information</p>
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Name</p>
                           <p className="mt-1 break-words text-sm font-semibold">{selected.name}</p>
                         </div>
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Email</p>
                           <a href={`mailto:${selected.email}`} className="mt-1 block break-all text-sm font-semibold text-primary hover:underline">
                             {selected.email}
                           </a>
                         </div>
                       </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-600 dark:text-green-400">
                           <Calendar className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Timeline</h3>
                           <p className="text-xs text-muted-foreground">Submission details</p>
                         </div>
                       </div>
                       <div className="space-y-3">
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Date</p>
                           <p className="mt-1 text-sm font-semibold">
                             {new Date(selected.createdAt).toLocaleDateString("en-US", {
                               year: "numeric",
                               month: "long",
                               day: "numeric",
                             })}
                           </p>
                         </div>
                         <div className="rounded-xl border bg-muted/20 p-3">
                           <p className="text-xs font-medium text-muted-foreground">Time</p>
                           <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
                             <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                             {new Date(selected.createdAt).toLocaleTimeString("en-US", {
                               hour: "2-digit",
                               minute: "2-digit",
                               hour12: true,
                             })}
                           </p>
                         </div>
                       </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                           <CheckCircle className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Status</h3>
                           <p className="text-xs text-muted-foreground">Current workflow state</p>
                         </div>
                       </div>
                       <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-semibold">
                         {selected.status}
                       </Badge>
                     </section>
                   </aside>

                   <div className="space-y-5">
                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
                           <Tag className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Subject</h3>
                           <p className="text-xs text-muted-foreground">Inquiry topic</p>
                         </div>
                       </div>
                       <div className="rounded-2xl border bg-muted/30 p-4">
                         <p className="break-words text-base font-semibold leading-relaxed">{selected.subject}</p>
                       </div>
                     </section>

                     <section className="rounded-2xl border bg-card p-4 shadow-sm sm:p-5">
                       <div className="mb-4 flex items-center gap-3">
                         <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                           <FileText className="h-4 w-4" />
                         </span>
                         <div>
                           <h3 className="text-sm font-semibold">Message</h3>
                           <p className="text-xs text-muted-foreground">Full customer message</p>
                         </div>
                       </div>
                       <div className="rounded-2xl border bg-muted/30 p-4 text-sm leading-7 sm:p-5">
                         <p className="max-h-[42vh] overflow-y-auto break-words whitespace-pre-wrap pr-1">{selected.message}</p>
                       </div>
                     </section>
                   </div>
                 </div>
               </div>

               <DialogFooter className="mx-0 mb-0 gap-2 rounded-none border-t bg-background/95 px-5 py-4 sm:px-6">
                 <Button
                   type="button"
                   variant="outline"
                   onClick={() => {
                     setViewOpen(false);
                     setStatusUpdateOpen(true);
                     setSelectedStatus(selected.status);
                   }}
                 >
                   <CheckCircle className="h-4 w-4" />
                   Update Status
                 </Button>
                 <Button asChild type="button">
                   <a href={`mailto:${selected.email}`}>
                     <Mail className="h-4 w-4" />
                     Reply by Email
                   </a>
                 </Button>
                 <Button
                   type="button"
                   onClick={() => {
                     setViewOpen(false);
                     setDeleteOpen(true);
                   }}
                   variant="destructive"
                 >
                   <Trash2 className="h-4 w-4" />
                   Delete
                 </Button>
               </DialogFooter>
             </>
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
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(value as "PENDING" | "RESOLVED" | "DELETED")
              }
            >
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
