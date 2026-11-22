"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: (typeof wishlist)[0]) => {
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
    <div className="w-full bg-background pb-20">
      {/* Top Banner (Exactly as screenshot) */}
      <div className="w-full bg-background-dark py-12 md:py-16 text-center">
        <div className="container">
          <h1 className="text-3xl md:text-5xl font-bold text-content-inverse tracking-wide">
            Wishlist
          </h1>
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-content-inverse/70 mt-3">
            <Link href="/" className="hover:text-content-inverse transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-content-inverse font-semibold">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-12">
        {wishlist.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-border bg-background-surface max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-content">This wishlist is empty.</h2>
            <p className="text-sm text-content-body max-w-md mx-auto">
              You don&apos;t have any products in the wishlist yet. You will find a lot of interesting products on our &ldquo;Shop&rdquo; page.
            </p>
            <Link href="/shop" className="inline-block mt-4">
              <Button className="bg-primary text-primary-fg hover:bg-primary-hover uppercase tracking-wider text-xs font-bold px-8 py-5 rounded-none">
                Return To Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="border border-border bg-background overflow-x-auto shadow-xs">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-background-surface text-xs uppercase tracking-wider text-content font-bold">
                  <th className="py-4 px-4 w-12 text-center"></th>
                  <th className="py-4 px-4 w-24"></th>
                  <th className="py-4 px-4">Product Name</th>
                  <th className="py-4 px-4">Unit Price</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {wishlist.map((product) => (
                  <tr key={product.id} className="hover:bg-background-surface/50 transition-colors">
                    {/* Remove Icon */}
                    <td className="py-4 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-content-muted hover:text-danger transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Image */}
                    <td className="py-4 px-4">
                      <div className="relative w-16 h-20 border border-border bg-background-surface overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-4 px-4">
                      <Link
                        href={`/products/${product.id}`}
                        className="font-bold text-content hover:text-primary transition-colors uppercase text-sm block"
                      >
                        {product.name}
                      </Link>
                      <span className="text-xs text-content-body mt-0.5 block">
                        {product.categories.join(", ")}
                      </span>
                    </td>

                    {/* Unit Price */}
                    <td className="py-4 px-4 font-bold text-primary whitespace-nowrap">
                      ৳ {product.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-semibold text-success flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-success" />
                        In Stock
                      </span>
                    </td>

                    {/* Add to Cart Action */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="bg-primary text-primary-fg hover:bg-primary-hover uppercase tracking-wider text-xs font-bold px-6 py-2.5 rounded-none cursor-pointer inline-flex items-center gap-2"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Add To Cart
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
