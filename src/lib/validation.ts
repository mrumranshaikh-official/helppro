import { z } from 'zod';

// Authentication validation schemas
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
});

export const signupSchema = z.object({
  email: z.string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Help request validation schema
export const helpRequestSchema = z.object({
  title: z.string()
    .trim()
    .min(10, 'Title must be at least 10 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .trim()
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  category: z.enum(['Frontend', 'Backend', 'DevOps', 'Web', 'Mobile', 'System Admin'], {
    errorMap: () => ({ message: 'Please select a valid category' })
  }),
  urgency: z.enum(['low', 'medium', 'high', 'urgent'], {
    errorMap: () => ({ message: 'Please select a valid urgency level' })
  }),
  techStack: z.array(
    z.string().trim().max(50, 'Tech name must be less than 50 characters')
  ).max(20, 'Maximum 20 technologies allowed').optional(),
  coinReward: z.number()
    .int('Coin reward must be a whole number')
    .min(0, 'Coin reward cannot be negative')
    .max(10000, 'Maximum coin reward is 10,000')
});

// Profile update validation schema
export const profileUpdateSchema = z.object({
  full_name: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .optional(),
  headline: z.string()
    .trim()
    .max(200, 'Headline must be less than 200 characters')
    .optional(),
  bio: z.string()
    .trim()
    .max(500, 'Bio must be less than 500 characters')
    .optional(),
  location: z.string()
    .trim()
    .max(100, 'Location must be less than 100 characters')
    .optional()
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type HelpRequestFormData = z.infer<typeof helpRequestSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
