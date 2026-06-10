"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { SignedIn } from "@/components/auth/signed-in";
import { SignedOut } from "@/components/auth/signed-out";
import { UserButton } from "@/components/auth/user-button";

/* ─── Nav Data ─────────────────────────────────────────────────────── */

const TEST_PREP_MENU = [
  {
    label: "Digital SAT",
    href: "/test-prep/digital-sat",
    sub: [
      { label: "Digital SAT Math", href: "/test-prep/digital-sat/sat-math" },
      { label: "Digital SAT Reading & Writing", href: "/test-prep/digital-sat/sat-read-write" },
    ],
  },
  {
    label: "ACT",
    href: "/test-prep/act",
    sub: [
      { label: "ACT Math", href: "/test-prep/act/act-math" },
      { label: "ACT English", href: "/test-prep/act/act-english" },
      { label: "ACT Science", href: "/test-prep/act/act-science" },
      { label: "ACT Reading & Writing", href: "/test-prep/act/act-read-write" },
    ],
  },
  {
    label: "AP",
    href: "/test-prep/ap-test",
    sub: [
      { label: "AP Precalculus", href: "/ap-courses/ap-precalculus" },
      { label: "AP Calculus AB", href: "/ap-courses/ap-calculus-ab" },
      { label: "AP Calculus BC", href: "/ap-courses/ap-calculus-bc" },
      { label: "AP Statistics", href: "/ap-courses/ap-statistics" },
      { label: "AP Physics 1 & 2", href: "/ap-courses/ap-physics-1-2" },
      { label: "AP Physics C: E&M", href: "/ap-courses/ap-physics-c-electricity-magnetism" },
      { label: "AP Physics C: Mechanics", href: "/ap-courses/ap-physics-c-mechanics" },
      { label: "AP Chemistry", href: "/ap-courses/ap-chemistry" },
      { label: "AP Biology", href: "/ap-courses/ap-biology" },
      { label: "AP Environmental Science", href: "/ap-courses/ap-environmental-science" },
      { label: "AP Computer Science A", href: "/ap-courses/ap-computer-science-a" },
      { label: "AP English Literature", href: "/ap-courses/ap-english-literature-composition" },
      { label: "AP Microeconomics", href: "/ap-courses/ap-microeconomics" },
      { label: "AP Macroeconomics", href: "/ap-courses/ap-macroeconomics" },
    ],
  },
  {
    label: "PSAT",
    href: "/test-prep/psat",
    sub: [
      { label: "PSAT 8/9", href: "/test-prep/psat/psat-8-9" },
      { label: "PSAT 10", href: "/test-prep/psat/psat-10" },
      { label: "PSAT/NMSQT", href: "/test-prep/psat/psat-nmsqt" },
    ],
  },
  {
    label: "Other Test Prep",
    href: "/test-prep/amc-8",
    sub: [
      { label: "AMC 8", href: "/test-prep/amc-8" },
      { label: "AMC 10/12", href: "/test-prep/amc-10" },
      { label: "MATHCOUNTS", href: "/test-prep/mathcounts" },
      { label: "STAAR", href: "/test-prep/staar" },
    ],
  },
];

