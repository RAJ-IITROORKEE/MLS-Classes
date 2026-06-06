"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Zap, GraduationCap, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ResourceCenterPage() {
  const resources = [
    {
      icon: BookOpen,
      title: "Study Guides",
      description: "Access a wide range of study materials, guides, and resources that support academic success across different subjects and grade levels.",
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Zap,
      title: "Test Prep",
      description: "Prepare for standardized tests with our comprehensive test prep resources, including practice tests, tips, and strategies for achieving top scores.",
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/20",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      icon: GraduationCap,
      title: "College Application Tips",
      description: "Get expert advice on the college application process, including tips on essay writing, interview preparation, and navigating the admissions process.",
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  const cta_buttons = [
    {
      label: "Practice Tests",
      href: "/mocks",
      icon: Play,
      color: "bg-primary hover:bg-primary/90",
      textColor: "text-white",
    },
    {
      label: "Book Free Trial",
      href: "/book-trial",
      icon: Zap,
      color: "bg-primary hover:bg-primary/90",
      textColor: "text-white",
    },
    {
      label: "Join Classes",
      href: "https://mlsclasses.onlineclass.site/login/",
      icon: GraduationCap,
      color: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600",
      textColor: "text-white",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 border-b border-border pb-8 text-center"
      >
        <div className="inline-block">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Learning Hub
          </span>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl text-foreground">
          Resource Center
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive learning materials and resources to support your academic journey
        </p>
      </motion.div>

      {/* CTA Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cta_buttons.map((btn) => {
          const Icon = btn.icon;
          const isExternal = btn.href.startsWith("http");
          const Component = isExternal ? "a" : Link;

          return (
            <motion.div
              key={btn.label}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Component
                href={btn.href}
                {...(isExternal && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`group relative flex flex-col items-center justify-center gap-3 rounded-xl ${btn.color} ${btn.textColor} px-6 py-8 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="h-6 w-6 relative z-10" />
                <span className="relative z-10 text-center">{btn.label}</span>
                <ArrowRight className="h-4 w-4 relative z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Component>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            What You'll Find Here
          </h2>
          <p className="text-muted-foreground">
            Everything you need to succeed in your studies
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-2xl border ${resource.borderColor} bg-gradient-to-br ${resource.color} p-8 transition-all duration-300 hover:shadow-lg hover:border-primary/40`}
              >
                {/* Animated background elements */}
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />
                <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-background/50 backdrop-blur-sm p-3 border border-border/50">
                      <Icon className={`h-6 w-6 ${resource.iconColor}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-bold text-foreground">
                        {resource.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {resource.description}
                  </p>

                  {/* Interactive element */}
                  <div className="flex items-center gap-2 pt-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Learn more</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 space-y-6"
      >
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Why Use Our Resources?
          </h3>
          <p className="text-muted-foreground">
            Designed by expert educators for maximum learning impact
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Expert Content",
              description: "Curated by experienced educators and subject matter experts",
            },
            {
              title: "Updated Regularly",
              description: "Fresh materials aligned with current curriculum standards",
            },
            {
              title: "Comprehensive",
              description: "Covers all major subjects and standardized tests",
            },
            {
              title: "Interactive",
              description: "Engaging formats including videos, guides, and practice tests",
            },
            {
              title: "Accessible",
              description: "Available 24/7 for self-paced learning",
            },
            {
              title: "Results-Driven",
              description: "Proven strategies to boost academic performance",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex gap-3 rounded-lg border border-border/50 bg-background/50 backdrop-blur-sm p-4"
            >
              <div className="mt-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">
                  {feature.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="rounded-2xl border border-border bg-gradient-to-r from-muted/50 to-muted/30 p-8 sm:p-12 text-center space-y-6"
      >
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-foreground">
            Ready to Start Learning?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access all our resources and get personalized guidance from expert tutors
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="font-semibold"
          >
            <Link href="/mocks">
              <Play className="h-4 w-4 mr-2" />
              Start Practice Tests
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-semibold"
          >
            <Link href="/book-trial">
              Book a Free Trial
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="rounded-lg bg-primary/5 border border-primary/20 p-6 text-center space-y-3"
      >
        <h4 className="font-semibold text-foreground">Need Help?</h4>
        <p className="text-sm text-muted-foreground">
          Have questions about our resources? Reach out to our support team at{" "}
          <a
            href="mailto:ritik@mlsclasses.com"
            className="font-semibold text-primary hover:underline"
          >
            ritik@mlsclasses.com
          </a>
        </p>
      </motion.div>
    </div>
  );
}
