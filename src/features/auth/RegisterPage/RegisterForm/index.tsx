import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ErrorBox from '@/components/common/ErrorBox';
import Input from '@/components/common/Input';
import { Logo } from '@/components/common/Logo/Logo';
import SubmitButton from '@/components/common/SubmitButton';
import {
  registerUser,
  resetAuthStatusAndError,
  selectIsPendingAuth,
  selectIsRegisterSuccess,
  selectServerError,
} from '@/features/auth/authSlice';
import { RegisterSchema, registerSchema } from '@/features/auth/lib/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isEmailTaken = useAppSelector((state) => state.auth.error === 'emailTaken');
  const registerSuccess = useAppSelector(selectIsRegisterSuccess);
  const isServerError = useAppSelector(selectServerError);
  const isPendingAuth = useAppSelector(selectIsPendingAuth);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterSchema>({
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (isEmailTaken) {
      setError('email', { message: 'Email already taken' });
    } else {
      clearErrors();
    }
  }, [isEmailTaken]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatusAndError());
    };
  }, []);

  useEffect(() => {
    if (registerSuccess) navigate('/login');
  }, [registerSuccess]);

  const onSubmit: SubmitHandler<RegisterSchema> = ({
    email,
    firstName,
    lastName,
    password,
  }: RegisterSchema) => dispatch(registerUser({ email, firstName, lastName, password }));

  return (
    <form
      aria-label="Register"
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="flex flex-col items-center justify-center gap-4">
        <Logo />
        {isServerError && <ErrorBox title="Could not create an account" />}
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
        label="First Name"
        autoComplete="given-name"
        type="text"
        error={errors.firstName}
        {...register('firstName')}
        required
      />
      <Input
        label="Last Name"
        autoComplete="family-name"
        type="text"
        error={errors.lastName}
        {...register('lastName')}
        required
      />
      <Input
        label="Password"
        autoComplete="new-password"
        type="password"
        error={errors.password}
        {...register('password')}
        required
      />
      <Input
        label="Repeat Password"
        autoComplete="new-password"
        type="password"
        error={errors.repeatPassword}
        {...register('repeatPassword')}
        required
      />
      <SubmitButton fullWidth isLoading={isPendingAuth}>
        Register
      </SubmitButton>
      <footer>
        <p className="text-md mt-4 flex justify-center gap-2 text-sm">
          Have an account?
          <Link className="text-primary hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </footer>
    </form>
  );
}

export default RegisterForm;
