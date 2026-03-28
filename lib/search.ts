import MiniSearch from "minisearch";
import type { Product } from "./shopify/types";

export type SearchDocument = {
  id: string;
  handle: string;
  title: string;
  description: string;
  tags: string;
  productType: string;
  synonymTags: string;
  image: string;
  price: string;
  currencyCode: string;
};

const SYNONYMS: Record<string, string[]> = {
  tennis: ["tennis", "court", "racket", "racquet"],
  running: ["running", "jogging", "cardio", "marathon", "run"],
  yoga: ["yoga", "pilates", "stretching", "zen", "mindfulness"],
  gym: ["gym", "weightlifting", "strength", "training", "workout"],
  golf: ["golf", "golfing", "club"],
  swim: ["swim", "swimming", "pool", "aqua", "water"],
  resort: ["resort", "vacation", "travel", "holiday", "beach"],
  lounge: ["lounge", "lounging", "relax", "chill", "lazy"],
  cute: ["cute", "adorable", "stylish", "pretty", "chic", "feminine"],
  warm: ["warm", "thermal", "insulated", "fleece", "cozy", "winter"],
  cool: ["cool", "breathable", "lightweight", "airy", "summer"],
  comfy: ["comfy", "comfortable", "soft", "relaxed", "cozy"],
  tight: ["tight", "fitted", "compression", "sculpt", "sculpting", "snug"],
  loose: ["loose", "relaxed", "oversized", "flowy", "baggy"],
  sporty: ["sporty", "athletic", "sport", "active", "activewear"],
  elegant: ["elegant", "classy", "sophisticated", "luxe", "luxury", "premium"],
  leggings: ["leggings", "tights", "pants"],
  shorts: ["shorts", "short"],
  skirt: ["skirt", "skort", "mini"],
  top: ["top", "bra", "crop", "shirt", "blouse", "tank"],
  dress: ["dress", "onesie", "jumpsuit", "bodysuit", "romper"],
  flare: ["flare", "flared", "bootcut", "wide-leg", "bell"],
  seamless: ["seamless", "smooth", "no-seam"],
  rose: ["rose", "pink", "blush", "mauve", "dusty-rose"],
  white: ["white", "ivory", "cream"],
  black: ["black", "noir", "dark"],
  espresso: ["espresso", "brown", "mocha", "chocolate", "coffee"],
  merlot: ["merlot", "burgundy", "wine", "maroon", "deep-red"],
  laguna: ["laguna", "teal", "blue-green", "aqua", "turquoise"],
  sunbeam: ["sunbeam", "yellow", "golden", "sunshine"],
};

const SYNONYM_MAP = new Map<string, string[]>();
for (const terms of Object.values(SYNONYMS)) {
  for (const term of terms) {
    SYNONYM_MAP.set(term, terms);
  }
}

const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "for",
  "and",
  "or",
  "to",
  "in",
  "is",
  "it",
  "of",
  "on",
  "at",
  "something",
  "some",
  "me",
  "my",
  "i",
  "want",
  "need",
  "looking",
  "find",
  "get",
  "like",
  "with",
]);

function processTerm(term: string): string | string[] | null {
  const lower = term.toLowerCase();
  if (STOP_WORDS.has(lower)) return null;
  const synonyms = SYNONYM_MAP.get(lower);
  return synonyms ?? lower;
}

function generateSynonymTags(product: Product): string {
  const text =
    `${product.title} ${product.tags.join(" ")} ${product.description}`.toLowerCase();
  const matched: string[] = [];

  for (const [canonical, terms] of Object.entries(SYNONYMS)) {
    if (terms.some((t) => text.includes(t))) {
      matched.push(canonical);
    }
  }

  return [...new Set(matched)].join(" ");
}

let cachedIndex: MiniSearch<SearchDocument> | null = null;
let cachedProducts: Product[] | null = null;

export function buildSearchIndex(
  products: Product[],
): MiniSearch<SearchDocument> {
  if (cachedIndex && cachedProducts === products) return cachedIndex;

  const miniSearch = new MiniSearch<SearchDocument>({
    fields: ["title", "description", "tags", "productType", "synonymTags"],
    storeFields: ["handle", "title", "image", "price", "currencyCode"],
    idField: "id",
    processTerm,
    searchOptions: {
      boost: {
        title: 3,
        synonymTags: 2.5,
        tags: 2,
        productType: 1.5,
        description: 1,
      },
      fuzzy: (term: string) => (term.length > 4 ? 0.2 : false),
      prefix: (term: string) => term.length > 2,
      combineWith: "OR",
    },
  });

  const docs: SearchDocument[] = products.map((p) => ({
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    tags: p.tags.join(" "),
    productType: p.options.map((o) => o.values.join(" ")).join(" "),
    synonymTags: generateSynonymTags(p),
    image: p.featuredImage?.url ?? "",
    price: p.priceRange.maxVariantPrice.amount,
    currencyCode: p.priceRange.maxVariantPrice.currencyCode,
  }));

  miniSearch.addAll(docs);
  cachedIndex = miniSearch;
  cachedProducts = products;

  return miniSearch;
}

export function searchProducts(
  index: MiniSearch<SearchDocument>,
  query: string,
): SearchDocument[] {
  if (!query.trim() || query.trim().length < 2) return [];
  const results = index.search(query);
  return results.map((r) => ({
    id: r.id as string,
    handle: r.handle as string,
    title: r.title as string,
    description: "",
    tags: "",
    productType: "",
    synonymTags: "",
    image: r.image as string,
    price: r.price as string,
    currencyCode: r.currencyCode as string,
  }));
}
