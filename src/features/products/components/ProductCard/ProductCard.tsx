import cx from 'classnames';
import { Product } from 'types/ProductsState';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isDiscount = product.discountPrice < product.price;

  return (
    <div className="border">
      <img src={product.imageUrl} alt={product.productName} />
      <h3>{product.productName}</h3>
      <span>{product.brand}</span>
      <span>In stock: {product.quantity}</span>
      <div>
        <span className={cx(isDiscount ? 'text-md line-through' : 'text-xl')}>
          {product.price}
        </span>
        {isDiscount && (
          <span className="text-xl text-red-500">{product.discountPrice}</span>
        )}
      </div>
      <button
        className="rounded-sm bg-green-600 p-2 font-bold text-white hover:bg-green-500"
        type="button"
      >
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
