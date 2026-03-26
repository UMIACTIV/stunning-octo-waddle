"use client";

import { useEffect, useRef, useState } from "react";
import type { ShopifyCountry } from "lib/shopify/types";

const COUNTRY_FLAGS: Record<string, string> = {
  AE: "\uD83C\uDDE6\uD83C\uDDEA",
  AT: "\uD83C\uDDE6\uD83C\uDDF9",
  AU: "\uD83C\uDDE6\uD83C\uDDFA",
  BE: "\uD83C\uDDE7\uD83C\uDDEA",
  BG: "\uD83C\uDDE7\uD83C\uDDEC",
  CA: "\uD83C\uDDE8\uD83C\uDDE6",
  CH: "\uD83C\uDDE8\uD83C\uDDED",
  CZ: "\uD83C\uDDE8\uD83C\uDDFF",
  DE: "\uD83C\uDDE9\uD83C\uDDEA",
  DK: "\uD83C\uDDE9\uD83C\uDDF0",
  ES: "\uD83C\uDDEA\uD83C\uDDF8",
  FI: "\uD83C\uDDEB\uD83C\uDDEE",
  FR: "\uD83C\uDDEB\uD83C\uDDF7",
  GB: "\uD83C\uDDEC\uD83C\uDDE7",
  GR: "\uD83C\uDDEC\uD83C\uDDF7",
  HR: "\uD83C\uDDED\uD83C\uDDF7",
  HU: "\uD83C\uDDED\uD83C\uDDFA",
  IE: "\uD83C\uDDEE\uD83C\uDDEA",
  IL: "\uD83C\uDDEE\uD83C\uDDF1",
  IN: "\uD83C\uDDEE\uD83C\uDDF3",
  IT: "\uD83C\uDDEE\uD83C\uDDF9",
  JP: "\uD83C\uDDEF\uD83C\uDDF5",
  KR: "\uD83C\uDDF0\uD83C\uDDF7",
  LT: "\uD83C\uDDF1\uD83C\uDDF9",
  LV: "\uD83C\uDDF1\uD83C\uDDFB",
  MX: "\uD83C\uDDF2\uD83C\uDDFD",
  NL: "\uD83C\uDDF3\uD83C\uDDF1",
  NO: "\uD83C\uDDF3\uD83C\uDDF4",
  NZ: "\uD83C\uDDF3\uD83C\uDDFF",
  PL: "\uD83C\uDDF5\uD83C\uDDF1",
  PT: "\uD83C\uDDF5\uD83C\uDDF9",
  RO: "\uD83C\uDDF7\uD83C\uDDF4",
  SA: "\uD83C\uDDF8\uD83C\uDDE6",
  SE: "\uD83C\uDDF8\uD83C\uDDEA",
  SG: "\uD83C\uDDF8\uD83C\uDDEC",
  SK: "\uD83C\uDDF8\uD83C\uDDF0",
  TH: "\uD83C\uDDF9\uD83C\uDDED",
  TR: "\uD83C\uDDF9\uD83C\uDDF7",
  UA: "\uD83C\uDDFA\uD83C\uDDE6",
  US: "\uD83C\uDDFA\uD83C\uDDF8",
};

function getFlag(isoCode: string): string {
  return COUNTRY_FLAGS[isoCode] || "\uD83C\uDFF3\uFE0F";
}

export default function CountrySelector({
  availableCountries,
  currentCountry,
}: {
  availableCountries: ShopifyCountry[];
  currentCountry: ShopifyCountry;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(currentCountry);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = document.cookie
      .split("; ")
      .find((row) => row.startsWith("umi-country="))
      ?.split("=")[1];

    if (stored) {
      const match = availableCountries.find((c) => c.isoCode === stored);
      if (match) setSelected(match);
    }
  }, [availableCountries]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  function handleSelect(country: ShopifyCountry) {
    setSelected(country);
    setOpen(false);
    document.cookie = `umi-country=${country.isoCode};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    window.location.reload();
  }

  const sorted = [...availableCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 font-[family-name:var(--font-heading)] text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--color-text-muted)] transition-opacity hover:opacity-70"
        aria-label="Select country"
      >
        <span>{getFlag(selected.isoCode)}</span>
        <span>
          {selected.currency.isoCode} {selected.currency.symbol}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4L5 6.5L7.5 4" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-64 overflow-y-auto border border-[var(--color-border)] bg-white shadow-sm">
          {sorted.map((country) => (
            <button
              key={country.isoCode}
              onClick={() => handleSelect(country)}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors hover:bg-[#fafafa] ${
                country.isoCode === selected.isoCode ? "bg-[#fafafa]" : ""
              }`}
            >
              <span className="text-sm">{getFlag(country.isoCode)}</span>
              <span
                className="flex-1 text-[12px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#1c1c1c",
                }}
              >
                {country.name}
              </span>
              <span
                className="text-[11px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#6b6b6b",
                }}
              >
                {country.currency.isoCode} {country.currency.symbol}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
