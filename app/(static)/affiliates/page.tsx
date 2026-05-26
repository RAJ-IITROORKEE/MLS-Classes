"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Handshake, Users, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AffiliatesPage() {
  const sections = [
    {
      icon: Handshake,
      title: "Partner with Us",
      description:
        "Join us in our mission to empower students. Partner with MLS Classes and contribute to a supportive learning environment that helps students reach their full potential.",
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Users,
      title: "Our Partners",
      description:
        "We collaborate with leading educational institutions and organizations to provide our students with the best resources and opportunities for success.",
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        className="space-y-4 text-center pb-8"
      >
        <div className="inline-block">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Partnership Program
          </span>
        </div>
        <h1 className="text-4xl font-bold sm:text-5xl text-foreground">
          Affiliates
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join our growing network of partners and help us make quality education accessible to everyone
        </p>
      </motion.div>

      {/* Main Sections */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {sections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-2xl border ${section.borderColor} bg-gradient-to-br ${section.color} p-8 sm:p-10 transition-all duration-300 hover:shadow-lg hover:border-primary/40`}
            >
              {/* Animated background elements */}
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />
              <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl transition-all duration-300 group-hover:bg-primary/10" />

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="rounded-xl bg-background/50 backdrop-blur-sm p-4 border border-border/50"
                  >
                    <Icon className={`h-7 w-7 ${section.iconColor}`} />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  {section.description}
                </p>
              </div>

              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-300" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-10 space-y-8"
      >
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Why Partner with MLS Classes?
          </h2>
          <p className="text-muted-foreground text-lg">
            Get access to benefits that help your organization grow
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Mutual Growth",
              description: "Expand your reach and help more students succeed",
            },
            {
              title: "Expert Resources",
              description: "Access our comprehensive educational materials and content",
            },
            {
              title: "Dedicated Support",
              description: "Get personalized support from our partnership team",
            },
            {
              title: "Flexible Terms",
              description: "Customizable partnership models to fit your needs",
            },
            {
              title: "Quality Assurance",
              description: "Maintain high standards with our quality systems",
            },
            {
              title: "Joint Marketing",
              description: "Collaborate on marketing initiatives and promotions",
            },
          ].map((benefit) => (
            <motion.div
              key={benefit.title}
              whileHover={{ y: -5 }}
              className="flex gap-4 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-5 hover:bg-background/80 transition-all"
            >
              <div className="mt-1">
                <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-blue-600 flex-shrink-0" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm mb-1">
                  {benefit.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground">
            Get started with our simple partnership process
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { number: "01", title: "Get in Touch", desc: "Contact our partnership team" },
            { number: "02", title: "Discuss Terms", desc: "Customize your partnership" },
            { number: "03", title: "Get Onboarded", desc: "Complete setup process" },
            { number: "04", title: "Start Growing", desc: "Launch your partnership" },
          ].map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.1 }}
              className="relative"
            >
              <div className="rounded-xl border border-border bg-muted/30 p-6 text-center space-y-3">
                <div className="text-3xl font-bold text-primary">{step.number}</div>
                <h4 className="font-semibold text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>

              {/* Connector line */}
              {idx < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-5 h-0.5 w-10 bg-gradient-to-r from-primary to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid gap-6 sm:grid-cols-3"
      >
        {[
          { stat: "500+", label: "Active Partners" },
          { stat: "50K+", label: "Students Served" },
          { stat: "100+", label: "Institutions" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 text-center space-y-2"
          >
            <div className="text-3xl sm:text-4xl font-bold text-primary">
              {item.stat}
            </div>
            <p className="text-muted-foreground font-medium">{item.label}</p>
          </div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="rounded-2xl border border-border bg-gradient-to-r from-muted/50 to-muted/30 p-8 sm:p-12 text-center space-y-6"
      >
        <div className="space-y-3">
          <h3 className="text-3xl font-bold text-foreground">
            Ready to Partner with Us?
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's work together to make quality education accessible to more students worldwide
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="font-semibold"
          >
            <Link href="/contact-us">
              <MessageSquare className="h-4 w-4 mr-2" />
              Reach Out to Us
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-semibold"
          >
            <Link href="/#contact">
              <ArrowRight className="h-4 w-4 mr-2" />
              Learn More
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Contact Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="rounded-lg bg-primary/5 border border-primary/20 p-6 sm:p-8 text-center space-y-4"
      >
        <h4 className="font-semibold text-foreground text-lg">Questions About Partnership?</h4>
        <p className="text-muted-foreground">
          Our partnership team is here to help. Reach out at{" "}
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
