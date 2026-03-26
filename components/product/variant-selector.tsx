"use client";

import clsx from "clsx";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";

const COLOR_MAP: Record<string, string> = {
  black: "#000000",
  white: "#ffffff",
  rose: "#f4c2c2",
  merlot: "#73343a",
  espresso: "#3c2415",
  "powder rose": "#f4c2c2",
  "deep merlot": "#73343a",
  blue: "#4a90d9",
  sunbeam: "#f5d547",
  mint: "#98ff98",
};

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {},
    ),
  }));

  const updateOption = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return options.map((option) => {
    const optionNameLowerCase = option.name.toLowerCase();
    const selectedValue = searchParams.get(optionNameLowerCase) ?? option.values[0];
    const isColorOption = optionNameLowerCase === "color";

    return (
      <form key={option.id}>
        <dl className="mb-6">
          <dt className="mb-3 font-[family-name:var(--font-heading)] text-xs font-medium uppercase tracking-[0.12em] text-[var(--color-text)]">
            {option.name}:{" "}
            <span className="font-[family-name:var(--font-body)] font-normal normal-case tracking-normal">
              {selectedValue}
            </span>
          </dt>
          <dd className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const optionParams: Record<string, string> = {};
              searchParams.forEach((v, k) => (optionParams[k] = v));
              optionParams[optionNameLowerCase] = value;

              const filtered = Object.entries(optionParams).filter(
                ([key, val]) =>
                  options.find(
                    (opt) =>
                      opt.name.toLowerCase() === key &&
                      opt.values.includes(val),
                  ),
              );
              const isAvailableForSale = combinations.find((combination) =>
                filtered.every(
                  ([key, val]) =>
                    combination[key] === val && combination.availableForSale,
                ),
              );

              const isActive = searchParams.get(optionNameLowerCase) === value;

              if (isColorOption) {
                const swatchColor =
                  COLOR_MAP[value.toLowerCase()] ?? "#cccccc";
                const isLight =
                  swatchColor === "#ffffff" || swatchColor === "#f5d547" || swatchColor === "#98ff98" || swatchColor === "#f4c2c2";

                return (
                  <button
                    formAction={() => updateOption(optionNameLowerCase, value)}
                    key={value}
                    aria-disabled={!isAvailableForSale}
                    disabled={!isAvailableForSale}
                    title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                    className={clsx(
                      "relative h-10 w-10 transition-all duration-200",
                      {
                        "border-2 border-[#1c1c1c]": isActive,
                        "border border-[var(--color-border)] hover:border-[#1c1c1c]":
                          !isActive && isAvailableForSale,
                        "cursor-not-allowed opacity-50": !isAvailableForSale,
                        "border border-[var(--color-border)]":
                          !isActive && !isAvailableForSale,
                      },
                    )}
                    style={{ backgroundColor: swatchColor }}
                  >
                    {!isAvailableForSale && (
                      <span
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top right, transparent calc(50% - 0.5px), ${isLight ? "#999" : "#fff"} calc(50% - 0.5px), ${isLight ? "#999" : "#fff"} calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
                        }}
                      />
                    )}
                  </button>
                );
              }

              return (
                <button
                  formAction={() => updateOption(optionNameLowerCase, value)}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                  title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                  className={clsx(
                    "flex min-h-[44px] min-w-[48px] items-center justify-center border px-3 py-2 font-[family-name:var(--font-body)] text-sm transition-colors duration-200",
                    {
                      "border-[#1c1c1c] bg-[#1c1c1c] text-white": isActive,
                      "border-[var(--color-border)] bg-white text-[var(--color-text)] hover:border-[#1c1c1c]":
                        !isActive && isAvailableForSale,
                      "cursor-not-allowed border-[var(--color-border)] bg-white text-[#999] line-through opacity-50":
                        !isAvailableForSale,
                    },
                  )}
                >
                  {value}
                </button>
              );
            })}
          </dd>
        </dl>
      </form>
    );
  });
}
