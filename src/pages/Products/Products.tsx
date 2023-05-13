import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getProducts,
  selectProducts,
  selectProductsPerPage,
} from 'features/products/productsSlice';
import Pagination from 'components/Pagination';
import Filters from 'features/filters/components/Filters';
import ProductList from 'features/products/components/ProductList/ProductList';
import Category from 'types/Category';
import useValidatedSearchParams from './useValidatedSearchParams';

function Products() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useValidatedSearchParams();
  const products = useAppSelector(selectProducts);
  const productsPerPage = useAppSelector(selectProductsPerPage);
  const totalProductCount = useAppSelector(
    (state) => state.products.totalProductCount
  );
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(
      getProducts({
        page: currentPage,
        category: searchParams.get('category') as Category,
        sort: searchParams.get('sort') || 'name',
        order: searchParams.get('order') || 'asc',
        limit: productsPerPage,
      })
    );
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
        itemsPerPage={productsPerPage}
      />
    </div>
  );
}

export default Products;
