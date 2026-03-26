import type { Metadata } from "next";
import FaqsPageClient from "./faqs-content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about UMIACTIV products, sizing, shipping, returns, and payments.",
};

export default function FaqsPage() {
  return <FaqsPageClient />;
}