const ACADEMIC_MENU = [
  {
    label: "US Curriculum",
    href: "/academic-tutoring/us-curriculum",
    sub: [
      { label: "Elementary School", href: "/academic-tutoring/us-curriculum/elementary-school" },
      { label: "Middle School", href: "/academic-tutoring/us-curriculum/middle-school" },
      { label: "High School", href: "/academic-tutoring/us-curriculum/high-school" },
    ],
  },
  {
    label: "UK Curriculum",
    href: "/academic-tutoring/uk-curriculum",
    sub: [
      { label: "Key Stage 1", href: "/academic-tutoring/uk-curriculum/key-stage-1" },
      { label: "Key Stage 2", href: "/academic-tutoring/uk-curriculum/key-stage-2" },
      { label: "Key Stage 3", href: "/academic-tutoring/uk-curriculum/key-stage-3" },
      { label: "Key Stage 4", href: "/academic-tutoring/uk-curriculum/key-stage-4" },
      { label: "Key Stage 5", href: "/academic-tutoring/uk-curriculum/key-stage-5" },
    ],
  },
  {
    label: "AU Curriculum",
    href: "/academic-tutoring/au-curriculum",
    sub: [
      { label: "Primary 2-6", href: "/academic-tutoring/au-curriculum/primary" },
      { label: "Secondary 7-10", href: "/academic-tutoring/au-curriculum/secondary" },
      { label: "Senior 11-12", href: "/academic-tutoring/au-curriculum/senior" },
      { label: "NAPLAN", href: "/academic-tutoring/au-curriculum/naplan" },
    ],
  },
  {
    label: "IB Curriculum",
    href: "/academic-tutoring/ib-curriculum",
  },
  {
    label: "IGCSE Curriculum",
    href: "/academic-tutoring/igcse-curriculum",
  },
  {
    label: "AS/A Level Curriculum",
    href: "/academic-tutoring/as-a-level-curriculum",
  },
  {
    label: "College Courses",
    href: "/college-courses/college-math",
    sub: [
      { label: "College Math", href: "/college-courses/college-math" },
      { label: "College Biology", href: "/college-courses/college-biology" },
      { label: "College English", href: "/college-courses/college-english" },
    ],
  },
  {
    label: "IT Courses",
    href: "/it-courses/html-web-development",
    sub: [
      { label: "C# Programming", href: "/it-courses/csharp-programming" },
      { label: "C++ Programming", href: "/it-courses/cplusplus-programming" },
      { label: "HTML & Web Dev", href: "/it-courses/html-web-development" },
      { label: "Java", href: "/it-courses/java" },
      { label: "Python", href: "/it-courses/python" },
    ],
  },
];

/* ─── Social / Utility icons ────────────────────────────────────────── */

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const LOGIN_MENU = [
  {
    label: "Live Classes",
    href: "https://mlsclasses.onlineclass.site/login/",
    description: "Access your live 1-on-1 class portal",
  },
  {
    label: "Test Series",
    href: "https://testprep.mlsclasses.com/",
    description: "Practice tests & mock exams",
  },
];

/* ─── Sub-menu item types ────────────────────────────────────────────── */
interface SubItem { label: string; href: string; }
interface MenuItem { label: string; href: string; sub?: SubItem[]; }

function isExternalHref(href: string) {
  return href.startsWith("http");
}

function MobileMenuLink({
  href,
  onNavigate,
  children,
  className,
}: {
  href: string;
  onNavigate: () => void;
  children: ReactNode;
  className?: string;
}) {
  return isExternalHref(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} onClick={onNavigate} className={className}>
      {children}
    </Link>
  );
}

