"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAdminNotifications } from "@/components/admin/admin-notifications-provider";
import {
  LayoutDashboard,
  HelpCircle,
  Mail,
  Settings,
  ChevronRight,
  Users,
  LogOut,
  ExternalLink,
  MessageSquare,
  Trophy,
  ClipboardList,
  FileText,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { canAccessAdminPath, getRoleLabel } from "@/lib/admin-permissions";

const NAV_ITEMS = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
      },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Blogs",
        icon: FileText,
        subItems: [
          { label: "Manage Blogs", href: "/admin/blogs" },
        ],
      },
      {
        label: "Mocks",
        icon: ClipboardList,
        subItems: [
          { label: "Manage Mocks", href: "/admin/mocks" },
          { label: "Mock Bundles", href: "/admin/mock-bundles" },
          { label: "User Stats", href: "/admin/mock-stats" },
        ],
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        label: "Trial Requests",
        href: "/admin/contacts",
        icon: Mail,
      },
      {
        label: "Testimonials",
        href: "/admin/testimonials",
        icon: MessageSquare,
      },
      {
        label: "Student Corner",
        href: "/admin/student-corner",
        icon: Trophy,
      },
      {
        label: "FAQ",
        href: "/admin/faq",
        icon: HelpCircle,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

function formatBadgeCount(count: number) {
  return count > 99 ? "99+" : String(count);
}

type AdminSidebarUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
};

export function AdminAppSidebar({
  currentUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & { currentUser?: AdminSidebarUser }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const user = currentUser ?? session?.user;
  const userRole = currentUser?.role ?? session?.user?.role ?? "STUDENT";
  const { trial } = useAdminNotifications();

  const getNotificationCount = (label: string) => {
    if (userRole !== "ADMIN") return 0;
    if (label === "Trial Requests") return trial;
    return 0;
  };

  const lockedTooltip = "Locked for this role. Contact admin for access.";

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center justify-center py-2">
                <Image
                  src="/logo.png"
                  alt="MLS Classes"
                  width={140}
                  height={56}
                  className="h-14 w-auto object-contain"
                  style={{ width: "auto" }}
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {NAV_ITEMS.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  if ("subItems" in item && item.subItems) {
                    const allowedSubItems = item.subItems.map((sub) => ({
                      ...sub,
                      allowed: canAccessAdminPath(userRole, sub.href),
                    }));
                    const isActive = item.subItems.some((sub) => pathname.startsWith(sub.href));
                    return (
                      <Collapsible
                        key={item.label}
                        defaultOpen={isActive}
                        asChild
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.label} isActive={isActive}>
                              <item.icon className="h-4 w-4" />
                              <span>{item.label}</span>
                              <ChevronRight className="ml-auto h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {allowedSubItems.map((sub) => (
                                <SidebarMenuSubItem key={sub.href}>
                                  {sub.allowed ? (
                                    <SidebarMenuSubButton
                                      asChild
                                      isActive={pathname === sub.href}
                                    >
                                      <Link href={sub.href}>{sub.label}</Link>
                                    </SidebarMenuSubButton>
                                  ) : (
                                    <SidebarMenuSubButton
                                      title={lockedTooltip}
                                      className="cursor-not-allowed opacity-70"
                                    >
                                      <span className="flex w-full items-center justify-between gap-2">
                                        <span>{sub.label}</span>
                                        <Lock className="h-3.5 w-3.5 text-red-400" />
                                      </span>
                                    </SidebarMenuSubButton>
                                  )}
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  const isActive =
                    "href" in item && item.href ? pathname === item.href : false;
                  const href = "href" in item && item.href ? item.href : "#";
                  const isAllowed = canAccessAdminPath(userRole, href);
                  const notificationCount = getNotificationCount(item.label);
                  return (
                    <SidebarMenuItem key={item.label}>
                      {isAllowed ? (
                        <SidebarMenuButton
                          asChild
                          tooltip={item.label}
                          isActive={isActive}
                          className={cn(isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
                        >
                          <Link href={href} className="flex w-full items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                            {notificationCount > 0 && (
                              <Badge className="ml-auto h-5 min-w-5 rounded-full bg-red-500 px-1.5 text-[10px] font-semibold text-white hover:bg-red-500">
                                {formatBadgeCount(notificationCount)}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      ) : (
                        <SidebarMenuButton tooltip={lockedTooltip} className="cursor-not-allowed opacity-70">
                          <div className="flex w-full items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span className="min-w-0 flex-1 truncate">{item.label}</span>
                            <Lock className="h-3.5 w-3.5 text-red-400" />
                          </div>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer - User Menu */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                   <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "Admin"} />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.[0]?.toUpperCase() ?? "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name ?? "Admin"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email ?? "admin"}
                    </span>
                    <span className="truncate text-[10px] uppercase tracking-wide text-muted-foreground/80">
                      {getRoleLabel(userRole)}
                    </span>
                  </div>
                  <ChevronRight className="ml-auto h-3.5 w-3.5" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    signOut({ fetchOptions: { onSuccess: () => router.push("/") } })
                  }
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
