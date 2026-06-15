import { prisma } from "@/lib/db";
import { FAQTable } from "@/components/admin/faq-table";
import type { Metadata } from "next";
import { requireAdminPathAccess } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "FAQ Management | MLS Classes Admin",
};

export default async function AdminFAQPage() {
  await requireAdminPathAccess("/admin/faq");

  const faqs = await prisma.fAQ.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">FAQ Management</h1>
        <p className="text-muted-foreground mt-1">
          Add, edit, or remove frequently asked questions displayed on the website.
        </p>
      </div>
      <FAQTable initialFaqs={faqs} />
    </div>
  );
}
