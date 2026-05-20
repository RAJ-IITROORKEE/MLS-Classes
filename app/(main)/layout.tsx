import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import { TopProgress } from "@/components/top-progress";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <TopProgress />
      </Suspense>
      <Navbar />
      <main className="flex-1 pt-[88px] lg:pt-[100px]">{children}</main>
      <Footer />
      <Toaster richColors position="top-right" />
    </>
  );
}
