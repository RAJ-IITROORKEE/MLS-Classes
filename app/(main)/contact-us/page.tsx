"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";

// Social Icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

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
      color: "hover:text-primary bg-primary/10",
      isCustom: false,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/mlsclasses?mibextid=ZbWKwL",
      icon: FacebookIcon,
      color: "hover:text-primary bg-primary/10",
      isCustom: true,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/mlsclasses?utm_source=ig_web_button_share_sheet",
      icon: InstagramIcon,
      color: "hover:text-primary bg-primary/10",
      isCustom: true,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/@mlsclasses8293?si=KBojcjPosvKjfwjH",
      icon: YoutubeIcon,
      color: "hover:text-primary bg-primary/10",
      isCustom: true,
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
