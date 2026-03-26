"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useMemo, useState, useTransition } from "react";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { ShopifyFilter, ShopifyFilterValue } from "lib/shopify/types";
import { createUrl } from "lib/utils";

/**
 * Active filters are stored in a single `filters` URL param as a
 * base64url-encoded JSON array of Shopify ProductFilter input strings.
 * base64url uses `-` and `_` instead of `+` and `/` for URL safety.
 */
function encodeFilters(inputs: string[]): string {
  if (inputs.length === 0) return "";
  try {
    return btoa(JSON.stringify(inputs))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } catch {
    return "";
  }
}

function decodeFilters(encoded: string): string[] {
  if (!encoded) return [];
  try {
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(padded)) as string[];
  } catch {
    return [];
  }
}

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-heading)",
  fontWeight: 500,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const bodyStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontWeight: 400,
};

export default function FilterSidebar({
  availableFilters,
  className,
}: {
  availableFilters: ShopifyFilter[];
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeInputs = useMemo(
    () => decodeFilters(searchParams.get("filters") ?? ""),
    [searchParams],
  );

  const activeValueIds = useMemo(() => {
    const ids = new Set<string>();
    for (const group of availableFilters) {
      for (const v of group.values) {
        if (activeInputs.includes(v.input)) {
          ids.add(v.id);
        }
      }
    }
    return ids;
  }, [availableFilters, activeInputs]);

  const activeCountByGroup = useMemo(() => {
    const map = new Map<string, number>();
    for (const group of availableFilters) {
      let count = 0;
      for (const v of group.values) {
        if (activeInputs.includes(v.input)) count++;
      }
      map.set(group.id, count);
    }
    return map;
  }, [availableFilters, activeInputs]);

  const pushFilters = useCallback(
    (nextInputs: string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("page");

      if (nextInputs.length > 0) {
        newParams.set("filters", encodeFilters(nextInputs));
      } else {
        newParams.delete("filters");
      }

      startTransition(() => {
        router.push(createUrl(pathname, newParams), { scroll: false });
      });
    },
    [pathname, router, searchParams, startTransition],
  );

  const toggleFilter = useCallback(
    (input: string) => {
      const next = activeInputs.includes(input)
        ? activeInputs.filter((i) => i !== input)
        : [...activeInputs, input];
      pushFilters(next);
    },
    [activeInputs, pushFilters],
  );

  const removeFilter = useCallback(
    (input: string) => {
      pushFilters(activeInputs.filter((i) => i !== input));
    },
    [activeInputs, pushFilters],
  );

  const clearAll = useCallback(() => {
    pushFilters([]);
  }, [pushFilters]);

  const activeChips = useMemo(() => {
    const chips: { label: string; groupLabel: string; input: string }[] = [];
    for (const group of availableFilters) {
      for (const v of group.values) {
        if (activeInputs.includes(v.input)) {
          chips.push({
            label: v.label,
            groupLabel: group.label,
            input: v.input,
          });
        }
      }
    }
    return chips;
  }, [availableFilters, activeInputs]);

  const getPriceRange = useCallback((): { min: string; max: string } => {
    for (const input of activeInputs) {
      try {
        const parsed = JSON.parse(input);
        if (parsed.price) {
          return {
            min: parsed.price.min != null ? String(parsed.price.min) : "",
            max: parsed.price.max != null ? String(parsed.price.max) : "",
          };
        }
      } catch {
        continue;
      }
    }
    return { min: "", max: "" };
  }, [activeInputs]);

  const applyPriceRange = useCallback(
    (min: string, max: string) => {
      const withoutPrice = activeInputs.filter((input) => {
        try {
          return !JSON.parse(input).price;
        } catch {
          return true;
        }
      });

      const minNum = min ? Number(min) : 0;
      const maxNum = max ? Number(max) : undefined;

      if (!min && !max) {
        pushFilters(withoutPrice);
        return;
      }

      const priceInput = JSON.stringify({
        price: {
          min: minNum,
          ...(maxNum != null ? { max: maxNum } : {}),
        },
      });

      pushFilters([...withoutPrice, priceInput]);
    },
    [activeInputs, pushFilters],
  );

  const content = (
    <div className={className} style={isPending ? { opacity: 0.6 } : undefined}>
      {activeChips.length > 0 && (
        <div className="mb-5">
          <div className="flex flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.input}
                onClick={() => removeFilter(chip.input)}
                className="inline-flex items-center gap-1.5 border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1 text-[11px] transition-colors hover:border-[#1c1c1c]"
                style={bodyStyle}
              >
                <span className="text-[#1c1c1c]">{chip.label}</span>
                <XMarkIcon className="h-3 w-3 text-[#999]" />
              </button>
            ))}
          </div>
          <button
            onClick={clearAll}
            className="mt-2.5 text-[11px] underline underline-offset-2 transition-colors hover:text-[#1c1c1c]"
            style={{ ...bodyStyle, color: "#6b6b6b" }}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="divide-y divide-[var(--color-border)]">
        {availableFilters.map((group) => {
          const nonEmptyValues = group.values.filter(
            (v) => v.count > 0 || activeValueIds.has(v.id),
          );
          if (nonEmptyValues.length === 0) return null;

          const groupActiveCount = activeCountByGroup.get(group.id) ?? 0;

          if (group.type === "PRICE_RANGE") {
            return (
              <PriceRangeGroup
                key={group.id}
                group={group}
                priceRange={getPriceRange()}
                onApply={applyPriceRange}
                activeCount={groupActiveCount}
              />
            );
          }

          return (
            <FilterGroup
              key={group.id}
              group={group}
              values={nonEmptyValues}
              activeValueIds={activeValueIds}
              activeCount={groupActiveCount}
              onToggle={toggleFilter}
            />
          );
        })}
      </div>
    </div>
  );

  return content;
}

