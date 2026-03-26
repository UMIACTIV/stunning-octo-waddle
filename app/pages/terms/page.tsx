import type { Metadata } from "next";
import Link from "next/link";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the UMIACTIV terms and conditions governing the use of our website and purchase of products.",
};

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <div className="mx-auto max-w-2xl">
          <p
            className="mb-10 text-[14px] leading-[1.8]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            Last updated: January 2026
          </p>

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
              Overview & Agreement
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              This website is operated by UMIACTIV. Throughout the site, the
              terms &ldquo;we&rdquo;, &ldquo;us&rdquo;, and &ldquo;our&rdquo;
              refer to UMIACTIV. By visiting our site and/or purchasing
              something from us, you engage in our &ldquo;Service&rdquo; and
              agree to be bound by the following terms and conditions. These
              Terms of Service apply to all users of the site, including without
              limitation users who are browsers, vendors, customers, merchants,
              and/or contributors of content.
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
              Online Store Terms
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              By agreeing to these Terms of Service, you represent that you are
              at least the age of majority in your state or province of
              residence, or that you are the age of majority and you have given
              us your consent to allow any of your minor dependents to use this
              site. You may not use our products for any illegal or unauthorized
              purpose nor may you, in the use of the Service, violate any laws
              in your jurisdiction.
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
              Accuracy of Information
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We are not responsible if information made available on this site
              is not accurate, complete, or current. The material on this site is
              provided for general information only and should not be relied upon
              or used as the sole basis for making decisions. We reserve the
              right to modify the contents of this site at any time.
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
              Products & Pricing
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Certain products may be available exclusively online through the
              website. These products may have limited quantities and are subject
              to return or exchange only according to our Return Policy. We have
              made every effort to display as accurately as possible the colors
              and images of our products. We reserve the right to limit the
              quantities of any products or services that we offer. All
              descriptions of products or product pricing are subject to change
              at any time without notice. We reserve the right to discontinue
              any product at any time.
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
              Payment
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We accept Visa, Mastercard, American Express, PayPal, and Apple
              Pay. All payments are processed securely through our payment
              provider. You agree to provide current, complete, and accurate
              purchase and account information for all purchases made at our
              store.
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
              Shipping & Delivery
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Please refer to our{" "}
              <Link
                href="/pages/shipping"
                className="text-[#1c1c1c] underline"
              >
                Shipping Policy
              </Link>{" "}
              for detailed information about shipping rates, delivery times, and
              related policies.
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
              Returns & Refunds
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Please refer to our{" "}
              <Link
                href="/pages/returns"
                className="text-[#1c1c1c] underline"
              >
                Return & Exchange Policy
              </Link>{" "}
              for detailed information about return eligibility, process, and
              refund timelines.
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
              Intellectual Property
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              All content on this site, including but not limited to text,
              graphics, logos, images, audio clips, digital downloads, and data
              compilations, is the property of UMIACTIV or its content suppliers
              and is protected by international copyright laws. The compilation
              of all content on this site is the exclusive property of UMIACTIV.
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
              User Comments & Feedback
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              If you send certain specific submissions or creative ideas,
              suggestions, proposals, plans, or other materials, you agree that
              we may, at any time, without restriction, edit, copy, publish,
              distribute, translate, and otherwise use in any medium any comments
              that you forward to us. We are and shall be under no obligation to
              maintain any comments in confidence, pay compensation for any
              comments, or respond to any comments.
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
              Personal Information
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Your submission of personal information through the store is
              governed by our{" "}
              <Link
                href="/pages/privacy-policy"
                className="text-[#1c1c1c] underline"
              >
                Privacy Policy
              </Link>
              .
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
              Prohibited Uses
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              You are prohibited from using the site or its content:
            </p>
            <ul
              className="list-inside list-disc space-y-1.5 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              <li>For any unlawful purpose</li>
              <li>
                To solicit others to perform or participate in any unlawful acts
              </li>
              <li>
                To violate any international, federal, provincial, or state
                regulations, rules, laws, or local ordinances
              </li>
              <li>
                To infringe upon or violate our intellectual property rights or
                the intellectual property rights of others
              </li>
              <li>
                To submit false or misleading information
              </li>
              <li>
                To upload or transmit viruses or any other type of malicious code
              </li>
              <li>To interfere with or circumvent the security features of the Service</li>
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
              Limitation of Liability
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              In no case shall UMIACTIV, our directors, officers, employees,
              affiliates, agents, contractors, interns, suppliers, service
              providers, or licensors be liable for any injury, loss, claim, or
              any direct, indirect, incidental, punitive, special, or
              consequential damages of any kind, including without limitation
              lost profits, lost revenue, lost savings, loss of data,
              replacement costs, or any similar damages, whether based in
              contract, tort, strict liability, or otherwise, arising from your
              use of any of the service or any products procured using the
              service.
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
              Governing Law
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              These Terms of Service and any separate agreements whereby we
              provide you Services shall be governed by and construed in
              accordance with the laws of the United Arab Emirates.
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
              Contact Information
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Questions about the Terms of Service should be sent to us at{" "}
              <a
                href="mailto:support@umiactiv.com"
                className="text-[#1c1c1c] underline"
              >
                support@umiactiv.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
