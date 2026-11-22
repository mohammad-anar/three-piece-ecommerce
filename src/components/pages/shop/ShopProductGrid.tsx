"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Product } from "@/data/products";
import ProductCard from "@/components/pages/home/ProductTabs/ProductCard";
import QuickViewModal from "@/components/shared/Modals/QuickViewModal";
import { FilterState } from "./ShopSidebar";

interface ShopProductGridProps {
  products: Product[];
  totalProductsCount: number;
  filters: FilterState;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  onOpenMobileFilters: () => void;
}

export default function ShopProductGrid({
  products,
  totalProductsCount,
  filters,
  sortBy,
  onSortChange,
  onFilterChange,
  onResetFilters,
  onOpenMobileFilters,
}: ShopProductGridProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const removeSize = (size: string) => {
    onFilterChange({
      ...filters,
      selectedSizes: filters.selectedSizes.filter((s) => s !== size),
    });
  };

  const removeCategory = () => {
    onFilterChange({
      ...filters,
      category: "all",
    });
  };

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.maxPrice < 3000 ||
    filters.selectedSizes.length > 0 ||
    filters.onSale ||
    filters.inStock;

  return (
    <div className="w-full space-y-6">
      {/* Top Filter & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        {/* Results count & mobile trigger */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border text-xs uppercase font-bold tracking-wider text-content hover:bg-background-surface transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-primary" />
            Filters
          </button>

          <span className="text-xs md:text-sm text-content-body">
            Showing <strong className="text-content">{products.length}</strong> of{" "}
            <strong className="text-content">{totalProductsCount}</strong> results
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <label htmlFor="shop-sort" className="text-xs text-content-body font-medium hidden md:inline">
            Sort by:
          </label>
          <select
            id="shop-sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs border border-border bg-background text-content px-3 py-2 rounded-none focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="default">Default sorting</option>
            <option value="latest">Sort by latest</option>
            <option value="price-low-high">Sort by price: low to high</option>
            <option value="price-high-low">Sort by price: high to low</option>
            <option value="rating">Sort by rating</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs text-content-body mr-1">Active:</span>

          {/* Category Chip */}
          {filters.category !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background-surface border border-border text-content">
              Category: <strong className="capitalize">{filters.category}</strong>
              <button
                type="button"
                onClick={removeCategory}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Price Range Chip */}
          {filters.maxPrice < 3000 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background-surface border border-border text-content">
              Max: <strong>৳ {filters.maxPrice.toLocaleString()}</strong>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, maxPrice: 3000 })}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Size Chips */}
          {filters.selectedSizes.map((size) => (
            <span
              key={size}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background-surface border border-border text-content"
            >
              Size: <strong>{size}</strong>
              <button
                type="button"
                onClick={() => removeSize(size)}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {/* On Sale Chip */}
          {filters.onSale && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background-surface border border-border text-content">
              <strong>On sale</strong>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, onSale: false })}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* In Stock Chip */}
          {filters.inStock && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-background-surface border border-border text-content">
              <strong>In stock</strong>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filters, inStock: false })}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {/* Clear All */}
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-primary underline ml-2 cursor-pointer font-medium hover:text-primary-hover"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center border border-dashed border-border bg-background-surface/50 p-8 space-y-4">
          <h3 className="text-lg font-bold text-content">No products match your criteria</h3>
          <p className="text-xs md:text-sm text-content-body max-w-md mx-auto">
            Try adjusting your price range, selected sizes, or removing category filters to see more results.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-block bg-primary text-primary-fg hover:bg-primary-hover px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
