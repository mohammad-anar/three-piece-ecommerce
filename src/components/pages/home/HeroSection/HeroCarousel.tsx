"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: number;
  image: string;
  alt: string;
  link?: string;
};

// Hero banner images matching aspect ratio (1672:941)
const slides: HeroSlide[] = [
  {
    id: 1,
    image: "/hero/tahzee.jpg",
    alt: "Tahzee New Ethnic Collection Banner",
    link: "/shop",
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

  const hasMultipleSlides = slides.length > 1;

  // Single clean banner mode (full container width, max-height 820px, strict 1672:941 aspect ratio)
  if (!hasMultipleSlides) {
    const singleSlide = slides[0];
    const BannerContent = (
      <div className="relative w-full aspect-[1672/941] max-h-[820px] bg-background-surface overflow-hidden">
        <Image
          src={singleSlide.image}
          alt={singleSlide.alt}
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-cover w-full h-full"
        />
      </div>
    );

    return (
      <section className="w-full bg-background py-3 md:py-5">
        <div className="container">
          {singleSlide.link ? (
            <Link href={singleSlide.link} className="block w-full">
              {BannerContent}
            </Link>
          ) : (
            BannerContent
          )}
        </div>
      </section>
    );
  }

  // Multi-slide Carousel Mode (if additional banners are added)
  return (
    <section className="w-full bg-background py-3 md:py-5">
      <div className="container relative">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0">
                <Link href={slide.link || "/shop"} className="block w-full">
                  <div className="relative w-full aspect-[1672/941] max-h-[820px] bg-background-surface overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={slide.id === 1}
                      sizes="(max-width: 1600px) 100vw, 1600px"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-dark/30 hover:bg-background-dark/60 text-background flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-dark/30 hover:bg-background-dark/60 text-background flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
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
                    ? "w-8 bg-primary"
                    : "w-2 bg-background-dark/40 hover:bg-background-dark/70"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}
