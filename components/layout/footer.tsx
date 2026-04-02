"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const SHOP_LINKS = [
  { label: "New Arrivals", href: "/search?sort=latest-desc" },
  { label: "Best Sellers", href: "/search?sort=best-selling" },
  { label: "Leggings", href: "/search/leggings-1" },
  { label: "Shorts", href: "/search/shorts-1" },
  { label: "Tops", href: "/search/tops" },
  { label: "Shop All", href: "/search" },
];

const CARE_LINKS = [
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Shipping", href: "/pages/shipping" },
  { label: "Returns & Exchanges", href: "/pages/returns" },
  { label: "FAQs", href: "/pages/faqs" },
  { label: "Size Chart", href: "/pages/size-chart" },
];

const INFO_LINKS = [
  { label: "About Us", href: "/pages/about" },
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
  { label: "Terms & Conditions", href: "/pages/terms" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/umiactiv" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4
        className="mb-4"
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "11px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#1c1c1c",
        }}
      >
        {title}
      </h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                color: "#6b6b6b",
                transition: "color 0.2s ease",
              }}
              className="hover:text-[#1c1c1c]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing! Check your inbox for 10% off.");
    setEmail("");
  }

  return (
    <footer>
      <div className="border-t border-[#eee]">
        <div className="container-umi grid grid-cols-2 gap-8 py-10 md:grid-cols-3 md:py-14">
          <FooterColumn title="SHOP" links={SHOP_LINKS} />
          <FooterColumn title="CUSTOMER CARE" links={CARE_LINKS} />
          <FooterColumn title="INFO" links={INFO_LINKS} />
        </div>
      </div>

      <div className="border-t border-[#eee]">
        <div className="container-umi flex flex-col items-center gap-4 py-6 md:flex-row md:justify-center md:gap-8">
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#1c1c1c",
            }}
          >
            Follow Us
          </span>
          <div className="flex gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  color: "#6b6b6b",
                  transition: "color 0.2s ease",
                }}
                className="hover:text-[#1c1c1c]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[#eee] bg-[#fafafa]">
        <div className="container-umi py-10 text-center md:py-12">
          <h3
            className="mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "#1c1c1c",
            }}
          >
            UMI INSIDER LIST
          </h3>
          <p
            className="mx-auto mb-5 max-w-md"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6b6b6b",
            }}
          >
            Sign up for exclusive offers, early access to new drops, and 10% off
            your first order.
          </p>
          <form
            className="mx-auto flex max-w-md gap-0"
            onSubmit={handleNewsletterSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-[#ddd] bg-white px-4 py-3 outline-none"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                borderRadius: 0,
              }}
            />
            <button
              type="submit"
              className="cursor-pointer bg-[#1c1c1c] px-6 py-3 text-white transition-colors hover:bg-[#333]"
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                borderRadius: 0,
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div style={{ backgroundColor: "#1c1c1c" }}>
        <div className="container-umi flex flex-col items-center justify-between gap-3 py-4 md:flex-row">
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            &copy; 2026 UMIACTIV. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Visa &middot; Mastercard &middot; Amex &middot; PayPal &middot;
            Apple Pay
          </p>
        </div>
      </div>
    </footer>
  );
}
