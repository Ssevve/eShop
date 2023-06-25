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
    <div className="w-full max-w-xs rounded-sm border border-gray-200 bg-white shadow">
      <Link to={`/products/${product._id}`}>
        <img className="rounded-sm pt-6" src={product.imageUrl} alt={product.name} />
        <div className="px-6 pb-6">
          <a href="#">
            <h2 className="mt-3 text-xl font-semibold tracking-tight">{product.name}</h2>
          </a>
          <div className="mb-6 mt-3 flex items-center">
            <StarRating rating={product.rating} size={16} />
          </div>
          <div>
            <p className="text-sm">Qty: {product.quantity}</p>
            <p className="mt-1 text-xs text-gray-400">{product.brand}</p>
          </div>
        </div>
      </Link>
      <footer className="mx-3 flex justify-between gap-2 border-t border-gray-200 py-3">
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
        <Button ariaLabel="Add to cart" textSize="lg" onClick={handleAddToCartClick}>
          <FiShoppingCart />
        </Button>
      </footer>
    </div>
  );
}

export default ProductCard;
