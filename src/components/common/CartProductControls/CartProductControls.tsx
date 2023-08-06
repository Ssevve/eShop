import { AmountInput } from '@/components/common/AmountInput';
import {
  useClearCartMutation,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { LoaderButton } from '../LoaderButton';
import { productConstraints } from '@/lib/constants';

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
  const [amount, setAmount] = useState(productAmount);
  const [isRemoving, setIsRemoving] = useState(false);
  const [updateAmount, { isError: isErrorUpdate, isLoading: isLoadingUpdate }] =
    useUpdateCartProductAmountMutation({ fixedCacheKey: 'update' });
  const [_, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });
  const [removeFromCart, { isLoading: isLoadingRemove, isError: isErrorRemove }] =
    useRemoveCartProductMutation({
      fixedCacheKey: 'remove',
    });

  useEffect(() => {
    setIsRemoving(false);
  }, [isFetchingCart, isErrorRemove]);

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
      <div className="relative">
        {amount !== productAmount && (
          <button
            disabled={shouldDisableButtons}
            onClick={() =>
              updateAmount({
                cartId,
                productId,
                productName,
                amount,
              })
            }
            className="absolute bottom-full mb-1 w-full text-center text-xs uppercase text-primary hover:underline"
          >
            Update
          </button>
        )}
        <AmountInput
          initialAmount={productAmount}
          minCount={productConstraints.amount.min}
          maxCount={productConstraints.amount.max}
          amount={amount}
          setAmount={setAmount}
          shouldReset={isErrorUpdate}
          disabled={shouldDisableButtons}
        />
      </div>
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
