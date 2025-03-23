// auth.schemas.ts
import { z } from 'zod';

const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);

const AuthBaseSchema = z.object({
  userAgent: z.string().optional(),
});

export const LoginCandidateSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
});

export const RegisterCandidateSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(6).max(255),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const RegisterOrgSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(6).max(255),
  name: z.string().min(2).max(100),
  industry: z.string().min(2).max(100),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const LoginOrgSchema = AuthBaseSchema.extend({
  email: emailSchema,
  password: passwordSchema,
});

export const UserSchema = z.object({
  email: z.string().email(),
  organizationId: z.string().optional(),
  candidateId: z.string().optional(),
});
