"use client";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    subtitle: "On all orders over ৳999",
  },
  {
    icon: RotateCcw,
    title: "Easy Return",
    subtitle: "30-day hassle-free returns",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    subtitle: "100% safe & encrypted checkout",
  },
];

const stripContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stripItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function FeatureStrip() {
  return (
    <section className="bg-primary py-10 overflow-hidden">
      <div className="container">
        <motion.div
          variants={stripContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-fg/20"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={stripItemVariants}
                className="flex items-center gap-4 md:justify-center px-6 py-4 md:py-0"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary-fg/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-fg" />
                </div>
                <div>
                  <p className="text-base font-bold text-primary-fg">{feature.title}</p>
                  <p className="text-sm text-primary-fg/75">{feature.subtitle}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
