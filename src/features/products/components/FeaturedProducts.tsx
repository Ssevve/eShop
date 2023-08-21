import { List } from '@/components/common/List';
import { useGetProductsQuery } from '../api';
import { FeaturedProductCard } from './FeaturedProductCard';

export function FeaturedProducts() {
  const { data: bestDealsData } = useGetProductsQuery({
    page: 1,
    category: 'Discounts',
    sort: 'discountPrice',
    order: 'asc',
  });

  const { data: topRatedData } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'rating',
    order: 'desc',
  });

  const { data: mostReviewedData } = useGetProductsQuery({
    page: 1,
    category: null,
    sort: 'ratingsCount',
    order: 'desc',
  });
  return (
    <>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Best deals</h2>
        <List
          items={bestDealsData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => <FeaturedProductCard product={product} />}
        />
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Top rated</h2>
        <List
          items={topRatedData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => <FeaturedProductCard product={product} />}
        />
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold tracking-tight">Most reviewed</h2>
        <List
          items={mostReviewedData?.products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => <FeaturedProductCard product={product} />}
        />
      </section>
    </>
  );
}
