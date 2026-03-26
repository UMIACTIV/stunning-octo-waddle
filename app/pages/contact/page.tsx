import type { Metadata } from "next";
import ContactPageClient from "./contact-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with UMIACTIV. Email support@umiactiv.com, WhatsApp +971585578990, or use our contact form.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
