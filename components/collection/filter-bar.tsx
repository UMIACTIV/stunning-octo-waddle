"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { type SortFilterItem, sorting } from "lib/constants";
import type { ShopifyFilter } from "lib/shopify/types";
import { createUrl } from "lib/utils";
import { MobileFilterDrawer } from "./filter-sidebar";

export default function FilterBar({
  productCount,
  sortOptions = sorting,
  availableFilters = [],
  activeFilterCount = 0,
}: {
  productCount: number;
  sortOptions?: SortFilterItem[];
  availableFilters?: ShopifyFilter[];
  activeFilterCount?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentSort = searchParams.get("sort");

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set("sort", value);
    } else {
      newParams.delete("sort");
    }

    newParams.delete("page");

    router.push(createUrl(pathname, newParams));
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-[var(--color-border)] py-3 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 md:hidden"
            aria-label="Open filters"
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4 text-[#1c1c1c]" />
            <span
              className="text-[11px] text-[#1c1c1c]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="ml-1 text-[10px] text-[#999]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                  }}
                >
                  ({activeFilterCount})
                </span>
              )}
            </span>
          </button>

          <span
            className="text-sm"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            {productCount} {productCount === 1 ? "product" : "products"}
          </span>
        </div>

        <label className="flex items-center gap-2">
          <span
            className="text-[11px] uppercase"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: "#6b6b6b",
            }}
          >
            Sort by
          </span>
          <select
            value={currentSort ?? ""}
            onChange={handleSortChange}
            className="appearance-none border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 pr-8 text-sm"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#1c1c1c",
              borderRadius: 0,
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%231c1c1c%27 stroke-width=%272%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")',
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "12px",
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.title} value={option.slug ?? ""}>
                {option.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <MobileFilterDrawer
        availableFilters={availableFilters}
        productCount={productCount}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
