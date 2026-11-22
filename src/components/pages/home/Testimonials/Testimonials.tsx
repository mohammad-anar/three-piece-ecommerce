"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  initials: string;
  rating: number;
  review: string;
  location: string;
};

const testimonials: Testimonial[] = [
  { id: 1, name: "Fatima Begum", avatar: "", initials: "FB", rating: 5, review: "Amazing quality! The fabric is so soft and the embroidery is absolutely beautiful. Received so many compliments. Will definitely order again from Zanass!", location: "Dhaka" },
  { id: 2, name: "Nasrin Akter", avatar: "", initials: "NA", rating: 5, review: "Fast delivery and the product matched exactly what was shown in the picture. Very happy with my purchase. Highly recommend!", location: "Chittagong" },
  { id: 3, name: "Sumaiya Khan", avatar: "", initials: "SK", rating: 4, review: "Great value for money. The sizes are accurate and the stitching is perfect. The colours are vibrant and do not fade after washing.", location: "Sylhet" },
  { id: 4, name: "Roksana Islam", avatar: "", initials: "RI", rating: 5, review: "Ordered the three-piece set for Eid and I absolutely loved it! Perfect fit, gorgeous design. Everyone kept asking where I bought it from.", location: "Rajshahi" },
  { id: 5, name: "Nusrat Jahan", avatar: "", initials: "NJ", rating: 5, review: "Excellent customer service and beautiful clothing. The packaging was lovely and the fabric quality exceeded my expectations. 5 stars!", location: "Khulna" },
  { id: 6, name: "Mehnaz Parveen", avatar: "", initials: "MP", rating: 5, review: "I have been shopping from Zanass for two years and they never disappoint. Best ethnic wear brand in Bangladesh hands down!", location: "Comilla" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating ? "fill-warning text-warning" : "fill-border text-border"
          )}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="bg-background py-16 overflow-hidden">
      <div className="container">
        {/* Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-2">
            Real Feedback
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-content mb-2 font-serif">
            Happy Customers
          </h2>
          <p className="text-content-body text-sm md:text-base">
            Over <span className="font-semibold text-primary">1,200+</span> satisfied customers across Bangladesh
          </p>
          <div className="flex items-center justify-center gap-1 mt-3">
            <StarRating rating={5} />
            <span className="text-sm text-content-body ml-2">4.9 / 5 average rating</span>
          </div>
        </motion.div>

        {/* Carousel with subtle fade in */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true, align: "start" }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full p-8 bg-background-surface border border-border flex flex-col justify-between space-y-4 hover:border-primary/40 transition-colors">
                    <div className="space-y-3">
                      <StarRating rating={t.rating} />
                      <p className="text-sm text-content-body leading-relaxed italic">
                        &ldquo;{t.review}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <Avatar className="w-10 h-10 border border-border">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                          {t.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-content">
                          {t.name}
                        </p>
                        <p className="text-[11px] text-content-muted">
                          Verified Buyer, {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
