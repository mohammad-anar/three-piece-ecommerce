import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, HeartHandshake, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "About Us — Zanass Clothing",
  description: "Learn more about Zanass Clothing, our story, mission, and dedication to women's ethnic fashion.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-background pb-20">
      {/* Top Banner / Heading (Image 1 top) */}
      <section className="py-16 md:py-24 text-center border-b border-border bg-background-surface/40">
        <div className="container max-w-4xl">
          <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-primary block mb-3">
            Some Words About Us
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-content tracking-tight leading-tight">
            Elevating Elegance, Empowering You
          </h1>
        </div>
      </section>

      {/* Main Story: 2-Column Split (Image 1 body) */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full border border-border shadow-md overflow-hidden bg-background-surface">
                <Image
                  src="/about/about-store.jpg"
                  alt="Zanass Online Store & Delivery"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>

            {/* Right Column: Story & Vision */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
                  Seemingly Elegant Design
                </span>
                <h2 className="text-2xl md:text-4xl font-bold text-content">
                  About our online store
                </h2>
              </div>

              <p className="text-sm md:text-base text-content-body leading-relaxed">
                Welcome to <strong className="text-content">Zanass</strong>, your premier destination for high-quality and stylish women&apos;s ethnic wear. We believe that fashion is more than just clothing; it is a reflection of identity, culture, and confidence. At <strong className="text-content">zanass.com</strong>, our mission is to bring you the perfect blend of tradition and modern trends through our curated collections.
              </p>

              <p className="text-sm md:text-base text-content-body leading-relaxed">
                Zanass was founded with a simple yet passionate goal: to make premium fashion accessible to every woman. We understand the importance of finding the right outfit that feels as good as it looks. Whether it&apos;s for a festive celebration, a formal event, or daily elegance, we are dedicated to providing outfits that help you stand out.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/shop">
                  <Button className="bg-primary text-primary-fg hover:bg-primary-hover uppercase tracking-wider text-xs font-bold px-8 py-5 rounded-none shadow-sm cursor-pointer">
                    Explore Collections
                  </Button>
                </Link>
                <Link href="/contact-us">
                  <Button
                    variant="outline"
                    className="border-border text-content hover:bg-background-surface uppercase tracking-wider text-xs font-bold px-8 py-5 rounded-none cursor-pointer"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values / Why Choose Zanass */}
      <section className="py-16 bg-background-surface border-y border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 space-y-3 bg-background border border-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-content">Original Designs</h3>
              <p className="text-xs text-content-body leading-relaxed">
                Every outfit is thoughtfully curated with intricate embroidery and timeless aesthetics.
              </p>
            </div>

            <div className="text-center p-6 space-y-3 bg-background border border-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-content">Premium Fabrics</h3>
              <p className="text-xs text-content-body leading-relaxed">
                Pure cotton, organza, georgette, and linen ensuring ultimate all-day comfort.
              </p>
            </div>

            <div className="text-center p-6 space-y-3 bg-background border border-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-content">Safe Delivery</h3>
              <p className="text-xs text-content-body leading-relaxed">
                Fast and reliable doorstep delivery across all 64 districts in Bangladesh.
              </p>
            </div>

            <div className="text-center p-6 space-y-3 bg-background border border-border">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-content">Customer First</h3>
              <p className="text-xs text-content-body leading-relaxed">
                Dedicated WhatsApp and phone support ready to assist your sizing and ordering needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
