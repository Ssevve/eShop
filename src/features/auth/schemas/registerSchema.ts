import { z } from 'zod';
import { userConstraints } from 'lib/constants';

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string()
      .min(userConstraints.password.min, `Minimum password length is ${userConstraints.password.min}`),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: "Passwords don't match",
  });

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RegisterSchema = Optional<z.infer<typeof registerSchema>, 'repeatPassword'>;
