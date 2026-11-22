import ShopContent from "@/components/pages/shop/ShopContent";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const slugCategoryMap: Record<string, { category: string; title: string }> = {
  "three-piece": { category: "Three Piece", title: "Three Piece Collection" },
  "two-piece": { category: "Two Piece", title: "Two Piece Collection" },
  "new-arrivals": { category: "New Arrivals", title: "New Arrivals" },
  "best-collections": { category: "Best Collections", title: "Best Collections" },
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const match = slugCategoryMap[slug] || {
    title: slug.replace(/-/g, " ").toUpperCase(),
  };

  return {
    title: `${match.title} — Zanass Clothing`,
    description: `Shop our exclusive ${match.title} at Zanass.`,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const match = slugCategoryMap[slug] || {
    category: slug.replace(/-/g, " "),
    title: slug.replace(/-/g, " ").toUpperCase(),
  };

  return (
    <ShopContent
      initialCategory={match.category}
      pageTitle={match.title}
    />
  );
}
