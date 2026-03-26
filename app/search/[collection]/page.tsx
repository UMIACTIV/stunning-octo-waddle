import { Suspense } from "react";
import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import FilterBar from "components/collection/filter-bar";
import FilterSidebar from "components/collection/filter-sidebar";
import Pagination from "components/collection/pagination";
import { defaultSort, sorting } from "lib/constants";

const ITEMS_PER_PAGE = 16;

function parseFiltersFromSearchParams(
  filtersParam: string | undefined,
): Record<string, unknown>[] {
  if (!filtersParam) return [];
  try {
    const padded = filtersParam.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(padded)) as string[];
    return decoded.map((input) => JSON.parse(input) as Record<string, unknown>);
  } catch {
    return [];
  }
}

function countActiveFilters(filtersParam: string | undefined): number {
  if (!filtersParam) return 0;
  try {
    const padded = filtersParam.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(padded)) as string[];
    return decoded.length;
  } catch {
    return 0;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const {
    sort,
    page: pageParam,
    filters: filtersParam,
  } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  const shopifyFilters = parseFiltersFromSearchParams(filtersParam);
  const activeFilterCount = countActiveFilters(filtersParam);

  const { products, filters: availableFilters } =
    await getCollectionProducts({
      collection: params.collection,
      sortKey,
      reverse,
      ...(shopifyFilters.length > 0 ? { filters: shopifyFilters } : {}),
    });

  const currentPage = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const paginationParams: Record<string, string> = {};
  if (sort) paginationParams.sort = sort;
  if (filtersParam) paginationParams.filters = filtersParam;

  return (
    <section>
      <div className="py-8 text-center">
        <h1>{collection.title}</h1>
        {collection.description && (
          <p
            className="mx-auto mt-3 max-w-xl text-sm"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            {collection.description}
          </p>
        )}
      </div>

      <FilterBar
        productCount={products.length}
        availableFilters={availableFilters}
        activeFilterCount={activeFilterCount}
      />

      <div className="flex gap-8">
        <Suspense>
          <aside className="hidden w-[240px] shrink-0 md:block">
            <div className="sticky top-4">
              <FilterSidebar availableFilters={availableFilters} />
            </div>
          </aside>
        </Suspense>

        <div className="min-w-0 flex-1">
          {displayProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p
                className="text-lg"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "#6b6b6b",
                }}
              >
                No products found
              </p>
              {activeFilterCount > 0 && (
                <a
                  href={`/search/${params.collection}${sort ? `?sort=${sort}` : ""}`}
                  className="mt-3 inline-block text-[12px] underline underline-offset-2 transition-colors hover:text-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "#6b6b6b",
                  }}
                >
                  Clear all filters
                </a>
              )}
            </div>
          ) : (
            <Grid className="grid-cols-2 md:grid-cols-3">
              <ProductGridItems products={displayProducts} />
            </Grid>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/search/${params.collection}`}
            searchParams={paginationParams}
          />
        </div>
      </div>
    </section>
  );
}
