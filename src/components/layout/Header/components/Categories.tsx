import cx from 'classnames';
import { FiMenu } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import { useState } from 'react';

import CategoryLink from './CategoryLink';

function Categories() {
  const categories = useAppSelector((state) => state.filters.categories);
  const [open, setOpen] = useState(false);

  const toggleCategories = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        className="w-max p-3 md:hidden"
        type="button"
        onClick={toggleCategories}
      >
        <FiMenu size={24} />
      </button>
      <ul
        className={cx(
          open ? 'flex' : 'hidden',
          'align-center absolute top-full w-full flex-wrap justify-between bg-inherit shadow-md md:static md:flex md:flex-nowrap md:shadow-none'
        )}
      >
        {categories.map((category) => (
          <li
            className="w-full md:w-max md:border-y md:border-l md:border-green-500 md:first:border-l-0"
            key={category}
          >
            <CategoryLink category={category} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;
