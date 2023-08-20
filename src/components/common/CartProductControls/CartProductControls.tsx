import FixedCacheKeys from '@/lib/fixedCacheKeys';
import { AmountInput } from '@/components/common/AmountInput';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import { LoaderButton } from '@/components/common/LoaderButton';
import { useRemoveCartProductMutation, useUpdateCartProductAmountMutation } from '@/features/carts';
import useLoadingStates from '@/hooks/useLoadingStates';
import { productConstraints } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { UpdateAmountTrigger } from './UpdateAmountTrigger';

interface CartProductControlsProps {
  cartId: string;
  productId: string;
  productName: string;
  productAmount: number;
  className?: string;
}

export function CartProductControls({
  cartId,
  productId,
  productName,
  productAmount,
  className,
}: CartProductControlsProps) {
  const [amount, setAmount] = useState(productAmount);
  const [shouldShowRemoveModal, setShouldShowRemoveModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { isLoadingAny, isFetchingCart } = useLoadingStates();
  const [updateAmount, { isError: isErrorUpdate }] = useUpdateCartProductAmountMutation({
    fixedCacheKey: FixedCacheKeys.updateCartProduct,
  });
  const [removeFromCart, { isError: isErrorRemove }] = useRemoveCartProductMutation({
    fixedCacheKey: FixedCacheKeys.removeCartProduct,
  });

  useEffect(() => {
    if (!isFetchingCart || isErrorRemove) setIsRemoving(false);
  }, [isFetchingCart, isErrorRemove]);

  useEffect(() => {
    if (isErrorUpdate) setAmount(productAmount);
  }, [isErrorUpdate]);

  const handleRemove = () => {
    setIsRemoving(true);
    removeFromCart({ cartId, productId, productName });
  };

  const amountChanged = amount !== productAmount;

  return (
    <>
      <div className={twMerge('flex flex-col gap-4 sm:flex-row', className)}>
        <div className="relative">
          {amountChanged && (
            <UpdateAmountTrigger
              disabled={isLoadingAny}
              onClick={() =>
                updateAmount({
                  cartId,
                  productId,
                  productName,
                  amount,
                })
              }
            />
          )}
          <AmountInput
            initialAmount={productAmount}
            minAmount={productConstraints.amount.min}
            maxAmount={productConstraints.amount.max}
            amount={amount}
            setAmount={setAmount}
            shouldReset={isErrorUpdate}
            disabled={isLoadingAny}
          />
        </div>
        <LoaderButton
          variant="neutral"
          textSize="lg"
          onClick={() => setShouldShowRemoveModal(true)}
          title="Remove from cart"
          aria-label="Remove from cart"
          isLoading={isRemoving}
          disabled={isLoadingAny}
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
