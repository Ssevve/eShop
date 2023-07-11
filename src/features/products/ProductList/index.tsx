import ProductCard from '../ProductCard';
import { Product } from 'features/products/productsSlice';

type ProductListProps = {
  products: Product[];
};

function ProductList({ products }: ProductListProps) {
  return (
    <section className="w-full">
      {products.length ? (
        <ul
          className={`grid gap-3 lg:grid-cols-4 xl:grid-cols-5 ${
            products.length > 1 && 'xs:grid-cols-2'
          }`}
        >
          {products.map((product) => (
            <li key={product._id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </section>
  );
}

export default ProductList;
