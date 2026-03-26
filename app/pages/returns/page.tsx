import type { Metadata } from "next";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Return & Exchange Policy",
  description:
    "Learn about UMIACTIV return eligibility, exchange process, and refund timelines.",
};

export default function ReturnsPage() {
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
          Return & Exchange Policy
        </h1>

        <div className="mx-auto max-w-2xl">
          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Return Eligibility
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Items may be returned within 14 days of delivery, provided they
              meet the following conditions:
            </p>
            <ul
              className="mb-3 list-inside list-disc space-y-1.5 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              <li>Unworn, unwashed, and unaltered</li>
              <li>Original tags and packaging intact</li>
              <li>No signs of wear, stains, pet hair, or fragrance</li>
            </ul>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#1c1c1c",
              }}
            >
              Sale items, undergarments, and accessories are final sale and
              cannot be returned.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              How to Start a Return
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Contact our support team with:
            </p>
            <ul
              className="mb-3 list-inside list-disc space-y-1.5 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              <li>Your order number</li>
              <li>The item(s) you wish to return</li>
              <li>Reason for the return</li>
            </ul>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We will provide return instructions. Please do not send items back
              without prior approval.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Return Shipping
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Return shipping costs are the responsibility of the customer,
              unless the return is due to a defect or error on our part.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Refund Process
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Approved refunds are processed within 5&ndash;10 business days to
              the original payment method.
            </p>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#1c1c1c",
              }}
            >
              Original shipping charges are non-refundable.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Exchanges
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We currently do not offer direct exchanges. Return the original
              item and place a new order.
            </p>
          </section>

          <section className="mb-10">
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Damaged or Incorrect Items
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Contact us within 48 hours of delivery with photos and
              description. We will arrange a replacement or full refund.
            </p>
          </section>

          <section>
            <h2
              className="mb-3 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Late or Missing Refunds
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              If not received within 10 business days, check with your bank.
              Contact us with your order number if still missing.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
