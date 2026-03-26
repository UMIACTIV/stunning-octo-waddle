import type { Metadata } from "next";
import WishlistContent from "./wishlist-content";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved products.",
};

export default function WishlistPage() {
  return (
    <section className="container-umi py-8">
      <h1 className="mb-6 text-center">Wishlist</h1>
      <WishlistContent />
    </section>
  );
}
