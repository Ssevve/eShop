import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import Logo from 'components/common/Logo/Logo';
import useWindowWidth from './hooks/useWindowWidth';
import useMediumBreakpointValue from './hooks/useMediumBreakpointValue';
import useScrollLock from './hooks/useScrollLock';
import Categories from './components/Categories';

function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  const windowWidth = useWindowWidth();
  const mediumBreakpointValue = useMediumBreakpointValue();
  const [scrollLock, setScrollLock] = useScrollLock();
  const [shouldShowCategories, setShouldShowCategories] = useState(false);

  const isMobile = windowWidth < mediumBreakpointValue;

  useEffect(() => {
    setShouldShowCategories(!isMobile);

    if (!isMobile) setScrollLock(false);
  }, [isMobile]);

  const openCategories = () => {
    setShouldShowCategories(true);
    setScrollLock(true);
  };

  const closeCategories = () => {
    setShouldShowCategories(false);
    setScrollLock(false);
  };

  return (
    <header className="sticky top-0 flex bg-white shadow-md md:flex-col">
      <nav className="flex h-16 grow items-center justify-between gap-2 p-3">
        {isMobile && (
          <button
            className="w-max p-3"
            aria-label="Show categories"
            type="button"
            onClick={openCategories}
          >
            <FiMenu size={24} />
          </button>
        )}
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex justify-end gap-2">
          <Link
            className="grid justify-items-center p-2 text-sm"
            title={currentUser ? 'Account' : 'Log in'}
            to={currentUser ? '/account' : '/login'}
          >
            <FiUser className="h-5 w-5" aria-hidden="true" />
            {currentUser ? 'Account' : 'Log in'}
          </Link>
          <Link
            className="grid justify-items-center p-2 text-sm"
            aria-label="Cart"
            title="Cart"
            to="/cart"
          >
            <div className="relative w-min">
              <FiShoppingCart
                className="pointer-events-none h-5 w-5"
                aria-hidden="true"
              />
              <span className="min-w-4 absolute bottom-3 left-3 flex h-4 items-center justify-center rounded-full bg-green-600 p-1 text-xs text-white">
                0
              </span>
            </div>
            Cart
          </Link>
        </div>
      </nav>
      <Categories
        closeCategories={closeCategories}
        shouldShowCategories={shouldShowCategories}
        isMobile={isMobile}
      />
    </header>
  );
}

export default Header;
