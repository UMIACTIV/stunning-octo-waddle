'use client';

import Image from 'next/image';
import Link from 'next/link';

const GALLERY_ITEMS = [
  { image: '/images/lifestyle/lifestyle-1.jpg', href: '/search/court-line' },
  { image: '/images/lifestyle/lifestyle-2.jpg', href: '/search/daily-line' },
  { image: '/images/lifestyle/lifestyle-3.jpg', href: '/search/sculpt-line' },
  { image: '/images/lifestyle/lifestyle-4.jpg', href: '/search/powder-rose' },
  { image: '/images/hero/hero-1.jpg', href: '/search/deep-merlot-series' },
  { image: '/images/hero/hero-2.jpg', href: '/search/espresso-balance' },
];

export function LifestyleGallery() {
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container-umi mb-8">
        <h2
          className="mb-2 text-center"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          IN THE WILD
        </h2>
        <p
          className="text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: '#6b6b6b',
          }}
        >
          Tag us{' '}
          <a
            href="https://www.instagram.com/umiactiv/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-text)]"
          >
            @umiactiv
          </a>{' '}
          to be featured
        </p>
      </div>

      <div
        className="scrollbar-hide flex gap-3 overflow-x-auto px-4 md:px-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {GALLERY_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative block flex-shrink-0 overflow-hidden"
            style={{
              width: 'clamp(260px, 30vw, 380px)',
              aspectRatio: '4 / 5',
              scrollSnapAlign: 'start',
            }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 768px) 30vw, 60vw"
              className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
