import Link from 'next/link';

function buildHref(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>,
) {
  const params = new URLSearchParams(searchParams);

  if (page > 1) {
    params.set('page', String(page));
  } else {
    params.delete('page');
  }

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(2);
  pages.add(total - 1);
  pages.add(total);

  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) {
      pages.add(i);
    }
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i]! - sorted[i - 1]! > 1) {
      result.push('ellipsis');
    }
    result.push(sorted[i]!);
  }

  return result;
}

const itemBase =
  'inline-flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center font-[family-name:var(--font-body)] text-sm font-normal text-[var(--color-text)] transition-colors duration-150';

const itemInteractive =
  'hover:bg-[var(--color-secondary)]';

const itemActive =
  'bg-[#1c1c1c] font-bold text-white';

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 py-6">
      {currentPage > 1 && (
        <Link
          href={buildHref(basePath, currentPage - 1, searchParams)}
          className={`${itemBase} ${itemInteractive}`}
          aria-label="Previous page"
        >
          &larr;
        </Link>
      )}

      {pages.map((entry, idx) => {
        if (entry === 'ellipsis') {
          return (
            <span key={`ellipsis-${idx}`} className={itemBase} aria-hidden>
              &hellip;
            </span>
          );
        }

        if (entry === currentPage) {
          return (
            <span
              key={entry}
              className={`${itemBase} ${itemActive}`}
              aria-current="page"
            >
              {entry}
            </span>
          );
        }

        return (
          <Link
            key={entry}
            href={buildHref(basePath, entry, searchParams)}
            className={`${itemBase} ${itemInteractive}`}
          >
            {entry}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={buildHref(basePath, currentPage + 1, searchParams)}
          className={`${itemBase} ${itemInteractive}`}
          aria-label="Next page"
        >
          &rarr;
        </Link>
      )}
    </nav>
  );
}
