import { AmountInput } from '@/components/common/AmountInput';
import { Button } from '@/components/common/Button';
import { useState } from 'react';
import { FiTrash } from 'react-icons/fi';

interface CartProductControls {
  verticalInput?: boolean;
  productId: string;
  initialAmount: number;
}

export function CartProductControls({
  verticalInput,
  productId,
  initialAmount,
}: CartProductControls) {
  const [amount, setAmount] = useState(initialAmount);

  return (
    <div className="col-start-2 flex items-end gap-3 sm:col-start-3 sm:justify-self-end">
      <AmountInput vertical={verticalInput} amount={amount} setAmount={() => setAmount(amount)} />
      <Button evenPadding variant="neutral" textSize="lg" onClick={() => {}} aria-label="Remove">
        <FiTrash />
      </Button>
    </div>
  );
}
