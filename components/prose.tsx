import clsx from "clsx";

const Prose = ({ html, className }: { html: string; className?: string }) => {
 return (
 <div
 className={clsx(
 "prose mx-auto max-w-6xl text-[#1c1c1c] prose-headings:mt-8 prose-headings:font-medium prose-headings:tracking-wide prose-headings:text-[#1c1c1c] prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base prose-a:text-[#1c1c1c] prose-a:underline prose-strong:text-[#1c1c1c] prose-ol:mt-8 prose-ol:list-decimal prose-ol:pl-6 prose-ul:mt-8 prose-ul:list-disc prose-ul:pl-6",
 className,
 )}
 dangerouslySetInnerHTML={{ __html: html }}
 />
 );
};

export default Prose;
