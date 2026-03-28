"use client";

import { useEffect, useRef } from "react";
import { trackViewProduct } from "lib/tracking";

export function ProductViewTracker({
  id,
  title,
  price,
  currencyCode,
  handle,
}: {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
  handle: string;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackViewProduct({ id, title, price, currencyCode, handle });
  }, [id, title, price, currencyCode, handle]);

  return null;
}
