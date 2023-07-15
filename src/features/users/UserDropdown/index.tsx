import { useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { selectCurrentUser } from 'features/auth/authSlice';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoggedInDropdownMenu from './LoggedInDropdownMenu';
import LoggedOutDropdownMenu from './LoggedOutDropdownMenu';

function UserDropdown({ isMobile }: { isMobile: boolean }) {
  const currentUser = useAppSelector(selectCurrentUser);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  const toggleMenu = (bool: boolean) => {
    if (isMobile) return setShouldShowMenu(false);
    setShouldShowMenu(bool);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => toggleMenu(true)}
      onMouseLeave={() => toggleMenu(false)}
    >
      <Link
        className="grid justify-items-center text-sm"
        title={currentUser ? 'Dashboard' : 'Log in'}
        to={currentUser ? '/dashboard/' : '/login'}
      >
        <FiUser className="h-5 w-5" aria-hidden="true" />
        <span>{currentUser ? 'Profile' : 'Account'}</span>
      </Link>

      {shouldShowMenu && (
        <div className="absolute -right-3 z-50 w-44 divide-y divide-gray-100 rounded-sm bg-white shadow">
          {currentUser ? (
            <LoggedInDropdownMenu currentUser={currentUser} toggleMenu={toggleMenu} />
          ) : (
            <LoggedOutDropdownMenu toggleMenu={toggleMenu} />
          )}
        </div>
      )}
    </div>
  );
}

export default UserDropdown;
