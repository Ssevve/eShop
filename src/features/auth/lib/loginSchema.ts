import { userConstraints } from '@/lib/constants';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(
      userConstraints.password.min,
      `Minimum password length is ${userConstraints.password.min}`
      ),
});

export type LoginSchema = z.infer<typeof loginSchema>;
