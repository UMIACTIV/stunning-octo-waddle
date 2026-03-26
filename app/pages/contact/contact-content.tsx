"use client";

import Footer from "components/layout/footer";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Message sent! We'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  }

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
          Contact Us
        </h1>

        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2
              className="mb-4 text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Get in Touch with UMI Active
            </h2>
            <p
              className="mx-auto max-w-lg text-[14px] leading-[1.8]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              We&apos;re here to help. Whether you have a question about your
              order, sizing, or our collections, our team is ready to assist you.
              Feel free to reach out — we aim to respond as quickly as possible.
            </p>
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h2
                className="mb-2 text-[13px]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Email
              </h2>
              <a
                href="mailto:support@umiactiv.com"
                className="text-[14px] transition-colors hover:text-[#1c1c1c]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#6b6b6b",
                }}
              >
                support@umiactiv.com
              </a>
            </div>
            <div className="text-center">
              <h2
                className="mb-2 text-[13px]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Phone / WhatsApp
              </h2>
              <a
                href="https://wa.me/971585578990"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] transition-colors hover:text-[#1c1c1c]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#6b6b6b",
                }}
              >
                +971 585 578 990
              </a>
            </div>
            <div className="text-center">
              <h2
                className="mb-2 text-[13px]"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                Location
              </h2>
              <p
                className="text-[14px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#6b6b6b",
                }}
              >
                Dubai, United Arab Emirates
              </p>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-12">
            <h2
              className="mb-8 text-center text-[13px]"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              Send Us a Message
            </h2>

            {submitted && (
              <div
                className="mb-8 border border-[#ddd] bg-[#fafafa] p-4 text-center text-[14px]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                  color: "#6b6b6b",
                }}
              >
                Thank you for reaching out! We&apos;ll get back to you as soon
                as possible.
              </div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#1c1c1c",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-[#ddd] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-body)",
                    borderRadius: 0,
                  }}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#1c1c1c",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-[#ddd] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-body)",
                    borderRadius: 0,
                  }}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#1c1c1c",
                  }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full border border-[#ddd] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-body)",
                    borderRadius: 0,
                  }}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-[11px] uppercase"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    color: "#1c1c1c",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full resize-none border border-[#ddd] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#1c1c1c]"
                  style={{
                    fontFamily: "var(--font-body)",
                    borderRadius: 0,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
