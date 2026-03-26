import React from 'react';

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  return (
    <details open={defaultOpen} className="group border-t border-[#dddddd]">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 font-[family-name:var(--font-heading)] text-sm font-medium uppercase tracking-[0.2em] [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <svg
          className="transition-transform duration-200 group-open:rotate-90"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.5 2.5L8 6L4.5 9.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}
