import { AmountInput } from '@/components/common/AmountInput';
import { CartProduct, useUpdateCartProductAmountMutation } from '@/features/carts';
import { useEffect, useState } from 'react';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';

interface UpdateAmountControlsProps {
  cartId: string;
  cartProduct: CartProduct;
  isFetchingCart: boolean;
}

export function UpdateAmountControls({
  cartId,
  cartProduct,
  isFetchingCart,
}: UpdateAmountControlsProps) {
  const [updateAmount, { isLoading, isError, reset }] = useUpdateCartProductAmountMutation();
  const [amount, setAmount] = useState(cartProduct.amount);
  const debouncedAmount = useDebounce(amount, 300);

  const isProcessing = isFetchingCart || isLoading;

  useUpdateEffect(() => {
    if (!isError) {
      updateAmount({
        cartId,
        productId: cartProduct.product._id,
        productName: cartProduct.product.name,
        amount: debouncedAmount,
      });
    }
    reset();
  }, [debouncedAmount]);

  useEffect(() => {
    if (isError) setAmount(cartProduct.amount);
  }, [isError]);

  return (
    <>
      <AmountInput amount={amount} setAmount={setAmount} disabled={isProcessing} />
      <span className="my-auto text-lg">in cart</span>
    </>
  );
}
