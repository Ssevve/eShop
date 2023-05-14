import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  getProducts,
  selectProducts,
  selectProductsPerPage,
} from 'features/products/productsSlice';
import ProductList from 'pages/Products/components/ProductList';
import Category from 'types/Category';
import SortOrder from 'types/SortOrder';
import Pagination from 'pages/Products/components/Pagination';
import Filters from './components/Filters';

function Products() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
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
        limit: productsPerPage,
        sortOrder: searchParams.get('order') as SortOrder,
      })
    );
  }, [searchParams]);

  const setCurrentPage = (page: number) => {
    if (page === 1) searchParams.delete('page');
    else searchParams.set('page', page.toString());
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
