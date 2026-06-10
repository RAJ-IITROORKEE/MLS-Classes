"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAdminNotifications } from "@/components/admin/admin-notifications-provider";
import { Bell, CalendarClock, Mail, RefreshCw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getPageTitle(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  if (!last) return "Dashboard";
  return last
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatBadgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

function formatRelativeTime(value: string) {
  const timestamp = new Date(value).getTime();
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date(value));
}

export function AdminSiteHeader() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);
  const { notifications, total, trial, contact, isLoading, refresh } = useAdminNotifications();

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Admin notifications">
              <Bell className="h-4 w-4" />
              {total > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white ring-2 ring-background">
                  {formatBadgeCount(total)}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[min(calc(100vw-2rem),24rem)] p-0">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
              <div>
                <DropdownMenuLabel className="p-0 text-sm font-semibold text-foreground">
                  Notifications
                </DropdownMenuLabel>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {total > 0 ? `${total} unread item${total === 1 ? "" : "s"}` : "No pending admin items"}
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Refresh notifications"
                onClick={() => void refresh()}
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2 px-3 py-3">
              <Link href="/admin/contacts" className="rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/60">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Trial requests</span>
                  <CalendarClock className="h-3.5 w-3.5 text-red-500" />
                </div>
                <p className="mt-1 text-xl font-semibold leading-none">{trial}</p>
              </Link>
              <Link href="/admin/contact-us" className="rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/60">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Messages</span>
                  <Mail className="h-3.5 w-3.5 text-red-500" />
                </div>
                <p className="mt-1 text-xl font-semibold leading-none">{contact}</p>
              </Link>
            </div>

            <DropdownMenuSeparator className="m-0" />

            {isLoading ? (
              <div className="p-6 text-center text-sm text-muted-foreground">Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">All caught up</p>
                <p className="mt-1 text-xs text-muted-foreground">New trial requests and contact messages will appear here.</p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto p-1.5">
                {notifications.map((notification) => {
                  const Icon = notification.type === "trial" ? CalendarClock : Mail;

                  return (
                    <DropdownMenuItem key={notification.id} asChild>
                      <Link href={notification.link} className="flex cursor-pointer items-start gap-3 rounded-lg p-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{notification.title}</span>
                          <span className="mt-0.5 block line-clamp-2 text-xs text-muted-foreground">{notification.message}</span>
                          <span className="mt-1 block text-xs text-muted-foreground/80">
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  );
}
