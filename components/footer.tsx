import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

// Social icons as simple SVG components (lucide-react v1.x doesn't include brand icons)
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
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.04 3.2C9.02 3.2 3.32 8.88 3.32 15.88c0 2.24.58 4.43 1.7 6.36L3.2 28.8l6.74-1.77a12.72 12.72 0 0 0 6.09 1.55h.01c7.01 0 12.72-5.69 12.72-12.69S23.05 3.2 16.04 3.2Zm0 23.23h-.01c-1.88 0-3.72-.5-5.33-1.46l-.38-.23-4 .95 1.07-3.8-.25-.39a10.47 10.47 0 0 1-1.61-5.62c0-5.81 4.72-10.53 10.52-10.53 2.81 0 5.45 1.1 7.44 3.08a10.46 10.46 0 0 1 3.08 7.45c0 5.8-4.72 10.52-10.53 10.52Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.76.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

const COMPANY_LINKS = [
  { label: "About Us", href: "/#about" },
  { label: "Sitemap", href: "/sitemap" },
];

const REACH_LINKS = [
  { label: "ritik@mlsclasses.com", href: "mailto:ritik@mlsclasses.com" },
  { label: "Contact us", href: "/contact-us" },
];

const RESOURCE_LINKS = [
  { label: "Blogs", href: "/blogs" },
  { label: "Resource Center", href: "/resource-center" },
  { label: "Affiliates", href: "/affiliates" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mlsclasses?mibextid=ZbWKwL",
    icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/mlsclasses?utm_source=ig_web_button_share_sheet",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/online-tutor-usa/",
    icon: LinkedinIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@mlsclasses8293?si=KBojcjPosvKjfwjH",
    icon: YoutubeIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/message/XMS5KMWBGQZLG1",
    icon: WhatsAppIcon,
  },
];

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cancellation & Refund", href: "/cancellation-refund" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="space-y-4 text-center sm:text-left lg:col-span-2">
            <Link href="/" className="flex items-center justify-center sm:justify-start">
              <Image
                src="/logo.png"
                alt="MLS Classes"
                width={160}
                height={64}
                className="h-14 w-auto object-contain sm:h-16"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mx-auto max-w-md text-sm leading-relaxed text-zinc-400 sm:mx-0 sm:max-w-sm">
              MLS Classes offers Live, Online 1-1 Personalized Tutoring of Math,
              English (ELA), Science, Coding and SAT, ACT, AP, Digital SSAT,
              STAAR, AMC, GCSE, A-level, IGCSE, IB and NAPLAN Classes for
              students in grades K-12.
            </p>
            <div className="flex items-center justify-center gap-3 sm:justify-start">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Theme
              </span>
              <div className="rounded-full border border-zinc-800 bg-zinc-900 text-zinc-100">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Company */}
          <div className="border-t border-zinc-800 pt-5 sm:border-0 sm:pt-0">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-3 space-y-1.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-center gap-2 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <span className="text-primary opacity-60 group-hover:opacity-100">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Reach Us */}
          <div className="border-t border-zinc-800 pt-5 sm:border-0 sm:pt-0">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Reach us
            </h3>
            <ul className="mt-3 space-y-1.5">
              {REACH_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex min-w-0 items-center justify-center gap-2 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <span className="text-primary opacity-60 group-hover:opacity-100">›</span>
                    <span className="min-w-0 break-words">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Resources */}
          <div className="border-t border-zinc-800 pt-5 sm:border-0 sm:pt-0">
            <h3 className="font-semibold text-white text-sm uppercase tracking-wider">
              Other Resources
            </h3>
            <ul className="mt-3 space-y-1.5">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-center gap-2 py-1.5 text-sm text-zinc-400 transition-colors hover:text-white sm:justify-start"
                  >
                    <span className="text-primary opacity-60 group-hover:opacity-100">›</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Follow Us */}
        <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-8 sm:flex sm:items-center sm:justify-between lg:px-0">
          <div className="text-center sm:text-left">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white sm:normal-case sm:tracking-normal">Follow us</p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary bg-primary text-primary-foreground shadow-[0_0_22px_color-mix(in_srgb,var(--theme-color)_45%,transparent)] transition-all duration-200 hover:scale-105 hover:shadow-[0_0_28px_color-mix(in_srgb,var(--theme-color)_60%,transparent)]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-start sm:gap-5">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-wider text-zinc-500 transition-colors hover:text-zinc-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="text-xs leading-relaxed text-zinc-600">
              Copyright &copy; {new Date().getFullYear()} All Rights Reserved{" "}
              <span className="font-semibold text-zinc-400">MLSCLASSES.COM</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
