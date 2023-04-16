import { Link } from 'react-router-dom';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

import Logo from 'components/common/Logo/Logo';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';

function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <header className="flex h-16 items-center bg-white p-3 drop-shadow-md">
      <nav className="flex grow items-center justify-between gap-2">
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
    </header>
  );
}

export default Header;
