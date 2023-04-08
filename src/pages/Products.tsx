import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, setCurrentPage } from 'features/products/productsSlice';

import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'components/common/Pagination/Pagination';

function Products() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page'));
  const totalPageCount = useAppSelector(
    (state) => state.products.totalPageCount
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);

  useEffect(() => {
    if (currentPage) {
      dispatch(getProducts(currentPage));
    }
  }, [currentPage]);

  return (
    <div>
      <p>Pages: {totalPageCount}</p>
      Products:
      <ProductList />
      <Pagination pageCount={totalPageCount} onClickAction={setCurrentPage} />
    </div>
  );
}

export default Products;
