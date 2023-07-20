import SortOption from '@/types/SortOption';
import { useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface SelectProps {
  options: SortOption[];
  label: string;
  onChange: (option: SortOption) => void;
  initialValue?: SortOption;
}

function SortSelect({ options, initialValue = undefined, label, onChange }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const selectMenuRef = useRef<HTMLUListElement>(null);

  const toggleMenu = (bool?: boolean) => {
    if (bool === false) setIsOpen(false);
    else if (bool === undefined) setIsOpen((prev) => !prev);
  };

  const handleChange = (option: SortOption) => {
    onChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-max" onMouseLeave={() => toggleMenu(false)}>
      <button
        aria-label={label}
        type="button"
        className="flex cursor-pointer items-center justify-between gap-3 rounded-sm border p-3 text-left"
        onClick={() => toggleMenu()}
      >
        {selectedOption ? selectedOption.label : label}
        <FiChevronDown size={20} />
      </button>
      {isOpen && (
        <ul ref={selectMenuRef} className="absolute w-full rounded-sm border border-t-0 bg-white">
          {options.map(
            (option) =>
              isOpen && (
                <li key={option.id}>
                  <button
                    className={`w-full p-3 text-left hover:bg-primary hover:text-white ${
                      option === selectedOption && 'bg-primary text-white'
                    }`}
                    type="button"
                    onClick={() => handleChange(option)}
                  >
                    {option.label}
                  </button>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
}

export default SortSelect;
