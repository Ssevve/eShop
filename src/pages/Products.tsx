import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Filters from 'features/filters/components/Filters';
import ProductList from 'features/products/components/ProductList/ProductList';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, selectProducts } from 'features/products/productsSlice';
import Pagination from 'components/Pagination';
import sortValues from 'features/filters/sortValues';

function Products() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsPerPage] = useState(10);
  const products = useAppSelector(selectProducts);
  const totalProductCount = useAppSelector(state => state.products.totalProductCount);
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    // TODO: validate params, find better way of managing params
    if (!searchParams.get('page')) searchParams.set('page', '1');
    if (!searchParams.get('limit')) searchParams.set('limit', productsPerPage.toString());
    if (!searchParams.get('sort')) searchParams.set('sort', sortValues.nameAscending.sort);
    if (!searchParams.get('order')) searchParams.set('order', sortValues.nameAscending.order);
    if (!searchParams.get('category')) searchParams.delete('category');
    setSearchParams(searchParams);
    dispatch(getProducts(searchParams));
  }, [searchParams]);

  const setCurrentPage = (page: number) => {
    searchParams.set("page", page.toString());
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
