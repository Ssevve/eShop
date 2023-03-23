/* eslint-disable react/jsx-props-no-spreading */
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AppDispatch } from 'app/store';
import { registerUser, UserLoginData } from 'features/auth/authSlice';

import Logo from 'components/common/Logo';

interface Inputs {
  email: string;
  password: string;
  repeatPassword: string;
}

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
  }: UserLoginData) => dispatch(registerUser({ email, password }));
  return (
    <div className="flex h-full items-center p-6">
      <form
        className="mx-auto flex w-96 min-w-max flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="flex items-center justify-center">
          <Logo />
        </header>
        <label className="grid">
          Email
          <input
            {...register('email')}
            className="w-0 min-w-full rounded-sm border border-black p-2"
            type="text"
          />
        </label>
        <label className="grid">
          Password
          <input
            {...register('password')}
            className="w-0 min-w-full rounded-sm border border-black p-2"
            type="password"
          />
        </label>
        <label className="grid">
          Repeat Password
          <input
            {...register('repeatPassword')}
            className="w-0 min-w-full rounded-sm border border-black p-2"
            type="password"
          />
        </label>
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
    </div>
  );
}

export default Register;
