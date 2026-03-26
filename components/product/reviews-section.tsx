const RATING_ROWS = [5, 4, 3, 2, 1] as const;

function StarFilled() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1c1c1c" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function RatingBar({ stars, percentage }: { stars: number; percentage: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-8 shrink-0 text-right font-[family-name:var(--font-body)] text-sm text-[var(--color-text)]">
        {stars}★
      </span>
      <div className="relative h-2 flex-1 bg-[var(--color-secondary)]">
        <div
          className="absolute left-0 top-0 h-full bg-[var(--color-primary)]"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)]">
        {percentage}%
      </span>
    </div>
  );
}

export function ReviewsSection({ productTitle }: { productTitle?: string }) {
  return (
    <section className="mt-8 border-t border-[var(--color-border)] pt-8">
      <div className="mx-auto max-w-[600px]">
        <h2 className="mb-8 text-center font-[family-name:var(--font-heading)] font-medium uppercase tracking-[0.2em] text-[length:var(--text-h2)]">
          Customer Reviews
        </h2>

        <div className="mb-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarEmpty key={i} />
            ))}
          </div>
          <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-text)]">
            0.0 out of 5
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-2">
          {RATING_ROWS.map((stars) => (
            <RatingBar key={stars} stars={stars} percentage={0} />
          ))}
        </div>

        <p className="mb-8 text-center font-[family-name:var(--font-body)] text-sm text-[var(--color-text-muted)]">
          Be the first to write a review
          {productTitle ? ` for ${productTitle}` : ''}
        </p>

        <button
          type="button"
          className="btn btn-primary w-full"
          aria-label="Write a review"
        >
          Write a Review
        </button>
      </div>
    </section>
  );
}
