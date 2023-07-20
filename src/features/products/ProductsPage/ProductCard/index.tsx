import { useAppDispatch } from '@/app/hooks';
import Button from '@/components/common/Button';
import PriceGroup from '@/components/common/PriceGroup';
import StarRating from '@/components/common/StarRating';
import { addCartProduct } from '@/features/cart/cartSlice';
import { Product } from '@/features/products';
import { productConstraints } from '@/lib/constants';
import theme from '@/lib/theme';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCartClick = () =>
    dispatch(addCartProduct({ quantity: productConstraints.quantity.min, product }));

  return (
    <div className="h-full w-full rounded-sm border border-gray-200 bg-white shadow lg:max-w-xs">
      <Link to={`/products/${product._id}`}>
        <img
          className="mx-auto h-80 rounded-sm object-scale-down"
          height={theme.spacing[80]}
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="px-6 pb-6">
          <h2 className="mt-3 text-xl font-semibold tracking-tight">{product.name}</h2>

          <div className="mb-6 mt-3 flex items-center">
            <StarRating rating={product.rating} size={16} />
          </div>
          <div>
            <p className="text-sm">Qty: {product.quantity}</p>
            <p className="mt-1 text-xs text-gray-400">{product.brand}</p>
          </div>
        </div>
      </Link>
      <footer className="mx-3 flex justify-between gap-1 self-end border-t border-gray-200 py-3">
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
        <Button aria-label="Add to cart" textSize="lg" onClick={handleAddToCartClick}>
          <FiShoppingCart />
        </Button>
      </footer>
    </div>
  );
}

export default ProductCard;
