import { getProducts } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

// Simple in-memory cache to avoid hammering Shopify on repeated queries
const cache = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = (searchParams.get("q") || "").trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  const cacheKey = query.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    });
  }

  try {
    const products = await getProducts({ query });

    const results = products.map((product) => ({
      handle: product.handle,
      title: product.title,
      image: product.featuredImage?.url || "",
      price: product.priceRange.maxVariantPrice.amount,
      currencyCode: product.priceRange.maxVariantPrice.currencyCode,
    }));

    cache.set(cacheKey, { data: results, ts: Date.now() });

    // Evict old entries if cache grows too large
    if (cache.size > 200) {
      const now = Date.now();
      for (const [key, val] of cache) {
        if (now - val.ts > CACHE_TTL) cache.delete(key);
      }
    }

    return NextResponse.json(results, {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    });
  } catch {
    return NextResponse.json([]);
  }
}
