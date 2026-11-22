"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Slide = {
  id: number;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgClass: string;
  accentClass: string;
};

const slides: Slide[] = [
  {
    id: 1,
    headline: "New Season Collection",
    subtitle: "Discover our latest ethnic wear — crafted with love, designed for you.",
    ctaText: "Shop Now",
    ctaLink: "/shop",
    bgClass: "bg-primary",
    accentClass: "bg-primary-hover",
  },
  {
    id: 2,
    headline: "Three Piece Sets",
    subtitle: "Elegance meets comfort — explore our premium three-piece collections.",
    ctaText: "View Collection",
    ctaLink: "/collections/three-piece",
    bgClass: "bg-secondary",
    accentClass: "bg-secondary-hover",
  },
  {
    id: 3,
    headline: "Special Festive Offer",
    subtitle: "Up to 30% off on selected items. Limited time — grab yours today!",
    ctaText: "Grab Deal",
    ctaLink: "/shop",
    bgClass: "bg-background-dark",
    accentClass: "bg-secondary",
  },
];

export default function HeroCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <section className="w-full relative overflow-hidden">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide, index) => {
            const isActive = current === index;
            return (
              <CarouselItem key={slide.id} className="pl-0">
                <div className={cn("relative w-full min-h-[500px] md:min-h-[600px] flex items-center", slide.bgClass)}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-content-inverse/20 blur-3xl" />
                    <div className="absolute bottom-10 left-20 w-64 h-64 rounded-full bg-content-inverse/10 blur-2xl" />
                  </div>

                  {/* Content with Framer Motion */}
                  <div className="container relative z-10 py-20">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={`slide-${slide.id}`}
                          initial={{ opacity: 0, y: 25 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                          className="max-w-2xl"
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-block text-xs font-semibold uppercase tracking-widest text-content-inverse/70 mb-4 border border-content-inverse/30 px-3.5 py-1"
                          >
                            New Collection
                          </motion.span>

                          <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-content-inverse leading-tight mb-6"
                          >
                            {slide.headline}
                          </motion.h1>

                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-base md:text-lg text-content-inverse/85 mb-10 max-w-lg leading-relaxed"
                          >
                            {slide.subtitle}
                          </motion.p>

                          <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex flex-wrap gap-4"
                          >
                            <Link href={slide.ctaLink}>
                              <Button
                                size="lg"
                                className="bg-content-inverse text-content hover:bg-content-inverse/90 font-semibold uppercase tracking-wide px-8 rounded-none transition-transform hover:scale-105 active:scale-95"
                              >
                                {slide.ctaText}
                              </Button>
                            </Link>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => api?.scrollPrev()}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-content-inverse/20 hover:bg-content-inverse/40 text-content-inverse flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => api?.scrollNext()}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-content-inverse/20 hover:bg-content-inverse/40 text-content-inverse flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "h-2 transition-all rounded-full cursor-pointer",
                current === i
                  ? "w-8 bg-content-inverse"
                  : "w-2 bg-content-inverse/40 hover:bg-content-inverse/70"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
