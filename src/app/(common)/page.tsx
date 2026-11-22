import HeroCarousel from "@/components/pages/home/HeroSection/HeroCarousel";
import ProductTabs from "@/components/pages/home/ProductTabs/ProductTabs";
import PromoBanners from "@/components/pages/home/PromoBanners/PromoBanners";
import Testimonials from "@/components/pages/home/Testimonials/Testimonials";
import FeatureStrip from "@/components/pages/home/FeatureStrip/FeatureStrip";

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden">
      <HeroCarousel />
      <ProductTabs />
      <PromoBanners />
      <Testimonials />
      <FeatureStrip />
    </div>
  );
}
