"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth progressive increment
        const next = prev + Math.floor(Math.random() * 15) + 10;
        return next > 100 ? 100 : next;
      });
    }, 120);

    // Complete loading after ~1.6s
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "unset";
    }, 1700);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-preloader"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background-dark select-none"
        >
          {/* Ambient Luxury Background Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.25 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full bg-primary blur-[100px]"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
            {/* Monogram / Crest Icon with rotating pulse */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative mb-6"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10 shadow-lg backdrop-blur-xs">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/30"
              />
            </motion.div>

            {/* Brand Title with elegant tracking animation */}
            <motion.h1
              initial={{ opacity: 0, y: 15, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.45em" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-extrabold uppercase text-background tracking-[0.45em] ml-2 font-serif"
            >
              ZANASS
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-xs md:text-sm uppercase tracking-[0.25em] text-background/60 mt-3 font-medium"
            >
              Elevating Elegance · Empowering You
            </motion.p>

            {/* Slim Minimalist Progress Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-background/15 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>

            {/* Progress Percentage Indicator */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-[11px] font-mono text-background/50 mt-3 tracking-widest"
            >
              {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
