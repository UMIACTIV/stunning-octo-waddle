export function AnnouncementBar() {
 return (
 <div className="sticky top-0 z-50 flex h-9 w-full items-center justify-center bg-[var(--color-primary)]">
 <p
 className="text-center text-xs text-white"
 style={{
 fontFamily: 'var(--font-heading)',
 fontWeight: 500,
 textTransform: 'uppercase',
 letterSpacing: '0.1em',
 }}
 >
 FREE SHIPPING ON ORDERS $500 – $1,000
 </p>
 </div>
 );
}
