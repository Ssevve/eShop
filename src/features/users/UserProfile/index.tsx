import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logoutUser, selectCurrentUser } from 'features/auth/authSlice';

function UserProfile() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div>
      <h1 className="text-4xl font-semibold">
        {currentUser?.firstName} {currentUser?.lastName}
      </h1>
      <button
        className="text-bold border bg-danger p-3 text-white"
        onClick={() => dispatch(logoutUser())}
      >
        Log out
      </button>
    </div>
  );
}

export default UserProfile;
