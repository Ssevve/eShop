import cx from 'classnames';
import { Product } from 'types/ProductsState';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isDiscount = product.discountPrice < product.price;

  const formatPriceString = (price: number) => `$${price.toFixed(2)}`;

  return (
    <div className="flex w-64 flex-col gap-2 p-3">
      <img src={product.imageUrl} alt={product.productName} />
      <h3 className="font-semibold">{product.productName}</h3>
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm">Qty: {product.quantity}</span>
          <span className="text-xs">{product.brand}</span>
        </div>
        <div className="gap-42 flex items-center justify-end gap-2">
          <span
            className={cx(isDiscount ? 'text-lg line-through' : 'text-2xl')}
          >
            {formatPriceString(product.price)}
          </span>
          {isDiscount && (
            <span className="text-2xl text-red-500">
              {formatPriceString(product.discountPrice)}
            </span>
          )}
        </div>
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
