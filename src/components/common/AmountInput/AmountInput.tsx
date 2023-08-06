import { productConstraints } from '@/lib/constants';
import { useEffect, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface AmountInputProps {
  initialAmount: number;
  minCount: number;
  maxCount: number;
  isError?: boolean;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  shouldReset?: boolean;
  disabled?: boolean;
}

export function AmountInput({
  initialAmount,
  minCount,
  maxCount,
  amount,
  setAmount,
  shouldReset,
  disabled,
}: AmountInputProps) {
  const [count, setCount] = useState(initialAmount);

  const setCountAndAmount = (count: number) => {
    setCount(count);
    setAmount(count);
  };

  useEffect(() => {
    if (shouldReset) setCountAndAmount(initialAmount);
  }, [shouldReset]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = e.target.valueAsNumber;
    if (newCount < productConstraints.amount.min) {
      setCount(productConstraints.amount.min);
    } else if (newCount > productConstraints.amount.max) {
      setCount(productConstraints.amount.max);
    } else {
      setCount(newCount);
    }
  };

  const isMinimumAmount = amount <= minCount;
  const isMaximumAmount = amount >= maxCount;

  return (
    <div className="flex h-full w-min border py-2">
      <button
        aria-label="Decrease amount"
        title="Decrease amount"
        className="mx-auto items-center border-r px-2 disabled:text-gray-400"
        type="button"
        onClick={() => setCountAndAmount(count - 1)}
        disabled={isMinimumAmount || disabled}
      >
        <FiMinus />
      </button>
      <input
        type="number"
        className="my-auto w-10 text-center"
        value={count.toString()}
        onChange={handleChange}
        onBlur={() => setAmount(count)}
      />
      <button
        aria-label="Increase amount"
        title="Increase amount"
        className="mx-auto items-center border-l px-2 disabled:text-gray-400"
        type="button"
        onClick={() => setCountAndAmount(count + 1)}
        disabled={isMaximumAmount || disabled}
      >
        <FiPlus />
      </button>
    </div>
  );
}
