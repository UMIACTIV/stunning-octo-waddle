"use client";

import clsx from "clsx";
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createCartAndSetCookie, redirectToCheckout } from "./actions";
import { useCart } from "./cart-context";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import OpenCart from "./open-cart";

type MerchandiseSearchParams = {
 [key: string]: string;
};

export default function CartModal() {
 const { cart, updateCartItem } = useCart();
 const [isOpen, setIsOpen] = useState(false);
 const quantityRef = useRef(cart?.totalQuantity);
 const openCart = () => setIsOpen(true);
 const closeCart = () => setIsOpen(false);

 useEffect(() => {
 if (!cart) {
 createCartAndSetCookie();
 }
 }, [cart]);

 useEffect(() => {
 if (
 cart?.totalQuantity &&
 cart?.totalQuantity !== quantityRef.current &&
 cart?.totalQuantity > 0
 ) {
 if (!isOpen) {
 setIsOpen(true);
 }
 quantityRef.current = cart?.totalQuantity;
 }
 }, [isOpen, cart?.totalQuantity, quantityRef]);

 return (
 <>
 <button aria-label="Open cart" onClick={openCart}>
 <OpenCart quantity={cart?.totalQuantity} />
 </button>
 <Transition show={isOpen}>
 <Dialog onClose={closeCart} className="relative z-50">
 <Transition.Child
 as={Fragment}
 enter="transition-all ease-in-out duration-300"
 enterFrom="opacity-0 backdrop-blur-none"
 enterTo="opacity-100 backdrop-blur-[.5px]"
 leave="transition-all ease-in-out duration-200"
 leaveFrom="opacity-100 backdrop-blur-[.5px]"
 leaveTo="opacity-0 backdrop-blur-none"
 >
 <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
 </Transition.Child>
 <Transition.Child
 as={Fragment}
 enter="transition-all ease-in-out duration-300"
 enterFrom="translate-x-full"
 enterTo="translate-x-0"
 leave="transition-all ease-in-out duration-200"
 leaveFrom="translate-x-0"
 leaveTo="translate-x-full"
 >
 <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-[#ddd] bg-white p-4 text-[#1c1c1c] md:w-[390px] md:p-6">
 <div className="flex items-center justify-between">
 <p className="font-[family-name:var(--font-heading)] text-sm font-medium uppercase tracking-[0.16em]">My Cart</p>
 <button aria-label="Close cart" onClick={closeCart}>
 <CloseCart />
 </button>
                </div>

                {cart && cart.lines.length > 0 && (() => {
                  const FREE_SHIPPING_THRESHOLD = 500;
                  const subtotal = parseFloat(cart.cost.subtotalAmount.amount);
                  const hasFreeship = subtotal >= FREE_SHIPPING_THRESHOLD;
                  const progress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);
                  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

                  return (
                    <div className="mt-4 mb-1">
                      <p
                        className="mb-2 text-[12px]"
                        style={{ fontFamily: "var(--font-body)", color: "#6b6b6b" }}
                      >
                        {hasFreeship
                          ? "🎉 You've unlocked free shipping!"
                          : `You're $${remaining.toFixed(2)} away from free shipping`}
                      </p>
                      <div
                        className="h-1.5 w-full overflow-hidden"
                        style={{ backgroundColor: "#eee" }}
                      >
                        <div
                          className="h-full transition-all duration-500 ease-out"
                          style={{
                            width: `${progress * 100}%`,
                            backgroundColor: hasFreeship ? "#22c55e" : "#1c1c1c",
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}

                {!cart || cart.lines.length === 0 ? (
 <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
 <ShoppingCartIcon className="h-16 text-[#1c1c1c]" />
 <p className="mt-6 text-center font-[family-name:var(--font-heading)] text-lg font-medium uppercase tracking-[0.2em]">
 Your cart is empty.
 </p>
 </div>
 ) : (
 <div className="flex h-full flex-col justify-between overflow-hidden pt-4">
 <ul className="grow overflow-auto">
 {cart.lines
 .sort((a, b) =>
 a.merchandise.product.title.localeCompare(
 b.merchandise.product.title,
 ),
 )
 .map((item, i) => {
 const merchandiseSearchParams =
 {} as MerchandiseSearchParams;

 item.merchandise.selectedOptions.forEach(
 ({ name, value }) => {
 if (value !== DEFAULT_OPTION) {
 merchandiseSearchParams[name.toLowerCase()] =
 value;
 }
 },
 );

 const merchandiseUrl = createUrl(
 `/product/${item.merchandise.product.handle}`,
 new URLSearchParams(merchandiseSearchParams),
 );

 return (
 <li
 key={i}
 className="flex w-full flex-col border-b border-[#eee]"
 >
 <div className="relative flex w-full flex-row justify-between px-1 py-4">
 <div className="absolute z-40 -ml-1 -mt-2">
 <DeleteItemButton
 item={item}
 optimisticUpdate={updateCartItem}
 />
 </div>
 <div className="flex flex-row">
 <div className="relative h-16 w-16 overflow-hidden border border-[#eee] bg-white">
 <Image
 className="h-full w-full object-cover"
 width={64}
 height={64}
 alt={
 item.merchandise.product.featuredImage
 .altText ||
 item.merchandise.product.title
 }
 src={
 item.merchandise.product.featuredImage.url
 }
 />
 </div>
 <Link
 href={merchandiseUrl}
 onClick={closeCart}
 className="z-30 ml-2 flex flex-row space-x-4"
 >
 <div className="flex flex-1 flex-col text-base">
 <span className="font-[family-name:var(--font-body)] text-sm leading-tight text-[#1c1c1c]">
 {item.merchandise.product.title}
 </span>
 {item.merchandise.title !==
 DEFAULT_OPTION ? (
 <p className="font-[family-name:var(--font-body)] text-xs text-[#6b6b6b]">
 {item.merchandise.title}
 </p>
 ) : null}
 </div>
 </Link>
 </div>
 <div className="flex h-16 flex-col justify-between">
 <Price
 className="flex justify-end space-y-2 text-right font-[family-name:var(--font-body)] text-sm text-[#1c1c1c]"
 amount={item.cost.totalAmount.amount}
 currencyCode={
 item.cost.totalAmount.currencyCode
 }
 />
 <div className="ml-auto flex h-9 flex-row items-center border border-[#ddd]">
 <EditItemQuantityButton
 item={item}
 type="minus"
 optimisticUpdate={updateCartItem}
 />
 <p className="w-6 text-center">
 <span className="w-full text-sm">
 {item.quantity}
 </span>
 </p>
 <EditItemQuantityButton
 item={item}
 type="plus"
 optimisticUpdate={updateCartItem}
 />
 </div>
 </div>
 </div>
 </li>
 );
 })}
 </ul>
 <div className="py-4 font-[family-name:var(--font-body)] text-sm text-[#6b6b6b]">
 <div className="mb-3 flex items-center justify-between border-b border-[#eee] pb-1">
 <p>Taxes</p>
 <Price
 className="text-right text-base text-[#1c1c1c]"
 amount={cart.cost.totalTaxAmount.amount}
 currencyCode={cart.cost.totalTaxAmount.currencyCode}
 />
 </div>
 <div className="mb-3 flex items-center justify-between border-b border-[#eee] pb-1 pt-1">
 <p>Shipping</p>
 <p className="text-right">Calculated at checkout</p>
 </div>
 <div className="mb-3 flex items-center justify-between border-b border-[#eee] pb-1 pt-1">
 <p>Total</p>
 <Price
 className="text-right text-base font-medium text-[#1c1c1c]"
 amount={cart.cost.totalAmount.amount}
 currencyCode={cart.cost.totalAmount.currencyCode}
 />
 </div>
 </div>
 <form action={redirectToCheckout}>
 <CheckoutButton />
 </form>
 </div>
 )}
 </Dialog.Panel>
 </Transition.Child>
 </Dialog>
 </Transition>
 </>
 );
}

function CloseCart({ className }: { className?: string }) {
 return (
 <div className="relative flex h-10 w-10 items-center justify-center border border-[#ddd] text-[#1c1c1c] transition-colors hover:bg-[#efefef]">
 <XMarkIcon
 className={clsx(
 "h-6 transition-all ease-in-out hover:scale-110",
 className,
 )}
 />
 </div>
 );
}

function CheckoutButton() {
 const { pending } = useFormStatus();

 return (
 <button
 className="btn btn-primary w-full"
 type="submit"
 disabled={pending}
 >
 {pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
 </button>
 );
}
