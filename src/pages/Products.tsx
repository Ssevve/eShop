import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts } from 'features/products/productsSlice';

import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'components/common/Pagination/Pagination';

function Products() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [currentPage]);

  const totalPageCount = totalProductCount
    ? Math.ceil(totalProductCount / productsPerPage)
    : 0;

  return (
    <div>
      <p>Pages: {totalPageCount}</p>
      Products:
      <ProductList />
      <Pagination pageCount={totalPageCount} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default Products;
