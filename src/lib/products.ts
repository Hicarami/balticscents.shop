import midnightNoir from "@/assets/product-midnight-noir.jpg";
import royalOud from "@/assets/product-royal-oud.jpg";
import arcticFresh from "@/assets/product-arctic-fresh.jpg";
import velvetAmber from "@/assets/product-velvet-amber.jpg";
import silverMist from "@/assets/product-silver-mist.jpg";
import goldenSpice from "@/assets/product-golden-spice.jpg";
import oceanBreeze from "@/assets/product-ocean-breeze.jpg";
import imperialLeather from "@/assets/product-imperial-leather.jpg";

export type Gender = "Men" | "Women" | "Unisex";
export type Family = "Woody" | "Fresh" | "Citrus" | "Oriental" | "Floral";

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  gender: Gender;
  family: Family;
  bestSeller?: boolean;
  featured?: boolean;
  newest?: boolean;
  rating: number;
  reviews: number;
  stock: number;
  tagline: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  sizes: number[];
}

const base = {
  brand: "Noir Essence",
  sizes: [50, 100, 200],
};

export const products: Product[] = [
  {
    ...base,
    id: "midnight-noir",
    name: "Midnight Noir",
    price: 240,
    image: midnightNoir,
    gender: "Unisex",
    family: "Woody",
    featured: true,
    bestSeller: true,
    rating: 4.9,
    reviews: 428,
    stock: 12,
    tagline: "Woody · Intense · Nocturnal",
    description:
      "A study in shadow. Midnight Noir opens with a blaze of Turkish saffron before descending into a smoked oud and vetiver base — the olfactory equivalent of black silk.",
    notes: {
      top: ["Saffron", "Bergamot", "Pink Pepper"],
      heart: ["Turkish Rose", "Jasmine Sambac", "Cedarwood"],
      base: ["Oud", "Vetiver", "White Musk"],
    },
  },
  {
    ...base,
    id: "royal-oud",
    name: "Royal Oud",
    price: 320,
    image: royalOud,
    gender: "Men",
    family: "Oriental",
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviews: 362,
    stock: 8,
    tagline: "Oriental · Rich · Regal",
    description:
      "Distilled from the rarest Cambodian agarwood, Royal Oud is an ode to ancient perfumery — resinous, honeyed, and unapologetically opulent.",
    notes: {
      top: ["Cardamom", "Pink Pepper"],
      heart: ["Agarwood", "Damask Rose"],
      base: ["Amber", "Sandalwood", "Leather"],
    },
  },
  {
    ...base,
    id: "arctic-fresh",
    name: "Arctic Fresh",
    price: 175,
    image: arcticFresh,
    gender: "Unisex",
    family: "Fresh",
    featured: true,
    newest: true,
    rating: 4.7,
    reviews: 214,
    stock: 22,
    tagline: "Fresh · Ozonic · Crystalline",
    description:
      "An icy exhale. Frozen mint and juniper are drawn across a base of white amber and driftwood for a scent that feels like alpine air at first light.",
    notes: {
      top: ["Frozen Mint", "Juniper", "Sea Salt"],
      heart: ["White Tea", "Iris"],
      base: ["Driftwood", "White Amber", "Musk"],
    },
  },
  {
    ...base,
    id: "velvet-amber",
    name: "Velvet Amber",
    price: 210,
    image: velvetAmber,
    gender: "Women",
    family: "Oriental",
    bestSeller: true,
    rating: 4.9,
    reviews: 501,
    stock: 15,
    tagline: "Oriental · Warm · Sensual",
    description:
      "A cashmere embrace. Ambergris and tonka bean melt into vanilla absolute — a fragrance that lingers on skin like a whispered secret.",
    notes: {
      top: ["Clove", "Bergamot"],
      heart: ["Rose Absolute", "Cinnamon"],
      base: ["Ambergris", "Tonka Bean", "Vanilla"],
    },
  },
  {
    ...base,
    id: "silver-mist",
    name: "Silver Mist",
    price: 195,
    image: silverMist,
    gender: "Women",
    family: "Floral",
    newest: true,
    rating: 4.6,
    reviews: 187,
    stock: 18,
    tagline: "Floral · Airy · Luminous",
    description:
      "Peony petals wrapped in silver dew. A luminous, weightless bouquet that floats on skin without ever announcing itself.",
    notes: {
      top: ["Lychee", "Peach Blossom"],
      heart: ["Peony", "Magnolia", "Lily of the Valley"],
      base: ["White Musk", "Cashmeran"],
    },
  },
  {
    ...base,
    id: "golden-spice",
    name: "Golden Spice",
    price: 260,
    image: goldenSpice,
    gender: "Unisex",
    family: "Oriental",
    featured: true,
    rating: 4.8,
    reviews: 296,
    stock: 9,
    tagline: "Oriental · Spiced · Golden",
    description:
      "Saffron threads dissolved in molten amber. A dense, glowing composition drawn from the spice markets of the old world.",
    notes: {
      top: ["Saffron", "Star Anise", "Ginger"],
      heart: ["Immortelle", "Honey"],
      base: ["Benzoin", "Amber", "Myrrh"],
    },
  },
  {
    ...base,
    id: "ocean-breeze",
    name: "Ocean Breeze",
    price: 165,
    image: oceanBreeze,
    gender: "Men",
    family: "Citrus",
    newest: true,
    rating: 4.5,
    reviews: 142,
    stock: 30,
    tagline: "Citrus · Aquatic · Weightless",
    description:
      "Sicilian bergamot cut with sea spray and neroli. A modern citrus for those who prefer their luxury light and unencumbered.",
    notes: {
      top: ["Sicilian Bergamot", "Grapefruit", "Sea Spray"],
      heart: ["Neroli", "Petitgrain"],
      base: ["Ambroxan", "Cedarwood"],
    },
  },
  {
    ...base,
    id: "imperial-leather",
    name: "Imperial Leather",
    price: 285,
    image: imperialLeather,
    gender: "Men",
    family: "Woody",
    bestSeller: true,
    rating: 4.9,
    reviews: 388,
    stock: 6,
    tagline: "Woody · Leather · Commanding",
    description:
      "The scent of a private library at dusk. Suede, tobacco leaf, and aged cedar bound in a fragrance that reads as quiet authority.",
    notes: {
      top: ["Bergamot", "Black Pepper"],
      heart: ["Suede", "Tobacco Leaf", "Iris"],
      base: ["Aged Cedar", "Patchouli", "Vetiver"],
    },
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const families: Family[] = ["Woody", "Fresh", "Citrus", "Oriental", "Floral"];
export const genders: Gender[] = ["Men", "Women", "Unisex"];
