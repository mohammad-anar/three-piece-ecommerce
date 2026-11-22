"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    items,
    removeFromCart,
    subtotal,
    shippingMethod,
    setShippingMethod,
    shippingCost,
    total,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [couponCode, setCouponCode] = useState<string>("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed successfully! Total: ৳ ${total.toLocaleString("en-US", { minimumFractionDigits: 1 })}`);
  };

  return (
    <div className="w-full bg-background py-12">
      <div className="container">
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Billing Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-wide text-content border-b border-border pb-3">
                Billing Details
              </h2>

              <div className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-content">
                      First name <span className="text-danger">*</span>
                    </label>
                    <Input required placeholder="First name" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-content">
                      Last name <span className="text-danger">*</span>
                    </label>
                    <Input required placeholder="Last name" />
                  </div>
                </div>

                {/* Country / Region */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-content">
                    Country / Region <span className="text-danger">*</span>
                  </label>
                  <Input defaultValue="BD" readOnly className="bg-background-surface font-semibold" />
                </div>

                {/* Delivery Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-content">
                    Delivery Address <span className="text-danger">*</span>
                  </label>
                  <Input required placeholder="House number and street name" />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-content">
                    Phone <span className="text-danger">*</span>
                  </label>
                  <Input required type="tel" placeholder="017XXXXXXXX" />
                </div>
              </div>

              {/* Shipping Section */}
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-content">
                  Shipping
                </h3>
                <div className="border border-border p-4 bg-background">
                  <RadioGroup
                    value={shippingMethod}
                    onValueChange={(val) => setShippingMethod(val as "inside" | "outside")}
                    className="space-y-3"
                  >
                    <label
                      htmlFor="shipping-inside"
                      className="flex items-center justify-between cursor-pointer text-sm text-content"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="inside" id="shipping-inside" />
                        <span>Insite Chittagong:</span>
                      </div>
                      <span className="font-bold">৳ 70.0</span>
                    </label>

                    <div className="border-t border-border pt-3">
                      <label
                        htmlFor="shipping-outside"
                        className="flex items-center justify-between cursor-pointer text-sm text-content"
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="outside" id="shipping-outside" />
                          <span>Outsite Chittagong:</span>
                        </div>
                        <span className="font-bold">৳ 150.0</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            {/* Right Column: Your Order (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-wide text-content border-b border-border pb-3">
                Your Order
              </h2>

              <div className="border border-border p-6 bg-background space-y-5">
                {/* Product Summary Header */}
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-content border-b border-border pb-3">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                {/* Product Item Rows */}
                {items.length === 0 ? (
                  <p className="text-xs text-content-body py-4 text-center">Your order is empty.</p>
                ) : (
                  <div className="divide-y divide-border/60">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-content-muted hover:text-danger transition-colors cursor-pointer"
                            aria-label="Remove item"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <div className="relative w-12 h-16 shrink-0 border border-border overflow-hidden bg-background-surface">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div className="text-xs">
                            <span className="font-semibold text-content block uppercase">
                              {item.name} - {item.size}
                            </span>
                            <span className="text-content-muted">× {item.quantity}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-content">
                          ৳ {(item.price * item.quantity).toLocaleString("en-US", { minimumFractionDigits: 1 })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Subtotal, Shipping, Total */}
                <div className="space-y-3 text-sm border-t border-b border-border py-4">
                  <div className="flex justify-between text-content">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-semibold">
                      ৳ {subtotal.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                    </span>
                  </div>
                  <div className="flex justify-between text-content">
                    <span className="font-medium">Shipping</span>
                    <span className="text-xs text-content-body">
                      {shippingMethod === "inside" ? `Insite Chittagong: ৳ ${shippingCost.toFixed(1)}` : `Outsite Chittagong: ৳ ${shippingCost.toFixed(1)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-content pt-2 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary text-lg">
                      ৳ {total.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                    </span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs"
                  />
                  <Button
                    type="button"
                    className="bg-primary text-primary-fg hover:bg-primary-hover uppercase tracking-wider text-xs font-bold px-5 rounded-none"
                  >
                    Apply
                  </Button>
                </div>

                {/* Payment Methods Box */}
                <div className="bg-background-surface p-4 border border-border space-y-3">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(val) => setPaymentMethod(val as "cod" | "bkash" | "nagad")}
                    className="space-y-2.5"
                  >
                    <label
                      htmlFor="payment-cod"
                      className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-content"
                    >
                      <RadioGroupItem value="cod" id="payment-cod" />
                      <span>Cash on Delivery</span>
                    </label>

                    <label
                      htmlFor="payment-bkash"
                      className="flex items-center justify-between cursor-pointer text-xs font-semibold text-content"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="bkash" id="payment-bkash" />
                        <span>bKash</span>
                      </div>
                      <span className="text-[10px] font-bold text-pink-600 border border-pink-300 px-1.5 py-0.5 rounded bg-pink-50">
                        bKash
                      </span>
                    </label>

                    <label
                      htmlFor="payment-nagad"
                      className="flex items-center justify-between cursor-pointer text-xs font-semibold text-content"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="nagad" id="payment-nagad" />
                        <span>Nagad</span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-600 border border-orange-300 px-1.5 py-0.5 rounded bg-orange-50">
                        Nagad
                      </span>
                    </label>
                  </RadioGroup>
                </div>

                {/* Privacy policy notice */}
                <p className="text-[11px] text-content-body leading-relaxed">
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{" "}
                  <Link href="/privacy" className="underline hover:text-primary">
                    privacy policy
                  </Link>
                  .
                </p>

                {/* Place Order CTA Button */}
                <Button
                  type="submit"
                  disabled={items.length === 0}
                  size="lg"
                  className="w-full py-6 uppercase tracking-wider text-sm font-bold bg-primary text-primary-fg hover:bg-primary-hover rounded-none shadow-md cursor-pointer disabled:opacity-50"
                >
                  Place Order ৳ {total.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
