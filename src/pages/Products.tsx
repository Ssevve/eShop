import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts } from 'features/products/productsSlice';

import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'features/pagination/Pagination';
import { selectCurrentPage } from 'features/pagination/paginationSlice';

function Products() {
  const [productsPerPage] = useState(10);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );

  const totalPageCount = totalProductCount
    ? Math.ceil(totalProductCount / productsPerPage)
    : 0;

  return (
    <div>
      <p>Pages: {totalPageCount}</p>
      Products:
      <ProductList />
      <Pagination totalPageCount={totalPageCount} />
    </div>
  );
}

export default Products;
