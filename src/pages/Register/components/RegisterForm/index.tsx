import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  resetAuthStatusAndErrors,
  selectIsPendingAuth,
  selectIsRegisterSuccess,
} from 'features/auth/authSlice';
import { registerSchema, RegisterSchema } from 'features/auth/schemas/registerSchema';
import Logo from 'components/common/Logo/Logo';
import ErrorBox from 'components/common/ErrorBox';
import Input from 'components/common/Input';
import SubmitButton from 'components/common/SubmitButton';
import { registerUser } from 'features/auth/authSlice';

function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailTaken = useAppSelector((state) => state.auth.error.emailTaken);
  const registerSuccess = useAppSelector(selectIsRegisterSuccess);
  const serverError = useAppSelector((state) => state.auth.error.server);
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
    if (emailTaken) {
      setError('email', { message: 'Email already taken' });
    } else {
      clearErrors();
    }
  }, [emailTaken]);

  useEffect(() => {
    return () => {
      dispatch(resetAuthStatusAndErrors());
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
        <ErrorBox
          isError={serverError}
          title="Could not create an account"
          errorMessage="Something went wrong. Please try again."
        />
      </header>
      <Input label="Email" type="email" error={errors.email} {...register('email')} />
      <Input label="First Name" type="text" error={errors.firstName} {...register('firstName')} />
      <Input label="Last Name" type="text" error={errors.lastName} {...register('lastName')} />
      <Input label="Password" type="password" error={errors.password} {...register('password')} />
      <Input
        label="Repeat Password"
        type="password"
        error={errors.repeatPassword}
        {...register('repeatPassword')}
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
