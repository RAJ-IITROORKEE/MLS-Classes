"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactUsPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        formRef.current.reset();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "ritik@mlsclasses.com",
      href: "mailto:ritik@mlsclasses.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "(+91) 9649549754",
      href: "tel:+919649549754",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "First Floor, 22, Mahendra Kirana Store, Dhakar Colony, Tonk, Rajasthan 304505",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      label: "WhatsApp",
      href: "https://wa.me/message/XMS5KMWBGQZLG1",
      icon: MessageCircle,
      color: "hover:text-green-600 dark:hover:text-green-400 bg-green-500/10",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/mlsclasses?mibextid=ZbWKwL",
      icon: Facebook,
      color: "hover:text-[#1877F2] dark:hover:text-[#0A66C2] bg-blue-500/10",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mlsclasses?utm_source=ig_web_button_share_sheet",
      icon: Instagram,
      color: "hover:text-[#E1306C] dark:hover:text-[#E1306C] bg-pink-500/10",
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@mlsclasses8293?si=KBojcjPosvKjfwjH",
      icon: Youtube,
      color: "hover:text-[#FF0000] dark:hover:text-[#FF0000] bg-red-500/10",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center space-y-4"
        >
          <div className="inline-block">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Get In Touch
            </span>
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl text-foreground">
            Contact Us
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Have a question or need assistance? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3 mb-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Information</h3>
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    target={info.title === "Address" ? "_blank" : undefined}
                    rel={info.title === "Address" ? "noopener noreferrer" : undefined}
                    whileHover={{ x: 5 }}
                    className="group flex gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="rounded-lg bg-primary/10 p-3 flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground text-sm">{info.title}</p>
                      <p className="text-sm text-muted-foreground break-words group-hover:text-primary transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="text-lg font-bold text-foreground">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center gap-2 rounded-lg border border-border/50 px-4 py-3 text-sm font-semibold transition-all ${social.color}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="hidden sm:inline">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Response Time Info */}
            <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 space-y-2">
              <p className="text-sm font-semibold text-foreground">Response Time</p>
              <p className="text-xs text-muted-foreground">
                We typically respond to all inquiries within 24-48 hours on business days.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-border bg-muted/20 p-8 backdrop-blur-sm"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-semibold text-foreground"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  className="h-11 border-border/50 bg-background/50 focus:bg-background"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-foreground"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="h-11 border-border/50 bg-background/50 focus:bg-background"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-foreground"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What is this about?"
                  required
                  className="h-11 border-border/50 bg-background/50 focus:bg-background"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-foreground"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  required
                  rows={6}
                  className="resize-none border-border/50 bg-background/50 focus:bg-background"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 font-semibold group"
                  size="lg"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Button>
              </div>

              {/* Terms */}
              <p className="text-center text-xs text-muted-foreground">
                By submitting this form, you agree to our{" "}
                <Link href="/privacy-policy" className="font-semibold text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-12"
        >
          <div className="mb-8 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Can't find what you're looking for? Check out our FAQ section
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: "What is your typical response time?",
                a: "We respond to most inquiries within 24-48 hours on business days.",
              },
              {
                q: "How can I schedule a free trial?",
                a: "Visit our Book Free Trial page to schedule your personalized session with our expert tutors.",
              },
              {
                q: "Do you offer online and offline classes?",
                a: "Yes, we provide both online 1-on-1 personalized tutoring and offline classes depending on your location.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital payment methods through our secure Razorpay gateway.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2 rounded-lg border border-border/50 bg-background/50 p-4">
                <p className="font-semibold text-foreground text-sm">{item.q}</p>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
