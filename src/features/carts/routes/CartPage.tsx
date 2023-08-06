import { Loader } from '@/components/common/Loader';
import { LoaderButton } from '@/components/common/LoaderButton';
import { CartProductList, CartSummary } from '@/features/carts';
import {
  cartsApi,
  useClearCartMutation,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '../api';

export function CartPage() {
  const {
    data: cart,
    isLoading: isLoadingCart,
    isUninitialized: isUninitializedCart,
  } = cartsApi.endpoints.getCart.useQueryState();
  const [removeFromCart, { isLoading: isLoadingRemove }] = useRemoveCartProductMutation({
    fixedCacheKey: 'remove',
  });
  const [updateAmount, { isLoading: isLoadingUpdate }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: 'update',
  });
  const [clearCart, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });

  const isLoadingCartData = isLoadingCart || isUninitializedCart;
  const shouldDisableClearButton =
    isLoadingCartData || isLoadingClear || isLoadingUpdate || isLoadingRemove;

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-4 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="flex items-center justify-between border-b pb-6 pt-3">
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
          {isLoadingCartData ? <Loader /> : <CartProductList products={cart?.products} />}
        </div>
      </section>
      <CartSummary />
    </section>
  );
}
