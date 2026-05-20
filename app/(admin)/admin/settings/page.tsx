import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings2, Bell, Shield, Palette } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | MLS Classes Admin",
};

const SETTINGS_SECTIONS = [
  {
    icon: Palette,
    title: "Appearance",
    description: "Customize the look and feel of the admin panel.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure email and push notification settings.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "Manage authentication and access control settings.",
  },
  {
    icon: Settings2,
    title: "General",
    description: "Site-wide configuration and metadata settings.",
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your MLS Classes platform configuration.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SETTINGS_SECTIONS.map((section) => (
          <Card key={section.title} className="border-dashed">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <section.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription className="text-xs mt-0.5">
                  {section.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Content In Progress</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