function FilterGroup({
  group,
  values,
  activeValueIds,
  activeCount,
  onToggle,
}: {
  group: ShopifyFilter;
  values: ShopifyFilterValue[];
  activeValueIds: Set<string>;
  activeCount: number;
  onToggle: (input: string) => void;
}) {
  return (
    <Disclosure as="div" defaultOpen>
      <DisclosureButton className="flex w-full items-center justify-between py-3.5 text-left">
        <span className="text-[11px] text-[#1c1c1c]" style={headingStyle}>
          {group.label}
          {activeCount > 0 && (
            <span
              className="ml-1.5 text-[10px] text-[#999]"
              style={bodyStyle}
            >
              ({activeCount})
            </span>
          )}
        </span>
        <ChevronDownIcon className="h-3.5 w-3.5 text-[#999] transition-transform ui-open:rotate-180" />
      </DisclosureButton>

      <DisclosurePanel className="pb-3.5">
        <ul className="space-y-2">
          {values.map((value) => {
            const isActive = activeValueIds.has(value.id);
            return (
              <li key={value.id}>
                <label className="flex cursor-pointer items-center gap-2.5 text-[12px]">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => onToggle(value.input)}
                    className="h-3.5 w-3.5 appearance-none border border-[var(--color-border)] bg-[var(--color-background)] checked:border-[#1c1c1c] checked:bg-[#1c1c1c]"
                    style={{ borderRadius: 0 }}
                  />
                  <span
                    className={isActive ? "text-[#1c1c1c]" : "text-[#6b6b6b]"}
                    style={bodyStyle}
                  >
                    {value.label}
                  </span>
                  <span
                    className="text-[10px] text-[#999]"
                    style={bodyStyle}
                  >
                    ({value.count})
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </DisclosurePanel>
    </Disclosure>
  );
}

function PriceRangeGroup({
  group,
  priceRange,
  onApply,
  activeCount,
}: {
  group: ShopifyFilter;
  priceRange: { min: string; max: string };
  onApply: (min: string, max: string) => void;
  activeCount: number;
}) {
  const [min, setMin] = useState(priceRange.min);
  const [max, setMax] = useState(priceRange.max);

  const handleApply = () => {
    onApply(min, max);
  };

  const inputClass =
    "w-full border border-[var(--color-border)] bg-[var(--color-background)] px-2.5 py-1.5 text-[12px] text-[#1c1c1c] placeholder:text-[#999]";

  return (
    <Disclosure as="div" defaultOpen>
      <DisclosureButton className="flex w-full items-center justify-between py-3.5 text-left">
        <span className="text-[11px] text-[#1c1c1c]" style={headingStyle}>
          {group.label}
          {activeCount > 0 && (
            <span
              className="ml-1.5 text-[10px] text-[#999]"
              style={bodyStyle}
            >
              (1)
            </span>
          )}
        </span>
        <ChevronDownIcon className="h-3.5 w-3.5 text-[#999] transition-transform ui-open:rotate-180" />
      </DisclosureButton>

      <DisclosurePanel className="pb-3.5">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={inputClass}
            style={{ ...bodyStyle, borderRadius: 0 }}
            min={0}
          />
          <span className="text-[11px] text-[#999]" style={bodyStyle}>
            —
          </span>
          <input
            type="number"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            className={inputClass}
            style={{ ...bodyStyle, borderRadius: 0 }}
            min={0}
          />
        </div>
        <button
          onClick={handleApply}
          className="mt-2.5 w-full border border-[#1c1c1c] bg-[#1c1c1c] px-3 py-1.5 text-[11px] text-white transition-colors hover:bg-[#333]"
          style={{ ...headingStyle, borderRadius: 0 }}
        >
          Apply
        </button>
      </DisclosurePanel>
    </Disclosure>
  );
}

export function MobileFilterDrawer({
  availableFilters,
  productCount,
  open,
  onClose,
}: {
  availableFilters: ShopifyFilter[];
  productCount: number;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>

        <TransitionChild
          as={Fragment}
          enter="transition-transform duration-300 ease-out"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-200 ease-in"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <DialogPanel className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-[var(--color-background)]">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
              <span
                className="text-[12px] text-[#1c1c1c]"
                style={headingStyle}
              >
                Filters
              </span>
              <button
                onClick={onClose}
                className="p-1 text-[#6b6b6b] transition-colors hover:text-[#1c1c1c]"
                aria-label="Close filters"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <FilterSidebar availableFilters={availableFilters} />
            </div>

            <div className="border-t border-[var(--color-border)] px-5 py-4">
              <button
                onClick={onClose}
                className="btn btn-primary w-full text-[12px]"
              >
                See Results ({productCount})
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}

export { encodeFilters, decodeFilters };
