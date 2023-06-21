import { useAppDispatch } from 'app/hooks';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { addCartProduct } from 'features/cart/cartSlice';
import { MIN_PRODUCT_QUANTITY } from 'lib/constants';
import Product from 'types/Product';
import PriceGroup from 'components/common/PriceGroup';
import Button from 'components/common/Button';
import StarRating from 'components/common/StarRating';

interface ProductCardProps {
  product: Product | undefined;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  if (!product) return null;

  const handleAddToCartClick = () =>
    dispatch(addCartProduct({ quantity: MIN_PRODUCT_QUANTITY, product }));

  return (
    <div className="relative flex max-w-xs flex-col bg-off-white shadow-md hover:shadow-lg">
      <Link to={`/products/${product._id}`}>
        <img src={product.imageUrl} alt={product.name} />
        <section className="p-4">
          <span className="text-xs font-bold uppercase text-gray-400">{product.category}</span>
          <div className="my-4">
            <h2 className="mb-1 uppercase">{product.name}</h2>
            <StarRating rating={product.rating} size={12} />
          </div>
          <div className="flex justify-between">
            <section className="flex flex-col gap-1">
              <span className="text-sm">Qty: {product.quantity}</span>
              <span className="text-xs text-gray-400">{product.brand}</span>
            </section>
          </div>
        </section>
      </Link>
      <footer className="mx-4 flex justify-between border-t border-gray-200 py-4">
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
        <Button ariaLabel="Add to cart" textSize="lg" onClick={handleAddToCartClick}>
          <FiShoppingCart />
        </Button>
      </footer>
    </div>
  );
}

export default ProductCard;
