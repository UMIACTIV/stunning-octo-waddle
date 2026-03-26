import { getCollectionProducts } from 'lib/shopify';
import { ProductGridClient } from './product-grid';

export async function ProductGrid() {
  const [newResult, bestResult] = await Promise.all([
    getCollectionProducts({ collection: 'new-arrival', sortKey: 'CREATED_AT', reverse: true }),
    getCollectionProducts({ collection: 'bestsellers', sortKey: 'BEST_SELLING' }),
  ]);

  return (
    <ProductGridClient
      newRelease={newResult.products.slice(0, 8)}
      bestSellers={bestResult.products.slice(0, 8)}
    />
  );
}
