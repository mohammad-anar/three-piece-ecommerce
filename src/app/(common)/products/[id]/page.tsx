"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Heart,
  ArrowLeftRight,
  Phone,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { sampleProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { id } = use(params);

  // Find product by id, fallback to first product
  const product = sampleProducts.find((p) => p.id === id) || sampleProducts[0];
  const isWishlisted = isInWishlist(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<string>("34");
  const [quantity, setQuantity] = useState<number>(1);

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
    router.push("/checkout");
  };

  return (
    <div className="w-full bg-background py-8">
      <div className="container">
        {/* Top Breadcrumbs & Page Controls */}
        <div className="flex items-center justify-between py-3 border-b border-border mb-8 text-xs text-content-body">
          <nav className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections/new-arrivals" className="hover:text-primary transition-colors">
              New Arrivals
            </Link>
            <span>/</span>
            <span className="text-content font-bold uppercase">{product.name}</span>
          </nav>

          <div className="flex items-center gap-3 text-content-body">
            <button className="hover:text-primary transition-colors cursor-pointer" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <Link href="/shop" className="hover:text-primary transition-colors" aria-label="Back to grid">
              <LayoutGrid className="w-4 h-4" />
            </Link>
            <button className="hover:text-primary transition-colors cursor-pointer" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Main Section: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Gallery (Thumbnails + Main Image) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical thumbnails */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={cn(
                    "relative w-20 h-24 shrink-0 border transition-all cursor-pointer overflow-hidden bg-background-surface",
                    activeImageIndex === idx
                      ? "border-primary opacity-100 ring-1 ring-primary"
                      : "border-border opacity-70 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] w-full bg-background-surface border border-border overflow-hidden">
              <Image
                src={product.images[activeImageIndex]}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Product Purchasing Details */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-5">
              {/* Title & Price */}
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-wider text-content">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-primary mt-2">
                  ৳ {product.price.toLocaleString("en-US", { minimumFractionDigits: 1 })}
                </p>
              </div>

              {/* Sizes Row */}
              <div>
                <div className="flex items-center gap-2 mb-2">
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

              {/* Quantity Stepper & Main CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
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

                <Button
                  onClick={handleAddToCart}
                  className="h-11 px-8 uppercase text-xs tracking-wider font-bold bg-primary text-primary-fg hover:bg-primary-hover rounded-none flex-1 cursor-pointer"
                >
                  Add To Cart
                </Button>

                <Button
                  onClick={handleBuyNow}
                  className="h-11 px-8 uppercase text-xs tracking-wider font-bold bg-primary-hover text-primary-fg hover:bg-primary rounded-none flex-1 cursor-pointer"
                >
                  Buy Now
                </Button>
              </div>

              {/* Direct Ordering: Whatsapp & Phone */}
              <div className="space-y-2.5 pt-2">
                <a
                  href="https://wa.me/8801700000000"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold text-sm tracking-wide hover:brightness-105 transition-all"
                >
                  <FaWhatsapp size={18} />
                  Whatsapp
                </a>
                <a
                  href="tel:+8801700000000"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-background-dark text-content-inverse font-bold text-sm tracking-wide hover:bg-black transition-all"
                >
                  <Phone size={16} />
                  Phone
                </a>
              </div>

              {/* Delivery Notice Box */}
              <div className="bg-background-surface border border-border py-2.5 px-4 text-center">
                <p className="text-xs font-semibold text-content">
                  চট্টগ্রাম এর ভিতরে এবং বাইরে ৭-১৪ দিনের মধ্যে ডেলিভারি
                </p>
              </div>

              {/* Wishlist & Compare Links */}
              <div className="flex items-center gap-6 pt-2 text-xs font-medium text-content-body border-b border-border pb-5">
                <button type="button" className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  Add to compare
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={cn(
                    "flex items-center gap-1.5 transition-colors cursor-pointer",
                    isWishlisted ? "text-primary font-bold" : "hover:text-primary"
                  )}
                >
                  <Heart className={cn("w-3.5 h-3.5", isWishlisted && "fill-primary")} />
                  {isWishlisted ? "Wishlisted" : "Add to wishlist"}
                </button>
              </div>

              {/* SKU, Category & Socials */}
              <div className="space-y-1.5 text-xs text-content-body">
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
        </div>

        {/* Bottom Section: Tabs & Specifications */}
        <div className="mt-16 pt-10 border-t border-border">
          <Tabs defaultValue="description" className="w-full">
            <div className="w-full flex justify-start sm:justify-center overflow-x-auto no-scrollbar border-b border-border">
              <TabsList className="bg-transparent h-auto p-0 gap-4 sm:gap-8 flex-nowrap inline-flex min-w-max">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-xs md:text-sm font-bold uppercase tracking-wider pb-3 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-xs md:text-sm font-bold uppercase tracking-wider pb-3 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Additional Information
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-xs md:text-sm font-bold uppercase tracking-wider pb-3 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Reviews (0)
                </TabsTrigger>
                <TabsTrigger
                  value="shipping"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary text-xs md:text-sm font-bold uppercase tracking-wider pb-3 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Shipping and Delivery
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Description Tab Content */}
            <TabsContent value="description" className="pt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-content">
              <p className="font-semibold text-content">
                Code: {product.description.codeName}
              </p>
              <p className="text-content-body">
                {product.description.setType}
              </p>
              <p className="text-content-body font-medium">
                Size: 32 to 54
              </p>
              <p className="text-content-body">
                {product.description.sizeNote}
              </p>
              <div className="space-y-1 pt-3 text-content-body">
                <p>Dress material: {product.description.dressMaterial}</p>
                <p>Pant material: {product.description.pantMaterial}</p>
                <p>Orna Material : {product.description.ornaMaterial}</p>
              </div>
              <div className="space-y-1 pt-3 text-content-body">
                <p>Kurti Long: {product.description.kurtiLong}</p>
                <p>Pant Long: {product.description.pantLong}</p>
                <p>Sleeves long : {product.description.sleevesLong}</p>
              </div>
            </TabsContent>

            {/* Additional Info Tab */}
            <TabsContent value="additional" className="pt-8 text-sm text-content-body">
              <div className="grid grid-cols-2 gap-4 max-w-md border border-border p-4">
                <span className="font-semibold text-content">Sizes Available:</span>
                <span>32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54</span>
                <span className="font-semibold text-content">Collection:</span>
                <span>{product.categories.join(", ")}</span>
                <span className="font-semibold text-content">Care Instructions:</span>
                <span>Hand wash cold, dry in shade</span>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-8 text-sm text-content-body">
              <p>There are no reviews yet. Be the first to review &ldquo;{product.name}&rdquo;.</p>
            </TabsContent>

            {/* Shipping & Delivery Tab */}
            <TabsContent value="shipping" className="pt-8 text-sm text-content-body space-y-2">
              <p>• চট্টগ্রাম এর ভিতরে ডেলিভারি চার্জ: ৳ 70.0 (২-৩ কার্যদিবস)</p>
              <p>• চট্টগ্রাম এর বাইরে ডেলিভারি চার্জ: ৳ 150.0 (৭-১৪ কার্যদিবস)</p>
              <p>• Cash on Delivery (ক্যাশ অন ডেলিভারি) সুবিধা রয়েছে।</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
