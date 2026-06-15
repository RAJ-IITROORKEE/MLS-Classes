import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { TopProgress } from "@/components/top-progress";
import { WhatsAppStickyButton } from "@/components/whatsapp-sticky-button";
import { AdminAccessToast } from "@/components/admin-access-toast";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <TopProgress />
        <AdminAccessToast />
      </Suspense>
      <Navbar />
      <main className="flex-1 pt-[88px] lg:pt-[100px]">{children}</main>
      <Footer />
      <WhatsAppStickyButton />
      <Toaster richColors position="top-right" />
    </>
  );
}
