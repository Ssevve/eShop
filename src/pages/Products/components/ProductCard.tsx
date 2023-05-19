import { FiShoppingCart } from 'react-icons/fi';
import Product from 'types/Product';
import PriceGroup from 'components/common/PriceGroup';

interface ProductCardProps {
  product: Product | undefined;
}

function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  return (
    <a
      href={`/products/${product._id}`}
      className="relative flex flex-col bg-off-white shadow-md hover:shadow-lg"
    >
      <img src={product.imageUrl} alt={product.name} />
      <section className="p-4">
        <span className="text-xs font-bold uppercase text-gray-400">
          {product.category}
        </span>
        <h2 className="my-4 uppercase">{product.name}</h2>
        <div className="flex justify-between">
          <section className="flex flex-col gap-1">
            <span className="text-sm">Qty: {product.quantity}</span>
            <span className="text-xs text-gray-400">{product.brand}</span>
          </section>
        </div>
      </section>
      <footer className="mx-4 flex justify-between border-t border-gray-200 py-4">
        <PriceGroup
          price={product.price}
          discountPrice={product.discountPrice}
        />
        <button
          type="button"
          className="flex items-center justify-center rounded-sm bg-primary-green px-6 py-2 text-xl text-off-white hover:bg-green-700"
        >
          <FiShoppingCart />
        </button>
      </footer>
    </a>
  );
}

export default ProductCard;
