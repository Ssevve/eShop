import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number(),
  message: z.string(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
