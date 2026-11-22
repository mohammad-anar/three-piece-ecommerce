"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type PromoBanner = {
  id: number;
  label: string;
  headline: string;
  ctaText: string;
  ctaLink: string;
  bgClass: string;
};

const banners: PromoBanner[] = [
  {
    id: 1,
    label: "NEW SEASON",
    headline: "Three Piece\nCollection",
    ctaText: "Shop Now",
    ctaLink: "/collections/three-piece",
    bgClass: "bg-primary",
  },
  {
    id: 2,
    label: "BEST SELLERS",
    headline: "New Arrivals\nThis Week",
    ctaText: "Explore",
    ctaLink: "/collections/new-arrivals",
    bgClass: "bg-secondary",
  },
  {
    id: 3,
    label: "SPECIAL OFFER",
    headline: "Up to 30% Off\nSelected Items",
    ctaText: "Grab Deal",
    ctaLink: "/shop",
    bgClass: "bg-background-dark",
  },
];

const bannerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const bannerItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function PromoBanners() {
  return (
    <section className="bg-background-surface py-12 overflow-hidden">
      <div className="container">
        <motion.div
          variants={bannerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {banners.map((banner) => (
            <motion.div key={banner.id} variants={bannerItemVariants}>
              <Link href={banner.ctaLink} className="group block h-full">
                <div
                  className={cn(
                    "relative h-[300px] md:h-[380px] overflow-hidden flex flex-col justify-end p-8 transition-transform duration-500 group-hover:-translate-y-1 shadow-sm group-hover:shadow-lg",
                    banner.bgClass
                  )}
                >
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-content-inverse/5 -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-content-inverse/5 translate-y-10 -translate-x-10 group-hover:scale-150 transition-transform duration-700" />

                  {/* Content */}
                  <div className="relative z-10">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-content-inverse/70 mb-3">
                      {banner.label}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-content-inverse mb-6 whitespace-pre-line leading-tight">
                      {banner.headline}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-content-inverse border-b border-content-inverse/40 pb-0.5 group-hover:border-content-inverse group-hover:gap-3 transition-all">
                      {banner.ctaText}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
