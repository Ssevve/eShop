import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logoutUser, selectCurrentUser } from 'features/auth/authSlice';
import { FiLogOut } from 'react-icons/fi';

function Account() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const handleLogout = () => dispatch(logoutUser());
  return (
    <>
      <header className="flex items-center justify-between p-3">
        <h1 className="text-6xl">{currentUser?.email}</h1>
        <button
          type="button"
          className="flex h-max gap-2 rounded-sm bg-red-700 p-3 font-bold text-white hover:bg-red-600"
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>
      <section>Hi</section>
    </>
  );
}

export default Account;
