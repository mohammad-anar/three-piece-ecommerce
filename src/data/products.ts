export type Product = {
  id: string;
  code: string;
  name: string;
  subtitle?: string;
  categories: string[];
  price: number;
  originalPrice?: number;
  sizes: string[];
  images: string[];
  description: {
    codeName: string;
    setType: string;
    sizeNote: string;
    dressMaterial: string;
    pantMaterial: string;
    ornaMaterial: string;
    kurtiLong: string;
    pantLong: string;
    sleevesLong: string;
  };
  inStock: boolean;
  onSale?: boolean;
  rating?: number;
  isTopRated?: boolean;
  sku?: string;
};

export const ALL_SIZES = ["32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "52", "54"];

export const sampleProducts: Product[] = [
  {
    id: "hurmat-cream",
    code: "Hurmat ( Butter cream )",
    name: "HURMAT",
    subtitle: "Latest Collection, New Arrivals, Three Piece",
    categories: ["Latest Collection", "New Arrivals", "Three Piece"],
    price: 2050,
    sizes: ALL_SIZES,
    images: [
      "/products/product-red.jpg",
      "/products/product-terracotta.jpg",
    ],
    description: {
      codeName: "Hurmat ( Butter cream )",
      setType: "3 pcs embroidery set : (Kurti, Pant & Orna) (For the cream colour, wearing an inner is recommended ) 2050 tk",
      sizeNote: "Large Body Size: 48 to 54 ( Extra 200tk will be added for large size)",
      dressMaterial: "90% cotton 10 % mixed",
      pantMaterial: "90% cotton 10 % mixed",
      ornaMaterial: "Gorget",
      kurtiLong: "38",
      pantLong: "38 ( Light Plazo )",
      sleevesLong: "21",
    },
    inStock: true,
    rating: 5,
    isTopRated: true,
    sku: "N/A",
  },
  {
    id: "gulzar-ruby",
    code: "Gulzar ( Crimson Ruby )",
    name: "GULZAR",
    subtitle: "Best Collections, Three Piece",
    categories: ["Best Collections", "Three Piece"],
    price: 2350,
    originalPrice: 2550,
    sizes: ["32", "34", "36", "38", "40", "42", "44", "46"],
    images: [
      "/products/product-terracotta.jpg",
      "/products/product-red.jpg",
    ],
    description: {
      codeName: "Gulzar ( Crimson Ruby )",
      setType: "3 pcs luxury embroidered georgette set : (Kurti, Pant & Dupatta) 2350 tk",
      sizeNote: "Body Size: 32 to 46",
      dressMaterial: "Premium Georgette with fine embroidery",
      pantMaterial: "Santoon Silk",
      ornaMaterial: "Embroidered Organza Dupatta",
      kurtiLong: "42",
      pantLong: "39",
      sleevesLong: "22",
    },
    inStock: true,
    onSale: true,
    rating: 5,
    isTopRated: true,
    sku: "GLZ-01",
  },
  {
    id: "afsana-rose",
    code: "Afsana ( Rose Pink )",
    name: "AFSANA",
    subtitle: "Latest Collection, Three Piece",
    categories: ["Latest Collection", "Three Piece", "Best Collections"],
    price: 2450,
    sizes: ALL_SIZES,
    images: [
      "/products/product-red.jpg",
      "/products/product-terracotta.jpg",
    ],
    description: {
      codeName: "Afsana ( Rose Pink )",
      setType: "3 pcs embroidery set : (Kurti, Pant & Orna) 2450 tk",
      sizeNote: "Large Body Size: 48 to 54 ( Extra 200tk will be added for large size)",
      dressMaterial: "100% fine cotton",
      pantMaterial: "90% cotton 10 % mixed",
      ornaMaterial: "Pure Chiffon",
      kurtiLong: "40",
      pantLong: "38 ( Straight Cut )",
      sleevesLong: "21",
    },
    inStock: true,
    rating: 4.8,
    isTopRated: true,
    sku: "N/A",
  },
  {
    id: "meher-sage",
    code: "Meher ( Sage Green )",
    name: "MEHER",
    subtitle: "New Arrivals, Two Piece",
    categories: ["New Arrivals", "Two Piece"],
    price: 1850,
    originalPrice: 2000,
    sizes: ["32", "34", "36", "38", "40", "42"],
    images: [
      "/products/product-terracotta.jpg",
      "/products/product-red.jpg",
    ],
    description: {
      codeName: "Meher ( Sage Green )",
      setType: "2 pcs embroidery set : (Kurti & Pant) 1850 tk",
      sizeNote: "Size: 32 to 54",
      dressMaterial: "Pure Linen Cotton",
      pantMaterial: "Pure Linen",
      ornaMaterial: "N/A",
      kurtiLong: "38",
      pantLong: "38",
      sleevesLong: "20",
    },
    inStock: true,
    onSale: true,
    rating: 4.7,
    sku: "N/A",
  },
  {
    id: "zaara-mustard",
    code: "Zaara ( Mustard Bloom )",
    name: "ZAARA",
    subtitle: "Latest Collection, New Arrivals, Three Piece",
    categories: ["Latest Collection", "New Arrivals", "Three Piece"],
    price: 2200,
    sizes: ALL_SIZES,
    images: [
      "/products/product-red.jpg",
      "/products/product-terracotta.jpg",
    ],
    description: {
      codeName: "Zaara ( Mustard Bloom )",
      setType: "3 pcs embroidery set : (Kurti, Pant & Orna)",
      sizeNote: "Large Body Size: 48 to 54 ( Extra 200tk will be added for large size)",
      dressMaterial: "Cotton Voile",
      pantMaterial: "Cotton Blend",
      ornaMaterial: "Gorget",
      kurtiLong: "39",
      pantLong: "38",
      sleevesLong: "21",
    },
    inStock: true,
    rating: 4.9,
    sku: "N/A",
  },
  {
    id: "noor-ivory",
    code: "Noor ( Pearl Ivory )",
    name: "NOOR",
    subtitle: "Best Collections, Two Piece",
    categories: ["Best Collections", "Two Piece"],
    price: 1650,
    sizes: ["32", "34", "36", "38", "40", "42", "44"],
    images: [
      "/products/product-terracotta.jpg",
      "/products/product-red.jpg",
    ],
    description: {
      codeName: "Noor ( Pearl Ivory )",
      setType: "2 pcs minimalist set : (Kurti & Palazzo) 1650 tk",
      sizeNote: "Size: 32 to 44",
      dressMaterial: "Soft Cotton Lawn",
      pantMaterial: "Soft Cotton Lawn",
      ornaMaterial: "N/A",
      kurtiLong: "41",
      pantLong: "38",
      sleevesLong: "21",
    },
    inStock: true,
    rating: 4.6,
    sku: "NOR-02",
  },
  {
    id: "roshan-emerald",
    code: "Roshan ( Royal Emerald )",
    name: "ROSHAN",
    subtitle: "Best Collections, New Arrivals, Three Piece",
    categories: ["Best Collections", "New Arrivals", "Three Piece"],
    price: 2650,
    originalPrice: 2850,
    sizes: ALL_SIZES,
    images: [
      "/products/product-red.jpg",
      "/products/product-terracotta.jpg",
    ],
    description: {
      codeName: "Roshan ( Royal Emerald )",
      setType: "3 pcs heavy thread embroidery set : (Kurti, Pant & Dupatta)",
      sizeNote: "Sizes 32 to 54 available",
      dressMaterial: "Pure Muslin Silk",
      pantMaterial: "Silk Blend",
      ornaMaterial: "Digital Printed Organza",
      kurtiLong: "42",
      pantLong: "39",
      sleevesLong: "22",
    },
    inStock: true,
    onSale: true,
    rating: 5,
    isTopRated: true,
    sku: "RSH-09",
  },
  {
    id: "fiza-blush",
    code: "Fiza ( Dusty Blush )",
    name: "FIZA",
    subtitle: "New Arrivals, Two Piece",
    categories: ["New Arrivals", "Two Piece"],
    price: 1450,
    originalPrice: 1600,
    sizes: ["32", "34", "36", "38", "40"],
    images: [
      "/products/product-terracotta.jpg",
      "/products/product-red.jpg",
    ],
    description: {
      codeName: "Fiza ( Dusty Blush )",
      setType: "2 pcs casual kurti set : (Kurti & Trousers)",
      sizeNote: "Size 32 to 40",
      dressMaterial: "Breathable Slub Cotton",
      pantMaterial: "Cotton",
      ornaMaterial: "N/A",
      kurtiLong: "37",
      pantLong: "37",
      sleevesLong: "19",
    },
    inStock: false,
    onSale: true,
    rating: 4.5,
    sku: "FZA-03",
  },
];
