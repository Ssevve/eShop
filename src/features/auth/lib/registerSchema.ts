import { userConstraints } from '@/lib/constants';
import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email'),
    firstName: z.string().min(
      userConstraints.firstName.min,
      `Minimum first name length is ${userConstraints.firstName.min}`
      ),
    lastName: z.string().min(
      userConstraints.lastName.min,
      `Minimum last name length is ${userConstraints.lastName.min}`
      ),
    password: z.string().min(
        userConstraints.password.min,
        `Minimum password length is ${userConstraints.password.min}`
        ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: "Passwords don't match",
  });

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type RegisterSchema = Optional<z.infer<typeof registerSchema>, 'repeatPassword'>;
