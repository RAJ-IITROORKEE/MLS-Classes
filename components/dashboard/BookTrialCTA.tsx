"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function BookTrialCTA() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="hidden md:flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center shrink-0">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <h3 className="text-xl md:text-2xl font-bold">
                  Book a Free Trial Class
                </h3>
              </div>
              <p className="text-muted-foreground max-w-xl">
                Experience our premium teaching methodology with a complimentary trial session.
                Get personalized guidance from expert instructors and see how MLS Classes can
                help you achieve your academic goals.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Expert Instructors</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>Personalized Attention</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span>No Commitment</span>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <Button size="lg" className="gap-2 group" asChild>
              <Link href="/book-trial">
                Book Your Free Trial
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
