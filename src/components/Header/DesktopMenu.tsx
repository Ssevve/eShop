import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { CategoryList } from './CategoryList';

interface DesktopMenuProps {
  shouldShowCategories: boolean;
  toggleCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DesktopMenu({ shouldShowCategories, toggleCategories }: DesktopMenuProps) {
  return (
    <div className="flex h-full gap-6">
      <Link className="flex items-center hover:underline" to="/">
        Home
      </Link>

      <div
        className="flex"
        onMouseEnter={() => toggleCategories(true)}
        onMouseLeave={() => toggleCategories(false)}
      >
        <Link className="flex items-center gap-1.5 hover:underline" to="/products">
          <span>Products</span>
          <FiChevronDown />
        </Link>
        {shouldShowCategories && (
          <div className="absolute left-0 right-0 top-full mx-auto max-w-max pt-0.5">
            <CategoryList toggleClose={() => toggleCategories(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
