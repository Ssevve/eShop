import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMenu, FiShoppingCart } from 'react-icons/fi';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import Logo from 'components/common/Logo/Logo';
import useWindowWidth from 'hooks/useWindowWidth';
import useBreakpointValue from 'hooks/useBreakpointValue';
import useScrollLock from './hooks/useScrollLock';
import CategoryList from './components/CategoryList';
import { selectCartProductCount } from 'features/cart/cartSlice';

function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  const cartProductCount = useAppSelector(selectCartProductCount);
  const windowWidth = useWindowWidth();
  const mediumBreakpoint = useBreakpointValue('md');
  const [isScrollLocked, setIsScrollLocked] = useScrollLock();
  const [shouldShowCategories, setShouldShowCategories] = useState(false);

  const isMobile = windowWidth < mediumBreakpoint;

  useEffect(() => {
    setShouldShowCategories(!isMobile);
    if (!isMobile) setIsScrollLocked(false);
  }, [isMobile]);

  const openCategories = () => {
    setShouldShowCategories(true);
    setIsScrollLocked(true);
  };

  const closeCategories = () => {
    setShouldShowCategories(false);
    setIsScrollLocked(false);
  };

  return (
    <header className="sticky top-0 z-50 flex bg-white shadow-md md:flex-col">
      <nav className="container mx-auto flex h-16 grow items-center justify-between gap-2">
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
              <FiShoppingCart className="pointer-events-none h-5 w-5" aria-hidden="true" />
              <span className="min-w-4 absolute bottom-3 left-3 flex h-4 items-center justify-center rounded-full bg-primary p-1 text-xs text-white">
                {cartProductCount}
              </span>
            </div>
            Cart
          </Link>
        </div>
      </nav>
      <CategoryList
        closeCategories={closeCategories}
        shouldShowCategories={shouldShowCategories}
        isMobile={isMobile}
      />
    </header>
  );
}

export default Header;
