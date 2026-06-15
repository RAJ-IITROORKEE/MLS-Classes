import { prisma } from "@/lib/db";
import { ContactsDataTable } from "@/components/admin/contacts-data-table";
import type { Metadata } from "next";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Contacts | MLS Classes Admin",
};

export default async function AdminContactsPage() {
  await requireAdminPathAccess("/admin/contacts");

  const contacts = await prisma.bookTrialRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const serialized = contacts.map((c) => ({
    id: c.id,
    email: c.email,
    phone: c.phone,
    studentName: c.studentName,
    program: c.program,
    grade: c.grade,
    timezone: c.timezone,
    message: c.message,
    status: c.status,
    createdAt: c.createdAt,
  }));

  const statusCounts = contacts.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.status] = (acc[c.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trial Requests</h1>
        <p className="text-muted-foreground mt-1">
          All free trial booking submissions from the website.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
        {[
          { label: "Total", value: contacts.length, color: "text-foreground" },
          { label: "Pending", value: statusCounts["PENDING"] ?? 0, color: "text-yellow-600 dark:text-yellow-400" },
          { label: "Contacted", value: statusCounts["CONTACTED"] ?? 0, color: "text-primary" },
          { label: "Scheduled", value: statusCounts["SCHEDULED"] ?? 0, color: "text-purple-600 dark:text-purple-400" },
          { label: "Completed", value: statusCounts["COMPLETED"] ?? 0, color: "text-green-600 dark:text-green-400" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      <ContactsDataTable data={serialized} />
    </div>
  );
}
