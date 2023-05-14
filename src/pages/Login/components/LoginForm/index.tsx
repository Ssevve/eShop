/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  loginUser,
  resetAuthStatusAndErrors,
  selectIsPendingAuth,
} from 'features/auth/authSlice';
import { loginSchema, LoginSchema } from 'features/auth/schemas/loginSchema';
import Logo from 'components/common/Logo/Logo';
import Input from 'components/common/Input/Input';
import ErrorBox from 'components/common/ErrorBox';
import SubmitButton from 'components/common/SubmitButton/SubmitButton';

function LoginForm() {
  const dispatch = useAppDispatch();
  const invalidCredentials = useAppSelector(
    (state) => state.auth.error.invalidCredentials
  );
  const serverError = useAppSelector((state) => state.auth.error.server);
  const isPendingAuth = useAppSelector(selectIsPendingAuth);
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
  }, []);

  useEffect(() => {
    if (invalidCredentials) {
      setError('email', { message: 'Invalid email or password' });
      setError('password', { message: 'Invalid email or password' });
    } else {
      clearErrors();
    }
  }, [invalidCredentials]);

  return (
    <form
      aria-label="Log in"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
    >
      <header className="flex flex-col items-center justify-center gap-4">
        <Logo />
        <ErrorBox
          error={serverError}
          title="Could not log in"
          errorMessage="Something went wrong. Please try again."
        />
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
      <SubmitButton text="Log in" isLoading={isPendingAuth} />
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
