import AdminMockBundlesClient from "@/components/admin/mock-bundles-table"

export const metadata = {
  title: "Mock Bundles | MLS Admin",
}

export default function AdminMockBundlesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Mock Bundles</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Group mock tests into discounted bundles for students.
        </p>
      </div>
      <AdminMockBundlesClient />
    </div>
  )
}
