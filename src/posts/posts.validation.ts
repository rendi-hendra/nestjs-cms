import { z, ZodType } from 'zod';

export class PostsValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1),
  });
}
