import { useEffect, useState } from 'react';
import cx from 'classnames';
import { FiMenu } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import useMediumBreakpointValue from '../hooks/useMediumBreakpointValue';
import useWindowWidth from '../hooks/useWindowWidth';
import CategoryLink from './CategoryLink';
import useLockedBody from '../hooks/useLockedBody';

function Categories() {
  const categories = useAppSelector((state) => state.filters.categories);
  const setLockedBody = useLockedBody();
  const windowWidth = useWindowWidth();
  const mediumBreakpointValue = useMediumBreakpointValue();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setLockedBody(!isOpen);
  };
  const isMobile = windowWidth < mediumBreakpointValue;

  useEffect(() => {
    setIsOpen(!isMobile);
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
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'align-center absolute top-full h-screen w-full flex-wrap justify-between bg-gray-100 shadow-md transition-transform md:static md:flex md:h-max md:flex-nowrap md:shadow-none'
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
