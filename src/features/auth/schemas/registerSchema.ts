import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Minimum password length is 6'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ['repeatPassword'],
    message: "Passwords don't match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
