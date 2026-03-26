import Link from "next/link";
import Footer from "components/layout/footer";

export default function NotFound() {
  return (
    <>
      <div className="container-umi flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-h1)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Page Not Found
        </h1>
        <p
          className="mb-8 max-w-md"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            color: "#6b6b6b",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
