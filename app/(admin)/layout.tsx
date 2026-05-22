"use client";

import { Suspense } from "react";
import { useUser } from "@clerk/nextjs";
import { AdminAppSidebar } from "@/components/admin/app-sidebar";
import { AdminSiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TopProgress } from "@/components/top-progress";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();

  // Still loading Clerk session — show spinner
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not signed in — middleware should have already redirected, render nothing
  if (!isSignedIn) {
    return null;
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Suspense fallback={null}>
        <TopProgress />
      </Suspense>
      <AdminAppSidebar variant="inset" />
      <SidebarInset>
        <AdminSiteHeader />
        <main className="flex flex-1 flex-col p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
      <Toaster richColors position="top-right" />
    </SidebarProvider>
  );
}
