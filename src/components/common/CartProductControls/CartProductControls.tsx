import { AmountInput } from '@/components/common/AmountInput';
import {
  useClearCartMutation,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '@/features/carts';
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
  const [isRemoving, setIsRemoving] = useState(false);
  const [updateAmount, { isError: isErrorUpdate, isLoading: isLoadingUpdate, reset: resetUpdate }] =
    useUpdateCartProductAmountMutation({ fixedCacheKey: 'update' });
  const [clearCart, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });
  const [removeFromCart, { isLoading: isLoadingRemove, isError: isErrorRemove }] =
    useRemoveCartProductMutation({
      fixedCacheKey: 'remove',
    });
  const [amount, setAmount] = useState(productAmount);
  const debouncedAmount = useDebounce(amount, 300);

  useEffect(() => {
    setIsRemoving(false);
  }, [isFetchingCart, isErrorRemove]);

  useUpdateEffect(() => {
    if (isErrorUpdate) {
      resetUpdate();
    } else {
      updateAmount({
        cartId,
        productId,
        productName,
        amount: debouncedAmount,
      });
    }
  }, [debouncedAmount]);

  const handleRemove = () => {
    setIsRemoving(true);
    removeFromCart({ cartId, productId, productName });
  };

  useEffect(() => {
    if (isErrorUpdate) setAmount(productAmount);
  }, [isErrorUpdate]);

  const shouldDisableButtons = isLoadingUpdate || isLoadingRemove || isLoadingClear;

  return (
    <div className={twMerge('flex flex-col gap-4 sm:flex-row', className)}>
      <AmountInput amount={amount} setAmount={setAmount} disabled={shouldDisableButtons} />
      <LoaderButton
        variant="neutral"
        textSize="lg"
        onClick={handleRemove}
        title="Remove from cart"
        aria-label="Remove from cart"
        isLoading={isRemoving}
        disabled={shouldDisableButtons}
        className="w-full p-2 sm:w-16"
      >
        <FiTrash size={20} />
      </LoaderButton>
    </div>
  );
}
