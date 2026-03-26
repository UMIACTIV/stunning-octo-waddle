"use client";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { useWishlist } from "components/wishlist/wishlist-context";
import type { Product } from "lib/shopify/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProductsByHandles } from "./actions";

export default function WishlistContent() {
  const { wishlist, wishlistCount } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getProductsByHandles(wishlist)
      .then((fetched) => setProducts(fetched))
      .finally(() => setLoading(false));
  }, [wishlist]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p
          className="text-sm"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "#6b6b6b",
          }}
        >
          Loading...
        </p>
      </div>
    );
  }

  if (wishlistCount === 0) {
    return (
      <div className="py-20 text-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto mb-6 text-[#dddddd]"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <h2 className="mb-3">Your wishlist is empty</h2>
        <p
          className="mx-auto mb-8 max-w-md text-sm"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "#6b6b6b",
          }}
        >
          Browse our collection and save your favorite pieces.
        </p>
        <Link href="/search" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] py-3">
        <span
          className="text-sm"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "#6b6b6b",
          }}
        >
          {wishlistCount} {wishlistCount === 1 ? "item" : "items"}
        </span>
      </div>

      <Grid className="grid-cols-2 md:grid-cols-4">
        <ProductGridItems products={products} />
      </Grid>
    </>
  );
}
