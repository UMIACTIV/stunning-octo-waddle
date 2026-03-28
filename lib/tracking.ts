type ProductData = {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
  handle: string;
  variant?: string;
  quantity?: number;
};

import type { CartItem } from "./shopify/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
}

export function trackPageView(url: string) {
  fbq("track", "PageView");
  gtag("event", "page_view", { page_location: url });
}

export function trackViewProduct(product: ProductData) {
  const value = parseFloat(product.price);

  fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.title,
    content_type: "product",
    value,
    currency: product.currencyCode,
  });

  gtag("event", "view_item", {
    currency: product.currencyCode,
    value,
    items: [
      {
        item_id: product.handle,
        item_name: product.title,
        price: value,
        quantity: 1,
      },
    ],
  });
}

export function trackAddToCart(product: ProductData) {
  const value = parseFloat(product.price);

  fbq("track", "AddToCart", {
    content_ids: [product.id],
    content_name: product.title,
    content_type: "product",
    value,
    currency: product.currencyCode,
  });

  gtag("event", "add_to_cart", {
    currency: product.currencyCode,
    value,
    items: [
      {
        item_id: product.handle,
        item_name: product.title,
        price: value,
        quantity: product.quantity ?? 1,
        item_variant: product.variant,
      },
    ],
  });
}

export function trackBeginCheckout(
  items: CartItem[],
  totalAmount: string,
  currencyCode: string,
) {
  const value = parseFloat(totalAmount);

  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => i.merchandise.id),
    num_items: items.reduce((sum, i) => sum + i.quantity, 0),
    value,
    currency: currencyCode,
  });

  gtag("event", "begin_checkout", {
    currency: currencyCode,
    value,
    items: items.map((item) => ({
      item_id: item.merchandise.product.handle,
      item_name: item.merchandise.product.title,
      item_variant: item.merchandise.title,
      price: parseFloat(item.cost.totalAmount.amount) / item.quantity,
      quantity: item.quantity,
    })),
  });

  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const googleAdsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;
  if (googleAdsId && googleAdsLabel) {
    gtag("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsLabel}`,
      value,
      currency: currencyCode,
    });
  }
}

export function trackSearch(query: string) {
  fbq("track", "Search", { search_string: query });
  gtag("event", "search", { search_term: query });
}
