"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminAppSidebar } from "@/components/admin/app-sidebar";
import { AdminSiteHeader } from "@/components/admin/site-header";
import { AdminNotificationsProvider } from "@/components/admin/admin-notifications-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TopProgress } from "@/components/top-progress";
import { canAccessAdminPath } from "@/lib/admin-permissions";

type AdminShellUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
};

function AdminShellToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.get("admin_error") !== "forbidden") return;

    toast.error("This section is locked for your role. Contact admin for access.");
    router.replace(pathname);
  }, [pathname, router, searchParams]);

  return null;
}

export function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AdminShellUser;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const canAccessCurrentPath = canAccessAdminPath(user.role, pathname);

  useEffect(() => {
    if (canAccessCurrentPath) return;

    toast.error("This section is locked for your role. Contact admin for access.");
    router.replace("/admin/dashboard");
  }, [canAccessCurrentPath, router]);

  return (
    <ThemeProvider attribute="class" forcedTheme="dark" disableTransitionOnChange>
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
          <AdminShellToast />
        </Suspense>
        <AdminNotificationsProvider enabled={user.role === "ADMIN"}>
          <AdminAppSidebar variant="inset" currentUser={user} />
          <SidebarInset>
            <AdminSiteHeader />
            <main className="flex flex-1 flex-col p-4 md:p-6">
              {canAccessCurrentPath ? (
                children
              ) : (
                <div className="flex min-h-[50vh] items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">Checking access...</p>
                    <p className="text-xs text-muted-foreground">Redirecting to your dashboard.</p>
                  </div>
                </div>
              )}
            </main>
          </SidebarInset>
        </AdminNotificationsProvider>
        <Toaster richColors position="top-right" />
      </SidebarProvider>
    </ThemeProvider>
  );
}
