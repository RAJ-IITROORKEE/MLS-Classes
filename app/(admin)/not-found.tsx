import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 py-24 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 mb-5">
        <FileQuestion className="h-8 w-8 text-destructive" />
      </div>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm">
        The admin page you&apos;re looking for doesn&apos;t exist or hasn&apos;t been built yet.
      </p>
      <Button asChild className="mt-6">
        <Link href="/admin/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
