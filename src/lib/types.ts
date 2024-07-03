import { z } from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters long').max(50, 'Name should not be longer than 50 characters'),
  email: z
    .string()
    .email('Email is not valid')
    .min(5, 'Email should be at least 5 characters long')
    .max(50, 'Email should not be longer than 50 characters'),
  phoneNumber: z.string().min(8, 'Phone number should be at least 8 digits long').max(20, 'Phone number should not be longer than 20 digits'),
});

export const planSchema = z.object({
  plan: z.object({
    name: z.string(),
    price: z.number(),
    color: z.string(),
    bonus: z.number(),
  }),
  duration: z.enum(['Monthly', 'Yearly']),
});

export const addonsSchema = z.object({
  addons: z.array(z.string()),
});

export type TPersonalInfoSchema = z.infer<typeof personalInfoSchema>;
export type TPlanSchema = z.infer<typeof planSchema>;
export type TAddonsSchema = z.infer<typeof addonsSchema>;
