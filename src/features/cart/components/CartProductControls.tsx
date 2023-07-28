import { useAppDispatch } from '@/app/hooks';
import { AmountInput } from '@/components/common/AmountInput';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { removeCartProduct, setCartProductQuantity } from '../cartSlice';

interface CartProductControls {
  compactInput?: boolean;
  productId: string;
  initialAmount: number;
}

export function CartProductControls({
  compactInput,
  productId,
  initialAmount,
}: CartProductControls) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(initialAmount);

  const handleAmountChange = (amount: number) => {
    setAmount(amount);
    dispatch(setCartProductQuantity({ productId, amount }));
  };

  return (
    <div className="col-start-2 flex items-end gap-3 sm:col-start-3 sm:justify-self-end">
      <AmountInput compact={compactInput} count={amount} setCount={handleAmountChange} />
      <Button
        evenPadding
        variant="neutral"
        textSize="lg"
        onClick={() => dispatch(removeCartProduct(productId))}
        aria-label="Remove"
      >
        <FiTrash />
      </Button>
    </div>
  );
}
