import CartModal from "components/cart/modal";
import CountrySelector from "components/country-selector";
import { getCollections, getLocalization } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const FEATURED_HANDLES = [
  { handle: "", label: "Shop" },
  { handle: "new-arrival", label: "New" },
  { handle: "bestsellers", label: "Best Sellers" },
  { handle: "court-line", label: "Court Line" },
  { handle: "sculpt-line", label: "Sculpt Line" },
  { handle: "daily-line", label: "Daily Line" },
];

const STATIC_LINKS = [{ title: "About", path: "/about" }];

export async function Navbar() {
  const [collections, localization] = await Promise.all([
    getCollections(),
    getLocalization(),
  ]);

  const navLinks = FEATURED_HANDLES.map((feat) => {
    const match = collections.find((c) => c.handle === feat.handle);
    return {
      title: feat.label,
      path: match?.path ?? `/search/${feat.handle}`,
    };
  }).concat(STATIC_LINKS);

  return (
    <nav className="sticky top-9 z-40 w-full border-b border-[var(--color-border)] bg-white">
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex w-1/3 items-center gap-3">
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu menu={navLinks} />
            </Suspense>
          </div>
          <div className="hidden md:block">
            <CountrySelector
              availableCountries={localization.availableCountries}
              currentCountry={localization.country}
            />
          </div>
        </div>

        <div className="flex w-1/3 justify-center">
          <Link
            href="/"
            prefetch={true}
            className="font-[family-name:var(--font-heading)] text-2xl font-semibold uppercase tracking-[0.15em] text-[var(--color-text)] md:text-3xl"
          >
            UMIACTIV
          </Link>
        </div>

        <div className="flex w-1/3 items-center justify-end gap-1">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <Link
            href="/wishlist"
            className="hidden items-center justify-center p-2 text-[var(--color-text)] transition-colors hover:opacity-70 md:flex"
            aria-label="Wishlist"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </Link>
          <a
            href={`https://${process.env.SHOPIFY_STORE_DOMAIN}/account`}
            className="hidden items-center justify-center p-2 text-[var(--color-text)] transition-colors hover:opacity-70 md:flex"
            aria-label="Account"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          <CartModal />
        </div>
      </div>

      <div className="max-md:hidden border-t border-[var(--color-border)]">
        <ul className="flex items-center justify-center gap-8 py-3">
          {navLinks.map((item) => (
            <li key={item.title}>
              <Link
                href={item.path}
                prefetch={true}
                className="font-[family-name:var(--font-heading)] text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--color-text)] transition-opacity hover:opacity-60"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
