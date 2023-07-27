import { useAppSelector } from '@/app/hooks';
import { Logo } from '@/components/common/Logo';
import { selectCartProductCount } from '@/features/cart/cartSlice';
import useBreakpointValue from '@/hooks/useBreakpointValue';
import useWindowWidth from '@/hooks/useWindowWidth';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { UserDropdown } from './UserDropdown';
import useScrollLock from './hooks/useScrollLock';

export function Header() {
  const cartProductCount = useAppSelector(selectCartProductCount);
  const windowWidth = useWindowWidth();
  const largeBreakpoint = useBreakpointValue('lg');
  const [isScrollLocked, setIsScrollLocked] = useScrollLock();
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const isMobile = windowWidth < largeBreakpoint;

  useEffect(() => {
    toggleMenu(false);
  }, [isMobile]);

  const toggleMenu = (bool?: boolean) => {
    if (bool !== undefined) {
      setShouldShowMenu(bool);
      setIsScrollLocked(bool);
    } else {
      setShouldShowMenu((prev) => !prev);
      setIsScrollLocked((prev) => !prev);
    }
  };

  return (
    <>
      <AnimatePresence>
        {shouldShowMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-0 top-0 z-50 h-screen w-screen bg-black/60"
          />
        )}
      </AnimatePresence>
      <header className="sticky top-0 z-10 flex w-screen bg-white shadow lg:z-50">
        <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-3 px-3">
          {isMobile && (
            <button aria-label="Show menu" type="button" onClick={() => toggleMenu()}>
              <FiMenu size={24} />
            </button>
          )}
          <Link to="/">
            <Logo />
          </Link>
          {!isMobile && (
            <DesktopMenu shouldShowCategories={shouldShowMenu} toggleCategories={toggleMenu} />
          )}
          <div className="mr-6 flex justify-end gap-6">
            <UserDropdown isMobile={isMobile} />
            <Link
              className="grid justify-items-center text-sm"
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
      </header>
      {isMobile && <MobileMenu toggleClose={() => toggleMenu(false)} isOpen={shouldShowMenu} />}
    </>
  );
}
