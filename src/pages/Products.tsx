import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Filters from 'features/filters/components/Filters';
import ProductList from 'features/products/components/ProductList/ProductList';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, selectProducts } from 'features/products/productsSlice';
import Pagination from 'components/Pagination';

function Products() {
  const dispatch = useAppDispatch();
  const [productsPerPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppSelector(selectProducts);
  const totalProductCount = useAppSelector(state => state.products.totalProductCount);
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentCategory = searchParams.get('category') || null;

  useEffect(() => {
    dispatch(getProducts({page: currentPage, limit: productsPerPage}));
  }, [currentPage, productsPerPage, currentCategory]);

  const setCurrentPage = (page: number) => setSearchParams((prev) => ({...prev, page}));

  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ProductList products={products} />
      <Pagination
        totalItemCount={totalProductCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;
