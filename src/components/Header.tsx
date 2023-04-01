import { Link } from 'react-router-dom';
import { FiUser, FiShoppingCart } from 'react-icons/fi';

import Logo from 'components/common/Logo/Logo';

function Header() {
  return (
    <header className="h-16 bg-white p-3 drop-shadow-md">
      <nav className="flex items-center justify-between gap-2">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex justify-end gap-2">
          <Link
            className="grid justify-items-center p-2"
            title="Account"
            to="/login"
          >
            <FiUser className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link className="grid justify-items-center p-2" title="Cart" to="/">
            <div className="relative w-min">
              <FiShoppingCart
                className="pointer-events-none h-6 w-6"
                aria-hidden="true"
              />
              <span className="min-w-4 absolute bottom-3 left-3 flex h-4 items-center justify-center rounded-full bg-green-600 p-1 text-xs text-white">
                0
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
