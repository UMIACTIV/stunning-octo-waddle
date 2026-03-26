import { HeroSlideshow } from 'components/homepage/hero-slideshow';
import { PressBar } from 'components/homepage/press-bar';
import { ProductGrid } from 'components/homepage/product-grid-server';
import { CategoryGrid } from 'components/homepage/category-grid';
import { LifestyleGallery } from 'components/homepage/lifestyle-gallery';
import { FeaturedBanner } from 'components/homepage/featured-banner';
import { Testimonials } from 'components/homepage/testimonials';
import Footer from 'components/layout/footer';

import type { CategoryItem } from 'components/homepage/category-grid';

const activities: CategoryItem[] = [
 { label: 'Pilates & Yoga', image: '/images/activities/act-6021.jpg', href: '/search/sculpt-line' },
 { label: 'Tennis', image: '/images/activities/act-6065.jpg', href: '/search/court-line' },
 { label: 'Golf', image: '/images/activities/act-6046.jpg', href: '/search/daily-line' },
 { label: 'Lounge', image: '/images/activities/act-6050.jpg', href: '/search/powder-rose' },
 { label: 'Resort', image: '/images/activities/act-6047.jpg', href: '/search/espresso-balance' },
 { label: 'Swimming', image: '/images/activities/act-6001.jpg', href: '/search/deep-merlot-series' },
 { label: 'Running', image: '/images/lifestyle/lifestyle-1.jpg', href: '/search' },
];

const categories: CategoryItem[] = [
 { label: 'Leggings', image: '/images/categories/cat-6039.jpg', href: '/search/leggings-1' },
 { label: 'Sports Bras', image: '/images/categories/cat-6025.jpg', href: '/search/top' },
 { label: 'Long Sleeve Tops', image: '/images/categories/cat-6018.jpg', href: '/search/top' },
 { label: 'Shirting', image: '/images/categories/cat-5978.jpg', href: '/search' },
 { label: 'Onesies', image: '/images/categories/cat-6054.jpg', href: '/search/dress' },
 { label: 'Dresses', image: '/images/categories/cat-6042.jpg', href: '/search/dress' },
 { label: 'Skirts', image: '/images/categories/cat-6044.jpg', href: '/search/skirt' },
 { label: 'Shorts', image: '/images/lifestyle/lifestyle-3.jpg', href: '/search/shorts-1' },
];

export const metadata = {
 description: 'UMIACTIV — Performance activewear designed for every body.',
 openGraph: { type: 'website' },
};

export default function HomePage() {
 return (
 <>
 <HeroSlideshow />
 <PressBar />
 <ProductGrid />
 <CategoryGrid
 heading="SHOP BY ACTIVITY"
 subheading="From focused practice to city streets — find your flow."
 items={activities}
 />
  <LifestyleGallery />
  <CategoryGrid
 heading="SHOP BY CATEGORY"
 subheading="Where chic aesthetics meet elevated, timeless silhouettes."
 items={categories}
 />
  <FeaturedBanner />
  <Testimonials />
  <Footer />
 </>
 );
}
