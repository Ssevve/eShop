import { Button } from '@/components/common/Button';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { List } from '@/components/common/List';
import { Loader } from '@/components/common/Loader';
import { LoaderButton } from '@/components/common/LoaderButton';
import { useCreateCheckoutSessionMutation } from '@/features/checkout/api';
import { formatPrice } from '@/utils/format';
import { useState } from 'react';
import {
  useClearCartMutation,
  useGetCartQuery,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '../api';
import { CartProductEntity } from '../components';

export function CartPage() {
  const [shouldShowClearCartModal, setShouldShowClearCartModal] = useState(false);
  const { data: cart, isLoading: isLoadingCart } = useGetCartQuery();
  const [, { isLoading: isLoadingRemove }] = useRemoveCartProductMutation({
    fixedCacheKey: 'remove',
  });

  const [, { isLoading: isLoadingUpdate }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: 'update',
  });

  const [clearCart, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const shouldDisableClearButton =
    isLoadingCart || isLoadingClear || isLoadingUpdate || isLoadingRemove;

  const checkout = async () => {
    const createSessionResult = await createCheckoutSession(cart?._id || '');
    if ('data' in createSessionResult) {
      const redirectUrl = createSessionResult.data.url;
      if (redirectUrl) window.location.replace(redirectUrl);
    }
  };

  return (
    <>
      <section className="mx-auto mb-auto flex w-full flex-col justify-center gap-8 self-start lg:flex-row">
        <section className="w-full lg:w-3/4">
          <header className="sticky top-16 flex items-center justify-between border-b bg-white py-8">
            <h1 className="text-2xl font-bold">{`Cart (${cart?.totalProductAmount || 0})`}</h1>
            <LoaderButton
              variant="neutral"
              isLoading={isLoadingClear}
              disabled={shouldDisableClearButton}
              onClick={() => setShouldShowClearCartModal(true)}
              loaderHeight={24}
              loaderWidth={40}
              className="w-36"
            >
              Clear cart
            </LoaderButton>
          </header>
          <div className="mt-4">
            {isLoadingCart ? (
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
          <Button onClick={checkout} fullWidth>
            Checkout
          </Button>
        </section>
      </section>
      {shouldShowClearCartModal && (
        <ConfirmationModal
          confirmVariant="danger"
          confirmText="Clear cart"
          confirmCallback={() => clearCart({ cartId: cart?._id || '' })}
          close={() => setShouldShowClearCartModal(false)}
          message="Are you sure you want to clear the cart?"
        />
      )}
    </>
  );
}
