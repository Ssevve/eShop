import { Button } from '@/components/common/Button';
import { List } from '@/components/common/List';
import { Loader } from '@/components/common/Loader';
import { LoaderButton } from '@/components/common/LoaderButton';
import { formatPrice } from '@/utils/format';
import { Link } from 'react-router-dom';
import {
  useClearCartMutation,
  useLazyGetCartQuery,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '../api';
import { CartProductEntity } from '../components';

export function CartPage() {
  const [
    fetchCart,
    { data: cart, isLoading: isLoadingCart, isUninitialized: isUninitializedCart },
  ] = useLazyGetCartQuery();
  const [, { isLoading: isLoadingRemove }] = useRemoveCartProductMutation({
    fixedCacheKey: 'remove',
  });

  const [, { isLoading: isLoadingUpdate }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: 'update',
  });

  const [clearCart, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });

  if (isUninitializedCart) fetchCart();

  const isLoadingCartData = isLoadingCart || isUninitializedCart;
  const shouldDisableClearButton =
    isLoadingCartData || isLoadingClear || isLoadingUpdate || isLoadingRemove;

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-8 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="sticky top-16 flex items-center justify-between border-b bg-white py-8">
          <h1 className="text-2xl font-bold">{`Cart (${cart?.totalProductAmount || 0})`}</h1>
          <LoaderButton
            variant="neutral"
            isLoading={isLoadingClear}
            disabled={shouldDisableClearButton}
            onClick={() => clearCart({ cartId: cart?._id || '' })}
            loaderHeight={24}
            loaderWidth={40}
            className="w-36"
          >
            Clear cart
          </LoaderButton>
        </header>
        <div className="mt-4">
          {isLoadingCartData ? (
            <Loader />
          ) : (
            <List
              items={cart?.products}
              getKey={({ product }) => product._id}
              renderItem={({ product, amount }) => (
                <CartProductEntity
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  imageUrl={product.imageUrl}
                  amount={amount}
                  cartId={cart?._id || ''}
                  isFetchingCart={isLoadingCart}
                />
              )}
              className="divide-y"
              emptyItemsMessage="Your cart is empty!"
              emptyItemsMessageClass="w-full py-12 text-center text-5xl font-bold text-gray-200 md:text-6xl"
            />
          )}
        </div>
      </section>
      <section className="sticky bottom-0 left-0 mb-8 h-max w-full justify-self-start border bg-white p-4 lg:right-0 lg:top-24 lg:w-1/4">
        <div>
          <div className="flex justify-between">
            <span>Original price:</span>
            <span>
              {cart?.originalPrice !== undefined ? formatPrice(cart?.originalPrice) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between text-danger">
            <span>Saved:</span>
            <span>
              {cart?.totalDiscount !== undefined ? formatPrice(cart?.totalDiscount) : 'N/A'}
            </span>
          </div>
        </div>
        <div className="my-4 flex justify-between text-lg font-semibold">
          <span>Final price:</span>
          <span>{cart?.finalPrice !== undefined ? formatPrice(cart?.finalPrice) : 'N/A'}</span>
        </div>
        <Button renderAs={Link} to="/checkout" fullWidth>
          Checkout
        </Button>
      </section>
    </section>
  );
}
