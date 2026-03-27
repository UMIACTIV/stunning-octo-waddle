import { CartProvider } from "components/cart/cart-context";
import { AnnouncementBar } from "components/layout/announcement-bar";
import { Navbar } from "components/layout/navbar";
import { WishlistProvider } from "components/wishlist/wishlist-context";
import { WelcomeToast } from "components/welcome-toast";
import { Montserrat, Nunito_Sans } from "next/font/google";
import { getCart } from "lib/shopify";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { baseUrl } from "lib/utils";

const montserrat = Montserrat({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700"],
 variable: "--font-heading",
 display: "swap",
});

const nunitoSans = Nunito_Sans({
 subsets: ["latin"],
 weight: ["400", "600", "700"],
 variable: "--font-body",
 display: "swap",
});

const { SITE_NAME } = process.env;

export const metadata = {
 metadataBase: new URL(baseUrl),
 title: {
 default: SITE_NAME!,
 template: `%s | ${SITE_NAME}`,
 },
 robots: {
 follow: true,
 index: true,
 },
};

export const viewport = {
 width: "device-width",
 initialScale: 1,
 maximumScale: 1,
 userScalable: false,
};

export default async function RootLayout({
 children,
}: {
 children: ReactNode;
}) {
 const cart = getCart();

 return (
 <html lang="en" className={`${montserrat.variable} ${nunitoSans.variable}`}>
 <body className="bg-white text-[var(--color-text)]">
 <AnnouncementBar />
  <CartProvider cartPromise={cart}>
  <WishlistProvider>
  <Navbar />
  <main>
  {children}
  <Toaster closeButton />
  <WelcomeToast />
  </main>
  </WishlistProvider>
  </CartProvider>
 </body>
 </html>
 );
}
