import Image from "next/image";
import Price from "components/price";

export function GridTileImage({
  label,
  hoverSrc,
  colorName,
  isOnSale,
  isSoldOut,
  compareAtPrice,
  compareAtCurrencyCode,
  ...props
}: {
  hoverSrc?: string;
  colorName?: string;
  isOnSale?: boolean;
  isSoldOut?: boolean;
  compareAtPrice?: string;
  compareAtCurrencyCode?: string;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div className="group">
      <div
        className="relative w-full overflow-hidden bg-white"
        style={{ aspectRatio: "3 / 4" }}
      >
        {props.src ? (
          <>
            <Image
              className={`h-full w-full object-cover ${
                hoverSrc
                  ? "transition-opacity duration-[400ms] ease-in-out group-hover:opacity-0"
                  : ""
              }`}
              {...props}
            />
            {hoverSrc ? (
              <Image
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-100"
                src={hoverSrc}
                alt={typeof props.alt === "string" ? props.alt : ""}
                fill={!!props.fill}
                width={props.fill ? undefined : (props.width as number)}
                height={props.fill ? undefined : (props.height as number)}
                sizes={
                  typeof props.sizes === "string" ? props.sizes : undefined
                }
              />
            ) : null}
          </>
        ) : null}
        {isSoldOut ? (
          <span className="absolute top-2 left-2 z-10 bg-[#1c1c1c] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white font-[family-name:var(--font-heading)]">
            Sold Out
          </span>
        ) : isOnSale ? (
          <span className="absolute top-2 left-2 z-10 bg-[#dc2626] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.1em] text-white font-[family-name:var(--font-heading)]">
            Sale
          </span>
        ) : null}
      </div>
      {label ? (
        <div className="mt-2 px-0.5">
          <p
            className="line-clamp-1 text-[13px] leading-tight"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              color: "#1c1c1c",
            }}
          >
            {label.title}
          </p>
          <p className="mt-1 flex items-baseline">
            <span className="sr-only">Sale price</span>
            {isOnSale && !isSoldOut && compareAtPrice ? (
              <Price
                className="mr-1.5 text-[12px] text-[#999] line-through"
                amount={compareAtPrice}
                currencyCode={compareAtCurrencyCode || label.currencyCode}
                currencyCodeClassName="hidden"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 400,
                }}
              />
            ) : null}
            <Price
              className="text-[13px]"
              amount={label.amount}
              currencyCode={label.currencyCode}
              currencyCodeClassName="hidden"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: isOnSale && !isSoldOut ? "#dc2626" : "#1c1c1c",
              }}
            />
          </p>
          {colorName ? (
            <p
              className="mt-0.5 text-[12px]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                color: "#6b6b6b",
              }}
            >
              {colorName}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
