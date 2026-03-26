import Link from 'next/link';

export function RewardsBanner() {
 return (
 <section
 className="w-full text-center"
 style={{
 backgroundColor: '#1a1a1a',
 padding: '64px 20px',
 }}
 >
 <h2
 className="mb-3"
 style={{
 fontFamily: 'var(--font-heading)',
 fontSize: 'var(--text-h3)',
 fontWeight: 500,
 textTransform: 'uppercase',
 letterSpacing: '0.2em',
 color: '#ffffff',
 }}
 >
 REWARDS &amp; REFERRALS
 </h2>
 <p
 className="mx-auto mb-6 max-w-md"
 style={{
 fontFamily: 'var(--font-body)',
 fontSize: '14px',
 color: 'rgba(255,255,255,0.7)',
 }}
 >
 Earn points with every purchase. Refer friends and get rewarded.
 </p>
 <Link
 href="/pages/rewards"
 className="btn btn-secondary"
 style={{
 borderColor: '#ffffff',
 color: '#ffffff',
 backgroundColor: 'transparent',
 }}
 >
 Learn More
 </Link>
 </section>
 );
}
