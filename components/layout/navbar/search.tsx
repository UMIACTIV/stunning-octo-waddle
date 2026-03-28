"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type SearchResult = {
  handle: string;
  title: string;
  image: string;
  price: string;
  currencyCode: string;
};

const POPULAR_SEARCHES = [
  { label: "New Arrivals", href: "/search/new-arrival" },
  { label: "Best Sellers", href: "/search/bestsellers" },
  { label: "Leggings", href: "/search/leggings-1" },
  { label: "Tops", href: "/search/top" },
  { label: "Shorts", href: "/search/shorts-1" },
  { label: "Skirts", href: "/search/skirt" },
];

function formatPrice(amount: string, currencyCode: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  } catch {
    return `${currencyCode} ${amount}`;
  }
}

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetState = useCallback(() => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);
    if (abortRef.current) abortRef.current.abort();
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const closeOverlay = useCallback(() => {
    setOpen(false);
    resetState();
  }, [resetState]);

  // Auto-focus input when overlay opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Escape key closes overlay
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeOverlay]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const fetchResults = useCallback(async (q: string) => {
    if (abortRef.current) abortRef.current.abort();

    if (!q.trim()) {
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, {
        signal: controller.signal,
      });
      const data: SearchResult[] = await res.json();
      if (!controller.signal.aborted) {
        setResults(data.slice(0, 6));
        setHasSearched(true);
        setIsLoading(false);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      if (!controller.signal.aborted) {
        setResults([]);
        setHasSearched(true);
        setIsLoading(false);
      }
    }
  }, []);

  function handleInputChange(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!value.trim()) {
      if (abortRef.current) abortRef.current.abort();
      setResults([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    if (value.trim().length < 2) return;
    setIsLoading(true);
    timerRef.current = setTimeout(() => fetchResults(value), 500);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      closeOverlay();
    }
  }

  const trimmed = query.trim();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center p-2 text-[var(--color-text)] transition-colors hover:opacity-70"
        aria-label="Search"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={closeOverlay}
            aria-hidden="true"
          />

          {/* Search container */}
          <div className="relative flex flex-col">
            {/* Search bar */}
            <div className="border-b border-[var(--color-border)] bg-white">
              <form
                onSubmit={handleSubmit}
                className="container-umi flex items-center gap-3 py-4"
              >
                <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[var(--color-text-muted)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 bg-transparent text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {isLoading && trimmed && (
                  <div
                    className="shrink-0"
                    role="status"
                    aria-label="Searching"
                  >
                    <div className="h-4 w-4 animate-spin border border-[var(--color-border)] border-t-[var(--color-text)]" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={closeOverlay}
                  className="flex shrink-0 items-center justify-center p-1 text-[var(--color-text)] transition-colors hover:opacity-70"
                  aria-label="Close search"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Results dropdown */}
            <div className="max-h-[70vh] overflow-y-auto border-b border-[var(--color-border)] bg-white scrollbar-hide md:max-h-[400px]">
              <div className="container-umi py-6">
                {/* Empty state: Popular searches */}
                {!trimmed && (
                  <div className="animate-fadeIn">
                    <p
                      className="mb-4 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Popular Searches
                    </p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
                      {POPULAR_SEARCHES.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeOverlay}
                          className="group flex items-center gap-2.5 py-2 text-[13px] text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <span className="inline-block h-px w-3 bg-[var(--color-border)] transition-all duration-200 group-hover:w-5 group-hover:bg-[var(--color-text)]" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Loading skeleton */}
                {trimmed && isLoading && (
                  <div className="space-y-0">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-4 py-3">
                        <div className="h-12 w-12 shrink-0 animate-pulse bg-[#f0f0f0]" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-3/5 animate-pulse bg-[#f0f0f0]" />
                          <div className="h-3 w-1/4 animate-pulse bg-[#f0f0f0]" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Product results */}
                {trimmed && hasSearched && !isLoading && results.length > 0 && (
                  <div className="animate-fadeIn">
                    <p
                      className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-text-muted)]"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      Products
                    </p>
                    <ul>
                      {results.map((product) => (
                        <li
                          key={product.handle}
                          className="border-b border-[var(--color-border)] last:border-b-0"
                        >
                          <Link
                            href={`/product/${product.handle}`}
                            onClick={closeOverlay}
                            className="flex items-center gap-4 py-3 transition-opacity duration-200 hover:opacity-70"
                          >
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.title}
                                width={48}
                                height={48}
                                className="h-12 w-12 shrink-0 object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 shrink-0 bg-[#f5f5f5]" />
                            )}
                            <div className="min-w-0 flex-1">
                              <p
                                className="truncate text-[13px] text-[var(--color-text)]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {product.title}
                              </p>
                              <p
                                className="mt-0.5 text-[12px] text-[var(--color-text-muted)]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {formatPrice(
                                  product.price,
                                  product.currencyCode,
                                )}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                      <Link
                        href={`/search?q=${encodeURIComponent(trimmed)}`}
                        onClick={closeOverlay}
                        className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text)] transition-opacity duration-200 hover:opacity-60"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        View all results
                        <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  </div>
                )}

                {/* No results */}
                {trimmed &&
                  hasSearched &&
                  !isLoading &&
                  results.length === 0 && (
                    <div className="animate-fadeIn py-6 text-center">
                      <p
                        className="text-[13px] text-[var(--color-text-muted)]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        No results for &ldquo;{trimmed}&rdquo;
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function SearchSkeleton() {
  return (
    <div className="flex items-center justify-center p-2">
      <MagnifyingGlassIcon className="h-5 w-5 text-[var(--color-text)]" />
    </div>
  );
}
