"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "umi-wishlist";

type WishlistContextType = {
  wishlist: string[];
  addToWishlist: (handle: string) => void;
  removeFromWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  toggleWishlist: (handle: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistWishlist(handles: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(handles));
  } catch {
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getStoredWishlist());
  }, []);

  const addToWishlist = useCallback((handle: string) => {
    setWishlist((prev) => {
      if (prev.includes(handle)) return prev;
      const next = [...prev, handle];
      persistWishlist(next);
      return next;
    });
  }, []);

  const removeFromWishlist = useCallback((handle: string) => {
    setWishlist((prev) => {
      const next = prev.filter((h) => h !== handle);
      persistWishlist(next);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (handle: string) => wishlist.includes(handle),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (handle: string): boolean => {
      const exists = wishlist.includes(handle);
      if (exists) {
        removeFromWishlist(handle);
      } else {
        addToWishlist(handle);
      }
      return !exists;
    },
    [wishlist, addToWishlist, removeFromWishlist]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    persistWishlist([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      toggleWishlist,
      clearWishlist,
      wishlistCount: wishlist.length,
    }),
    [wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist, clearWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
