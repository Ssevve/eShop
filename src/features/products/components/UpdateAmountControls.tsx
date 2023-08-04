import { AmountInput } from '@/components/common/AmountInput';
import { CartProduct, useUpdateCartProductAmountMutation } from '@/features/carts';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';
import { useState } from 'react';

interface UpdateAmountControlsProps {
  cartId: string;
  cartProduct: CartProduct;
  isProcessing: boolean;
}

export function UpdateAmountControls({
  cartId,
  cartProduct,
  isProcessing,
}: UpdateAmountControlsProps) {
  const [amount, setAmount] = useState(cartProduct.amount);
  const debouncedAmount = useDebounce(amount, 300);
  const [updateAmount] = useUpdateCartProductAmountMutation();

  useUpdateEffect(() => {
    updateAmount({
      cartId,
      productId: cartProduct.product._id,
      productName: cartProduct.product.name,
      amount: debouncedAmount,
    });
  }, [debouncedAmount]);

  return (
    <>
      <AmountInput count={amount} setCount={setAmount} disabled={isProcessing} />
      <span className="text-lg">in cart</span>
    </>
  );
}
