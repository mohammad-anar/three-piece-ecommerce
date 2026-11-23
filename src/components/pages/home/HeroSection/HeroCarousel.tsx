"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Gift,
  Truck,
  CreditCard,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
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

// Feature badges below hero banner (from reference design)
const heroFeatures = [
  {
    icon: CheckCircle2,
    title: "Premium Quality",
  },
  {
    icon: Gift,
    title: "Easy Return",
  },
  {
    icon: Truck,
    title: "National Delivery",
  },
  {
    icon: CreditCard,
    title: "Safe Payment",
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

  // Render 4 Feature Badges below Hero Banner (matching reference design)
  const renderFeaturesBar = () => (
    <div className="container shrink-0 w-full pt-1 pb-1">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
        {heroFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-3 sm:px-4 border border-border bg-background rounded-xs shadow-2xs hover:border-primary/40 transition-colors"
            >
              <Icon className="w-4 h-4 text-content shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-content tracking-tight whitespace-nowrap">
                {feature.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Single clean banner mode (total height = screen-height - navbar height)
  if (!hasMultipleSlides) {
    const singleSlide = slides[0];
    const BannerContent = (
      <div className="relative w-full max-w-full max-h-full aspect-[1672/941] max-h-[820px] bg-background-surface overflow-hidden rounded-xs">
        <Image
          src={singleSlide.image}
          alt={singleSlide.alt}
          fill
          priority
          sizes="(max-width: 1600px) 100vw, 1600px"
          className="object-contain w-full h-full"
        />
      </div>
    );

    return (
      <section className="w-full bg-background flex flex-col justify-center lg:justify-between py-2 sm:py-3 lg:py-4 gap-2.5 sm:gap-3 lg:gap-2 h-[calc(100dvh-3.5rem)] lg:h-[calc(100dvh-4rem)] overflow-hidden">
        {/* Hero Banner (fills available height up to aspect ratio) */}
        <div className="container flex-1 min-h-0 flex items-center justify-center w-full">
          {singleSlide.link ? (
            <Link
              href={singleSlide.link}
              className="w-full h-full flex items-center justify-center"
            >
              {BannerContent}
            </Link>
          ) : (
            BannerContent
          )}
        </div>

        {/* Feature Badges Section (same width as hero banner) */}
        {renderFeaturesBar()}
      </section>
    );
  }

  // Multi-slide Carousel Mode (if multiple banners are added)
  return (
    <section className="w-full bg-background flex flex-col justify-center lg:justify-between py-2 sm:py-3 lg:py-4 gap-2.5 sm:gap-3 lg:gap-2 h-[calc(100dvh-3.5rem)] lg:h-[calc(100dvh-4rem)] overflow-hidden">
      {/* Carousel Area */}
      <div className="container flex-1 min-h-0 flex items-center justify-center w-full relative">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ loop: true }}
          className="w-full h-full flex items-center justify-center"
        >
          <CarouselContent className="-ml-0 h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-0 h-full flex items-center justify-center">
                <Link
                  href={slide.link || "/shop"}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="relative w-full max-w-full max-h-full aspect-[1672/941] max-h-[820px] bg-background-surface overflow-hidden rounded-xs">
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      priority={slide.id === 1}
                      sizes="(max-width: 1600px) 100vw, 1600px"
                      className="object-contain w-full h-full"
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel Navigation Arrows */}
          <button
            onClick={() => api?.scrollPrev()}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-dark/30 hover:bg-background-dark/60 text-background flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-dark/30 hover:bg-background-dark/60 text-background flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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

      {/* Feature Badges Section (same width as hero banner) */}
      {renderFeaturesBar()}
    </section>
  );
}
