import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import CategoryLink from '../CategoryLink';
import categories from 'lib/categories';

interface DesktopMenuProps {
  shouldShowCategories: boolean;
  toggleCategories: (bool?: boolean) => void;
}

function DesktopMenu({ shouldShowCategories, toggleCategories }: DesktopMenuProps) {
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
            <ul className="grid grid-cols-2 gap-3 rounded-sm bg-white p-6">
              <li className="hover:underline">
                <CategoryLink
                  onClick={() => toggleCategories(false)}
                  category={null}
                  label="All products"
                />
              </li>
              {categories.map((category) => (
                <li className="hover:underline" key={category}>
                  <CategoryLink
                    onClick={() => toggleCategories(false)}
                    category={category}
                    label={category}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DesktopMenu;
