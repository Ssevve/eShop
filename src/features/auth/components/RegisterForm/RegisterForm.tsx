/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'app/hooks';
import {
  registerUser,
  resetAuthStatusAndErrors,
} from 'features/auth/authSlice';
import {
  registerSchema,
  RegisterSchema,
} from 'features/auth/schemas/registerSchema';

import Logo from 'components/common/Logo/Logo';
import Input from 'components/common/Input';

function RegisterForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    dispatch(resetAuthStatusAndErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<RegisterSchema> = ({
    email,
    password,
  }: RegisterSchema) => dispatch(registerUser({ email, password }));

  return (
    <form
      aria-label="Register"
      className="mx-auto flex shrink basis-96 flex-col gap-4 rounded-sm bg-white p-6 drop-shadow-md"
      onSubmit={handleSubmit(onSubmit)}
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
      <Input
        label="Repeat Password"
        type="password"
        error={errors.repeatPassword}
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
