import type { Metadata } from "next";
import Footer from "components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how UMIACTIV collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
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
            Last updated: January 14, 2026
          </p>

          <p
            className="mb-10 text-[14px] leading-[1.8]"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#6b6b6b",
            }}
          >
            This Privacy Policy describes how UMIACTIV (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, and shares
            your personal information when you visit or make a purchase from our
            website. We are committed to protecting your privacy and ensuring
            that your personal data is handled responsibly.
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
              Personal Information We Collect or Process
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              When you visit our site, we automatically collect certain
              information about your device, including information about your web
              browser, IP address, time zone, and some of the cookies that are
              installed on your device. Additionally, as you browse the site, we
              collect information about the individual web pages or products that
              you view, what websites or search terms referred you to the site,
              and information about how you interact with the site.
            </p>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              When you make a purchase or attempt to make a purchase through the
              site, we collect certain information from you, including your name,
              billing address, shipping address, payment information (including
              credit card numbers), email address, and phone number.
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
              Personal Information Sources
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We collect personal information directly from you when you provide
              it to us, automatically when you use our site, and sometimes from
              third parties. This includes information collected through cookies,
              log files, web beacons, tags, and pixels.
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
              How We Use Your Personal Information
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We use the information we collect to:
            </p>
            <ul
              className="list-inside list-disc space-y-1.5 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              <li>Fulfill orders and process transactions</li>
              <li>
                Communicate with you about your order, account, or customer
                service requests
              </li>
              <li>
                Screen orders for potential risk or fraud
              </li>
              <li>
                Provide you with information or advertising relating to our
                products or services, in line with your preferences
              </li>
              <li>Improve and optimize our site and services</li>
              <li>Comply with legal obligations</li>
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
              How We Disclose Personal Information
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We may share your personal information with third parties to help
              us use your personal information as described above. For example,
              we use Shopify to power our online store. We may also share your
              personal information to comply with applicable laws and
              regulations, to respond to a subpoena, search warrant, or other
              lawful request for information we receive, or to otherwise protect
              our rights.
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
              Relationship with Shopify
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Our store is hosted on Shopify Inc. They provide us with the
              online e-commerce platform that allows us to sell our products and
              services to you. Your data is stored through Shopify&apos;s data
              storage, databases, and the general Shopify application. They store
              your data on a secure server behind a firewall. For more
              information, you may read Shopify&apos;s Terms of Service or
              Privacy Statement.
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
              Third Party Websites and Links
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Our site may contain links to other websites. We are not
              responsible for the privacy practices or the content of such
              websites. We encourage you to read the privacy policies of any
              linked sites you visit.
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
              Children&apos;s Data
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Our site is not intended for individuals under the age of 16. We
              do not intentionally collect personal information from children. If
              you are a parent or guardian and believe your child has provided us
              with personal information, please contact us.
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
              Security and Retention
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We take reasonable precautions and follow industry best practices
              to make sure your personal information is not inappropriately lost,
              misused, accessed, disclosed, altered, or destroyed. We retain your
              personal information only for as long as necessary to fulfill the
              purposes for which it was collected, including to satisfy any
              legal, accounting, or reporting requirements.
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
              Your Rights and Choices
            </h2>
            <p
              className="mb-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              If you are a European resident, you have the right to access
              personal information we hold about you and to ask that your
              personal information be corrected, updated, or deleted. You also
              have the right to data portability. If you would like to exercise
              these rights, please contact us.
            </p>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              You may opt out of receiving promotional communications from us by
              following the unsubscribe instructions included in each email. If
              you opt out, we may still send you non-promotional communications,
              such as those about your account or our ongoing business relations.
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
              Complaints
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              If you have a complaint about how we handle your personal
              information, please contact us first. If you are not satisfied with
              our response, you have the right to lodge a complaint with the
              relevant data protection authority.
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
              International Transfers
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              Your information may be transferred to and maintained on computers
              located outside of your state, province, country, or other
              governmental jurisdiction where the data protection laws may differ
              from those of your jurisdiction. Your consent to this Privacy
              Policy followed by your submission of such information represents
              your agreement to that transfer.
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
              Changes to This Privacy Policy
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We reserve the right to modify this privacy policy at any time, so
              please review it frequently. Changes and clarifications will take
              effect immediately upon their posting on the website.
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
              Contact
            </h2>
            <p
              className="text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              For more information about our privacy practices, if you have
              questions, or if you would like to make a complaint, please contact
              us by email at{" "}
              <a
                href="mailto:umi.active@gmail.com"
                className="text-[#1c1c1c] underline"
              >
                umi.active@gmail.com
              </a>{" "}
              or by mail at:
            </p>
            <p
              className="mt-3 text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#1c1c1c",
              }}
            >
              UMIACTIV
              <br />
              Creek Views By Azizi, 2401
              <br />
              Dubai, DU, AE
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
