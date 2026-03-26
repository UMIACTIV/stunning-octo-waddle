'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

const SLIDES = [
  {
    left: '/images/hero/slide1-left.jpg',
    center: '/images/hero/slide1-center.jpg',
    right: '/images/hero/slide1-right.jpg',
    alt: 'UMIACTIV — mint activewear set, Dubai street lifestyle',
  },
  {
    left: '/images/hero/slide2-left.jpg',
    center: '/images/hero/slide2-center.jpg',
    right: '/images/hero/slide2-right.jpg',
    alt: 'UMIACTIV — editorial collection, coastal and stadium',
  },
  {
    left: '/images/hero/slide3-left.jpg',
    center: '/images/hero/slide3-center.jpg',
    right: '/images/hero/slide3-right.jpg',
    alt: 'UMIACTIV — pink activewear set, patio lifestyle',
  },
];

export function HeroSlideshow() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Aspect ratio spacer: 3:4 mobile, 16:7 desktop */}
      <div className="aspect-[3/4] w-full md:aspect-[16/7]" />

      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: active === i ? 1 : 0 }}
        >
          {/* Desktop: 3 panels side by side */}
          <div className="hidden h-full w-full md:flex">
            <div className="relative h-full w-1/3">
              <Image
                src={slide.left}
                alt=""
                fill
                priority={i === 0}
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-full w-1/3">
              <Image
                src={slide.center}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="34vw"
                className="object-cover"
              />
            </div>
            <div className="relative h-full w-1/3">
              <Image
                src={slide.right}
                alt=""
                fill
                priority={i === 0}
                sizes="33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="relative h-full w-full md:hidden">
            <Image
              src={slide.center}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      ))}

      {/* Shop Now CTA */}
      <div className="absolute inset-x-0 bottom-12 z-10 flex justify-center md:bottom-16">
        <Link
          href="/search"
          className="border-b border-transparent text-white hover:border-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            textDecoration: 'none',
            transition: 'border-color 0.2s ease',
          }}
        >
          Shop Now
        </Link>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5 md:bottom-7">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="block transition-opacity"
            style={{
              width: '10px',
              height: '10px',
              backgroundColor:
                active === i ? 'white' : 'rgba(255,255,255,0.4)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
