/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from 'app/store';
import { registerUser } from 'features/auth/authSlice';
import { UserLoginData } from 'types/UserLoginData';

import Logo from 'components/common/Logo';
import Input from 'components/common/Input';
import { UserRegisterData } from 'types/UserRegisterData';

function RegisterForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>();

  const onSubmit: SubmitHandler<UserRegisterData> = ({
    email,
    password,
  }: UserLoginData) => dispatch(registerUser({ email, password }));

  return (
    <form
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex items-center justify-center">
        <Logo />
      </header>
      <Input label="Email" type="email" {...register('email')} />
      <Input label="Password" type="password" {...register('password')} />
      <Input
        label="Repeat Password"
        type="password"
        {...register('repeatPassword')}
      />
      <button
        className="rounded-sm border border-green-600 bg-green-600 p-2 font-bold text-white transition duration-75 ease-out hover:border-green-500 hover:bg-green-500 hover:ease-in"
        type="submit"
      >
        Register
      </button>
      <footer>
        <p className="text-md mt-4 flex justify-center gap-2 text-sm">
          Have an account?
          <Link className="text-green-600 hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </footer>
    </form>
  );
}

export default RegisterForm;
