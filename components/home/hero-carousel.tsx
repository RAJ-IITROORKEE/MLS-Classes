"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { image: "/carousal.webp", alt: "MLS Classes online tutoring" },
  { image: "/carousal-02.webp", alt: "MLS Classes tutoring banner" },
  { image: "/carousal-03.webp", alt: "MLS Classes learning banner" },
  { image: "/carousal-04.webp", alt: "MLS Classes online classes banner" },
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
      className="relative h-[clamp(170px,30.5vw,625px)] overflow-hidden bg-[#0b55b8]"
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
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center opacity-60 blur-2xl"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {SLIDES.length > 1 && (
        <>
          {/* Prev/Next arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-2 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/35 sm:left-5 sm:h-11 sm:w-11 sm:bg-white/15 sm:hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-2 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-black/35 sm:right-5 sm:h-11 sm:w-11 sm:bg-white/15 sm:hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/15 px-2 py-1 backdrop-blur-sm sm:bottom-5 sm:gap-2 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "h-1.5 w-5 bg-white sm:h-2.5 sm:w-8"
                  : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80 sm:h-2.5 sm:w-2.5"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
