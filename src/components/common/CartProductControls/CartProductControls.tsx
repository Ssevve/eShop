import { AmountInput } from '@/components/common/AmountInput';
import { Button } from '@/components/common/Button';
import { useUpdateCartProductAmountMutation } from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { useDebounce, useUpdateEffect } from 'usehooks-ts';

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
  const [updateAmount, { isError, reset }] = useUpdateCartProductAmountMutation();
  const [amount, setAmount] = useState(productAmount);
  const debouncedAmount = useDebounce(amount, 300);

  useEffect(() => {
    setShouldBeDisabled(false);
  }, [isFetchingCart, isError]);

  useUpdateEffect(() => {
    if (isError) {
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

  useEffect(() => {
    if (isError) setAmount(productAmount);
  }, [isError]);

  return (
    <div className={twMerge('flex flex-col gap-4 sm:flex-row', className)}>
      <AmountInput amount={amount} setAmount={setAmount} disabled={shouldBeDisabled} />
      <Button
        evenPadding
        variant="neutral"
        textSize="lg"
        fullWidth
        onClick={() => {}}
        aria-label="Remove from cart"
      >
        <FiTrash />
      </Button>
    </div>
  );
}
