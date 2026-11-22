import ShopContent from "@/components/pages/shop/ShopContent";

export const metadata = {
  title: "Shop All Collections — Zanass Clothing",
  description: "Browse women's luxury three piece, two piece, and festive clothing collections.",
};

export default function ShopPage() {
  return <ShopContent initialCategory="all" pageTitle="Shop" />;
}
