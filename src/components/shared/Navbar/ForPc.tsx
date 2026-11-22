"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import NavMenu from "./NavMenu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ForPc = () => {
  const { openCart, totalCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <div className="w-full bg-background border-b border-border shadow-xs">
      <div className="container hidden lg:flex h-16 items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 py-1">
          <Image
            src="/logo/logo.png"
            alt="Zanass Logo"
            width={140}
            height={42}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Center NavMenu */}
        <NavMenu />

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            className="text-content hover:text-primary hover:bg-background-surface rounded-full cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </Button>

          {/* User Account */}
          <Link href="/login">
            <Button
              variant="ghost"
              size="icon"
              className="text-content hover:text-primary hover:bg-background-surface rounded-full cursor-pointer"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Button>
          </Link>

          {/* Wishlist Link */}
          <Link href="/wishlist">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-content hover:text-primary hover:bg-background-surface rounded-full cursor-pointer"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-fg text-[10px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            </Button>
          </Link>

          {/* Cart Icon - Opens Cart Sidebar */}
          <Button
            onClick={openCart}
            variant="ghost"
            size="icon"
            className="relative text-content hover:text-primary hover:bg-background-surface rounded-full cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-fg text-[10px] font-bold flex items-center justify-center">
              {totalCount}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForPc;
