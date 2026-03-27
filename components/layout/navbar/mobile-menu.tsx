"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type MenuItem = { title: string; path: string };

export default function MobileMenu({ menu }: { menu: MenuItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // Swipe handling
  const panelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]!.clientX;
    touchDeltaX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0]!.clientX - touchStartX.current;
    // Only track leftward swipes (negative delta)
    touchDeltaX.current = Math.min(0, delta);
    if (panelRef.current) {
      panelRef.current.style.transform = `translateX(${touchDeltaX.current}px)`;
      panelRef.current.style.transition = "none";
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (panelRef.current) {
      panelRef.current.style.transition = "";
      panelRef.current.style.transform = "";
    }
    // Close if swiped more than 80px left
    if (touchDeltaX.current < -80) {
      closeMobileMenu();
    }
    touchDeltaX.current = 0;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex items-center justify-center p-1 text-[var(--color-text)] transition-colors hover:opacity-70 md:hidden"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel
              ref={panelRef}
              className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-4">
                <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-[0.15em] text-[var(--color-text)]">
                  UMIACTIV
                </span>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="flex items-center justify-center p-1 text-[var(--color-text)]"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 pt-2">
                <ul className="flex flex-col">
                  {menu.map((item) => (
                    <li key={item.title}>
                      <Link
                        href={item.path}
                        prefetch={true}
                        onClick={closeMobileMenu}
                        className="flex items-center border-b border-[var(--color-border)] py-4 font-[family-name:var(--font-heading)] text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-text)]"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[var(--color-border)] px-4 py-4">
                <div className="flex items-center gap-6">
                  <Link href="/wishlist" onClick={closeMobileMenu} className="flex items-center gap-2 text-[var(--color-text)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                    <span className="font-[family-name:var(--font-body)] text-xs">Wishlist</span>
                  </Link>
                  <a href={`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'r7vjmj-nq.myshopify.com'}/account`} onClick={closeMobileMenu} className="flex items-center gap-2 text-[var(--color-text)]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span className="font-[family-name:var(--font-body)] text-xs">Account</span>
                  </a>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
