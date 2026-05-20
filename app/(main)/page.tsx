import { HeroCarousel } from "@/components/home/hero-carousel";
import { HeroContentSection } from "@/components/home/hero-content-section";
import { ProgramsSection } from "@/components/home/programs-section";
import { FeaturesSection } from "@/components/home/features-section";
import { LiveClassesSection } from "@/components/home/live-classes-section";
import { YoutubeSection } from "@/components/home/youtube-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FAQSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <HeroContentSection />
      <ProgramsSection />
      <FeaturesSection />
      <LiveClassesSection />
      <YoutubeSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
