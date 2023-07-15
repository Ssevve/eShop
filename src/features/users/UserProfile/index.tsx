import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logoutUser, selectCurrentUser } from 'features/auth/authSlice';
import Input from 'components/common/Input';
import Button from 'components/common/Button';

function UserProfile() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <div>
      <form className="mb-6 max-w-xs space-y-3">
        <Input type="text" label="First name" value={currentUser?.firstName} disabled />
        <Input type="text" label="Last name" value={currentUser?.lastName} disabled />
        <Input type="text" label="Email" value={currentUser?.email} disabled />
      </form>
      <Button onClick={() => dispatch(logoutUser())} variant="danger-outline">
        Log out
      </Button>
    </div>
  );
}

export default UserProfile;
