"use server";

import { getProduct } from "lib/shopify";
import type { Product } from "lib/shopify/types";

export async function getProductsByHandles(
  handles: string[]
): Promise<Product[]> {
  const results = await Promise.all(handles.map((h) => getProduct(h)));
  return results.filter((p): p is Product => !!p);
}
