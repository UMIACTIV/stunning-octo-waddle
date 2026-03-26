"use client";

import Footer from "components/layout/footer";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

const FAQS = [
  {
    question: "What sizes do you offer?",
    answer:
      "We offer sizes from XS to XL. Please refer to our Size Chart for detailed measurements specific to each product.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Dubai: 1\u20132 business days (free). Europe & USA: 14\u201321 days. Rest of world: up to 30 days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Items can be returned within 14 days of delivery, unworn with tags intact. Sale items are final sale.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes! We ship worldwide. Shipping rates: Europe/USA $25, Rest of world $35, Dubai free.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You\u2019ll receive a tracking number via email once your order ships. Use it to track your delivery on the carrier\u2019s website.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "Email support@umiactiv.com or WhatsApp +971 585 578 990. We aim to respond within 24 hours.",
  },
  {
    question: "Can I modify or cancel my order?",
    answer:
      "Orders can only be modified or cancelled within 24 hours of placement.",
  },
];

export default function FaqsPageClient() {
  return (
    <>
      <div className="container-umi py-10 md:py-16">
        <h1
          className="mb-10 text-center"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Frequently Asked Questions
        </h1>

        <div className="mx-auto max-w-2xl">
          <div className="divide-y divide-[#eee]">
            {FAQS.map((faq) => (
              <Disclosure key={faq.question} as="div">
                <DisclosureButton
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span
                    className="text-[14px]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      color: "#1c1c1c",
                    }}
                  >
                    {faq.question}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="#6b6b6b"
                    strokeWidth="1.5"
                    className="shrink-0 ml-4 transition-transform duration-200 ui-open:rotate-45"
                  >
                    <line x1="8" y1="3" x2="8" y2="13" />
                    <line x1="3" y1="8" x2="13" y2="8" />
                  </svg>
                </DisclosureButton>
                <DisclosurePanel
                  className="pb-5 text-[14px] leading-[1.8]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "#6b6b6b",
                  }}
                >
                  {faq.answer}
                </DisclosurePanel>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
