'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  /* ── Mobile: track which slide is snapped ── */
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollLeft = el.scrollLeft;
        const slideWidth = el.clientWidth;
        if (slideWidth > 0) {
          const idx = Math.round(scrollLeft / slideWidth);
          setActiveIndex(idx);
        }
        ticking = false;
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [images]);

  /* ── Desktop: IntersectionObserver for vertical stack ── */
  const desktopImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = desktopImageRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    desktopImageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [images]);

  /* ── Scroll thumbnail strip to keep active thumb visible ── */
  useEffect(() => {
    if (!thumbnailStripRef.current) return;
    const activeThumb = thumbnailStripRef.current.children[
      activeIndex
    ] as HTMLElement | undefined;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  /* ── Mobile: tap dot to scroll ── */
  const scrollToMobileSlide = useCallback((index: number) => {
    const el = mobileScrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' });
  }, []);

  /* ── Desktop: tap thumbnail to scroll page ── */
  const scrollToDesktopImage = useCallback((index: number) => {
    desktopImageRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  return (
    <div className="relative">
      {/* ═══ MOBILE: Horizontal swipeable carousel ═══ */}
      <div className="md:hidden">
        <div
          ref={mobileScrollRef}
          className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className="relative aspect-[3/4] w-full flex-shrink-0 snap-center"
            >
              <Image
                src={image.src}
                alt={image.altText}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToMobileSlide(index)}
                aria-label={`Go to image ${index + 1}`}
                className="block transition-all"
                style={{
                  width: activeIndex === index ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor:
                    activeIndex === index ? '#1c1c1c' : '#d4d4d4',
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ═══ DESKTOP: Vertical image stack ═══ */}
      <div className="hidden md:block">
        <div className="flex flex-col gap-2">
          {images.map((image, index) => (
            <div
              key={image.src}
              ref={(el) => {
                desktopImageRefs.current[index] = el;
              }}
              className="relative aspect-[2/3] w-full overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.altText}
                width={800}
                height={1200}
                sizes="55vw"
                priority={index === 0}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm">
            <div
              ref={thumbnailStripRef}
              className="flex gap-2 overflow-x-auto py-2"
              style={{ scrollbarWidth: 'none' }}
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => scrollToDesktopImage(index)}
                  aria-label={`View image ${index + 1}`}
                  className="flex-shrink-0"
                >
                  <Image
                    src={image.src}
                    alt={image.altText}
                    width={56}
                    height={56}
                    className="h-14 w-14 object-cover"
                    style={{
                      border:
                        activeIndex === index
                          ? '2px solid #1c1c1c'
                          : '1px solid #dddddd',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
