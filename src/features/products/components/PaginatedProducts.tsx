import { Pagination } from '@/features/pagination';
import { Product } from '@/features/products';
import { List } from '@/components/common/List';
import { ProductCard } from './ProductCard';
import { twMerge } from 'tailwind-merge';

interface PaginatedProductsProps {
  products: Product[];
  currentPage: number;
  totalResults: number;
  productsPerPage: number;
}

export function PaginatedProducts({
  products,
  currentPage,
  totalResults,
  productsPerPage,
}: PaginatedProductsProps) {
  return (
    <section className="w-full">
      <List
        items={products}
        renderItem={(product) => <ProductCard product={product} />}
        className={twMerge(
          'grid gap-4 lg:grid-cols-4 xl:grid-cols-5',
          products.length > 1 && 'xs:grid-cols-2'
        )}
        emptyItemsMessage="No products found."
        getKey={({ _id }) => _id}
      />
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        itemsPerPage={productsPerPage}
      />
    </section>
  );
}
