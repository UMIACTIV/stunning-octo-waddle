import type { Metadata } from "next";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Size Chart",
  description:
    "Find your perfect fit with the UMIACTIV size chart. Measurements in cm and inches for all activewear.",
};

const SIZES = [
  { size: "XS", bust: "80\u201384", waist: "60\u201364", hip: "86\u201390" },
  { size: "S", bust: "84\u201388", waist: "64\u201368", hip: "90\u201394" },
  { size: "M", bust: "88\u201392", waist: "68\u201372", hip: "94\u201398" },
  { size: "L", bust: "92\u201396", waist: "72\u201376", hip: "98\u2013102" },
  { size: "XL", bust: "96\u2013100", waist: "76\u201380", hip: "102\u2013106" },
];

const SIZES_INCHES = [
  { size: "XS", bust: '31.5\u201333"', waist: '23.5\u201325"', hip: '34\u201335.5"' },
  { size: "S", bust: '33\u201334.5"', waist: '25\u201327"', hip: '35.5\u201337"' },
  { size: "M", bust: '34.5\u201336"', waist: '27\u201328.5"', hip: '37\u201338.5"' },
  { size: "L", bust: '36\u201338"', waist: '28.5\u201330"', hip: '38.5\u201340"' },
  { size: "XL", bust: '38\u201339.5"', waist: '30\u201331.5"', hip: '40\u201342"' },
];

const HOW_TO_MEASURE = [
  {
    title: "Bust",
    instruction:
      "Measure around the fullest part of your bust, keeping the tape level.",
  },
  {
    title: "Waist",
    instruction:
      "Measure around the narrowest part of your natural waistline.",
  },
  {
    title: "Hip",
    instruction:
      "Measure around the fullest part of your hips, approximately 20 cm below your waist.",
  },
];

function SizeTable({
  title,
  unit,
  data,
}: {
  title: string;
  unit: string;
  data: typeof SIZES;
}) {
  return (
    <div className="mb-10">
      <h2
        className="mb-4 text-[13px]"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        {title} ({unit})
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Size", "Bust", "Waist", "Hip"].map((header) => (
                <th
                  key={header}
                  className="border border-[#eee] bg-[#fafafa] px-4 py-3 text-left text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#1c1c1c",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.size}>
                <td
                  className="border border-[#eee] px-4 py-3 text-[14px]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    color: "#1c1c1c",
                  }}
                >
                  {row.size}
                </td>
                <td
                  className="border border-[#eee] px-4 py-3 text-[14px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "#6b6b6b",
                  }}
                >
                  {row.bust}
                </td>
                <td
                  className="border border-[#eee] px-4 py-3 text-[14px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "#6b6b6b",
                  }}
                >
                  {row.waist}
                </td>
                <td
                  className="border border-[#eee] px-4 py-3 text-[14px]"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    color: "#6b6b6b",
                  }}
                >
                  {row.hip}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SizeChartPage() {
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
          Size Chart
        </h1>

        <div className="mx-auto max-w-2xl">
          <SizeTable title="Measurements" unit="cm" data={SIZES} />
          <SizeTable title="Measurements" unit="inches" data={SIZES_INCHES} />

          <section className="mb-10">
            <h2
              className="mb-6 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              How to Measure
            </h2>
            <div className="space-y-4">
              {HOW_TO_MEASURE.map((item) => (
                <div key={item.title}>
                  <h3
                    className="mb-1 text-[14px]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      color: "#1c1c1c",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[14px] leading-[1.8]"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 400,
                      color: "#6b6b6b",
                    }}
                  >
                    {item.instruction}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div
            className="border border-[#eee] bg-[#fafafa] p-5 text-center text-[14px] leading-[1.8]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            If you&apos;re between sizes, we recommend sizing up for a more
            relaxed fit.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
