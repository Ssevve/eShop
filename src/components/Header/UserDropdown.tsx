import { useAppSelector } from '@/app/hooks';
import { Button } from '@/components/common/Button';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface UserDropdownProps {
  logout: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export function UserDropdown({ logout, isOpen, open, close }: UserDropdownProps) {
  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <Link
        className="grid justify-items-center text-sm"
        title={currentUser ? 'Account' : 'Log in'}
        to={currentUser ? '/dashboard' : '/login'}
      >
        <FiUser className="h-5 w-5" aria-hidden="true" />
        <span>{currentUser ? 'Account' : 'Log in'}</span>
      </Link>

      {isOpen && (
        <div className="absolute -right-3 z-50 w-44 divide-y divide-gray-100 rounded-sm bg-white shadow">
          {currentUser ? (
            <>
              <div className="px-4 py-3 text-sm">
                <div>
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <div className="truncate font-medium">{currentUser.email}</div>
              </div>
              <ul className="py-3 text-sm">
                <li>
                  <Link onClick={close} to="/dashboard" className="block p-3 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={close}
                    to="/dashboard/reviews"
                    className="block p-3 hover:bg-gray-100"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
              <div className="py-3">
                <button onClick={logout} className="w-full p-3 text-left text-sm hover:bg-gray-100">
                  Log out
                </button>
              </div>
            </>
          ) : (
            <ul className="p-3">
              <li>
                <Button renderAs={Link} onClick={close} to="/login" fullWidth>
                  Log in
                </Button>
              </li>
              <li>
                <span className="block py-3 text-center text-gray-400 before:absolute before:left-4 before:top-1/2 before:h-px before:w-5 before:-translate-y-1/2 before:bg-gray-400 after:absolute after:right-4 after:top-1/2 after:h-px after:w-5 after:-translate-y-1/2 after:bg-gray-400">
                  No account?
                </span>
              </li>
              <li>
                <Button
                  renderAs={Link}
                  variant="primary-outline"
                  onClick={close}
                  to="/register"
                  fullWidth
                >
                  Register
                </Button>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
