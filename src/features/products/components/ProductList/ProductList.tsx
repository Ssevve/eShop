import Product from 'types/Product';

import ProductCard from '../ProductCard/ProductCard';

interface ProductListProps {
  products: (Product | undefined)[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full">
      <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <li key={product?._id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
