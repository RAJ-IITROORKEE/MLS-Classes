"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Loader2, MessageSquare, Send, User } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitBookTrial } from "@/lib/actions/book-trial";
import { bookTrialSchema, type BookTrialFormData } from "@/lib/book-trial-validation";

const TIMEZONES = [
  "UTC-10:00 (Hawaii)",
  "UTC-09:00 (Alaska)",
  "UTC-08:00 (Pacific Time)",
  "UTC-07:00 (Mountain Time)",
  "UTC-06:00 (Central Time)",
  "UTC-05:00 (Eastern Time)",
  "UTC-04:00 (Atlantic Time)",
  "UTC-03:00 (Buenos Aires)",
  "UTC+00:00 (London, GMT)",
  "UTC+01:00 (Paris, Berlin)",
  "UTC+02:00 (Cairo, Helsinki)",
  "UTC+03:00 (Moscow, Riyadh)",
  "UTC+04:00 (Dubai)",
  "UTC+05:00 (Karachi)",
  "UTC+05:30 (India)",
  "UTC+06:00 (Dhaka)",
  "UTC+07:00 (Bangkok)",
  "UTC+08:00 (Singapore, Beijing)",
  "UTC+09:00 (Tokyo)",
  "UTC+10:00 (Sydney)",
  "UTC+12:00 (Auckland)",
];

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function BookTrialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookTrialFormData>({
    resolver: zodResolver(bookTrialSchema),
    defaultValues: {
      email: "",
      phone: "",
      studentName: "",
      program: "",
      grade: "",
      timezone: "",
      message: "",
    },
  });

  async function onSubmit(values: BookTrialFormData) {
    setIsSubmitting(true);
    try {
      const result = await submitBookTrial(values);
      if (result.success) {
        toast.success("Booking Confirmed!", {
          description: result.message,
          duration: 6000,
        });
        form.reset();
      } else {
        toast.error("Submission Failed", {
          description: result.message,
          duration: 5000,
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-3xl border border-border/80 bg-card/95 shadow-xl shadow-primary/5 backdrop-blur"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          <div className="border-b bg-muted/20 px-5 py-5 sm:px-7">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">Free trial request</p>
            <h3 className="mt-2 text-xl font-bold tracking-tight">Quick details only</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share the student, subject, and best timezone. We will coordinate the exact slot on WhatsApp.
            </p>
          </div>

          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <section className="border-b px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
              <SectionHeader
                icon={User}
                title="Contact"
                description="Where our academic advisor should reach you."
              />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" className="h-11 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">WhatsApp Number *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+1 (555) 000-0000" className="h-11 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="px-5 py-6 sm:px-7">
              <SectionHeader
                icon={BookOpen}
                title="Student & Subject"
                description="Tell us what help the student needs."
              />
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Student&apos;s Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Student's name" className="h-11 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Program / Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. SAT Math, AP Biology, Grade 8 English" className="h-11 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="grade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">Grade / Year *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Grade 10, Year 8, College first year" className="h-11 text-base" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="grid gap-0 border-t lg:grid-cols-[0.9fr_1.1fr]">
            <section className="border-b px-5 py-6 sm:px-7 lg:border-b-0 lg:border-r">
              <SectionHeader
                icon={Calendar}
                title="Timezone"
                description="Choose your timezone so we can suggest suitable slots."
              />
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Your Timezone *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-64">
                          {TIMEZONES.map((tz) => (
                            <SelectItem key={tz} value={tz} className="text-base">
                              {tz}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>

            <section className="px-5 py-6 sm:px-7">
              <SectionHeader
                icon={MessageSquare}
                title="Notes"
                description="Optional context for the tutor match."
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Current level, target score, syllabus, or anything we should know..."
                        rows={4}
                        className="min-h-28 resize-none text-base leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </div>

          <div className="border-t bg-muted/20 px-5 py-5 sm:px-7">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="h-12 w-full text-base font-bold tracking-wide"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting your request...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4.5 w-4.5" />
                  Book My Free Trial Class
                </>
              )}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              We&apos;ll confirm your session within 24 hours. No credit card required.
            </p>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}
