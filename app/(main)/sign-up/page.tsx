"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, signUp } from "@/lib/auth-client";
import { MockAuthShell } from "@/app/(main)/mocks/_components/auth-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail, User, Lock } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function MockSignUpPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setError(null);
    try {
      await signUp.email({
        email: values.email,
        password: values.password,
        name: values.name,
        callbackURL: "/mocks",
      });
      router.push("/mocks");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again.";
      setError(message);
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignUp() {
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/mocks",
      });
    } catch {
      setError("Google sign up failed. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <MockAuthShell
      title="Create your MLS mock account"
      description="Join thousands of learners practicing with MLS mock tests. Track attempts, unlock premium mocks, and review every solution."
    >
      <Card className="border-border/70 bg-background/80 shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Create account</CardTitle>
          <CardDescription>
            Sign up to access mock tests and performance insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Jane Doe"
                          className="h-11 pl-10 text-base"
                          autoComplete="name"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="you@mlsclasses.com"
                          className="h-11 pl-10 text-base"
                          autoComplete="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Create a password"
                          className="h-11 pl-10 text-base"
                          autoComplete="new-password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Repeat your password"
                          className="h-11 pl-10 text-base"
                          autoComplete="new-password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="lg"
                className="w-full gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {isSubmitting ? "Creating account" : "Create account"}
              </Button>
            </form>
          </Form>
          <Separator />
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full gap-3"
            onClick={handleGoogleSignUp}
            disabled={isSubmitting}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link className="font-semibold text-foreground hover:text-primary" href="/sign-in">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </MockAuthShell>
  );
}
