import Pagination from '@/components/common/Pagination';
import { Product } from '@/features/products';
import ProductList from '../ProductList';

interface PaginatedProductsProps {
  products: Product[];
  currentPage: number;
  totalResults: number;
  productsPerPage: number;
}

function PaginatedProducts({
  products,
  currentPage,
  totalResults,
  productsPerPage,
}: PaginatedProductsProps) {
  return (
    <>
      <ProductList products={products} />
      <Pagination
        currentPage={currentPage}
        totalResults={totalResults}
        itemsPerPage={productsPerPage}
      />
    </>
  );
}

export default PaginatedProducts;
