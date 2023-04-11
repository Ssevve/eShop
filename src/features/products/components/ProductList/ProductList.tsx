import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, selectProducts } from 'features/products/productsSlice';

import {
  selectCurrentPage,
  selectProductsPerPage,
} from 'features/pagination/paginationSlice';
import ProductCard from '../ProductCard/ProductCard';

function ProductList() {
  const productsPerPage = useAppSelector(selectProductsPerPage);
  const products = Object.values(useAppSelector(selectProducts));
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    if (currentPage) {
      dispatch(getProducts({ page: currentPage, limit: productsPerPage }));
    }
  }, [currentPage]);

  return (
    <ul className="flex flex-wrap">
      {products.map((product) => (
        <li key={product?.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
