/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from 'app/store';
import { useAppDispatch } from 'app/hooks';
import { loginUser, resetAuthStatusAndErrors } from 'features/auth/authSlice';
import { loginSchema, LoginSchema } from 'features/auth/schemas/loginSchema';

import Logo from 'components/common/Logo/Logo';
import Input from 'components/common/Input';

function LoginForm() {
  const dispatch = useAppDispatch();
  const invalidCredentials = useSelector(
    (state: RootState) => state.auth.error.invalidCredentials
  );
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = ({
    email,
    password,
  }: LoginSchema) => dispatch(loginUser({ email, password }));

  useEffect(() => {
    dispatch(resetAuthStatusAndErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (invalidCredentials) {
      setError('email', { message: 'Invalid email or password' });
      setError('password', { message: 'Invalid email or password' });
    } else {
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidCredentials]);

  return (
    <form
      aria-label="Log in"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
    >
      <header className="flex items-center justify-center">
        <Logo />
      </header>
      <Input
        label="Email"
        type="email"
        error={errors.email}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        error={errors.password}
        {...register('password')}
      />
      <button
        className="rounded-sm border border-green-600 bg-green-600 p-2 font-bold text-white transition duration-75 ease-out hover:border-green-500 hover:bg-green-500 hover:ease-in"
        type="submit"
      >
        Log in
      </button>
      <footer>
        <p className="text-md mt-4 flex justify-center gap-2 text-sm">
          Need an account?
          <Link className="text-green-600 hover:underline" to="/register">
            Register
          </Link>
        </p>
      </footer>
    </form>
  );
}

export default LoginForm;
