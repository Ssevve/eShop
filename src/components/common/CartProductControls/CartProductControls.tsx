import { AmountInput } from '@/components/common/AmountInput';
import {
  useClearCartMutation,
  useRemoveCartProductMutation,
  useUpdateCartProductAmountMutation,
} from '@/features/carts';
import { productConstraints } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal';
import { LoaderButton } from '../LoaderButton';
import { UpdateAmountTrigger } from './UpdateAmountTrigger';

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
  const [shouldShowRemoveModal, setShouldShowRemoveModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [updateAmount, { isError: isErrorUpdate, isLoading: isLoadingUpdate }] =
    useUpdateCartProductAmountMutation({ fixedCacheKey: 'update' });
  const [, { isLoading: isLoadingClear }] = useClearCartMutation({
    fixedCacheKey: 'clear',
  });
  const [removeFromCart, { isLoading: isLoadingRemove, isError: isErrorRemove }] =
    useRemoveCartProductMutation({
      fixedCacheKey: 'remove',
    });

  useEffect(() => {
    if (!isFetchingCart || isErrorRemove) setIsRemoving(false);
  }, [isFetchingCart, isErrorRemove]);

  const handleRemove = () => {
    setIsRemoving(true);
    removeFromCart({ cartId, productId, productName });
  };

  useEffect(() => {
    if (isErrorUpdate) setAmount(productAmount);
  }, [isErrorUpdate]);

  const shouldDisableButtons = isLoadingUpdate || isLoadingRemove || isLoadingClear;
  const hasAmountChanged = amount !== productAmount;

  return (
    <>
      <div className={twMerge('flex flex-col gap-4 sm:flex-row', className)}>
        <div className="relative">
          <UpdateAmountTrigger
            shouldRender={hasAmountChanged}
            disabled={shouldDisableButtons}
            onClick={() =>
              updateAmount({
                cartId,
                productId,
                productName,
                amount,
              })
            }
          />
          <AmountInput
            initialAmount={productAmount}
            minAmount={productConstraints.amount.min}
            maxAmount={productConstraints.amount.max}
            amount={amount}
            setAmount={setAmount}
            shouldReset={isErrorUpdate}
            disabled={shouldDisableButtons}
          />
        </div>
        <LoaderButton
          variant="neutral"
          textSize="lg"
          onClick={() => setShouldShowRemoveModal(true)}
          title="Remove from cart"
          aria-label="Remove from cart"
          isLoading={isRemoving}
          disabled={shouldDisableButtons}
          className="w-full p-2 sm:w-16"
        >
          <FiTrash size={20} />
        </LoaderButton>
      </div>
      {shouldShowRemoveModal && (
        <ConfirmationModal
          close={() => setShouldShowRemoveModal(false)}
          confirmCallback={handleRemove}
          confirmText="Remove"
          confirmVariant="danger"
          message={`Remove ${productName} from the cart?`}
        />
      )}
    </>
  );
}
