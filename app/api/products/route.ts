import { getProducts } from 'lib/shopify';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const sortKey = searchParams.get('sortKey') || undefined;
  const reverse = searchParams.get('reverse') === 'true';

  try {
    const products = await getProducts({ sortKey, reverse });
    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}
