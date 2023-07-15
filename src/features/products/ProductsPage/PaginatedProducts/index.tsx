import { Product } from 'app/services/products';
import ProductList from '../ProductList';
import Pagination from 'components/common/Pagination';

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
