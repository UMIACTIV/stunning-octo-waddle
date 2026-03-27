import Image from 'next/image';
import Link from 'next/link';

export interface CategoryItem {
  label: string;
  image: string;
  href: string;
}

export function CategoryGrid({
  heading,
  subheading,
  items,
}: {
  heading: string;
  subheading?: string;
  items: CategoryItem[];
}) {
  return (
    <section style={{ padding: '48px 0' }}>
      <div className="container-umi">
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
            className="mx-auto mb-8 max-w-[500px] text-center"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: '#6b6b6b',
            }}
          >
            {subheading}
          </p>
        )}

        {!subheading && <div className="mb-8" />}
      </div>

      <div className="overflow-x-hidden">
      <div
        className="scrollbar-hide flex gap-3 overflow-x-auto px-4 md:px-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative block flex-shrink-0 overflow-hidden"
            style={{
              width: 'clamp(220px, 28vw, 340px)',
              aspectRatio: '3 / 4',
              scrollSnapAlign: 'start',
            }}
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              sizes="(min-width: 768px) 28vw, 55vw"
              className="object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: '40%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
              }}
            />
            <span
              className="absolute inset-x-0 bottom-5 text-center text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '12px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
}
