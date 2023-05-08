import { useEffect, useState } from 'react';
import cx from 'classnames';
import { FiMenu } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import useMediumBreakpointValue from '../hooks/useMediumBreakpointValue';
import useWindowWidth from '../hooks/useWindowWidth';
import CategoryLink from './CategoryLink';

function Categories() {
  const categories = useAppSelector((state) => state.filters.categories);
  const windowWidth = useWindowWidth();
  const mediumBreakpointValue = useMediumBreakpointValue();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const isMobile = windowWidth < mediumBreakpointValue;

  useEffect(() => {
    if (isMobile) setIsOpen(false);
    else setIsOpen(true);
  }, [isMobile]);

  const shouldRenderMenu = isMobile || isOpen;

  return (
    <>
      {isMobile && (
        <button className="w-max p-3" type="button" onClick={toggleMenu}>
          <FiMenu size={24} />
        </button>
      )}
      {shouldRenderMenu && (
        <ul
          className={cx(
            isOpen ? 'flex' : 'hidden',
            'align-center absolute top-full w-full flex-wrap justify-between bg-gray-100 shadow-md md:static md:flex md:flex-nowrap md:shadow-none'
          )}
        >
          {categories.map((category) => (
            <li className="w-full hover:bg-gray-200" key={category}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Categories;
