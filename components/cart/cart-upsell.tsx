"use client";

import Image from "next/image";
import Link from "next/link";
import Price from "components/price";
import { useEffect, useState } from "react";

type UpsellProduct = {
  handle: string;
  title: string;
  image: string;
  price: string;
  currencyCode: string;
};

export function CartUpsell({
  cartProductIds,
  onNavigate,
}: {
  cartProductIds: string[];
  onNavigate: () => void;
}) {
  const [products, setProducts] = useState<UpsellProduct[]>([]);

  useEffect(() => {
    if (!cartProductIds.length) return;

    const firstId = cartProductIds[0]!;
    fetch(`/api/recommendations?id=${encodeURIComponent(firstId)}`)
      .then((r) => r.json())
      .then((data: UpsellProduct[]) => {
        const inCart = new Set(cartProductIds);
        setProducts(data.filter((p) => !inCart.has(p.handle)).slice(0, 3));
      })
      .catch(() => {});
  }, [cartProductIds]);

  if (!products.length) return null;

  return (
    <div className="border-t border-[#eee] py-4">
      <p
        className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#6b6b6b]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Complete the look
      </p>
      <div className="flex gap-3">
        {products.map((p) => (
          <Link
            key={p.handle}
            href={`/product/${p.handle}`}
            onClick={onNavigate}
            className="group flex-1"
          >
            <div className="relative mb-2 aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="100px"
                  className="object-cover transition-opacity group-hover:opacity-80"
                />
              )}
            </div>
            <p
              className="truncate text-[11px] text-[#1c1c1c]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {p.title}
            </p>
            <Price
              className="text-[11px] text-[#6b6b6b]"
              amount={p.price}
              currencyCode={p.currencyCode}
              currencyCodeClassName="hidden"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
