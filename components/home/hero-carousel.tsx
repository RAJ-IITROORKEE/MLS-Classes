"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { image: "/carousal.webp", alt: "MLS Classes online tutoring" },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section
      className="relative h-[clamp(220px,58vw,360px)] overflow-hidden bg-[#0b55b8] sm:h-[70vh] sm:min-h-[460px] lg:h-[75vh]"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      {/* Embla viewport — must be exactly full width */}
      <div ref={emblaRef} className="w-full h-full overflow-hidden">
        <div className="flex h-full" style={{ touchAction: "pan-y" }}>
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className="relative h-full shrink-0"
              style={{ flex: "0 0 100vw", width: "100vw" }}
            >
              {/* Mobile uses contain so the text baked into the banner is never cut off. */}
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-80 blur-xl sm:hidden"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div
                className="absolute inset-0 bg-contain bg-center bg-no-repeat sm:bg-cover"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-black/10 sm:bg-black/20" />
            </div>
          ))}
        </div>
      </div>

      {SLIDES.length > 1 && (
        <>
          {/* Prev/Next arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/30 sm:left-5 sm:h-11 sm:w-11"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white/30 sm:right-5 sm:h-11 sm:w-11"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "h-2.5 w-8 bg-white"
                  : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
