import AdminMockStatsClient from "@/components/admin/mock-stats-table"

export const metadata = {
  title: "Mock Stats | MLS Admin",
}

export default function AdminMockStatsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mock Performance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Track student performance, attempts, and mock-level analytics.
        </p>
      </div>
      <AdminMockStatsClient />
    </div>
  )
}
