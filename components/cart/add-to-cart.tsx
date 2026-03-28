"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { addItem } from "components/cart/actions";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { useCart } from "./cart-context";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();

  if (!availableForSale) {
    return (
      <button
        disabled
        className="btn w-full cursor-not-allowed bg-[#efefef] text-[#999]"
      >
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className="btn w-full cursor-not-allowed bg-[#efefef] text-[#999]"
      >
        <PlusIcon className="mr-2 h-5" />
        Add To Cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx("btn btn-primary w-full", {
        "pointer-events-none": pending,
      })}
    >
      {pending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <>
          <PlusIcon className="mr-2 h-5" />
          Add To Cart
        </>
      )}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const searchParams = useSearchParams();
  const [message, formAction] = useActionState(addItem, null);
  const formRef = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase()),
    ),
  );
  const defaultVariantId =
    variants.length === 1
      ? variants[0]?.id
      : variants.find((v) =>
          v.selectedOptions.every((opt) => {
            const param = searchParams.get(opt.name.toLowerCase());
            const productOption = product.options.find(
              (o) => o.name.toLowerCase() === opt.name.toLowerCase(),
            );
            return param
              ? opt.value === param
              : opt.value === productOption?.values[0];
          }),
        )?.id;
  const selectedVariantId = variant?.id || defaultVariantId;
  const addItemAction = formAction.bind(null, selectedVariantId);
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAddToCart = async () => {
    addCartItem(finalVariant, product);
    addItemAction();
  };

  return (
    <>
      <div ref={formRef}>
        <form action={handleAddToCart}>
          <SubmitButton
            availableForSale={availableForSale}
            selectedVariantId={selectedVariantId}
          />
          <p aria-live="polite" className="sr-only" role="status">
            {message}
          </p>
        </form>
      </div>
      {showSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#eee] bg-white px-4 py-3 md:hidden">
          <form action={handleAddToCart} className="flex items-center gap-4">
            <Price
              className="shrink-0 text-[14px] font-medium"
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              currencyCodeClassName="hidden"
              style={{ fontFamily: "var(--font-body)", color: "#1c1c1c" }}
            />
            <div className="flex-1">
              <SubmitButton
                availableForSale={availableForSale}
                selectedVariantId={selectedVariantId}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
