import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { WishlistButton } from "components/wishlist/wishlist-button";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => {
        const colorName = product.title.includes(" – ")
          ? product.title.split(" – ").pop() || ""
          : "";

        const compareAtMax = product.compareAtPriceRange?.maxVariantPrice;
        const currentMax = product.priceRange.maxVariantPrice;
        const isOnSale = !!(
          compareAtMax &&
          parseFloat(compareAtMax.amount) > parseFloat(currentMax.amount)
        );
        const isSoldOut = !product.availableForSale;

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <div className="relative">
              <Link
                href={`/product/${product.handle}`}
                prefetch={true}
                className="block"
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  colorName={colorName}
                  isOnSale={isOnSale}
                  isSoldOut={isSoldOut}
                  compareAtPrice={compareAtMax?.amount}
                  compareAtCurrencyCode={compareAtMax?.currencyCode}
                  src={product.featuredImage?.url}
                  hoverSrc={product.images?.[1]?.url}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Link>
              <div className="absolute top-2 right-2 z-10">
                <WishlistButton
                  productHandle={product.handle}
                  size={16}
                  className="flex items-center justify-center rounded-full bg-white/70 p-1.5 text-[#1c1c1c] backdrop-blur-sm transition-colors hover:bg-white/90"
                />
              </div>
            </div>
          </Grid.Item>
        );
      })}
    </>
  );
}
