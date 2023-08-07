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
    cartId,
    products,
    totalProductAmount,
    isLoading: isLoadingCart,
    isUninitialized: isUninitializedCart,
  } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data, isLoading, isUninitialized }) => ({
      cartId: data?._id || '',
      products: data?.products || [],
      totalProductAmount: data?.totalProductAmount || 0,
      isLoading,
      isUninitialized,
    }),
  });
  const [, { isLoading: isLoadingRemove }] = useRemoveCartProductMutation({
    fixedCacheKey: 'remove',
  });

  const [, { isLoading: isLoadingUpdate }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: 'update',
  });

  const [clearCart, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });

  const isLoadingCartData = isLoadingCart || isUninitializedCart;
  const shouldDisableClearButton =
    isLoadingCartData || isLoadingClear || isLoadingUpdate || isLoadingRemove;

  return (
    <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-8 self-start lg:flex-row">
      <section className="w-full lg:w-3/4">
        <header className="sticky top-16 flex items-center justify-between border-b bg-white py-8">
          <h1 className="text-2xl font-bold">{`Cart (${totalProductAmount})`}</h1>
          <LoaderButton
            variant="neutral"
            isLoading={isLoadingClear}
            disabled={shouldDisableClearButton}
            onClick={() => clearCart({ cartId })}
            loaderHeight={24}
            loaderWidth={40}
            className="w-36"
          >
            Clear cart
          </LoaderButton>
        </header>
        <div className="mt-4">
          {isLoadingCartData ? <Loader /> : <CartProductList products={products} />}
        </div>
      </section>
      <CartSummary />
    </section>
  );
}
