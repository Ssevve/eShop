import cx from 'classnames';
import { FiMenu } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import { useEffect, useState } from 'react';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../../../tailwind.config.js';
import useWindowWidth from '../hooks/useWindowWidth';

import CategoryLink from './CategoryLink';
import { getBreakpointValue } from '../helpers/getBreakpointValue.js';

function Categories() {
  const categories = useAppSelector((state) => state.filters.categories);
  const windowWidth = useWindowWidth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategories = () => setIsOpen((prev) => !prev);
  const fullConfig = resolveConfig(tailwindConfig);
  // @ts-ignore
  const mediumBreakpoint = getBreakpointValue(fullConfig?.theme?.screens?.md);
  const isMobile = windowWidth < mediumBreakpoint;

  useEffect(() => {
    if (isMobile) setIsOpen(false);
    else setIsOpen(true);
  }, [isMobile]);

  const shouldRenderMenu = isMobile || isOpen;

  return (
    <>
      {isMobile && (
        <button className="w-max p-3" type="button" onClick={toggleCategories}>
          <FiMenu size={24} />
        </button>
      )}
      {shouldRenderMenu && (
        <ul
          className={cx(
            isOpen ? 'flex' : 'hidden',
            'bg-gray-100 hover:bg-gray-200 align-center absolute top-full w-full flex-wrap justify-between bg-inherit shadow-md md:static md:flex md:flex-nowrap md:shadow-none'
          )}
        >
          {categories.map((category) => (
            <li
              className="w-full"
              key={category}
            >
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Categories;
