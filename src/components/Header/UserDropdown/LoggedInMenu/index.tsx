import { useAppDispatch } from 'app/hooks';
import { logoutUser } from 'features/auth/authSlice';
import { Link } from 'react-router-dom';
import User from 'types/User';

interface LoggedInMenuProps {
  currentUser: User;
  toggleMenu: (bool: boolean) => void;
}

function LoggedInMenu({ currentUser, toggleMenu }: LoggedInMenuProps) {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutUser());
    toggleMenu(false);
  };

  return (
    <>
      <div className="px-4 py-3 text-sm text-gray-900">
        <div>
          {currentUser.firstName} {currentUser.lastName}
        </div>
        <div className="truncate font-medium">{currentUser.email}</div>
      </div>
      <ul className="py-3 text-sm">
        <li>
          <Link
            onClick={() => toggleMenu(false)}
            to="/dashboard/"
            className="block p-3 hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={() => toggleMenu(false)}
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
  );
}

export default LoggedInMenu;
