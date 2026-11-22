"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Search, Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const visibleSizes = product.sizes.slice(0, 4);
  const remainingCount = product.sizes.length - visibleSizes.length;
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      size: product.sizes[0] || "34",
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  return (
    <div className="group flex flex-col bg-background text-center transition-all">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background-surface">
        <Link href={`/products/${product.id}`} className="block w-full h-full relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              product.images[1] ? "group-hover:opacity-0" : "group-hover:scale-105"
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          )}
        </Link>

        {/* Floating Action Bar on Hover */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="flex items-center gap-1 bg-background px-3 py-2 shadow-lg border border-border">
            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="p-2 text-content hover:text-primary transition-colors cursor-pointer"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>

            {/* Quick View Search Button */}
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="p-2 text-content hover:text-primary transition-colors cursor-pointer"
              aria-label="Quick View"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              className={cn(
                "p-2 transition-colors cursor-pointer",
                isWishlisted ? "text-primary" : "text-content hover:text-primary"
              )}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("w-4 h-4", isWishlisted && "fill-primary")} />
            </button>
          </div>
        </div>
      </div>

      {/* Details below image */}
      <div className="pt-3 pb-2 flex flex-col items-center">
        {/* Size badges */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-content-body mb-2">
          {visibleSizes.map((size) => (
            <span
              key={size}
              className="px-1.5 py-0.5 rounded-full border border-border bg-background"
            >
              {size}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full border border-border bg-background">
              +{remainingCount}
            </span>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-bold uppercase tracking-wider text-content hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Categories */}
        <p className="text-xs text-content-body mt-0.5 line-clamp-1">
          {product.categories.join(", ")}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-primary mt-1.5">
          ৳ {product.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
        </p>
      </div>
    </div>
  );
}
