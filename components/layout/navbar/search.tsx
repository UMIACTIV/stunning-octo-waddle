"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Search() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
      setQuery("");
    }
  }

  function handleClose() {
    setOpen(false);
    setQuery("");
  }

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
        <div className="fixed inset-0 z-50 flex flex-col">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div className="relative border-b border-[var(--color-border)] bg-white">
            <form
              onSubmit={handleSubmit}
              className="container-umi flex items-center gap-3 py-4"
            >
              <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[var(--color-text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent text-[14px] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <button
                type="button"
                onClick={handleClose}
                className="flex shrink-0 items-center justify-center p-1 text-[var(--color-text)] transition-colors hover:opacity-70"
                aria-label="Close search"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </form>
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
