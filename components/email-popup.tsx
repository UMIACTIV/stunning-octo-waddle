"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

const DISMISSED_KEY = "umi_popup_dismissed";
const DELAY_MS = 5000;

export function EmailPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(DISMISSED_KEY)) return;

    const timer = setTimeout(() => setShow(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setShow(false);
    localStorage.setItem(DISMISSED_KEY, "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.setItem(DISMISSED_KEY, "1");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  function copyCode() {
    navigator.clipboard.writeText("UMI-BRAND").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={dismiss} />
      <div
        className="relative w-full max-w-[400px] bg-white p-8"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 p-1 text-[#999] transition-colors hover:text-[#1c1c1c]"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="text-center">
            <p
              className="mb-2 text-lg font-medium uppercase tracking-[0.15em] text-[#1c1c1c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Welcome to UMI
            </p>
            <p className="mb-5 text-[13px] text-[#6b6b6b]">
              Use this code for 10% off your first order:
            </p>
            <button
              onClick={copyCode}
              className="mb-4 w-full border-2 border-dashed border-[#1c1c1c] bg-[#fafafa] py-3 text-center font-[family-name:var(--font-heading)] text-lg font-medium uppercase tracking-[0.2em] text-[#1c1c1c] transition-colors hover:bg-[#f0f0f0]"
            >
              {copied ? "Copied!" : "UMI-BRAND"}
            </button>
            <p className="text-[11px] text-[#999]">Tap to copy</p>
          </div>
        ) : (
          <>
            <p
              className="mb-2 text-center text-lg font-medium uppercase tracking-[0.15em] text-[#1c1c1c]"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Get 10% Off
            </p>
            <p className="mb-6 text-center text-[13px] text-[#6b6b6b]">
              Join the UMI Insider list for exclusive offers, early access to
              new drops, and 10% off your first order.
            </p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mb-3 w-full border border-[#ddd] px-4 py-3 text-[13px] text-[#1c1c1c] placeholder:text-[#999] focus:border-[#1c1c1c] focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn btn-primary w-full"
              >
                {status === "loading" ? "..." : "Unlock My 10%"}
              </button>
              {status === "error" && (
                <p className="mt-2 text-center text-[12px] text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            <button
              onClick={dismiss}
              className="mt-4 w-full text-center text-[11px] text-[#999] underline transition-colors hover:text-[#6b6b6b]"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
