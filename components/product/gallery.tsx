'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [images]);

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

  const scrollToImage = (index: number) => {
    imageRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-6">
        {images.map((image, index) => (
          <div
            key={image.src}
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="relative aspect-[2/3] w-full overflow-hidden"
          >
            <Image
              src={image.src}
              alt={image.altText}
              width={800}
              height={1200}
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={index === 0}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-sm">
          <div
            ref={thumbnailStripRef}
            className="flex overflow-x-auto gap-2 py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {images.map((image, index) => (
              <button
                key={image.src}
                onClick={() => scrollToImage(index)}
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
  );
}
