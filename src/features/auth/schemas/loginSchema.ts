import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum password length is 6'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
