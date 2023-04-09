import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getProducts, selectEntities } from 'features/products/productsSlice';

import { selectCurrentPage } from 'features/pagination/paginationSlice';
import ProductCard from '../ProductCard/ProductCard';

function ProductList() {
  const products = Object.values(useAppSelector(selectEntities));
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    if (currentPage) {
      dispatch(getProducts(currentPage));
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
