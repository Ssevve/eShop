import { productConstraints } from '@/lib/constants';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface AmountInputProps {
  amount: number;
  setAmount: (amount: number) => void;
  minAmount?: number;
  maxAmount?: number;
  vertical?: boolean;
  disabled?: boolean;
}

export function AmountInput({
  amount,
  setAmount,
  minAmount = productConstraints.amount.min,
  maxAmount: maxAmount = productConstraints.amount.max,
  vertical = false,
  disabled,
}: AmountInputProps) {
  const isMinimumQuantity = amount <= minAmount;
  const isMaximumQuantity = amount >= maxAmount;

  const handleDecrement = () => {
    const newAmount = amount - 1;
    if (newAmount <= maxAmount) setAmount(newAmount);
  };

  const handleIncrement = () => {
    const newCount = amount + 1;
    if (newCount <= maxAmount) setAmount(newCount);
  };

  return (
    <div
      className={twMerge(
        'flex h-full w-min border',
        disabled && 'opacity-50',
        vertical ? 'flex-col-reverse' : 'py-2'
      )}
    >
      <button
        aria-label="Decrease amount"
        title="Decrease amount"
        className={twMerge(
          'mx-auto items-center',
          vertical ? 'border-t py-2' : 'border-r px-2',
          isMinimumQuantity && 'text-gray-400'
        )}
        type="button"
        onClick={handleDecrement}
        disabled={isMinimumQuantity || disabled}
      >
        <FiMinus />
      </button>
      <span className={`my-auto w-10 text-center ${vertical ? 'py-2' : 'px-2'}`}>{amount}</span>
      <button
        aria-label="Increase amount"
        title="Increase amount"
        className={twMerge(
          'mx-auto items-center',
          vertical ? 'border-b py-2' : 'border-l px-2',
          isMaximumQuantity && 'text-gray-400'
        )}
        type="button"
        onClick={handleIncrement}
        disabled={isMaximumQuantity || disabled}
      >
        <FiPlus />
      </button>
    </div>
  );
}
