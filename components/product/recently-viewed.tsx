'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RecentProduct {
  handle: string;
  title: string;
  image: string;
  price: string;
}

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 10;

function getStoredProducts(): RecentProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentProduct[]) : [];
  } catch {
    return [];
  }
}

function storeProducts(products: RecentProduct[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch {}
}

export function RecentlyViewed({ currentHandle }: { currentHandle?: string }) {
  const [products, setProducts] = useState<RecentProduct[]>([]);

  useEffect(() => {
    const stored = getStoredProducts();

    if (currentHandle) {
      const filtered = stored.filter((p) => p.handle !== currentHandle);
      const updated = [
        { handle: currentHandle, title: '', image: '', price: '' },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      const merged = updated.map((item) => {
        const existing = stored.find((s) => s.handle === item.handle);
        return existing && existing.title ? existing : item;
      });

      storeProducts(merged);
      setProducts(merged.filter((p) => p.handle !== currentHandle && p.title));
    } else {
      setProducts(stored.filter((p) => p.title));
    }
  }, [currentHandle]);

  if (products.length === 0) return null;

  return (
    <section className="mt-8 border-t border-[var(--color-border)] pt-8">
      <h2 className="mb-6 text-center font-[family-name:var(--font-heading)] font-medium uppercase tracking-[0.2em] text-[length:var(--text-h2)]">
        Recently Viewed
      </h2>
      <div className="overflow-x-hidden">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="w-[45vw] shrink-0 sm:w-[30vw] md:w-[22vw] lg:w-[18vw]"
            prefetch={false}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={533}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 18vw, (min-width: 768px) 22vw, (min-width: 640px) 30vw, 45vw"
              />
            </div>
            <p className="mt-2 font-[family-name:var(--font-body)] text-sm font-normal text-[var(--color-text)]">
              {product.title}
            </p>
            <p className="font-[family-name:var(--font-body)] text-sm font-normal text-[var(--color-primary)]">
              {product.price}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
