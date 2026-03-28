"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "lib/shopify/types";

const COLOR_MAP: Record<string, string> = {
  Rose: "#f4c2c2",
  Merlot: "#73343a",
  Espresso: "#3c2415",
  White: "#ffffff",
  Noir: "#000000",
  Black: "#000000",
  Blue: "#4a90d9",
  "Blue Sky": "#87CEEB",
  Sunbeam: "#f5d547",
  Laguna: "#40E0D0",
  Midnight: "#191970",
  Navy: "#000080",
};

function getBaseName(title: string): string {
  const parts = title.split(" – ");
  return parts[0] || title;
}

function getColorName(title: string): string {
  const parts = title.split(" – ");
  return parts[1] || "";
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
  }).format(parseFloat(amount));
}

interface ColorSibling {
  handle: string;
  color: string;
  hex: string;
  image: string;
  secondImage: string;
  title: string;
  price: string;
  currencyCode: string;
}

type SiblingMap = Record<string, ColorSibling[]>;

const TABS = ["NEW RELEASE", "BEST SELLERS"] as const;
type Tab = (typeof TABS)[number];

function buildSiblingMap(products: Product[]): SiblingMap {
  const map: SiblingMap = {};
  for (const p of products) {
    const base = getBaseName(p.title);
    const color = getColorName(p.title);
    if (!color) continue;
    if (!map[base]) map[base] = [];
    map[base]!.push({
      handle: p.handle,
      color,
      hex: COLOR_MAP[color] || "#cccccc",
      image: p.featuredImage?.url || "",
      secondImage: p.images[1]?.url || p.featuredImage?.url || "",
      title: p.title,
      price: p.priceRange.maxVariantPrice.amount,
      currencyCode: p.priceRange.maxVariantPrice.currencyCode,
    });
  }
  return map;
}

function ProductCard({
  product,
  allProducts,
  siblingMap,
  activeHandle,
  onSwatchClick,
}: {
  product: Product;
  allProducts: Product[];
  siblingMap: SiblingMap;
  activeHandle: string;
  onSwatchClick: (baseName: string, handle: string) => void;
}) {
  const baseName = getBaseName(product.title);
  const siblings = siblingMap[baseName] || [];

  const displayed =
    activeHandle !== product.handle
      ? allProducts.find((p) => p.handle === activeHandle) || product
      : product;

  const img1 = displayed.featuredImage?.url || "";
  const img2 = displayed.images[1]?.url || img1;
  const price = displayed.priceRange.maxVariantPrice.amount;
  const currency = displayed.priceRange.maxVariantPrice.currencyCode;

  return (
    <div className="group">
      <Link href={`/product/${displayed.handle}`} className="block">
        <div
          className="relative mb-3 w-full overflow-hidden"
          style={{ aspectRatio: "3 / 4" }}
        >
          <Image
            src={img1}
            alt={displayed.title}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
            style={{ transition: "opacity 0.4s ease" }}
          />
          <Image
            src={img2}
            alt={`${displayed.title} alternate`}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover opacity-0 group-hover:opacity-100"
            style={{ transition: "opacity 0.4s ease" }}
          />
        </div>
      </Link>

      <div style={{ padding: "0 10px 16px" }}>
        <Link href={`/product/${displayed.handle}`}>
          <p
            className="mb-1 truncate"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#1c1c1c",
            }}
          >
            {displayed.title}
          </p>
        </Link>

        <p className="mb-2">
          <span className="sr-only">Sale price</span>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 400,
              color: "#1c1c1c",
            }}
          >
            {formatPrice(price, currency)}
          </span>
        </p>

        {siblings.length > 1 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {siblings.map((s) => {
              const isActive = s.handle === displayed.handle;
              return (
                <button
                  key={s.handle}
                  aria-label={`Select color ${s.color}`}
                  onClick={() => onSwatchClick(baseName, s.handle)}
                  className="cursor-pointer"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 0,
                    backgroundColor: s.hex,
                    border: isActive ? "2px solid #1c1c1c" : "1px solid #ddd",
                    padding: 0,
                    transition: "border 0.15s ease",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductGridClient({
  newRelease,
  bestSellers,
}: {
  newRelease: Product[];
  bestSellers: Product[];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("NEW RELEASE");

  const products = activeTab === "NEW RELEASE" ? newRelease : bestSellers;
  const allProducts = useMemo(
    () => [...newRelease, ...bestSellers],
    [newRelease, bestSellers],
  );

  const newSiblingMap = useMemo(
    () => buildSiblingMap(newRelease),
    [newRelease],
  );
  const bestSiblingMap = useMemo(
    () => buildSiblingMap(bestSellers),
    [bestSellers],
  );
  const siblingMap =
    activeTab === "NEW RELEASE" ? newSiblingMap : bestSiblingMap;

  const [activeHandles, setActiveHandles] = useState<Record<string, string>>(
    {},
  );

  function handleSwatchClick(baseName: string, handle: string) {
    setActiveHandles((prev) => ({ ...prev, [baseName]: handle }));
  }

  function getActiveHandle(product: Product): string {
    const base = getBaseName(product.title);
    return activeHandles[base] || product.handle;
  }

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-umi">
        <div className="mb-6 flex items-center justify-center gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="cursor-pointer pb-2 transition-colors"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: activeTab === tab ? "#1c1c1c" : "#999",
                borderBottom:
                  activeTab === tab
                    ? "2px solid #1c1c1c"
                    : "2px solid transparent",
                background: "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full overflow-x-hidden">
        <div
          className="scrollbar-hide flex overflow-x-auto px-4 md:px-8"
          style={{ scrollSnapType: "x mandatory", gap: 0 }}
        >
          {products.map((product) => (
            <div
              key={product.handle}
              className="flex-shrink-0"
              style={{
                width: "clamp(240px, 25vw, 340px)",
                scrollSnapAlign: "start",
              }}
            >
              <ProductCard
                product={product}
                allProducts={allProducts}
                siblingMap={siblingMap}
                activeHandle={getActiveHandle(product)}
                onSwatchClick={handleSwatchClick}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container-umi mt-8 text-center">
        <Link
          href="/search"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "#1c1c1c",
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          View All
        </Link>
      </div>
    </section>
  );
}
