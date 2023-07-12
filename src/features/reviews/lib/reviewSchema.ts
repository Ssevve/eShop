import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.string(),
  message: z.string(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
