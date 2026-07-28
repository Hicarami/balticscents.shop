import white_gardenia from "@/assets/white_gardenia.jpg";
import obisidianVelvet from "@/assets/Obsidian_Velvet.jpg";
import emberofSin from "@/assets/Ember_of_sin.jpg";
import bloomEssence from "@/assets/bloom_essence.jpg";
import amberKiss from "@/assets/amber_kiss.jpg";

export type Gender = "Vīriešu" | "Sieviešu" | "Unisex";
export type Family = "Fresh" | "Citrus" | "Oriental" | "Floral";

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
  brand: "Moross",
  sizes: [50, 100, 200],
};

export const products: Product[] = [
  {
    ...base,
    id: "midnight-noir",
    name: "White Gardenia",
    price: 50,
    image: white_gardenia,
    gender: "Unisex",
    family: "Fresh",
    featured: false,
    bestSeller: false,
    rating: 3.5,
    reviews: 1,
    stock: 3,
    tagline: "1· 2 · 3",
    description:
      "",
    notes: {
      top: [""],
      heart: [""],
      base: [""],
    },
  },
  {
    ...base,
    id: "royal-oud",
    name: "Obisidian Velvet",
    price: 20,
    image: obisidianVelvet,
    gender: "Vīriešu",
    family: "Oriental",
    featured: true,
    bestSeller: true,
    rating: 4.8,
    reviews: 2,
    stock: 1,
    tagline: "",
    description:
      "",
    notes: {
      top: [""],
      heart: [""],
      base: [""],
    },
  },
  {
    ...base,
    id: "arctic-fresh",
    name: "Ember of Sin",
    price: 40,
    image: emberofSin,
    gender: "Unisex",
    family: "Fresh",
    featured: true,
    newest: true,
    rating: 4.7,
    reviews: 214,
    stock: 22,
    tagline: ".",
    description:
      "",
    notes: {
      top: [""],
      heart: [""],
      base: [""],
    },
  },
  {
    ...base,
    id: "velvet-amber",
    name: "Bloom Essence",
    price: 15,
    image: bloomEssence,
    gender: "Sieviešu",
    family: "Oriental",
    bestSeller: true,
    rating: 4.9,
    reviews: 501,
    stock: 15,
    tagline: "",
    description:
      "",
    notes: {
      top: [""],
      heart: [""],
      base: [""],
    },
  },
  {
    ...base,
    id: "silver-mist",
    name: "Amber Kiss",
    price: 36,
    image: amberKiss,
    gender: "Vīriešu",
    family: "Floral",
    newest: true,
    rating: 4.6,
    reviews: 187,
    stock: 18,
    tagline: "",
    description:
      "",
    notes: {
      top: [""],
      heart: [""],
      base: [""],
    },
  }
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const families: Family[] = ["Fresh", "Citrus", "Oriental", "Floral"];
export const genders: Gender[] = ["Vīriešu", "Sieviešu", "Unisex"];
