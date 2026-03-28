"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const IMG_BASE = "https://cdn.shopify.com/s/files/1/0982/9967/4805/files/";

const REVIEWS = [
  {
    image: "DSC02748.jpg",
    quote:
      "The fabric is so comfortable and the design is elegant. Best activewear I own!",
    product: "UMI Sculpt Leggings",
  },
  {
    image: "DSC02617.jpg",
    quote: "I'm obsessed with the Court Line! So cute and perfect for tennis.",
    product: "UMI Ace Dress",
  },
  {
    image: "DSC03152.jpg",
    quote:
      "Lightweight, perfect for summer. The quality exceeded my expectations.",
    product: "UMI Dash Skirt",
  },
  {
    image: "DSC03085.jpg",
    quote: "Seamless shorts are incredibly comfortable and look amazing.",
    product: "UMI Seamless Shorts",
  },
  {
    image: "DSC02802.jpg",
    quote: "As a yoga instructor, UMI delivers every single time.",
    product: "UMI Sculpt Set",
  },
  {
    image: "DSC03344.jpg",
    quote: "The quality is absolutely incredible. Worth every penny.",
    product: "UMI Seamless Leggings",
  },
];

function Stars() {
  return (
    <span style={{ fontSize: "12px", color: "#1c1c1c", letterSpacing: "1px" }}>
      &#9733;&#9733;&#9733;&#9733;&#9733;
    </span>
  );
}

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -360 : 360,
      behavior: "smooth",
    });
  }

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-umi mb-8">
        <h2
          className="mb-2 text-center"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-h2)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          THE REVIEWS ARE IN
        </h2>
        <p className="text-center">
          <Link
            href="/pages/reviews"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              color: "#6b6b6b",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            1000+ Happy Customers
          </Link>
        </p>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-white transition-colors hover:bg-[#1c1c1c] hover:text-white md:left-4"
          style={{ width: "40px", height: "40px", border: "1px solid #ddd" }}
          aria-label="Previous reviews"
        >
          &#8592;
        </button>

        <div className="w-full overflow-x-hidden">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto px-4 md:px-8"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {REVIEWS.map((review, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white"
                style={{
                  width: "clamp(280px, 28vw, 360px)",
                  border: "1px solid #eee",
                  scrollSnapAlign: "start",
                }}
              >
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "3 / 4" }}
                >
                  <Image
                    src={`${IMG_BASE}${review.image}`}
                    alt={review.product}
                    fill
                    sizes="(min-width: 768px) 28vw, 70vw"
                    className="object-cover object-top"
                  />
                </div>
                <div style={{ padding: "16px" }}>
                  <Stars />
                  <p
                    className="mb-3 mt-2"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      fontStyle: "italic",
                      color: "#1c1c1c",
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <Link
                    href="/search"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      color: "#1c1c1c",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                    }}
                  >
                    {review.product}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-white transition-colors hover:bg-[#1c1c1c] hover:text-white md:right-4"
          style={{ width: "40px", height: "40px", border: "1px solid #ddd" }}
          aria-label="Next reviews"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
