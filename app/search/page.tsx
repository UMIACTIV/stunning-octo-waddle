import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import FilterBar from "components/collection/filter-bar";
import Pagination from "components/collection/pagination";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

const ITEMS_PER_PAGE = 16;

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const {
    sort,
    q: searchValue,
    page: pageParam,
  } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });

  const currentPage = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const displayProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const paginationParams: Record<string, string> = {};
  if (sort) paginationParams.sort = sort;
  if (searchValue) paginationParams.q = searchValue;

  return (
    <section>
      {searchValue ? (
        <div className="py-8 text-center">
          <h1>
            {products.length === 0
              ? "No results"
              : `Search results for "${searchValue}"`}
          </h1>
          {products.length === 0 && (
            <p
              className="mx-auto mt-3 max-w-xl text-sm"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              No products match &ldquo;{searchValue}&rdquo;
            </p>
          )}
        </div>
      ) : null}

      {products.length > 0 ? (
        <>
          <FilterBar productCount={products.length} />

          <Grid className="grid-cols-2 md:grid-cols-4">
            <ProductGridItems products={displayProducts} />
          </Grid>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/search"
            searchParams={paginationParams}
          />
        </>
      ) : null}
    </section>
  );
}
