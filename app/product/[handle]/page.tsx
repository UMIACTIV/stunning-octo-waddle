import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { RecentlyViewed } from "components/product/recently-viewed";
import { ReviewsSection } from "components/product/reviews-section";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
 params: Promise<{ handle: string }>;
}): Promise<Metadata> {
 const params = await props.params;
 const product = await getProduct(params.handle);

 if (!product) return notFound();

 const { url, width, height, altText: alt } = product.featuredImage || {};
 const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

 return {
 title: product.seo.title || product.title,
 description: product.seo.description || product.description,
 robots: {
 index: indexable,
 follow: indexable,
 googleBot: {
 index: indexable,
 follow: indexable,
 },
 },
 openGraph: url
 ? {
 images: [
 {
 url,
 width,
 height,
 alt,
 },
 ],
 }
 : null,
 };
}

export default async function ProductPage(props: {
 params: Promise<{ handle: string }>;
}) {
 const params = await props.params;
 const product = await getProduct(params.handle);

 if (!product) return notFound();

 const productJsonLd = {
 "@context": "https://schema.org",
 "@type": "Product",
 name: product.title,
 description: product.description,
 image: product.featuredImage.url,
 offers: {
 "@type": "AggregateOffer",
 availability: product.availableForSale
 ? "https://schema.org/InStock"
 : "https://schema.org/OutOfStock",
 priceCurrency: product.priceRange.minVariantPrice.currencyCode,
 highPrice: product.priceRange.maxVariantPrice.amount,
 lowPrice: product.priceRange.minVariantPrice.amount,
 },
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{
 __html: JSON.stringify(productJsonLd),
 }}
 />
   <div className="container-umi py-6 md:py-8">
   {/* Breadcrumb */}
   <nav className="mb-6 font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)]">
    <Link href="/" className="hover:text-[var(--color-text)]">Home</Link>
    <span className="mx-2">/</span>
    <span className="text-[var(--color-text)]">{product.title}</span>
   </nav>

   <div className="flex flex-col lg:flex-row lg:gap-10">
   <div className="w-full lg:w-[55%]">
   <Suspense
   fallback={
   <div className="relative aspect-[2/3] w-full overflow-hidden" />
   }
   >
   <Gallery
   images={product.images.map((image: Image) => ({
   src: image.url,
   altText: image.altText,
   }))}
   />
   </Suspense>
   </div>

   <div className="mt-6 w-full lg:mt-0 lg:w-[45%] lg:sticky lg:top-24 lg:self-start">
  <Suspense fallback={null}>
  <ProductDescription product={product} />
  </Suspense>
  </div>
  </div>
   <RelatedProducts id={product.id} />
   <ReviewsSection productTitle={product.title} />
   <RecentlyViewed currentHandle={params.handle} />
   </div>
 <Footer />
 </>
 );
}

async function RelatedProducts({ id }: { id: string }) {
 const relatedProducts = await getProductRecommendations(id);

 if (!relatedProducts.length) return null;

  return (
    <div className="py-8 md:py-12">
      <h2 className="mb-6 text-center font-[family-name:var(--font-heading)] text-lg font-medium uppercase tracking-[0.2em] md:text-xl">
        Related Products
      </h2>
      <ul className="scrollbar-hide flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="w-[45%] flex-none sm:w-[30%] md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative block w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 45vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
 );
}
