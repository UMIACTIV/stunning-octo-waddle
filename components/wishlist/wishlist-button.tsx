"use client";

import { useWishlist } from "components/wishlist/wishlist-context";
import { toast } from "sonner";

export function WishlistButton({
  productHandle,
  size = 20,
  className = "",
}: {
  productHandle: string;
  size?: number;
  className?: string;
}) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const active = isInWishlist(productHandle);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    const added = toggleWishlist(productHandle);
    toast(added ? "Added to wishlist" : "Removed from wishlist", {
      duration: 2000,
    });
  }

  return (
    <button
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={`transition-transform duration-150 active:scale-90 ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-all duration-200 ${active ? "scale-110" : "scale-100"}`}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
