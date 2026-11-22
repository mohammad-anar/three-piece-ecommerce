"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, Heart, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ForMobile = () => {
  const [open, setOpen] = useState(false);
  const { openCart, totalCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="w-full bg-background border-b border-border lg:hidden px-4 h-14 flex items-center justify-between">
      {/* Left Menu Trigger */}
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-content hover:text-primary cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-6 bg-background">
            <SheetHeader className="mb-6 text-left">
              <SheetTitle className="text-xl font-black tracking-widest text-primary uppercase">
                Zanass
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col gap-6">
              {/* Navigation links */}
              <NavMenu
                className="flex-col items-start gap-4"
                onItemClick={() => setOpen(false)}
              />

              <Separator />

              {/* Mobile actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-sm font-semibold text-content hover:text-primary py-1"
                >
                  <User className="w-4 h-4" />
                  Sign In / Register
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-content hover:text-primary py-1"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </div>
                  <span className="text-xs font-bold text-primary">({wishlistCount})</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                  className="flex items-center justify-between text-sm font-semibold text-content hover:text-primary py-1 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    Cart
                  </div>
                  <span className="text-xs font-bold text-primary">({totalCount})</span>
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Brand name */}
        <Link href="/">
          <span className="text-xl font-black tracking-wider text-primary uppercase">
            Zanass
          </span>
        </Link>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-content hover:text-primary cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </Button>
        <Link href="/wishlist">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-content hover:text-primary cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-fg text-[10px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          </Button>
        </Link>
        <Button
          onClick={openCart}
          variant="ghost"
          size="icon"
          className="relative text-content hover:text-primary cursor-pointer"
          aria-label="Shopping Cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-fg text-[10px] font-bold flex items-center justify-center">
            {totalCount}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default ForMobile;
