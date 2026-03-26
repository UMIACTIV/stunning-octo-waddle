import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "UMI is more than activewear — it's a philosophy of motion inspired by confidence, inner strength, and balance.",
};

const VALUES = [
  {
    title: "Performance",
    description:
      "Engineered fabrics that move with you — breathable, moisture-wicking, and built for every rep, stride, and stretch.",
  },
  {
    title: "Elegance",
    description:
      "Clean silhouettes and refined details that transition effortlessly from studio to street.",
  },
  {
    title: "Balance",
    description:
      "Designed for the rhythm of your life — lightweight, functional, and beautiful in its simplicity.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-[var(--color-border)] py-20 text-center">
        <p
          className="mb-4 text-[11px] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 500,
            letterSpacing: "0.16em",
            color: "#6b6b6b",
          }}
        >
          Our Story
        </p>
        <h1 className="mb-6">UMIACTIV</h1>
        <p
          className="mx-auto max-w-lg text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            color: "#6b6b6b",
          }}
        >
          Activewear designed for movement, confidence, and everyday balance.
        </p>
      </section>

      <section className="container-umi py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8">The Philosophy</h2>
          <p
            className="text-sm leading-[1.8]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            UMI is more than activewear — it&apos;s a philosophy of motion
            inspired by confidence, inner strength, and balance. We design
            apparel that adapts to your rhythm — lightweight, functional, and
            beautiful in its simplicity.
          </p>
          <p
            className="mt-6 text-sm leading-[1.8]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            Born in Dubai, UMI draws from a culture that values both precision
            and artistry. Every piece is crafted with intention — from fabric
            selection to final stitch — so you can focus on what matters: your
            movement.
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-16 md:py-24">
        <div className="container-umi">
          <h2 className="mb-12 text-center">Our Values</h2>
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {VALUES.map((value) => (
              <div key={value.title} className="text-center">
                <h3 className="mb-4">{value.title}</h3>
                <p
                  className="text-sm leading-[1.8]"
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
        </div>
      </section>
    </div>
  );
}
