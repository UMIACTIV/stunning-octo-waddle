import type { Metadata } from "next";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Learn about UMIACTIV shipping rates, delivery times, and policies for international and domestic orders.",
};

const SHIPPING_RATES = [
  { region: "Europe", rate: "25 USD" },
  { region: "USA & Canada", rate: "25 USD" },
  { region: "Rest of the world", rate: "35 USD" },
  { region: "Ukraine (domestic)", rate: "Depends on carrier selected at checkout" },
  { region: "Dubai (UAE)", rate: "Free" },
];

const DELIVERY_TIMES = [
  { region: "Europe & USA", time: "14\u201321 days" },
  { region: "Other countries", time: "Up to 30 days" },
  { region: "Ukraine", time: "According to local courier service" },
  { region: "Dubai (UAE)", time: "1\u20132 business days" },
];

export default function ShippingPage() {
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
          Shipping Policy
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
              Order Processing
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              All orders are processed within 1&ndash;3 business days after
              payment (Monday to Friday, excluding holidays). Once shipped, you
              will receive a tracking number via email.
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
              Shipping Services
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              International orders are shipped using reliable postal or courier
              services with tracking. Each order is carefully packaged to ensure
              product protection during transit.
            </p>
            <p
              className="mt-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              For orders delivered within Dubai (UAE), we offer a Free Next-Day
              Delivery service.
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
              Shipping Rates
            </h2>
            <ul className="space-y-2">
              {SHIPPING_RATES.map((item) => (
                <li
                  key={item.region}
                  className="flex justify-between border-b border-[#eee] pb-2 text-[14px]"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  <span style={{ color: "#1c1c1c" }}>{item.region}</span>
                  <span style={{ color: "#6b6b6b" }}>{item.rate}</span>
                </li>
              ))}
            </ul>
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
              Estimated Delivery Times
            </h2>
            <ul className="space-y-2">
              {DELIVERY_TIMES.map((item) => (
                <li
                  key={item.region}
                  className="flex justify-between border-b border-[#eee] pb-2 text-[14px]"
                  style={{ fontFamily: "var(--font-body)", fontWeight: 400 }}
                >
                  <span style={{ color: "#1c1c1c" }}>{item.region}</span>
                  <span style={{ color: "#6b6b6b" }}>{item.time}</span>
                </li>
              ))}
            </ul>
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
              Customs Duties & Taxes
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Possible import duties, taxes, or fees are the responsibility of
              the recipient and are not included in product or shipping prices.
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
              Address Accuracy & Re-Delivery
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Please make sure your shipping address is complete and accurate. If
              a package is returned due to an incorrect address, you will be
              responsible for re-shipping costs.
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
              Lost or Damaged Parcels
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We recommend purchasing shipping insurance for high-value orders.
              If a parcel is lost or damaged in transit, please contact us
              immediately with tracking information and photos.
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
              Order Changes & Cancellations
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Orders can only be modified or cancelled within 24 hours of
              placement.
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
              Shipping Restrictions
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We currently do not ship to certain countries due to customs
              regulations or carrier limitations.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
