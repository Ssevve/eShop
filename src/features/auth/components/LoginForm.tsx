import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { ErrorBox } from '@/components/common/ErrorBox';
import { Input } from '@/components/common/Input';
import { LoaderButton } from '@/components/common/LoaderButton';
import { Logo } from '@/components/common/Logo';
import {
  loginUser,
  resetAuthStatusAndError,
  selectIsPendingAuth,
  selectServerError,
} from '@/features/auth/authSlice';
import { LoginSchema, loginSchema } from '@/features/auth/lib/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export function LoginForm() {
  const dispatch = useAppDispatch();
  const areInvalidCredentials = useAppSelector(
    (state) => state.auth.error === 'invalidCredentials'
  );
  const isServerError = useAppSelector(selectServerError);
  const isPendingAuth = useAppSelector(selectIsPendingAuth);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchema> = ({ email, password }: LoginSchema) =>
    dispatch(loginUser({ email, password }));

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatusAndError());
    };
  }, []);

  useEffect(() => {
    if (areInvalidCredentials) {
      setError('email', { message: 'Invalid email or password' });
      setError('password', { message: 'Invalid email or password' });
    } else {
      clearErrors();
    }
  }, [areInvalidCredentials]);

  return (
    <form
      aria-label="Log in"
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
    >
      <header className="flex flex-col items-center justify-center gap-4">
        <Logo />
        {isServerError && <ErrorBox title="Could not log in" />}
      </header>
      <Input
        label="Email"
        autoComplete="email"
        type="email"
        error={errors.email}
        {...register('email')}
        required
      />
      <Input
        label="Password"
        autoComplete="current-password"
        type="password"
        error={errors.password}
        {...register('password')}
        required
      />
      <LoaderButton type="submit" fullWidth isLoading={isPendingAuth}>
        Log in
      </LoaderButton>
      <footer>
        <p className="text-md mt-4 flex justify-center gap-2 text-sm">
          Need an account?
          <Link className="text-primary hover:underline" to="/register">
            Register
          </Link>
        </p>
      </footer>
    </form>
  );
}
