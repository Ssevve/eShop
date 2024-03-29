import { AddToCartButton } from '@/components/common/AddToCartButton';
import { Card } from '@/components/common/Card/Card';
import { PriceGroup } from '@/components/common/PriceGroup';
import { StarRating } from '@/components/common/StarRating';
import { cartsApi } from '@/features/carts';
import { Product } from '@/features/products';
import { productConstraints } from '@/lib/constants';
import theme from '@/lib/theme';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { cartId, cartProduct, isFetching } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      cartId: data?._id || '',
      cartProduct: data?.products.find((cartProduct) => cartProduct.product._id === product._id),
      isFetching,
    }),
  });

  return (
    <Card className="h-full w-full lg:max-w-xs">
      <Link to={`/products/${product._id}`}>
        <img
          className="mx-auto h-80 rounded-sm object-scale-down"
          height={theme.spacing[80]}
          src={product.imageUrl}
          alt={product.name}
        />
        <div className="py-8">
          <h2 className="text-xl font-semibold tracking-tight">{product.name}</h2>

          <div className="mb-4 mt-4 flex items-center">
            <StarRating rating={product.rating} size={16} />
          </div>
          <div>
            <p className="text-sm">Qty: {product.quantity}</p>
            <p className="mt-1 text-xs text-gray-400">{product.brand}</p>
          </div>
        </div>
      </Link>
      <footer className="flex h-20 items-center justify-between gap-2 self-end border-t border-gray-200">
        <PriceGroup price={product.price} discountPrice={product.discountPrice} />
        {cartProduct ? (
          <div className="my-auto flex flex-col text-center sm:flex-row sm:text-lg">
            <span>In cart:</span>
            <span className="font-semibold sm:ml-2">{cartProduct.amount}</span>
          </div>
        ) : (
          <AddToCartButton
            cartId={cartId}
            isFetchingCart={isFetching}
            productId={product._id}
            productName={product.name}
            amount={productConstraints.amount.min}
          />
        )}
      </footer>
    </Card>
  );
}
