import { CartProductControls } from '@/components/common/CartProductControls';
import { PriceGroup } from '@/components/common/PriceGroup';
import theme from '@/lib/theme';
import { Link } from 'react-router-dom';
import { cartsApi } from '../api';

interface CartProductProps {
  productId: string;
}

export function CartProduct({ productId }: CartProductProps) {
  const {
    cartId,
    cartProduct,
    isFetching: isFetchingCart,
  } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      cartId: data?._id || '',
      cartProduct: data?.products.find((cartProduct) => cartProduct.product._id === productId),
      isFetching,
    }),
  });
  const imageHeight = theme.spacing[40];

  return cartProduct ? (
    <div className="grid grid-cols-2 place-items-center gap-4 py-4 sm:grid-cols-3">
      <Link
        className="col-span-2 grid w-full grid-cols-2 place-items-center gap-4 hover:underline sm:col-span-1 sm:justify-items-start"
        to={`/products/${cartProduct.product._id}`}
      >
        <img
          className="col-span-1 mx-auto block h-40 object-scale-down"
          height={imageHeight}
          src={cartProduct.product.imageUrl}
          alt={cartProduct.product.name}
        />
        <span className="col-span-1">{cartProduct.product.name}</span>
      </Link>
      <section className="row-start-2 flex items-end sm:col-start-2 sm:row-start-1">
        <PriceGroup
          price={cartProduct.product.price}
          discountPrice={cartProduct.product.discountPrice}
        />
      </section>
      <section className="sm:justify-self-end">
        <CartProductControls
          cartId={cartId}
          productId={cartProduct.product._id}
          productName={cartProduct.product.name}
          productAmount={cartProduct.amount}
          isFetchingCart={isFetchingCart}
        />
      </section>
    </div>
  ) : null;
}
