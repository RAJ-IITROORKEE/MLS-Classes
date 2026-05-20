"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { image: "https://www.mlsclasses.com/static/slider1.jpg", alt: "MLS Classes tutoring session" },
  { image: "https://www.mlsclasses.com/static/slider4.jpg", alt: "Digital SAT preparation" },
  { image: "https://www.mlsclasses.com/static/slider5.jpg", alt: "Math and science tutoring" },
  { image: "https://www.mlsclasses.com/static/slider2.jpg", alt: "US curriculum tutoring" },
  { image: "https://www.mlsclasses.com/static/slider6.png", alt: "AP exam preparation" },
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
      className="relative h-[75vh] min-h-[460px] overflow-hidden"
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
              {/* Background image — no scaling, just cover */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* 20% dark overlay */}
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === selectedIndex
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
