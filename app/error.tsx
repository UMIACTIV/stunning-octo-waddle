"use client";

export default function Error({ reset }: { reset: () => void }) {
 return (
 <div className="mx-auto my-4 flex max-w-xl flex-col items-center bg-white p-6 text-center md:p-12">
 <h2 className="font-[family-name:var(--font-heading)] text-xl font-medium uppercase tracking-[0.2em]">Oh no!</h2>
 <p className="my-4 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[#6b6b6b]">
 There was an issue with our storefront. This could be a temporary issue,
 please try your action again.
 </p>
 <button
 className="btn btn-primary mt-4 w-full"
 onClick={() => reset()}
 >
 Try Again
 </button>
 </div>
 );
}
