// auth.schemas.ts
import { z } from 'zod';

const emailSchema = z
  .string()
  .email('Invalid email format')
  .min(1, 'Email is required')
  .max(255, 'Email must be less than 255 characters');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(255, 'Password must be less than 255 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
  );

const AuthBaseSchema = z.object({
  userAgent: z.string().optional(),
});

export const LoginCandidateSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const RegisterCandidateSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
});

export const RegisterOrgSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  industry: z
    .string()
    .min(2, 'Industry must be at least 2 characters')
    .max(100, 'Industry must be less than 100 characters'),
});

export const LoginOrgSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const UserSchema = z.object({
  email: emailSchema,
  organizationId: z.string().optional(),
  candidateId: z.string().optional(),
});
