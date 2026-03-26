import type { Metadata } from "next";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "UMI is more than activewear \u2014 it\u2019s a philosophy of motion inspired by confidence, inner strength, and balance.",
};

const VALUES = [
  {
    title: "Performance",
    description:
      "Engineered fabrics that move with you \u2014 breathable, moisture-wicking, and built for every rep, stride, and stretch.",
  },
  {
    title: "Elegance",
    description:
      "Clean silhouettes and refined details that transition effortlessly from studio to street.",
  },
  {
    title: "Balance",
    description:
      "Designed for the rhythm of your life \u2014 lightweight, functional, and beautiful in its simplicity.",
  },
];

export default function AboutPage() {
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
          About Us
        </h1>

        <div className="mx-auto max-w-2xl">
          <section className="mb-12 text-center">
            <h2
              className="mb-4 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              The Philosophy
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              UMI is more than activewear &mdash; it&apos;s a philosophy of
              motion inspired by confidence, inner strength, and balance. We
              design apparel that adapts to your rhythm &mdash; lightweight,
              functional, and beautiful in its simplicity.
            </p>
            <p
              className="mt-6 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Born in Dubai, UMI draws from a culture that values both precision
              and artistry. Every piece is crafted with intention &mdash; from
              fabric selection to final stitch &mdash; so you can focus on what
              matters: your movement.
            </p>
          </section>

          <section className="border-t border-[var(--color-border)] pt-12">
            <h2
              className="mb-8 text-center text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Our Values
            </h2>
            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {VALUES.map((value) => (
                <div key={value.title} className="text-center">
                  <h3
                    className="mb-3 text-[14px]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      color: "#1c1c1c",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      color: "#6b6b6b",
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
