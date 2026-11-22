"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const router = useRouter();
  const { items, isCartOpen, closeCart, removeFromCart, subtotal } = useCart();

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleViewCart = () => {
    closeCart();
    router.push("/cart");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        hideCloseButton={true}
        className="w-full sm:max-w-md p-0 flex flex-col justify-between bg-background border-l border-border"
      >
        {/* Header */}
        <SheetHeader className="p-5 border-b border-border flex flex-row items-center justify-between space-y-0">
          <SheetTitle className="text-lg font-bold text-content">
            Shopping cart
          </SheetTitle>
          <button
            onClick={closeCart}
            className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-content hover:text-primary transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </SheetHeader>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-border">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 text-content-body space-y-4">
              <p className="text-base font-semibold">Your shopping cart is empty.</p>
              <Button
                onClick={() => {
                  closeCart();
                  router.push("/shop");
                }}
                className="bg-primary text-primary-fg hover:bg-primary-hover uppercase text-xs font-bold rounded-none"
              >
                Return to Shop
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
                {/* Thumbnail */}
                <div className="relative w-16 h-20 shrink-0 border border-border bg-background-surface overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.id}`}
                      onClick={closeCart}
                      className="text-sm font-bold text-content hover:text-primary transition-colors line-clamp-1 uppercase"
                    >
                      {item.name} – {item.size}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="text-content-muted hover:text-danger transition-colors cursor-pointer p-0.5"
                      aria-label="Remove item"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs font-medium text-content-body mt-1">
                    {item.quantity} ×{" "}
                    <span className="font-bold text-primary">
                      ৳ {item.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area */}
        {items.length > 0 && (
          <div className="border-t border-border p-5 space-y-4 bg-background">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-base font-bold text-content">
              <span>Subtotal:</span>
              <span className="text-primary text-lg">
                ৳ {subtotal.toLocaleString("en-US", { minimumFractionDigits: 1 })}
              </span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleViewCart}
                variant="outline"
                className="w-full py-5 uppercase font-bold text-xs tracking-wider border-primary text-primary hover:bg-primary-light rounded-none cursor-pointer"
              >
                View Cart
              </Button>
              <Button
                onClick={handleCheckout}
                className="w-full py-5 uppercase font-bold text-xs tracking-wider bg-primary text-primary-fg hover:bg-primary-hover rounded-none shadow-md cursor-pointer"
              >
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
