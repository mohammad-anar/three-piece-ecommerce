"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { ALL_SIZES, Product } from "@/data/products";
import { cn } from "@/lib/utils";

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  selectedSizes: string[];
  onSale: boolean;
  inStock: boolean;
}

interface ShopSidebarProps {
  products: Product[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  className?: string;
  isMobileDrawer?: boolean;
}

export default function ShopSidebar({
  products,
  filters,
  onFilterChange,
  onResetFilters,
  className,
}: ShopSidebarProps) {
  // Available categories
  const categories = [
    { label: "All Categories", value: "all" },
    { label: "Three Piece", value: "Three Piece" },
    { label: "Two Piece", value: "Two Piece" },
    { label: "New Arrivals", value: "New Arrivals" },
    { label: "Best Collections", value: "Best Collections" },
  ];

  // Helper to calculate product count for a category
  const getCategoryCount = (val: string) => {
    if (val === "all") return products.length;
    return products.filter((p) => p.categories.includes(val)).length;
  };

  // Helper to calculate product count for a size
  const getSizeCount = (size: string) => {
    return products.filter((p) => p.sizes.includes(size)).length;
  };

  // Top rated products
  const topRatedProducts = products.filter((p) => p.isTopRated).slice(0, 3);

  // Price boundary
  const minPossiblePrice = 1200;
  const maxPossiblePrice = 3000;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    onFilterChange({
      ...filters,
      maxPrice: newMax,
    });
  };

  const toggleSize = (size: string) => {
    const isSelected = filters.selectedSizes.includes(size);
    const updated = isSelected
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({
      ...filters,
      selectedSizes: updated,
    });
  };

  const handleCategorySelect = (val: string) => {
    onFilterChange({
      ...filters,
      category: val,
    });
  };

  const isFiltered =
    filters.category !== "all" ||
    filters.maxPrice < maxPossiblePrice ||
    filters.selectedSizes.length > 0 ||
    filters.onSale ||
    filters.inStock;

  return (
    <aside className={cn("w-full space-y-8 text-content", className)}>
      {/* Reset button if filtered */}
      {isFiltered && (
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="text-xs uppercase font-bold tracking-wider text-content">
            Active Filters
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-primary hover:underline font-semibold cursor-pointer"
          >
            Reset All
          </button>
        </div>
      )}

      {/* 1. CATEGORIES FILTER */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-content font-serif border-b border-border pb-2">
          Categories
        </h3>
        <ul className="space-y-2 text-sm">
          {categories.map((cat) => {
            const isSelected = filters.category === cat.value;
            const count = getCategoryCount(cat.value);
            return (
              <li key={cat.value}>
                <button
                  type="button"
                  onClick={() => handleCategorySelect(cat.value)}
                  className={cn(
                    "w-full flex items-center justify-between py-1 transition-colors text-left cursor-pointer group",
                    isSelected
                      ? "text-primary font-bold"
                      : "text-content-body hover:text-content"
                  )}
                >
                  <span className="capitalize group-hover:text-primary transition-colors">
                    {cat.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full border border-border text-content-body">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 2. FILTER BY PRICE (Exact design from 1st image) */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold uppercase tracking-wider text-content font-serif">
          Filter by price
        </h3>

        {/* Maroon Slider Track */}
        <div className="space-y-3">
          <input
            type="range"
            min={minPossiblePrice}
            max={maxPossiblePrice}
            step={50}
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full accent-primary h-1.5 bg-border rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-xs md:text-sm text-content">
              Price: <strong className="font-bold">৳ {filters.minPrice.toLocaleString()}</strong> —{" "}
              <strong className="font-bold">৳ {filters.maxPrice.toLocaleString()}</strong>
            </span>
            <button
              type="button"
              className="bg-primary hover:bg-primary-hover text-primary-fg text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-none shadow-xs cursor-pointer transition-colors"
            >
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-6" />

      {/* 3. FILTER BY SIZE (Exact design from 1st image) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-content font-serif">
          Filter by size
        </h3>

        {/* Scrollable / Stacked size list */}
        <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5">
          {ALL_SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            const count = getSizeCount(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className="w-full flex items-center justify-between text-left py-0.5 cursor-pointer group"
              >
                {/* Circular Badge for Size */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all",
                    isSelected
                      ? "bg-primary text-primary-fg ring-2 ring-primary ring-offset-1"
                      : "border border-border text-content bg-background group-hover:border-primary"
                  )}
                >
                  {size}
                </div>

                {/* Right side count pill */}
                <span className="text-xs px-3 py-1 rounded-full border border-border text-content-body min-w-[28px] text-center">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-border pt-6" />

      {/* 4. STOCK STATUS (Exact design from 1st image) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-content font-serif">
          Stock Status
        </h3>

        <div className="space-y-3 text-sm">
          {/* On sale */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div
              className={cn(
                "w-4 h-4 border transition-colors flex items-center justify-center rounded-xs",
                filters.onSale
                  ? "bg-primary border-primary text-primary-fg"
                  : "border-border bg-background group-hover:border-primary"
              )}
              onClick={() => onFilterChange({ ...filters, onSale: !filters.onSale })}
            >
              {filters.onSale && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              onClick={() => onFilterChange({ ...filters, onSale: !filters.onSale })}
              className="text-content-body group-hover:text-content text-sm"
            >
              On sale
            </span>
          </label>

          {/* In stock */}
          <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div
              className={cn(
                "w-4 h-4 border transition-colors flex items-center justify-center rounded-xs",
                filters.inStock
                  ? "bg-primary border-primary text-primary-fg"
                  : "border-border bg-background group-hover:border-primary"
              )}
              onClick={() => onFilterChange({ ...filters, inStock: !filters.inStock })}
            >
              {filters.inStock && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span
              onClick={() => onFilterChange({ ...filters, inStock: !filters.inStock })}
              className="text-content-body group-hover:text-content text-sm"
            >
              In stock
            </span>
          </label>
        </div>
      </div>

      <div className="border-t border-border pt-6" />

      {/* 5. TOP RATED PRODUCTS (Exact design from 1st image) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-content font-serif">
          Top Rated Products
        </h3>

        <div className="space-y-4">
          {topRatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <div className="relative w-16 h-20 shrink-0 border border-border overflow-hidden bg-background-surface">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-wider uppercase text-content group-hover:text-primary transition-colors">
                  {product.name}
                </h4>
                <div className="text-sm font-bold text-primary">
                  ৳ {product.price.toLocaleString()}.0
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
