import { type InferType, object, string } from 'yup';
import { FIELDS } from './fields.ts';

export const PASSWORD_MIN_LENGTH = 8;

export const createAccountSchema = object({
  [FIELDS.barNumber]: string()
    .trim()
    .default('')
    .required('Bar Card number is required'),
  [FIELDS.email]: string()
    .trim()
    .default('')
    .required('Email is required')
    .email('Enter a valid email'),
  [FIELDS.password]: string()
    .default('')
    .required('Password is required')
    .min(PASSWORD_MIN_LENGTH, `Use at least ${PASSWORD_MIN_LENGTH} characters`),
});

export type CreateAccountValues = InferType<typeof createAccountSchema>;
