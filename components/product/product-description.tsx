import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { AccordionSection } from "./accordion-section";
import { TrustBadges } from "./trust-badges";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <div className="flex flex-col">
      {/* Brand */}
      <Link
        href="/search"
        className="mb-2 font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        UMIACTIV
      </Link>

      {/* Title */}
      <h1 className="mb-2 font-[family-name:var(--font-heading)] font-medium uppercase tracking-[0.2em] text-[length:var(--text-h1)]">
        {product.title}
      </h1>

      {/* Stars placeholder */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              strokeWidth="1.5"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)]">
          No reviews
        </span>
      </div>

      {/* Price */}
      <div className="mb-4 font-[family-name:var(--font-body)] text-base font-normal text-[var(--color-text)]">
        <Price
          amount={product.priceRange.maxVariantPrice.amount}
          currencyCode={product.priceRange.maxVariantPrice.currencyCode}
        />
      </div>

      {/* Divider */}
      <div className="mb-6 border-t border-[var(--color-border)]" />

      {/* Variant Selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Add to Cart */}
      <AddToCart product={product} />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Description Accordions */}
      {product.descriptionHtml ? (
        <div className="mt-6">
          <AccordionSection title="Description" defaultOpen>
            <div
              className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-text)] [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:font-[family-name:var(--font-heading)] [&_h3]:text-sm [&_h3]:font-medium [&_h3]:uppercase [&_h3]:tracking-[0.2em] [&_p]:mb-2 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </AccordionSection>
          <AccordionSection title="Delivery &amp; Returns">
            <div className="space-y-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-text)]">
              <p>Free worldwide shipping on orders $500 – $1,000.</p>
              <p>
                14-day return policy. Items must be unworn with tags attached.
              </p>
              <p>
                <Link
                  href="/pages/shipping"
                  className="underline hover:no-underline"
                >
                  View shipping policy
                </Link>
              </p>
            </div>
          </AccordionSection>
          <AccordionSection title="Size Chart">
            <div className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-text)]">
              <p>Please refer to our size chart for measurements.</p>
              <p className="mt-2">
                <Link
                  href="/pages/size-chart"
                  className="underline hover:no-underline"
                >
                  View full size chart
                </Link>
              </p>
            </div>
          </AccordionSection>
        </div>
      ) : null}
    </div>
  );
}
