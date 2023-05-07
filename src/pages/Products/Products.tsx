import { useEffect } from 'react';

import Filters from 'features/filters/components/Filters';
import ProductList from 'features/products/components/ProductList/ProductList';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, selectProducts } from 'features/products/productsSlice';
import Pagination from 'components/Pagination';
import useValidatedSearchParams from './useValidatedSearchParams';

const PRODUCTS_PER_PAGE = 10;

function Products() {
  const dispatch = useAppDispatch();
  const { searchParams, setSearchParams } =
    useValidatedSearchParams(PRODUCTS_PER_PAGE);
  const products = useAppSelector(selectProducts);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );
  const currentPage = Number(searchParams.get('page'));

  useEffect(() => {
    dispatch(getProducts({ searchParams, limit: PRODUCTS_PER_PAGE }));
  }, [searchParams]);

  const setCurrentPage = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col gap-4">
      <Filters />
      <ProductList products={products} />
      <Pagination
        totalItemCount={totalProductCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        siblingDelta={1}
        itemsPerPage={PRODUCTS_PER_PAGE}
      />
    </div>
  );
}

export default Products;
