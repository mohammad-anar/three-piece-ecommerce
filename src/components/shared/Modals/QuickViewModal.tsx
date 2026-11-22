"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("34");
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) return null;

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
      quantity,
    });
    onClose();
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      size: selectedSize,
      price: product.price,
      image: product.images[0],
      quantity,
    });
    onClose();
    router.push("/checkout");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background border border-border sm:rounded-none">
        <DialogTitle className="sr-only">{product.name} Quick View</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative aspect-[3/4] w-full bg-background-surface overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Right: Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh]">
            <div className="space-y-4">
              {/* Title & Price */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-content">
                  {product.name}
                </h2>
                <p className="text-xl md:text-2xl font-bold text-primary mt-2">
                  ৳ {product.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                </p>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-sm font-semibold text-content">Size:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "w-9 h-9 rounded-full text-xs font-semibold border transition-all flex items-center justify-center cursor-pointer",
                          isSelected
                            ? "bg-primary text-primary-fg border-primary shadow-xs"
                            : "bg-background text-content border-border hover:border-primary hover:text-primary"
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                {/* Stepper */}
                <div className="flex items-center border border-border h-11 bg-background">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="w-9 h-full flex items-center justify-center text-content hover:bg-background-surface transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-content">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="w-9 h-full flex items-center justify-center text-content hover:bg-background-surface transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  className="h-11 px-6 uppercase text-xs tracking-wider font-bold bg-primary text-primary-fg hover:bg-primary-hover rounded-none flex-1 cursor-pointer"
                >
                  Add To Cart
                </Button>

                {/* Buy Now */}
                <Button
                  onClick={handleBuyNow}
                  className="h-11 px-6 uppercase text-xs tracking-wider font-bold bg-primary-hover text-primary-fg hover:bg-primary rounded-none flex-1 cursor-pointer"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Meta & Socials */}
            <div className="border-t border-border pt-4 mt-6 space-y-2 text-xs text-content-body">
              <p>
                <span className="font-semibold text-content">SKU:</span>{" "}
                {product.sku || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-content">Categories:</span>{" "}
                {product.categories.join(", ")}
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="font-semibold text-content">Follow:</span>
                <div className="flex items-center gap-3 text-content-body">
                  <Link href="https://facebook.com" target="_blank" className="hover:text-primary transition-colors">
                    <FaFacebook size={14} />
                  </Link>
                  <Link href="https://instagram.com" target="_blank" className="hover:text-primary transition-colors">
                    <FaInstagram size={14} />
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors">
                    <FaLinkedin size={14} />
                  </Link>
                  <Link href="https://whatsapp.com" target="_blank" className="hover:text-primary transition-colors">
                    <FaWhatsapp size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
