"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import QuickViewModal from "@/components/shared/Modals/QuickViewModal";
import { sampleProducts, Product } from "@/data/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

export default function ProductTabs() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const bestCollections = sampleProducts;
  const newArrivals = sampleProducts.filter((p) => p.categories.includes("New Arrivals"));
  const threePiece = sampleProducts.filter((p) => p.categories.includes("Three Piece"));

  return (
    <section className="bg-background py-16">
      <div className="container">
        {/* Section Header with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-primary block mb-2">
            Curated Styles
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-content mb-2 font-serif">
            Best Collections
          </h2>
          <p className="text-content-body max-w-xl mx-auto text-sm md:text-base">
            Handpicked ethnic wear — crafted with perfection for you
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="best-collections" className="w-full">
          <div className="w-full flex justify-start sm:justify-center overflow-x-auto no-scrollbar mb-8 border-b border-border">
            <TabsList className="bg-transparent h-auto p-0 gap-3 sm:gap-6 flex-nowrap inline-flex min-w-max">
              <TabsTrigger
                value="best-collections"
                className="whitespace-nowrap shrink-0 text-xs sm:text-sm font-semibold uppercase tracking-wider py-2.5 px-3 sm:px-4 cursor-pointer"
              >
                Best Collections
              </TabsTrigger>
              <TabsTrigger
                value="new-arrivals"
                className="whitespace-nowrap shrink-0 text-xs sm:text-sm font-semibold uppercase tracking-wider py-2.5 px-3 sm:px-4 cursor-pointer"
              >
                New Arrivals
              </TabsTrigger>
              <TabsTrigger
                value="three-piece"
                className="whitespace-nowrap shrink-0 text-xs sm:text-sm font-semibold uppercase tracking-wider py-2.5 px-3 sm:px-4 cursor-pointer"
              >
                Three Piece
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Best Collections Tab Content */}
          <TabsContent value="best-collections">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {bestCollections.map((product) => (
                <motion.div key={product.id} variants={cardItemVariants}>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* New Arrivals Tab Content */}
          <TabsContent value="new-arrivals">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {newArrivals.map((product) => (
                <motion.div key={product.id} variants={cardItemVariants}>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Three Piece Tab Content */}
          <TabsContent value="three-piece">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {threePiece.map((product) => (
                <motion.div key={product.id} variants={cardItemVariants}>
                  <ProductCard
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* View All CTA with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link href="/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-fg gap-2 uppercase tracking-wide font-semibold rounded-none transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
