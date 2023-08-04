import { AmountInput } from '@/components/common/AmountInput';
import { LoaderButton } from '@/components/common/LoaderButton';
import { cartsApi, useAddCartProductMutation } from '@/features/carts';
import { Product } from '@/features/products';
import { productConstraints } from '@/lib/constants';
import { useState } from 'react';

interface ProductControlsProps {
  product: Product;
}

export function ProductControls({ product }: ProductControlsProps) {
  const [amount, setAmount] = useState(productConstraints.amount.min);
  const [addToCart, { isLoading: isLoadingAddToCart }] = useAddCartProductMutation();
  const {
    cartId,
    cartProduct,
    isFetching: isFetchingCart,
  } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      cartId: data?._id || '',
      cartProduct: data?.products.find((cartProduct) => cartProduct.product._id === product._id),
      isFetching,
    }),
  });

  const isProcessing = isLoadingAddToCart || isFetchingCart;

  return (
    <div className="flex h-12 items-center gap-4">
      {cartProduct ? (
        <>
          <AmountInput count={cartProduct.amount} setCount={() => {}} />
          <span className="text-lg">in cart</span>
        </>
      ) : (
        <>
          <AmountInput count={amount} setCount={setAmount} />
          <LoaderButton
            aria-label="Add to cart"
            textSize="lg"
            onClick={() => addToCart({ cartId, product, amount })}
            disabled={isProcessing}
            isLoading={isProcessing}
            loaderHeight={28}
            loaderWidth={40}
            className="h-full w-40"
          >
            Add to cart
          </LoaderButton>
        </>
      )}
    </div>
  );
}
