import React from 'react';

export function TrustBadges() {
  return (
    <div className="border-t border-[#dddddd] pt-4 mt-4 flex flex-col sm:flex-row gap-6 justify-center items-center">
      {/* Free Shipping Badge */}
      <div className="flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#1c1c1c] flex-shrink-0"
        >
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 4v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
        <span className="font-[family-name:var(--font-body)] font-normal text-[0.8125rem] text-[#1c1c1c]">
          Free Shipping $500+
        </span>
      </div>

      {/* 14-Day Easy Return Badge */}
      <div className="flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#1c1c1c] flex-shrink-0"
        >
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </svg>
        <span className="font-[family-name:var(--font-body)] font-normal text-[0.8125rem] text-[#1c1c1c]">
          14-Day Easy Return
        </span>
      </div>
    </div>
  );
}
