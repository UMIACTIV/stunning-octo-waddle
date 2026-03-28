import { getProducts } from "lib/shopify";
import { buildSearchIndex, searchProducts } from "lib/search";
import { NextRequest, NextResponse } from "next/server";

const HEADERS = { "Cache-Control": "public, max-age=300, s-maxage=300" };

const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function formatResult(r: {
  handle: string;
  title: string;
  image: string;
  price: string;
  currencyCode: string;
}) {
  return {
    handle: r.handle,
    title: r.title,
    image: r.image,
    price: r.price,
    currencyCode: r.currencyCode,
  };
}

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") || "").trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, { headers: HEADERS });
  }

  try {
    const allProducts = await getProducts({});
    const index = buildSearchIndex(allProducts);
    const smartResults = searchProducts(index, query);

    if (smartResults.length > 0) {
      const data = smartResults.slice(0, 6).map(formatResult);
      cache.set(cacheKey, { data, ts: Date.now() });
      return NextResponse.json(data, { headers: HEADERS });
    }

    const shopifyResults = await getProducts({ query });
    const data = shopifyResults.slice(0, 6).map((p) => ({
      handle: p.handle,
      title: p.title,
      image: p.featuredImage?.url || "",
      price: p.priceRange.maxVariantPrice.amount,
      currencyCode: p.priceRange.maxVariantPrice.currencyCode,
    }));

    cache.set(cacheKey, { data, ts: Date.now() });

    if (cache.size > 200) {
      const now = Date.now();
      for (const [key, val] of cache) {
        if (now - val.ts > CACHE_TTL) cache.delete(key);
      }
    }

    return NextResponse.json(data, { headers: HEADERS });
  } catch {
    return NextResponse.json([]);
  }
}
