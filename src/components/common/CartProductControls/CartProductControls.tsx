import { AmountInput } from '@/components/common/AmountInput';
import { useRemoveCartProductMutation, useUpdateCartProductAmountMutation } from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';
import { LoaderButton } from '../LoaderButton';

interface CartProductControlsProps {
  cartId: string;
  productId: string;
  productName: string;
  productAmount: number;
  isFetchingCart: boolean;
  className?: string;
}

export function CartProductControls({
  cartId,
  productId,
  productName,
  productAmount,
  isFetchingCart,
  className,
}: CartProductControlsProps) {
  const [shouldBeDisabled, setShouldBeDisabled] = useState(false);
  const [updateAmount, { isError: isErrorUpdate, reset }] = useUpdateCartProductAmountMutation();
  const [removeFromCart, { isError: isErrorRemove }] = useRemoveCartProductMutation();
  const [amount, setAmount] = useState(productAmount);
  const debouncedAmount = useDebounce(amount, 300);

  useEffect(() => {
    setShouldBeDisabled(false);
  }, [isFetchingCart, isErrorUpdate, isErrorRemove]);

  useUpdateEffect(() => {
    if (isErrorUpdate) {
      reset();
    } else {
      setShouldBeDisabled(true);
      updateAmount({
        cartId,
        productId,
        productName,
        amount: debouncedAmount,
      });
    }
  }, [debouncedAmount]);

  const handleRemoveFromCart = () => {
    setShouldBeDisabled(true);
    removeFromCart({ cartId, productId, productName });
  };

  useEffect(() => {
    if (isErrorUpdate) setAmount(productAmount);
  }, [isErrorUpdate]);

  return (
    <div className={twMerge('flex flex-col gap-4 sm:flex-row', className)}>
      <AmountInput amount={amount} setAmount={setAmount} disabled={shouldBeDisabled} />
      <LoaderButton
        variant="neutral"
        textSize="lg"
        onClick={handleRemoveFromCart}
        aria-label="Remove from cart"
        isLoading={shouldBeDisabled}
        className="w-16 p-2"
      >
        <FiTrash size={20} />
      </LoaderButton>
    </div>
  );
}
