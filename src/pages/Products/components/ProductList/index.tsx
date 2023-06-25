import cx from 'classnames';
import Product from 'types/Product';
import ProductCard from '../ProductCard';

interface ProductListProps {
  products: Product[] | undefined;
}

function ProductList({ products }: ProductListProps) {
  if (!products || products.length === 0) return <p>No products found.</p>;

  return (
    <div className="w-full">
      <ul
        className={cx(
          'grid gap-6 lg:grid-cols-4 xl:grid-cols-5',
          products.length > 1 && 'sm:grid-cols-2'
        )}
      >
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;

//         className={cx(
//'grid auto-rows-fr gap-6 lg:grid-cols-4 xl:grid-cols-5',
//products.length > 1 && 'sm:grid-cols-2'
//)}
