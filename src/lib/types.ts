import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
});

export type TPersonalInfoSchema = z.infer<typeof personalInfoSchema>;
