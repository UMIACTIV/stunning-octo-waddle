'use client';

import { useEffect, useRef } from 'react';

interface InstagramFeedProps {
  heading: string;
  subheading?: string;
  postUrls: string[];
}

function getEmbedUrl(url: string): string {
  const clean = url.endsWith('/') ? url.slice(0, -1) : url;
  return `${clean}/embed/`;
}

export function InstagramFeed({ heading, subheading, postUrls }: InstagramFeedProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: 'left' | 'right') {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -340 : 340,
      behavior: 'smooth',
    });
  }

  if (!postUrls.length) return null;

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
          {heading}
        </h2>
        {subheading && (
          <p
            className="text-center"
            style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6b6b6b' }}
          >
            {subheading}
          </p>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-white transition-colors hover:bg-[#1c1c1c] hover:text-white md:left-4"
          style={{ width: '40px', height: '40px', border: '1px solid #ddd' }}
          aria-label="Previous"
        >
          &#8592;
        </button>

        <div className="overflow-x-hidden">
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-4 overflow-x-auto px-4 md:px-8"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {postUrls.map((url) => (
            <div
              key={url}
              className="flex-shrink-0 overflow-hidden bg-white"
              style={{
                width: 'clamp(280px, 28vw, 340px)',
                scrollSnapAlign: 'start',
                border: '1px solid #eee',
              }}
            >
              <iframe
                src={getEmbedUrl(url)}
                style={{
                  width: '100%',
                  height: '480px',
                  border: 'none',
                  overflow: 'hidden',
                }}
                loading="lazy"
                allowTransparency
                allow="encrypted-media"
                title="Instagram post"
              />
            </div>
          ))}
        </div>
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 z-10 flex -translate-y-1/2 cursor-pointer items-center justify-center bg-white transition-colors hover:bg-[#1c1c1c] hover:text-white md:right-4"
          style={{ width: '40px', height: '40px', border: '1px solid #ddd' }}
          aria-label="Next"
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
