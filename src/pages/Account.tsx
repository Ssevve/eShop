import { useAppDispatch } from 'app/store';
import { logoutUser } from 'features/auth/authSlice';

function Account() {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(logoutUser());
  return (
    <>
      <div>Account Page</div>
      <button
        className="border-2 border-black"
        onClick={handleLogout}
        type="button"
      >
        Log out
      </button>
    </>
  );
}

export default Account;
