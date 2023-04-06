import { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { getProducts } from 'features/products/productsSlice';

import ProductList from 'features/products/components/ProductList/ProductList';

function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      Products:
      <ProductList />
    </div>
  );
}

export default Products;
