import Product from 'types/Product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[] | undefined;
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full">
      <ul className="grid auto-rows-auto grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {products?.map((product) => (
          <li key={product?._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
