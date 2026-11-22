"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingMethod,
    setShippingMethod,
    total,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-background pb-16">
      {/* Top Breadcrumb Steps Banner */}
      <div className="w-full bg-background-dark py-4 text-center">
        <div className="container flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-content-inverse/60">
          <span className="text-content-inverse border-b-2 border-primary pb-0.5">
            Shopping Cart
          </span>
          <span>→</span>
          <Link href="/checkout" className="hover:text-content-inverse transition-colors">
            Checkout
          </Link>
          <span>→</span>
          <span>Order Complete</span>
        </div>
      </div>

      <div className="container mt-10">
        {items.length === 0 ? (
          <div className="py-20 text-center space-y-4 border border-border bg-background-surface">
            <h2 className="text-2xl font-bold text-content">Your cart is currently empty.</h2>
            <p className="text-sm text-content-body">Before proceed to checkout you must add some products to your shopping cart.</p>
            <Link href="/shop" className="inline-block mt-4">
              <Button className="bg-primary text-primary-fg hover:bg-primary-hover uppercase tracking-wider text-xs font-bold px-8 py-5 rounded-none">
                Return to Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Table & Coupon (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Items Table */}
              <div className="border border-border overflow-x-auto bg-background">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border bg-background-surface text-xs uppercase tracking-wider text-content-body font-bold">
                      <th className="py-3 px-4 w-10"></th>
                      <th className="py-3 px-4 w-20"></th>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Quantity</th>
                      <th className="py-3 px-4 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {items.map((item) => {
                      const itemSubtotal = item.price * item.quantity;
                      return (
                        <tr key={`${item.id}-${item.size}`} className="hover:bg-background-surface/50 transition-colors">
                          {/* Remove button */}
                          <td className="py-4 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id, item.size)}
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
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          </td>

                          {/* Name & Size */}
                          <td className="py-4 px-4">
                            <Link
                              href={`/products/${item.id}`}
                              className="font-bold text-content hover:text-primary transition-colors uppercase text-sm block"
                            >
                              {item.name} - {item.size}
                            </Link>
                          </td>

                          {/* Price */}
                          <td className="py-4 px-4 font-semibold text-content whitespace-nowrap">
                            ৳ {item.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                          </td>

                          {/* Quantity Stepper */}
                          <td className="py-4 px-4">
                            <div className="flex items-center border border-border h-9 w-28 bg-background">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                className="w-8 h-full flex items-center justify-center text-content hover:bg-background-surface transition-colors cursor-pointer"
                              >
                                -
                              </button>
                              <span className="w-12 text-center text-xs font-bold text-content">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                className="w-8 h-full flex items-center justify-center text-content hover:bg-background-surface transition-colors cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Subtotal */}
                          <td className="py-4 px-4 text-right font-bold text-primary whitespace-nowrap">
                            ৳ {itemSubtotal.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Update cart action bar */}
                <div className="p-4 border-t border-border flex justify-end bg-background">
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary-light uppercase tracking-wider text-xs font-bold px-6 rounded-none"
                  >
                    Update Cart
                  </Button>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="border border-border p-4 bg-background flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="max-w-xs text-xs"
                />
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-fg uppercase tracking-wider text-xs font-bold px-6 rounded-none cursor-pointer"
                >
                  Apply Coupon
                </Button>
              </div>
            </div>

            {/* Right Column: Cart Totals (4 cols) */}
            <div className="lg:col-span-4 border border-border p-6 bg-background space-y-5">
              <h3 className="text-lg font-bold uppercase tracking-wider text-content border-b border-border pb-3">
                Cart Totals
              </h3>

              <div className="space-y-4 text-sm">
                {/* Subtotal */}
                <div className="flex justify-between items-center text-content">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">
                    ৳ {subtotal.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                  </span>
                </div>

                {/* Shipment */}
                <div className="border-t border-border pt-3 space-y-2">
                  <span className="font-medium text-content block">Shipment</span>
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={(val) => setShippingMethod(val as "inside" | "outside")}
                    className="space-y-2 text-xs"
                  >
                    <label
                      htmlFor="cart-shipping-inside"
                      className="flex items-center justify-between cursor-pointer text-content-body hover:text-content"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="inside" id="cart-shipping-inside" />
                        <span>Inside Chittagong:</span>
                      </div>
                      <span className="font-semibold text-content">৳ 70.0</span>
                    </label>

                    <label
                      htmlFor="cart-shipping-outside"
                      className="flex items-center justify-between cursor-pointer text-content-body hover:text-content"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="outside" id="cart-shipping-outside" />
                        <span>Outside Chittagong:</span>
                      </div>
                      <span className="font-semibold text-content">৳ 150.0</span>
                    </label>
                  </RadioGroup>

                  <p className="text-xs text-content-muted pt-1">
                    Shipping to Dhaka.{" "}
                    <button type="button" className="text-primary hover:underline font-semibold cursor-pointer">
                      Change address
                    </button>
                  </p>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4 flex justify-between items-center text-base font-bold text-content">
                  <span>Total</span>
                  <span className="text-xl text-primary font-bold">
                    ৳ {total.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <Button
                onClick={handleProceedToCheckout}
                size="lg"
                className="w-full py-6 uppercase tracking-wider text-sm font-bold bg-primary text-primary-fg hover:bg-primary-hover rounded-none shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                Proceed To Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
