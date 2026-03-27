import Image from "next/image";
import Link from "next/link";

export function FeaturedBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="aspect-[4/3] w-full md:aspect-[21/9]" />

      <Image
        src="/images/hero/hero-1.jpg"
        alt="UMIACTIV Court Line Collection"
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute inset-x-0 bottom-10 z-10 flex justify-center md:bottom-14">
        <Link
          href="/search"
          className="border-b border-transparent text-white hover:border-white"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "13px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            textDecoration: "none",
            transition: "border-color 0.2s ease",
          }}
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
