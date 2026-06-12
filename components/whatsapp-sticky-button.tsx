"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_URL = "https://api.whatsapp.com/message/XMS5KMWBGQZLG1?autoload=1&app_absent=0";

const HIDDEN_PATHS = [/^\/dashboard(?:\/|$)/, /^\/mocks\/[^/]+\/(?:start|attempt)(?:\/|$)/];

export function WhatsAppStickyButton() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((pattern) => pattern.test(pathname))) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with MLS Classes on WhatsApp"
      className="whatsapp-attention fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-2.5 text-white shadow-lg shadow-black/20 ring-1 ring-white/30 transition duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-5 sm:right-5 sm:pr-3"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#25D366] sm:h-9 sm:w-9">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="currentColor"
        >
          <path d="M16.04 3.2C9.02 3.2 3.32 8.88 3.32 15.88c0 2.24.58 4.43 1.7 6.36L3.2 28.8l6.74-1.77a12.72 12.72 0 0 0 6.09 1.55h.01c7.01 0 12.72-5.69 12.72-12.69S23.05 3.2 16.04 3.2Zm0 23.23h-.01c-1.88 0-3.72-.5-5.33-1.46l-.38-.23-4 .95 1.07-3.8-.25-.39a10.47 10.47 0 0 1-1.61-5.62c0-5.81 4.72-10.53 10.52-10.53 2.81 0 5.45 1.1 7.44 3.08a10.46 10.46 0 0 1 3.08 7.45c0 5.8-4.72 10.52-10.53 10.52Zm5.77-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.1-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.18-.31-.02-.48.14-.64.14-.14.32-.37.47-.55.16-.18.21-.31.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.4-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.23 3.4 5.4 4.76.75.32 1.34.52 1.8.66.76.24 1.45.21 2 .13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.14-.29-.22-.61-.38Z" />
        </svg>
      </span>
      <span className="hidden text-xs font-semibold leading-tight sm:block">
        Chat on
        <br />
        WhatsApp
      </span>
    </a>
  );
}