function MobileNavSection({
  id,
  label,
  items,
  activeSection,
  activeItem,
  onToggleSection,
  onToggleItem,
  onNavigate,
}: {
  id: string;
  label: string;
  items: MenuItem[];
  activeSection: string | null;
  activeItem: string | null;
  onToggleSection: (id: string) => void;
  onToggleItem: (id: string) => void;
  onNavigate: () => void;
}) {
  const isOpen = activeSection === id;

  return (
    <div className="rounded-2xl border border-border/70 bg-background/80 shadow-sm">
      <button
        type="button"
        onClick={() => onToggleSection(id)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-bold text-foreground"
        aria-expanded={isOpen}
      >
        <span>{label}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180 text-primary")} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden border-t border-border/70"
          >
            <div className="space-y-1 p-2">
              {items.map((item) => {
                const itemKey = `${id}-${item.label}`;
                const itemOpen = activeItem === itemKey;

                if (!item.sub?.length) {
                  return (
                    <MobileMenuLink
                      key={item.label}
                      href={item.href}
                      onNavigate={onNavigate}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary"
                    >
                      {item.label}
                    </MobileMenuLink>
                  );
                }

                return (
                  <div key={item.label} className="rounded-xl bg-muted/40">
                    <button
                      type="button"
                      onClick={() => onToggleItem(itemKey)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
                      aria-expanded={itemOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className={cn("h-4 w-4 text-muted-foreground transition-transform", itemOpen && "rotate-90 text-primary")} />
                    </button>

                    <AnimatePresence initial={false}>
                      {itemOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-1 border-t border-border/60 px-2 py-2">
                            <MobileMenuLink
                              href={item.href}
                              onNavigate={onNavigate}
                              className="block rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide text-primary hover:bg-primary/10"
                            >
                              View {item.label}
                            </MobileMenuLink>
                            {item.sub.map((sub) => (
                              <MobileMenuLink
                                key={sub.label}
                                href={sub.href}
                                onNavigate={onNavigate}
                                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-background hover:text-primary"
                              >
                                {sub.label}
                              </MobileMenuLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── MegaDropdown ───────────────────────────────────────────────────── */

function MegaDropdown({ items, onClose }: { items: MenuItem[]; onClose: () => void }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const active = items.find((i) => i.label === hoveredItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-1 z-50 flex rounded-xl border border-border bg-popover shadow-xl overflow-hidden min-w-[200px]"
    >
      {/* Primary column */}
      <div className="py-2 min-w-[200px]">
        {items.map((item) => {
          const isExternal = item.href.startsWith("http");
          const linkProps = isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {};
          const className = cn(
            "flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium transition-colors",
            hoveredItem === item.label
              ? "bg-primary/10 text-primary"
              : "text-foreground hover:bg-muted hover:text-primary"
          );
          return isExternal ? (
            <a
              key={item.label}
              href={item.href}
              {...linkProps}
              onMouseEnter={() => setHoveredItem(item.sub ? item.label : null)}
              onClick={onClose}
              className={className}
            >
              {item.label}
              {item.sub && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredItem(item.sub ? item.label : null)}
              onClick={onClose}
              className={className}
            >
              {item.label}
              {item.sub && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
            </Link>
          );
        })}
      </div>

      {/* Sub column */}
      <AnimatePresence>
        {active?.sub && (
          <motion.div
            key={active.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="border-l border-border py-2 w-max bg-muted/40"
          >
            {active.sub.map((sub) => {
              const isExternal = sub.href.startsWith("http");
              const className =
                "block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors";
              return isExternal ? (
                <a
                  key={sub.label}
                  href={sub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={className}
                >
                  {sub.label}
                </a>
              ) : (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={onClose}
                  className={className}
                >
                  {sub.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── LoginDropdown ──────────────────────────────────────────────────── */

function LoginDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 mt-1 z-50 rounded-xl border border-border bg-popover shadow-xl overflow-hidden"
    >
      {LOGIN_MENU.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="flex flex-col gap-0.5 px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors whitespace-nowrap"
        >
          {item.label}
          <span className="text-xs font-normal text-muted-foreground">
            {item.description}
          </span>
        </a>
      ))}
    </motion.div>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────── */

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(null);
  const [activeMobileItem, setActiveMobileItem] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleDropdown = (name: string) =>
    setActiveDropdown((prev) => (prev === name ? null : name));

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveMobileSection(null);
    setActiveMobileItem(null);
  };

  const toggleMobileSection = (id: string) => {
    setActiveMobileSection((prev) => {
      const next = prev === id ? null : id;
      setActiveMobileItem(null);
      return next;
    });
  };

  const toggleMobileItem = (id: string) => {
    setActiveMobileItem((prev) => (prev === id ? null : id));
  };

  return (
    <header ref={navRef} className="fixed top-0 left-0 right-0 z-50">
      {/* ── Main nav ── */}
      <nav
        className={cn(
          "transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background/90 backdrop-blur-sm border-b border-border/50"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="shrink-0" onClick={() => setActiveDropdown(null)}>
            <Image
              src="/logo.png"
              alt="MLS Classes"
              width={130}
              height={52}
              className="h-14 w-auto object-contain"
              style={{ width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {/* Test Preparation */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("test-prep")}
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 text-[0.9rem] font-semibold rounded-md transition-colors",
                  activeDropdown === "test-prep"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                Test Preparation
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "test-prep" && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "test-prep" && (
                  <MegaDropdown
                    items={TEST_PREP_MENU}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Academic Tutoring */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("academic")}
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 text-[0.9rem] font-semibold rounded-md transition-colors",
                  activeDropdown === "academic"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                Academic Tutoring
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    activeDropdown === "academic" && "rotate-180"
                  )}
                />
              </button>
              <AnimatePresence>
                {activeDropdown === "academic" && (
                  <MegaDropdown
                    items={ACADEMIC_MENU}
                    onClose={() => setActiveDropdown(null)}
                  />
                )}
              </AnimatePresence>
            </div>

             {/* About Us */}
             <Link
               href="/about"
               onClick={() => setActiveDropdown(null)}
               className="px-3.5 py-2 text-[0.9rem] font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
             >
               About Us
             </Link>

             {/* Practice Tests */}
             <Link
               href="/mocks"
               onClick={() => setActiveDropdown(null)}
               className="px-3.5 py-2 text-[0.9rem] font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
             >
               Practice Tests
             </Link>

              {/* Student Corner */}
              <Link
                href="/student-corner"
                onClick={() => setActiveDropdown(null)}
                className="px-3.5 py-2 text-[0.9rem] font-semibold text-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
              >
                Student Corner
              </Link>

              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("login")}
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 text-[0.9rem] font-semibold rounded-md transition-colors",
                    activeDropdown === "login"
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  Login
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      activeDropdown === "login" && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {activeDropdown === "login" && (
                    <LoginDropdown
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

           {/* Desktop Actions */}
           <div className="hidden lg:flex items-center gap-3">
             <ThemeToggle />
             <Button asChild size="sm" className="font-bold text-sm px-5 h-9">
               <Link href="/book-trial" onClick={() => setActiveDropdown(null)}>
                 Book Trial
               </Link>
             </Button>
             <SignedOut>
               <Button asChild size="sm" variant="outline" className="font-semibold text-sm px-5 h-9">
                  <Link href="/sign-in" onClick={() => setActiveDropdown(null)}>
                   Sign In
                 </Link>
               </Button>
             </SignedOut>
             <SignedIn>
               <UserButton />
             </SignedIn>
           </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <SignedOut>
              <ThemeToggle />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-border bg-background/98 backdrop-blur-md overflow-hidden"
          >
            <div className="flex max-h-[calc(100vh-4.75rem)] flex-col gap-3 overflow-y-auto px-4 py-4">
              <MobileNavSection
                id="test-prep"
                label="Test Preparation"
                items={TEST_PREP_MENU}
                activeSection={activeMobileSection}
                activeItem={activeMobileItem}
                onToggleSection={toggleMobileSection}
                onToggleItem={toggleMobileItem}
                onNavigate={closeMobileMenu}
              />

              <MobileNavSection
                id="academic"
                label="Academic Tutoring"
                items={ACADEMIC_MENU}
                activeSection={activeMobileSection}
                activeItem={activeMobileItem}
                onToggleSection={toggleMobileSection}
                onToggleItem={toggleMobileItem}
                onNavigate={closeMobileMenu}
              />

              <div className="grid gap-2 rounded-2xl border border-border/70 bg-background/80 p-2 shadow-sm">
                <Link
                  href="/about"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  href="/mocks"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
                >
                  Practice Tests
                </Link>
                <Link
                  href="/student-corner"
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-foreground hover:bg-primary/10 hover:text-primary"
                >
                  Student Corner
                </Link>
              </div>

              <MobileNavSection
                id="login"
                label="Login Portals"
                items={LOGIN_MENU}
                activeSection={activeMobileSection}
                activeItem={activeMobileItem}
                onToggleSection={toggleMobileSection}
                onToggleItem={toggleMobileItem}
                onNavigate={closeMobileMenu}
              />

              <div className="rounded-2xl border border-border/70 bg-muted/40 p-3 shadow-sm">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button asChild className="w-full font-bold" size="default">
                    <Link href="/book-trial" onClick={closeMobileMenu}>
                      Book Free Trial
                    </Link>
                  </Button>
                  <SignedOut>
                    <Button asChild className="w-full font-bold" size="default" variant="outline">
                      <Link href="/sign-in" onClick={closeMobileMenu}>
                        Sign In
                      </Link>
                    </Button>
                  </SignedOut>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-4 border-t border-border/70 pt-4">
                  <a href="https://wa.me/message/XMS5KMWBGQZLG1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2 text-xs font-bold text-primary">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href="https://www.facebook.com/mlsclasses?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><FacebookIcon /></a>
                  <a href="https://www.instagram.com/mlsclasses?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><InstagramIcon /></a>
                  <a href="https://www.youtube.com/@mlsclasses8293?si=KBojcjPosvKjfwjH" target="_blank" rel="noopener noreferrer" className="rounded-full p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary"><YoutubeIcon /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
