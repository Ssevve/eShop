import cx from 'classnames';
import { Product } from 'types/ProductsState';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isDiscount = product.discountPrice < product.price;

  const convertInrToUsDollars = (price: number): number => {
    return parseFloat((price * 0.012214).toFixed(2));
  };

  const dollarPrice = convertInrToUsDollars(product.price);
  const discountDollarPrice = convertInrToUsDollars(product.discountPrice);

  return (
    <div className="flex w-64 flex-col gap-2 p-3">
      <img src={product.imageUrl} alt={product.productName} />
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <h3>{product.productName}</h3>
          <span className="text-sm">Qty: {product.quantity}</span>
          <span className="text-xs">{product.brand}</span>
        </div>
        <div className="gap-42 flex items-center justify-end gap-2">
          <span
            className={cx(isDiscount ? 'text-lg line-through' : 'text-2xl')}
          >
            ${dollarPrice}
          </span>
          {isDiscount && (
            <span className="text-2xl text-red-500">
              ${discountDollarPrice}
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
