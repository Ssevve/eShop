import { productConstraints } from '@/lib/constants';
import { FiMinus, FiPlus } from 'react-icons/fi';

interface AmountInputProps {
  count: number;
  setCount: (amount: number) => void;
  minCount?: number;
  maxCount?: number;
  compact?: boolean;
}

export function AmountInput({
  count,
  setCount,
  minCount = productConstraints.amount.min,
  maxCount = productConstraints.amount.max,
  compact = false,
}: AmountInputProps) {
  const isMinimumQuantity = count <= minCount;
  const isMaximumQuantity = count >= maxCount;

  const handleDecrement = () => {
    const newCount = count - 1;
    if (newCount >= minCount) setCount(newCount);
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    if (newCount <= maxCount) setCount(newCount);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newCount = e.currentTarget.valueAsNumber;
    if (newCount > maxCount) setCount(maxCount);
    else if (newCount < minCount) setCount(minCount);
    else setCount(newCount);
  };

  const handleBlur = () => {
    if (!count) setCount(productConstraints.amount.min);
  };

  return (
    <div className="flex h-full w-min border py-2">
      {!compact && (
        <button
          aria-label="Decrease amount"
          className={`items-center border-r px-2 ${isMinimumQuantity && 'text-gray-400'}`}
          type="button"
          onClick={handleDecrement}
          disabled={isMinimumQuantity}
        >
          <FiMinus />
        </button>
      )}
      <input
        className="w-10 text-center"
        type="number"
        value={count}
        onChange={handleChange}
        onBlur={handleBlur}
        min={minCount}
        max={maxCount}
      />
      {!compact && (
        <button
          aria-label="Increase amount"
          className={`items-center border-l px-2 ${isMaximumQuantity && 'text-gray-400'}`}
          type="button"
          onClick={handleIncrement}
          disabled={isMaximumQuantity}
        >
          <FiPlus />
        </button>
      )}
    </div>
  );
}
