"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ClipboardList,
  TrendingUp,
  Calendar,
  MessageCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const ACTIONS = [
  {
    label: "Practice Tests",
    href: "/mocks",
    icon: ClipboardList,
    description: "Take mock tests to prepare",
    color: "text-blue-500",
  },
  {
    label: "My Performance",
    href: "/performance",
    icon: TrendingUp,
    description: "View detailed analytics",
    color: "text-green-500",
  },
  {
    label: "Book Free Trial",
    href: "/book-trial",
    icon: Calendar,
    description: "Schedule a demo class",
    color: "text-purple-500",
  },
  {
    label: "Student Corner",
    href: "/student-corner",
    icon: MessageCircle,
    description: "Resources and community",
    color: "text-orange-500",
  },
]

export function QuickActions() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon
          return (
            <Link key={action.href} href={action.href}>
              <Button
                variant="outline"
                className="w-full justify-start gap-3 h-auto py-3 hover:bg-primary/5 transition-colors"
              >
                <Icon className={`h-5 w-5 ${action.color}`} />
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
          )
        })}
      </CardContent>
    </Card>
  )
}
