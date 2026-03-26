"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  useEffect(() => {
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes("umi-welcome=1")) {
      toast("Welcome to UMIACTIV ✨", {
        id: "welcome-toast",
        duration: 6000,
        onDismiss: () => {
          document.cookie = "umi-welcome=1; max-age=31536000; path=/";
        },
        onAutoClose: () => {
          document.cookie = "umi-welcome=1; max-age=31536000; path=/";
        },
        description:
          "Sign up for 10% off your first order. Free shipping on orders $500–$1,000.",
      });
    }
  }, []);

  return null;
}
