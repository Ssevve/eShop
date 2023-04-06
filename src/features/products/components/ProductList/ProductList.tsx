import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

import ProductCard from '../ProductCard/ProductCard';

function ProductList() {
  const products = useAppSelector(
    (state: RootState) => state.products.products
  );
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
