import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex items-center justify-center p-2 text-[var(--color-text)] transition-colors hover:opacity-70">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx("transition-all ease-in-out", className)}
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {quantity ? (
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center bg-[var(--color-primary)] text-[10px] font-medium text-white">
          {quantity}
        </span>
      ) : null}
    </div>
  );
}
