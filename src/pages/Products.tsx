import ProductList from 'features/products/components/ProductList/ProductList';
import Pagination from 'components/Pagination/Pagination';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from 'features/products/productsSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

function Products() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );

  const changePage = (page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('page', page.toString());
    setSearchParams(updatedSearchParams);
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
  }, [currentPage]);

  useEffect(() => {
    const requestedPage = Number(searchParams.get('page'));
    if (requestedPage) setCurrentPage(requestedPage);
    else changePage(1);
  }, []);

  return (
    <div>
      Products:
      <ProductList />
      <Pagination
        totalItemCount={totalProductCount}
        onPageClick={changePage}
        currentPage={currentPage}
        pageLimit={3}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;
