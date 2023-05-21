import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

function Counter() {
  const [count, setCount] = useState(1);

  const handleDecrement = () => {
    setCount((prev) => {
      const newCount = prev - 1;
      return newCount >= 0 ? newCount : 0;
    });
  };
  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newCount = Number(e.currentTarget.value);
    if (newCount < 99) {
      setCount(newCount);
    } else {
      setCount(99);
    }
  };

  return (
    <div className="flex w-min border p-1">
      <button
        className="items-center border-r pr-1"
        type="button"
        onClick={handleDecrement}
      >
        <FiMinus />
      </button>
      <input
        className="min-w-0 text-center"
        type="number"
        value={count}
        onChange={handleChange}
        min="1"
        max="99"
      />
      <button
        className="items-center border-l pl-1"
        type="button"
        onClick={handleIncrement}
      >
        <FiPlus />
      </button>
    </div>
  );
}

export default Counter;
