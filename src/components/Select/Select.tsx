import { useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

export interface SelectOption<T> {
  id: number;
  label: string;
  value: T;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  initialValue?: SelectOption<T>;
  label: string;
  onChange: (option: SelectOption<T>) => void;
}

export function Select<T>({ options, initialValue, label, onChange }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const selectMenuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = (bool?: boolean) => {
    if (bool === false) setIsOpen(false);
    else if (bool === undefined) setIsOpen((prev) => !prev);
  };

  const handleChange = (option: SelectOption<T>) => {
    onChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const optionsElements = options.map((option) => {
    const isSelected = option === selectedOption;

    return (
      <li key={option.id}>
        <button
          className={twMerge(
            'w-full p-2 text-left hover:bg-gray-300 hover:text-white',
            isSelected && 'bg-primary text-white hover:bg-primary'
          )}
          type="button"
          onClick={() => handleChange(option)}
        >
          {option.label}
        </button>
      </li>
    );
  });

  return (
    <div className="relative w-36" onMouseLeave={() => toggleMenu(false)}>
      <button
        aria-label={label}
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border p-2 text-left"
        onClick={() => toggleMenu()}
      >
        {selectedOption ? selectedOption.label : label}
        <FiChevronDown size={20} />
      </button>
      {isOpen && (
        <ul
          ref={selectMenuRef}
          className="absolute max-h-48 w-full overflow-y-auto rounded-sm border border-t-0 bg-white"
        >
          {optionsElements}
        </ul>
      )}
    </div>
  );
}
