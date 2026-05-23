import AdminMocksClient from "@/components/admin/mocks-table"

export const metadata = {
  title: "Manage Mocks | MLS Admin",
}

export default function AdminMocksPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mock Tests</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Create, manage and publish practice mock tests for your students.
        </p>
      </div>
      <AdminMocksClient />
    </div>
  )
}
