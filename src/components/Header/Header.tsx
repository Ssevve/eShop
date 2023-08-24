import { useAppDispatch } from '@/app/hooks';
import { Backdrop } from '@/components/common/Backdrop';
import { Logo } from '@/components/common/Logo';
import { logoutUser } from '@/features/auth';
import { cartsApi } from '@/features/carts';
import { useEffect, useState } from 'react';
import { FiMenu, FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { UserDropdown } from './UserDropdown';
import useBreakpointValue from './hooks/useBreakpointValue';
import useWindowWidth from './hooks/useWindowWidth';

export function Header() {
  const dispatch = useAppDispatch();
  const { totalProductAmount } = cartsApi.endpoints.getCart.useQueryState(undefined, {
    selectFromResult: ({ data }) => ({
      totalProductAmount: data?.totalProductAmount,
    }),
  });
  const windowWidth = useWindowWidth();
  const largeBreakpoint = useBreakpointValue('lg');
  const [shouldShowMenu, setShouldShowMenu] = useState(false);
  const [shouldShowUserDropdown, setShouldShowUserDropdown] = useState(false);

  const isMobile = windowWidth < largeBreakpoint;
  const isDesktop = windowWidth > largeBreakpoint;

  useEffect(() => {
    setShouldShowMenu(false);
  }, [isMobile]);

  const logout = () => {
    dispatch(logoutUser());
    setShouldShowUserDropdown(false);
  };

  const toggleUserDropdown = (bool: boolean) => {
    if (isMobile) return setShouldShowUserDropdown(false);
    setShouldShowUserDropdown(bool);
  };

  return (
    <>
      {shouldShowMenu && <Backdrop />}
      <header className="sticky top-0 z-10 flex w-screen bg-white pr-6 shadow lg:z-50">
        <nav className="mx-auto flex h-16 w-full max-w-screen-2xl items-center justify-between gap-3 px-3">
          {isMobile && (
            <button
              aria-label="Show menu"
              type="button"
              onClick={() => setShouldShowMenu((prev) => !prev)}
            >
              <FiMenu size={24} />
            </button>
          )}
          <Link to="/">
            <Logo />
          </Link>
          {isDesktop && (
            <DesktopMenu
              shouldShowCategories={shouldShowMenu}
              toggleCategories={setShouldShowMenu}
            />
          )}
          <div className="flex justify-end gap-6">
            <UserDropdown
              logout={logout}
              isOpen={shouldShowUserDropdown}
              open={() => toggleUserDropdown(true)}
              close={() => toggleUserDropdown(false)}
            />
            <Link
              className="grid justify-items-center text-sm"
              aria-label="Cart"
              title="Cart"
              to="/cart"
            >
              <div className="relative w-min">
                <FiShoppingCart className="pointer-events-none h-5 w-5" aria-hidden="true" />
                <span className="min-w-4 absolute bottom-3 left-3 flex h-4 items-center justify-center rounded-full bg-primary p-1 text-xs text-white">
                  {totalProductAmount || 0}
                </span>
              </div>
              Cart
            </Link>
          </div>
        </nav>
      </header>
      {isMobile && (
        <MobileMenu toggleClose={() => setShouldShowMenu(false)} isOpen={shouldShowMenu} />
      )}
    </>
  );
}
