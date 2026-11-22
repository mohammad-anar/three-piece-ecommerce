"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { sampleProducts } from "@/data/products";
import ShopSidebar, { FilterState } from "./ShopSidebar";
import ShopProductGrid from "./ShopProductGrid";

interface ShopContentProps {
  initialCategory?: string;
  pageTitle?: string;
}

export default function ShopContent({
  initialCategory = "all",
  pageTitle = "Shop",
}: ShopContentProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    minPrice: 1200,
    maxPrice: 3000,
    selectedSizes: [],
    onSale: false,
    inStock: false,
  });

  const [sortBy, setSortBy] = useState<string>("default");
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      // 1. Category Filter
      if (filters.category !== "all") {
        const matchesCategory = product.categories.some(
          (c) => c.toLowerCase() === filters.category.toLowerCase()
        );
        if (!matchesCategory) return false;
      }

      // 2. Price Filter
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // 3. Size Filter
      if (filters.selectedSizes.length > 0) {
        const hasMatchingSize = product.sizes.some((size) =>
          filters.selectedSizes.includes(size)
        );
        if (!hasMatchingSize) return false;
      }

      // 4. On Sale Filter
      if (filters.onSale && !product.onSale) {
        return false;
      }

      // 5. In Stock Filter
      if (filters.inStock && !product.inStock) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sorted Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case "price-low-high":
        return list.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "latest":
        return list.reverse();
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setFilters({
      category: "all",
      minPrice: 1200,
      maxPrice: 3000,
      selectedSizes: [],
      onSale: false,
      inStock: false,
    });
  };

  return (
    <div className="w-full bg-background pb-20">
      {/* Page Title & Breadcrumb Header */}
      <section className="bg-background-dark text-background py-10 md:py-14 text-center">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide uppercase font-serif mb-2">
            {pageTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs text-background/70 uppercase tracking-widest">
            <Link href="/" className="hover:text-background transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-background">{pageTitle}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Sidebar on Left, Product Grid in Center/Right */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Desktop Sidebar (Image 1 sidebar) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <ShopSidebar
              products={sampleProducts}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="lg:col-span-9 w-full">
            <ShopProductGrid
              products={sortedProducts}
              totalProductsCount={sampleProducts.length}
              filters={filters}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onFilterChange={setFilters}
              onResetFilters={handleResetFilters}
              onOpenMobileFilters={() => setMobileDrawerOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto p-6 bg-background">
          <SheetHeader className="text-left pb-4 border-b border-border mb-6">
            <SheetTitle className="text-base font-bold uppercase tracking-wider text-content font-serif">
              Filters
            </SheetTitle>
          </SheetHeader>
          <ShopSidebar
            products={sampleProducts}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters);
            }}
            onResetFilters={() => {
              handleResetFilters();
              setMobileDrawerOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
