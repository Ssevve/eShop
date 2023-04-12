import { useAppSelector } from 'app/hooks';
import { selectProducts } from 'features/products/productsSlice';
import ProductCard from '../ProductCard/ProductCard';

function ProductList() {
  const products = Object.values(useAppSelector(selectProducts));

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
