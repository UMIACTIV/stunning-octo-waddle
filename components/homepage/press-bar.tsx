const PRESS_LOGOS = [
 'VOGUE',
 'ELLE',
 "HARPER'S BAZAAR",
 'GQ',
 'COSMOPOLITAN',
 "WOMEN'S HEALTH",
];

export function PressBar() {
 return (
 <section
 style={{
 padding: '32px 0',
 borderBottom: '1px solid #eee',
 }}
 >
 <p
 className="mb-5 text-center"
 style={{
 fontFamily: 'var(--font-heading)',
 fontSize: '11px',
 fontWeight: 500,
 textTransform: 'uppercase',
 letterSpacing: '0.2em',
 color: '#999',
 }}
 >
 AS SEEN IN
 </p>
 <div
 className="mx-auto flex flex-wrap items-center justify-between gap-6 px-5 md:gap-0"
 style={{ maxWidth: '900px' }}
 >
 {PRESS_LOGOS.map((name) => (
 <span
 key={name}
 style={{
 fontFamily: 'var(--font-heading)',
 fontSize: '14px',
 fontWeight: 600,
 textTransform: 'uppercase',
 letterSpacing: '0.15em',
 color: '#999',
 }}
 >
 {name}
 </span>
 ))}
 </div>
 </section>
 );
}
