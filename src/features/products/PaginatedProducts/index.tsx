import { Product } from '../productsSlice';
import ProductList from '../ProductList';
import Pagination from 'components/common/Pagination';

type PaginatedProductsProps = {
  products: Product[];
  currentPage: number;
  totalResults: number;
  productsPerPage: number;
};

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
        productsPerPage={productsPerPage}
      />
    </>
  );
}

export default PaginatedProducts;
