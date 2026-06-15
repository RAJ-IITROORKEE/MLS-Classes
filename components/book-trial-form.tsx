"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, User, BookOpen, Calendar, MessageSquare } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { submitBookTrial } from "@/lib/actions/book-trial";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "WhatsApp number is required"),
  studentName: z.string().min(1, "Student name is required"),
  program: z.string().min(1, "Please select a program"),
  grade: z.string().min(1, "Please select a grade"),
  timezone: z.string().min(1, "Please select a timezone"),
  availability: z.string().min(1, "Please indicate your availability"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const PROGRAMS = [
  "Digital SAT",
  "ACT",
  "AP (Advanced Placement)",
  "AMC",
  "A-levels",
  "IGCSE/GCSE",
  "IB",
  "NAPLAN",
  "STAAR",
  "Math",
  "English (ELA)",
  "Science",
  "Coding",
  "Other",
];

const GRADES = [
  "Grade K",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
];

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

const AVAILABILITY = [
  "Weekday Mornings (Mon-Fri 6AM-12PM)",
  "Weekday Afternoons (Mon-Fri 12PM-6PM)",
  "Weekday Evenings (Mon-Fri 6PM-10PM)",
  "Weekend Mornings (Sat-Sun 6AM-12PM)",
  "Weekend Afternoons (Sat-Sun 12PM-6PM)",
  "Weekend Evenings (Sat-Sun 6PM-10PM)",
  "Flexible (Any time works)",
];

/* Reusable section header inside the form card */
function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
    </div>
  );
}

export function BookTrialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentName: "",
      program: "",
      grade: "",
      timezone: "",
      availability: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
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
      className="rounded-2xl border border-border bg-card shadow-lg overflow-hidden"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* ── Section 1: Parent / Guardian Info ── */}
          <div className="px-7 pt-8 pb-6">
            <SectionHeader icon={User} title="Parent / Guardian Information" />
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" className="h-11 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" className="h-11 text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </div>

          <Separator />

          {/* ── Section 2: Student Details ── */}
          <div className="px-7 py-6">
            <SectionHeader icon={BookOpen} title="Student Details" />
            <div className="space-y-5">
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PROGRAMS.map((p) => (
                            <SelectItem key={p} value={p} className="text-base">
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {GRADES.map((g) => (
                            <SelectItem key={g} value={g} className="text-base">
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Section 3: Scheduling ── */}
          <div className="px-7 py-6">
            <SectionHeader icon={Calendar} title="Scheduling Preferences" />
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
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
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">Availability *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Best time for class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {AVAILABILITY.map((a) => (
                            <SelectItem key={a} value={a} className="text-base">
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* ── Section 4: Message ── */}
          <div className="px-7 py-6">
            <SectionHeader icon={MessageSquare} title="Additional Information" />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about the student's current level, goals, or any specific questions..."
                      rows={4}
                      className="resize-none text-base leading-relaxed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* ── Submit ── */}
          <div className="px-7 pb-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full h-13 text-base font-bold tracking-wide"
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
