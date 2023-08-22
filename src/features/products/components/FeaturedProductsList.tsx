import { List } from '@/components/common/List';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import { Product } from '../types';
import { FeaturedProductCard } from './FeaturedProductCard';

interface FeaturedProductsListProps {
  title: string;
  products: Product[] | undefined;
  isError: boolean;
}

export function FeaturedProductsList({ title, products, isError }: FeaturedProductsListProps) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {isError ? (
        <div className="flex items-center gap-4 py-4 text-xl text-gray-400">
          <HiOutlineEmojiSad size={50} strokeWidth={1} />
          <p>Product data not available.</p>
        </div>
      ) : (
        <List
          items={products}
          className="flex gap-4 overflow-x-auto py-4"
          renderItem={(product) => <FeaturedProductCard product={product} />}
        />
      )}
    </section>
  );
}
