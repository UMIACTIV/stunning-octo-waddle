import { getProductRecommendations } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json([]);

  try {
    const products = await getProductRecommendations(id);
    return NextResponse.json(
      products.slice(0, 6).map((p) => ({
        handle: p.handle,
        title: p.title,
        image: p.featuredImage?.url || "",
        price: p.priceRange.maxVariantPrice.amount,
        currencyCode: p.priceRange.maxVariantPrice.currencyCode,
      })),
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } },
    );
  } catch {
    return NextResponse.json([]);
  }
}
